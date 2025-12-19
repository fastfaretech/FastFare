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
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from "expo-file-system/legacy";

const { StorageAccessFramework } = FileSystem;


type ShipmentStatus = "confirmed" | "rejected" | "pending" | "in-transit" | "delivered" | "cancelled";

interface Shipment {
  _id: string;
  shipmentId: string;
  pickupDetails: {
    latitude: number;
    longitude: number;
  };
  deliveryDetails: {
    latitude: number;
    longitude: number;
  };
  quantity: number;
  status: ShipmentStatus;
  createdAt: string;
  DriverId?: string;
}

interface DriverDetails {
  name: string;
  contactNumber: number;
  licenseNumber: string;
  vehicleNumber: string;
  status: string;
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
  const [driverDetails, setDriverDetails] = useState<DriverDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");

  useEffect(() => {
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

      const res = await fetch(`${API_BASE_URL}/api/v1/user/order/get/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      const text = await res.text();
      if (!res.ok) {
        setError("Shipment not found");
        return;
      }

      const data = JSON.parse(text);
      const s: Shipment = data.shipment;
      setShipment(s);

      if (s.DriverId) {
        const driverRes = await fetch(
          `${API_BASE_URL}/api/v1/driver/details/${s.DriverId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (driverRes.ok) {
          const driverData = await driverRes.json();
          setDriverDetails(driverData.details);
        }
      }

      coordsToAddressString(s.pickupDetails.latitude, s.pickupDetails.longitude).then(setPickupAddress);
      coordsToAddressString(s.deliveryDetails.latitude, s.deliveryDetails.longitude).then(setDropAddress);
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
    } else if (status === "cancelled" || status === "rejected") {
      bg = "bg-red-500";
      text = "text-white";
    } else if (status === "confirmed") {
      bg = "bg-green-200";
      text = "text-slate-800";
    }

    return (
      <View className={`px-3 py-1 rounded-full ${bg}`}>
        <Text className={`text-xs font-semibold ${text}`}>
          {status.toUpperCase()}
        </Text>
      </View>
    );
  };

  const dateStr = shipment ? new Date(shipment.createdAt).toLocaleDateString() : "";
  const timeStr = shipment
    ? new Date(shipment.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    : "";

    const downloadManifest = async () => {
      if (!shipment) return;
  
      const html = `
        <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <style>
            body { font-family: Arial; padding: 20px; color: #000; }
            .heading { text-align:center; font-size: 22px; font-weight: bold; }
            .subheading { text-align:center; margin-top: 4px; font-size: 12px; }
            .row { display: flex; justify-content: space-between; width: 100%; }
            .box { border: 1px solid #000; padding: 10px; width: 48%; }
            .manifest-box { border: 1px solid #000; padding: 10px; margin-top: 12px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
            th, td { border: 1px solid #000; padding: 6px; text-align: left; }
            .footer-box { border: 1px solid #000; padding: 10px; margin-top: 14px; font-size: 13px; }
            .small { font-size: 12px; }
            .center { text-align: center; }
          </style>
        </head>
        <body>
          <div class="heading">Shipment Manifest</div>
          <div class="subheading">Generated on: ${dateStr} ${timeStr}</div>
          <div class="row">
            <div class="box">
              <strong>Seller:</strong> TRUSTin.ONLINE<br/>
              <strong>Contact:</strong> 7073998855
            </div>
            <div class="box">
              <strong>Courier:</strong> Shadowfax Surface
            </div>
          </div>
          <div class="manifest-box">
            <strong>Manifest ID:</strong> ${shipment.shipmentId}<br/>
            <strong>Total shipments to dispatch:</strong> 1
          </div>
          <table>
            <tr>
              <th>S.No</th>
              <th>Order No</th>
              <th>Contents</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>1</td>
              <td>${shipment.shipmentId}</td>
              <td>${shipment.quantity} items</td>
              <td>${shipment.status}</td>
            </tr>
          </table>
          <div class="footer-box">
            <strong>To Be Filled By Courier Executive</strong><br/><br/>
            Pick up time: ____________
            Total items picked: ____________<br/><br/>
            FE Name: ____________ <br/>
            FE Phone: ____________ <br/><br/>
            Seller Signature: ____________________ <br/>
            Courier Signature: ____________________
          </div>
          <p class="small">Pickup Address:<br/>${pickupAddress || "Not available"}</p>
          <p class="center small">This is a system generated document</p>
        </body>
        </html>
      `;
  
      try {
        const { uri } = await Print.printToFileAsync({
          html,
          margins: { top: 10, bottom: 10, left: 10, right: 10 },
        });
  
        const fileName = `Manifest_${shipment.shipmentId}.pdf`;
  
        // Ask user to choose Downloads or any folder
        const permissions =
          await StorageAccessFramework.requestDirectoryPermissionsAsync();
  
        if (!permissions.granted) {
          alert("You must select a folder to save the PDF");
          return;
        }
  
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        const fileUri = await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "application/pdf"
        );
  
        await FileSystem.writeAsStringAsync(fileUri, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        console.log("Saved to:", fileUri);
        alert("PDF saved successfully 🎉");
  
      } catch (err) {
        console.error("Error generating PDF:", err);
      }
    };


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
            {shipment.pickupDetails.latitude.toFixed(6)},{" "}
            {shipment.pickupDetails.longitude.toFixed(6)}
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
            {shipment.deliveryDetails.latitude.toFixed(6)},{" "}
            {shipment.deliveryDetails.longitude.toFixed(6)}
          </Text>
        </View>

        {/* Driver details */}
        {shipment.DriverId && driverDetails && (
          <View className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-3 shadow-sm">
            <Text className="text-sm font-semibold text-slate-500 dark:text-slate-300 mb-2">
              Driver Details
            </Text>
            <Text className="text-base text-slate-800 dark:text-slate-50">
              Name: <Text className="font-semibold">{driverDetails.name}</Text>
            </Text>
            <Text className="text-base text-slate-800 dark:text-slate-50 mt-1">
              Contact Number: <Text className="font-semibold">{driverDetails.contactNumber}</Text>
            </Text>
            <Text className="text-base text-slate-800 dark:text-slate-50 mt-1">
              License Number: <Text className="font-semibold">{driverDetails.licenseNumber}</Text>
            </Text>
            <Text className="text-base text-slate-800 dark:text-slate-50 mt-1">
              Vehicle Number: <Text className="font-semibold">{driverDetails.vehicleNumber}</Text>
            </Text>
            <Text className="text-base text-slate-800 dark:text-slate-50 mt-1">
              Status: <Text className="font-semibold">{driverDetails.status}</Text>
            </Text>
          </View>
        )}

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

        <TouchableOpacity
          className="bg-slate-200 dark:bg-slate-700 rounded-full py-3.5 items-center mb-3"
          onPress={downloadManifest}
        >
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
