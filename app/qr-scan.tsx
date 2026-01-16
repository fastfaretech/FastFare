import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";  // ✅ CHANGED: SecureStore
import { API_BASE_URL } from '../constants/api';

const QRScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const { shipmentId } = useLocalSearchParams<{ shipmentId: string }>();

  const [permission, requestPermission] = useCameraPermissions();

  // ✅ Updated debug for SecureStore
  const debugStorage = async () => {
    try {
      // Check SecureStore (your actual token location)
      const authToken = await SecureStore.getItemAsync('authToken');
      console.log("🔐 SecureStore authToken:", authToken ? "✅ FOUND" : "❌ NULL");
      
      if (authToken) {
        console.log("✅ Token preview:", authToken.substring(0, 20) + "...");
      }
    } catch (e) {
      console.log("SecureStore debug error:", e);
    }
  };

  useEffect(() => {
    debugStorage();
    requestPermission();
  }, []);

  const validateQRAndUpdateStatus = async (qrData: string) => {
    setLoading(true);
    try {
      const token = await SecureStore.getItemAsync('authToken');
      
      if (!token) {
        Alert.alert("❌ Login Required", "Please login again.");
        router.push('/(auth)/user-login');
        return;
      }
  
      console.log("✅ Using token:", token.substring(0, 20) + "...");
  
      const params = new URLSearchParams(qrData);
      const qrShipmentId = params.get("sid");
      const qrToken = params.get("token");
  
      if (!qrShipmentId || !qrToken) {
        Alert.alert("Invalid QR", "QR code format incorrect.");
        return;
      }
  
      // ✅ FIXED ENDPOINT - Matches your backend routes
      const response = await fetch(`${API_BASE_URL}/logistic/shipment/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ qrToken: qrData }),
      });
  
      // ✅ DEBUG: Log raw response first
      const responseText = await response.text();
      console.log("📡 Backend response:", response.status, responseText.substring(0, 200));
  
      if (!response.ok) {
        Alert.alert("❌ Backend Error", `Status: ${response.status}\n${responseText.substring(0, 100)}`);
        return;
      }
  
      const result = JSON.parse(responseText);
      const newStatus = result.shipment.status;
      
      Alert.alert("✅ Success!", `Shipment ${qrShipmentId} → "${newStatus}"!`, [
        {
          text: "OK",
          onPress: () => {
            setScanned(false);
            setScannedData(null);
            router.back();
          }
        }
      ]);
    } catch (error: any) {
      console.error("Scan error:", error);
      Alert.alert("Network Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleBarCodeScanned = ({ data }: BarcodeScanningResult) => {
    if (scanned) return;
    
    setScanned(true);
    setScannedData(data);
    
    // Show confirmation before backend call
    Alert.alert(
      "QR Scanned", 
      `Data: ${data}\n\nValidate with backend?`, 
      [
        { text: "Cancel", style: "cancel", onPress: () => setScanned(false) },
        { 
          text: "✅ Validate", 
          onPress: () => validateQRAndUpdateStatus(data)
        }
      ]
    );
  };

  if (!permission) return <View><Text>Requesting camera permission...</Text></View>;
  if (!permission.granted) return (
    <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <Text className="text-white text-xl mb-4">Camera permission needed for QR scanning</Text>
      <TouchableOpacity onPress={requestPermission} className="px-6 py-3 bg-blue-600 rounded-lg">
        <Text className="text-white font-semibold">Grant Permission</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 justify-center items-center p-4">
        <CameraView
          style={{ flex: 1, width: '100%' }}
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        />
        
        {/* Loading overlay */}
        {loading && (
          <View className="absolute inset-0 bg-black/50 justify-center items-center">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-white text-lg mt-4">Updating shipment status...</Text>
          </View>
        )}
        
        {/* Scan confirmation overlay */}
        {scanned && scannedData && !loading && (
          <View className="absolute bottom-20 bg-white/95 p-6 rounded-2xl shadow-2xl min-w-[80%]">
            <Text className="text-xl font-bold text-center mb-4 text-gray-800">Scanned Successfully!</Text>
            <Text className="text-sm text-gray-600 mb-6 text-center font-mono bg-gray-100 p-2 rounded-lg">
              {scannedData}
            </Text>
            <TouchableOpacity
              onPress={() => setScanned(false)}
              className="px-6 py-3 bg-gray-500 rounded-xl"
            >
              <Text className="text-white font-semibold text-center">Scan Again</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Scan instruction overlay */}
        {!scanned && !loading && (
          <View className="absolute top-20 bg-white/90 p-6 rounded-2xl shadow-xl">
            <Text className="text-xl font-bold text-center mb-2 text-gray-800">
              📦 Point at Shipment QR Code
            </Text>
            <Text className="text-sm text-gray-600 text-center">
              Expected format: sid=FFR-xxx&token=PCK-xxx
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QRScanScreen;
