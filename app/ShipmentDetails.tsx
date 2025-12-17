import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import * as Location from "expo-location";

type ShipmentStatus =
  | "pending"
  | "booked"
  | "in-transit"
  | "delivered"
  | "cancelled";

interface Shipment {
  _id: string;
  shipmentId: string;
  pickupLocation: {
    latitude: number;
    longitude: number;
  };
  deliveryLocation: {
    latitude: number;
    longitude: number;
  };
  quantity: number;
  status: ShipmentStatus;
  createdAt: string;
}

const API_BASE_URL = "http://172.27.25.158:3000";

async function coordsToAddressString(lat: number, lng: number) {
  try {
    const res = await Location.reverseGeocodeAsync({
      latitude: lat,
      longitude: lng,
    });

    if (!res.length) return "";

    const addr = res[0];
    return [
      addr.name,
      addr.street,
      addr.city,
      addr.region,
      addr.postalCode,
      addr.country,
    ]
      .filter(Boolean)
      .join(", ");
  } catch (e) {
    console.log("reverseGeocode error", e);
    return "";
  }
}

export default function ShipmentDetailsScreen() {
  const { shipmentId, token } = useLocalSearchParams<{
    shipmentId?: string;
    token?: string;
  }>();

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");

  useEffect(() => {
    console.log("DETAILS params:", { shipmentId, token });
    if (!shipmentId || !token) {
      setError("Missing shipment or token");
      return;
    }
    fetchShipment(shipmentId, token);
  }, [shipmentId, token]);

  const fetchShipment = async (id: string, jwt: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching details for id:", id);

      const res = await fetch(
        `${API_BASE_URL}/api/v1/user/order/get/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const text = await res.text();
      console.log("DETAILS STATUS", res.status, "BODY", text);

      if (!res.ok) {
        setError("Shipment not found");
        return;
      }

      const data = JSON.parse(text);
      const s: Shipment = data.shipment;
      setShipment(s);

      // Fire reverse‑geocoding in parallel
      coordsToAddressString(
        s.pickupLocation.latitude,
        s.pickupLocation.longitude
      ).then(setPickupAddress);
      coordsToAddressString(
        s.deliveryLocation.latitude,
        s.deliveryLocation.longitude
      ).then(setDropAddress);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const renderStatusBadge = (status: ShipmentStatus) => {
    let bg = "bg-amber-200";
    let text = "text-slate-800";
    if (status === "in-transit") {
      bg = "bg-blue-400";
      text = "text-white";
    } else if (status === "delivered") {
      bg = "bg-green-500";
      text = "text-white";
    } else if (status === "cancelled") {
      bg = "bg-red-500";
      text = "text-white";
    }

    return (
      <View className={`px-3 py-1 rounded-full ${bg}`}>
        <Text className={`text-xs font-semibold ${text}`}>
          {status.toUpperCase()}
        </Text>
      </View>
    );
  };

  const dateStr = shipment
    ? new Date(shipment.createdAt).toLocaleDateString()
    : "";
  const timeStr = shipment
    ? new Date(shipment.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900">
      {/* Header */}
      <View className="bg-blue-600 px-4 py-4 flex-row items-center justify-between rounded-b-3xl">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-9 h-9 rounded-full bg-white/10 items-center justify-center mr-3"
          >
            <Text className="text-white text-xl">←</Text>
          </TouchableOpacity>
          <View>
            <Text className="text-white text-lg font-semibold">
              Shipment Details
            </Text>
            <Text className="text-white/90 text-sm">
              Order #{shipment?.shipmentId ?? shipmentId}
            </Text>
          </View>
        </View>
        {shipment && renderStatusBadge(shipment.status)}
      </View>

      {loading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      )}

      {!loading && error && (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-red-500 text-base text-center">
            {error}
          </Text>
        </View>
      )}

      {!loading && !error && shipment && (
        <ScrollView
          className="flex-1 px-4 pt-3"
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {/* Customer information (dummy) */}
          <View className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-3 shadow-sm">
            <Text className="text-sm font-semibold text-slate-500 dark:text-slate-300 mb-3">
              Customer Information
            </Text>
            <Text className="text-base text-slate-800 dark:text-slate-50">
              John Doe
            </Text>
            <Text className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              +1 (555) 123-4567
            </Text>
            <Text className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              {shipment.quantity} items
            </Text>
          </View>

          {/* Pickup */}
          <View className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                Pickup Location
              </Text>
              <Text
                className="text-sm text-blue-600 font-medium"
                onPress={() =>
                  router.push({
                    pathname: "/qr-scan",
                    params: { context: "pickup" },
                  })
                }
              >
                Scan QR
              </Text>
            </View>
            <Text className="text-sm text-slate-700 dark:text-slate-100 mb-2">
              {pickupAddress || "Resolving pickup address..."}
            </Text>
            <Text className="text-xs text-slate-500 dark:text-slate-300">
              {shipment.pickupLocation.latitude.toFixed(6)},{" "}
              {shipment.pickupLocation.longitude.toFixed(6)}
            </Text>
          </View>

          {/* Drop */}
          <View className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-3 shadow-sm">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-sm font-semibold text-slate-500 dark:text-slate-300">
                Drop Location
              </Text>
              <Text
                className="text-sm text-blue-600 font-medium"
                onPress={() =>
                  router.push({
                    pathname: "/qr-scan",
                    params: { context: "drop" },
                  })
                }
              >
                Scan QR
              </Text>
            </View>
            <Text className="text-sm text-slate-700 dark:text-slate-100 mb-2">
              {dropAddress || "Resolving drop address..."}
            </Text>
            <Text className="text-xs text-slate-500 dark:text-slate-300">
              {shipment.deliveryLocation.latitude.toFixed(6)},{" "}
              {shipment.deliveryLocation.longitude.toFixed(6)}
            </Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity className="bg-blue-600 rounded-full py-3.5 items-center mb-2">
            <Text
              className="text-white font-semibold text-base"
              onPress={() =>
                router.push({
                  pathname: "/MapScreen",
                  params: {
                    shipmentId: shipment.shipmentId,
                    token,
                  },
                })
              }
            >
              View Route on Map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="bg-slate-200 dark:bg-slate-700 rounded-full py-3.5 items-center mb-3">
            <Text className="text-slate-700 dark:text-slate-50 font-semibold text-base">
              Download Manifest
            </Text>
          </TouchableOpacity>

          {/* Timeline */}
          <View className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
            <Text className="text-sm font-semibold text-slate-500 dark:text-slate-300 mb-3">
              Shipment Timeline
            </Text>

            <View className="mb-3 flex-row items-start">
              <View className="w-2 h-2 rounded-full bg-green-500 mt-1 mr-3" />
              <View>
                <Text className="text-sm text-slate-800 dark:text-slate-50 font-medium">
                  Order Created
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-300">
                  {dateStr} · {timeStr}
                </Text>
              </View>
            </View>

            <View className="mb-3 flex-row items-start">
              <View className="w-2 h-2 rounded-full bg-green-500 mt-1 mr-3" />
              <View>
                <Text className="text-sm text-slate-800 dark:text-slate-50 font-medium">
                  Assigned to Driver
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-300">
                  {dateStr} · {timeStr}
                </Text>
              </View>
            </View>

            <View className="flex-row items-start opacity-80">
              <View className="w-2 h-2 rounded-full bg-slate-400 mt-1 mr-3" />
              <View>
                <Text className="text-sm text-slate-800 dark:text-slate-50 font-medium">
                  Scheduled Pickup
                </Text>
                <Text className="text-xs text-slate-500 dark:text-slate-300">
                  {dateStr} · 2:00 PM
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
