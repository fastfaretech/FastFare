import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/themed-view";

const LOCATION_TASK_NAME = "BACKGROUND_LOCATION_TASK";
const GOOGLE_MAPS_APIKEY = "AIzaSyD1L11-LhqWKmwrdNmnbvDWBsonhOkXAC4";
const API_BASE_URL = "http://172.27.25.158:3000";
const BACKEND_URL = `${API_BASE_URL}/api/v1/driver/location`;
const isExpoGo: boolean = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

type ShipmentStatus = "pending" | "booked" | "in-transit" | "delivered" | "cancelled";

interface Shipment {
  _id: string;
  shipmentId: string;
  pickupLocation: { latitude: number; longitude: number };
  deliveryLocation: { latitude: number; longitude: number };
  quantity: number;
  status: ShipmentStatus;
  createdAt: string;
}

// Background task: ONLY used in dev/prod builds, not Expo Go
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  // Skip completely when running inside Expo Go (background not supported)
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    return;
  }

  if (error) {
    console.error("Background location error:", error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    if (locations && locations.length > 0) {
      const location = locations[0];
      try {
        await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (err) {
        console.error("Failed to send location:", err);
      }
    }
  }
});

export default function MapScreen() {
  const { shipmentId, token } = useLocalSearchParams<{
    shipmentId?: string;
    token?: string;
  }>();

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [driverLocation, setDriverLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

  // Fetch shipment from backend (works in Expo Go and dev/prod)
  useEffect(() => {
    const fetchShipment = async () => {
      try {
        if (!shipmentId || !token) {
          setError("Missing shipment or token");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/v1/user/order/get/${shipmentId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const text = await res.text();
        console.log("MAP DETAILS STATUS", res.status, "BODY", text);

        if (!res.ok) {
          setError("Shipment not found");
          setLoading(false);
          return;
        }

        const json = JSON.parse(text) as { shipment: Shipment };
        setShipment(json.shipment);
      } catch (e: any) {
        setError(e.message ?? "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [shipmentId, token]);

  // Live location tracking:
  // - Foreground watch ALWAYS (for driver marker)
  // - Background updates ONLY outside Expo Go
  useEffect(() => {
    const startLocationTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Foreground updates (works in Expo Go too)
      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 10,
        },
        (loc) => setDriverLocation(loc.coords)
      );

      // Background tracking only in dev/prod builds
      if (!isExpoGo) {
        await Location.requestBackgroundPermissionsAsync();

        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
          accuracy: Location.Accuracy.BestForNavigation,
          showsBackgroundLocationIndicator: true,
          foregroundService: {
            notificationTitle: "FastFare Driver",
            notificationBody: "Location tracking in background",
            notificationColor: "#fff",
          },
        });
      }
    };

    startLocationTracking();

    return () => {
      if (!isExpoGo) {
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
      }
    };
  }, [isExpoGo]);

  if (loading || !shipment) {
    if (error) {
      return (
        <ThemedView className="flex-1 items-center justify-center px-6">
          <Text className="text-red-500 text-base text-center">{error}</Text>
        </ThemedView>
      );
    }
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </ThemedView>
    );
  }

  const pickup = shipment.pickupLocation;
  const destination = shipment.deliveryLocation;

  const region: Region = {
    latitude: (pickup.latitude + destination.latitude) / 2,
    longitude: (pickup.longitude + destination.longitude) / 2,
    latitudeDelta: Math.abs(pickup.latitude - destination.latitude) + 2,
    longitudeDelta: Math.abs(pickup.longitude - destination.longitude) + 2,
  };

  return (
    <ThemedView className="flex-1">
      <MapView provider={PROVIDER_GOOGLE} style={{ flex: 1 }} initialRegion={region}>
        <Marker coordinate={pickup} title="Pickup" />
        <Marker coordinate={destination} title="Destination" />
        {driverLocation && <Marker coordinate={driverLocation} title="Driver" pinColor="blue" />}
        <MapViewDirections
          origin={pickup}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="blue"
        />
      </MapView>
    </ThemedView>
  );
}
