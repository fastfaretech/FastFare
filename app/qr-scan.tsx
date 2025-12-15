import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";

export default function QRScanScreen() {
  const { context } = useLocalSearchParams<{ context?: string }>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    console.log("QR scanned:", data, "for context:", context);
    router.back();
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Text className="text-slate-800 dark:text-slate-50">
          Requesting camera permission...
        </Text>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Text className="text-red-500 mb-4">
          No access to camera. Please enable it in settings.
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-4 py-2 rounded-full bg-blue-600"
        >
          <Text className="text-white font-semibold">Go Back</Text>
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
          <Camera
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ width: "100%", height: "100%" }}
            barCodeScannerSettings={{
              barCodeTypes: ["qr"],
            }}
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
