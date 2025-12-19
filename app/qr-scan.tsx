import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "http://172.27.25.158:3000";

export default function QRScanScreen() {
  const { context } = useLocalSearchParams<{ context?: string }>();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    console.log("QR scanned:", data, "for context:", context);

    try {
      // Extract shipmentId and token from QR data
      const params = new URLSearchParams(data);
      const shipmentId = params.get("sid");
      const token = await SecureStore.getItemAsync("authToken");

      if (!shipmentId) {
        Alert.alert("Error", "Invalid shipment code");
        return;
      }

      if (!token){
        Alert.alert("Error", "Invalid token");
        return;
      }

      const url = `${API_BASE_URL}/api/v1/logistic/shipment/scan`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          qrToken: data,
        }),
      });

      // Check if response is JSON
      const text = await res.text();
      console.log("Response text:", text);

      if (!res.ok) {
        Alert.alert("Error", `API error: ${text}`);
        return;
      }

      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        Alert.alert("Error", "Invalid JSON response from server.");
        return;
      }

      Alert.alert("Success", `Shipment status updated to: ${result.shipment.status}`);
    } catch (err) {
      console.error("Scan error:", err);
      Alert.alert("Error", "Failed to update shipment status.");
    } finally {
      router.back();
    }
  };

  if (!permission) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Requesting camera permission...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-red-500 mb-4">No access to camera</Text>
        <TouchableOpacity onPress={requestPermission} className="px-4 py-2 rounded-full bg-blue-600">
          <Text className="text-white">Allow Camera</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/10 items-center justify-center mr-3"
        >
          <Text className="text-white text-lg">←</Text>
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">
          {context === "drop" ? "Scan Drop QR" : "Scan Pickup QR"}
        </Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <View className="w-72 h-72 overflow-hidden rounded-3xl border-2 border-white/40">
          <CameraView
            style={{ width: "100%", height: "100%" }}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        </View>
        {scanned && (
          <TouchableOpacity
            onPress={() => setScanned(false)}
            className="mt-6 px-5 py-2.5 rounded-full bg-blue-600"
          >
            <Text className="text-white font-semibold">Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
