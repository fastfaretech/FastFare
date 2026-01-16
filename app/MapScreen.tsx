import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, Image, Dimensions, Alert } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/themed-view";
import truck from "../assets/images/delivery-truck.png";
import { API_BASE_URL } from '../constants/api';

const LOCATION_TASK_NAME = "BACKGROUND_LOCATION_TASK";
const GOOGLE_MAPS_APIKEY = Constants.expoConfig?.extra?.GOOGLE_MAPS_API_KEY;
const BACKEND_URL = `${API_BASE_URL}/driver/location`;
const isExpoGo: boolean = Constants.executionEnvironment === "storeClient";

type ShipmentStatus = "pending" | "booked" | "in-transit" | "delivered" | "cancelled";

interface Shipment {
  _id: string;
  shipmentId: string;
  pickupDetails: { latitude: number; longitude: number };
  deliveryDetails: { latitude: number; longitude: number };
  quantity: number;
  status: ShipmentStatus;
  createdAt: string;
}

// Responsive truck size calculation
const { width: screenWidth } = Dimensions.get('window');
const TRUCK_SIZE = screenWidth * 0.09; // 8% of screen width

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (Constants.executionEnvironment === "storeClient") {
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
  const [directionsError, setDirectionsError] = useState<string | null>(null);

  const isExpoGoLocal = Constants.executionEnvironment === "storeClient";

  // ✅ DEBUG: Log API key status
  console.log('🚗 MapScreen - API Key:', GOOGLE_MAPS_APIKEY ? '✅ LOADED' : '❌ MISSING');
  console.log('🚗 MapScreen - Shipment ID:', shipmentId);
  console.log('🚗 MapScreen - Token:', token ? '✅ PRESENT' : '❌ MISSING');

  useEffect(() => {
    const fetchShipment = async () => {
      try {
        if (!shipmentId || !token) {
          setError("Missing shipment or token");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/user/order/get/${shipmentId}`, {
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
        console.log('✅ Shipment loaded:', json.shipment.shipmentId);
      } catch (e: any) {
        setError(e.message ?? "Something went wrong");
        console.error('Shipment fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchShipment();
  }, [shipmentId, token]);

  useEffect(() => {
    const startLocationTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        Alert.alert("Location Permission", "Location access required for tracking");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          distanceInterval: 10,
        },
        (loc) => {
          console.log('📍 New driver location:', loc.coords);
          setDriverLocation(loc.coords);
        }
      );

      if (!isExpoGoLocal) {
        const bgStatus = await Location.requestBackgroundPermissionsAsync();
        if (bgStatus.status === 'granted') {
          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.BestForNavigation,
            showsBackgroundLocationIndicator: true,
            foregroundService: {
              notificationTitle: "FastFare Driver",
              notificationBody: "Location tracking in background",
              notificationColor: "#3B82F6",
            },
          });
          console.log('✅ Background location tracking started');
        }
      }
    };

    startLocationTracking();

    return () => {
      if (!isExpoGoLocal) {
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME).catch(console.log);
      }
    };
  }, [isExpoGoLocal]);

  if (loading || !shipment) {
    if (error) {
      return (
        <ThemedView className="flex-1 items-center justify-center px-6">
          <Text className="text-red-500 text-base text-center mb-4">{error}</Text>
          <Text className="text-slate-500 text-sm text-center">
            Shipment ID: {shipmentId} | Token: {token ? 'Present' : 'Missing'}
          </Text>
        </ThemedView>
      );
    }
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-slate-500">Loading shipment...</Text>
      </ThemedView>
    );
  }

  const pickup = shipment.pickupDetails;
  const destination = shipment.deliveryDetails;

  const region: Region = {
    latitude: (pickup.latitude + destination.latitude) / 2,
    longitude: (pickup.longitude + destination.longitude) / 2,
    latitudeDelta: Math.abs(pickup.latitude - destination.latitude) + 0.02,
    longitudeDelta: Math.abs(pickup.longitude - destination.longitude) + 0.02,
  };

  return (
    <ThemedView className="flex-1">
      {/* ✅ FIXED MapView with Route Line */}
      <MapView 
        provider={PROVIDER_GOOGLE} 
        style={{ flex: 1 }} 
        initialRegion={region}
        showsUserLocation={false} // Disable default blue dot
        showsMyLocationButton={true}
        showsCompass={true}
      >
        {/* Pickup Marker */}
        <Marker 
          coordinate={pickup} 
          title="📦 Pickup Location" 
          description={shipment.shipmentId}
          pinColor="green"
        />

        {/* Destination Marker */}
        <Marker 
          coordinate={destination} 
          title="🏁 Delivery Location" 
          pinColor="red"
        />
        
        {/* ✅ RESPONSIVE TRUCK MARKER */}
        {driverLocation && (
          <Marker 
            coordinate={driverLocation} 
            title="🚚 You are here"
            anchor={{ x: 0.5, y: 1 }} // Bottom-center anchor for truck
          >
            <Image 
              source={truck} 
              style={{
                width: TRUCK_SIZE,
                height: TRUCK_SIZE * 1.2,
                resizeMode: 'contain',
              }}
            />
          </Marker>
        )}

        {/* ✅ FIXED ROUTE LINE - KEY CHANGES */}
        {shipment && GOOGLE_MAPS_APIKEY && (
          <MapViewDirections
            origin={pickup}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            mode="DRIVING"                    // ✅ REQUIRED
            strokeWidth={6}                   // ✅ Thicker line
            strokeColor="#3B82F6"             // ✅ FastFare blue
            lineDashPattern={[10, 5]}         // ✅ Dashed for style
            onReady={(result) => {
              console.log('✅ Route loaded:', result.distance, 'km,', result.duration, 'min');
            }}
            onError={(errorMsg) => {
              console.error('❌ Directions Error:', errorMsg);
              setDirectionsError(errorMsg);
            }}
          />
        )}
      </MapView>

      {/* Debug overlay */}
      {directionsError && (
        <ThemedView className="absolute top-4 left-4 bg-red-500 px-3 py-2 rounded-lg">
          <Text className="text-white text-sm">Route Error: {directionsError}</Text>
        </ThemedView>
      )}
    </ThemedView>
  );
}
