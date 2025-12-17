import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

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

interface MyShipmentsScreenProps {
  token: string;
}

const FILTERS: { label: string; value: ShipmentStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Booked", value: "booked" },
  { label: "In-transit", value: "in-transit" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const MyShipmentsScreen: React.FC<MyShipmentsScreenProps> = ({ token }) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<ShipmentStatus | "all">("all");

  useEffect(() => {
    if (!token) {
      console.log("No token passed to MyShipmentsScreen");
      setError("No token. Please log in again.");
      setShipments([]);
      return;
    }
    fetchShipments();
  }, [token]);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        "http://172.27.25.158:3000/api/v1/user/order/list",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("using token:", token);
      console.log("STATUS", res.status);
      const bodyText = await res.text();
      console.log("BODY", bodyText);

      if (!res.ok) {
        setError("Failed to load shipments");
        setShipments([]);
        return;
      }

      const data = JSON.parse(bodyText);
      const apiShipments: Shipment[] = data.shipments || [];
      setShipments(apiShipments);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
      setShipments([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredShipments = useMemo(() => {
    if (filter === "all") return shipments;
    return shipments.filter((s) => s.status === filter);
  }, [shipments, filter]);

  const renderStatusBadge = (status: ShipmentStatus) => {
    let baseColors = "bg-amber-300 text-slate-800";
    if (status === "pending") baseColors = "bg-amber-200 text-slate-800";
    if (status === "in-transit") baseColors = "bg-blue-400 text-white";
    if (status === "delivered") baseColors = "bg-green-500 text-white";
    if (status === "cancelled") baseColors = "bg-red-500 text-white";

    return (
      <View className={`px-2 py-1 rounded-full ${baseColors}`}>
        <Text className="text-[11px] font-semibold">
          {status.toUpperCase()}
        </Text>
      </View>
    );
  };

  const renderShipmentCard = ({ item }: { item: Shipment }) => {
    const date = new Date(item.createdAt);
    const timeStr = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View className="bg-white dark:bg-slate-800 rounded-xl p-3 mb-3 shadow-sm">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-semibold text-slate-900 dark:text-slate-50">
            Order #{item.shipmentId}
          </Text>
          {renderStatusBadge(item.status)}
        </View>

        {/* Pickup */}
        <View className="mt-1">
          <Text className="text-xs font-semibold text-emerald-500 mb-0.5">
            Pickup
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-300">
            Lat {item.pickupLocation.latitude.toFixed(3)}, Lng{" "}
            {item.pickupLocation.longitude.toFixed(3)}
          </Text>
        </View>

        {/* Drop */}
        <View className="mt-2">
          <Text className="text-xs font-semibold text-red-500 mb-0.5">
            Drop
          </Text>
          <Text className="text-xs text-slate-600 dark:text-slate-300">
            Lat {item.deliveryLocation.latitude.toFixed(3)}, Lng{" "}
            {item.deliveryLocation.longitude.toFixed(3)}
          </Text>
        </View>

        {/* Meta */}
        <View className="flex-row justify-between mt-3 mb-2">
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            {timeStr}
          </Text>
          <Text className="text-xs text-slate-500 dark:text-slate-400">
            {item.quantity} items
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          className="bg-blue-600 rounded-full py-2 items-center"
          onPress={() =>
            router.push({
              pathname: "/ShipmentDetails",
              params: { shipmentId: item.shipmentId, token },
            })
          }
        >
          <Text className="text-white font-semibold text-sm">
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    // <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900">
      <View className="flex-1 bg-slate-100 dark:bg-slate-900">
        {/* Header */}
        <View className="pt-12 pb-4 px-4 bg-blue-600 flex-row justify-between items-center">
          <View>
            <Text className="text-white text-lg font-bold">
              FastFare Driver
            </Text>
            <Text className="text-white/90 mt-1 text-xs">
              Driver ID: DRV-1001
            </Text>
          </View>

          <TouchableOpacity
            onPress={fetchShipments}
            className="w-8 h-8 rounded-full border border-white items-center justify-center"
          >
            <Text className="text-white text-base">↻</Text>
          </TouchableOpacity>
        </View>

        {/* Filter chips */}
        <View className="bg-blue-600 px-4 pb-3 pt-2 flex-row">
          {FILTERS.map((f) => {
            const isActive = filter === f.value;
            return (
              <TouchableOpacity
                key={f.value}
                onPress={() => setFilter(f.value)}
                className={`px-3 py-1 rounded-full mr-2 ${
                  isActive ? "bg-white" : "bg-white/20"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    isActive ? "text-blue-600" : "text-white"
                  }`}
                >
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* List */}
        <View className="flex-1 px-3 pt-3">
          <Text className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">
            My Shipments ({filteredShipments.length})
          </Text>

          {loading && <ActivityIndicator className="mt-4" />}

          {error && !loading && (
            <Text className="text-red-500 mt-2 text-sm">{error}</Text>
          )}

          {!loading && !error && (
            <FlatList
              data={filteredShipments}
              keyExtractor={(item) => item._id}
              renderItem={renderShipmentCard}
              contentContainerStyle={{ paddingBottom: 16 }}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <Text className="text-xs text-slate-500 dark:text-slate-400 mt-4">
                  No shipments found for this account.
                </Text>
              }
            />
          )}
        </View>
      </View>
    // </SafeAreaView>
  );
};

export default MyShipmentsScreen;
