import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const API_BASE_URL = "http://172.27.25.158:3000";

interface UserProfile {
  name: string;
  email: string;
  role: "admin" | "logistic" | "user";
  contactNumber?: string;
  age?: number;
  companyDetails?: {
    companyName: string;
    gstin: string;
    address: string;
  };
}

// Dummy data for fallback
const DUMMY_PROFILE: UserProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "user",
  contactNumber: "123-456-7890",
  age: 30,
  companyDetails: {
    companyName: "FastFare Logistics",
    gstin: "GST1234567890",
    address: "123 Logistics Lane, City, State",
  },
};

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await SecureStore.getItemAsync("authToken");
      if (!token) {
        setError("Not authenticated. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/v1/user/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await res.text();
      console.log("PROFILE STATUS", res.status, "BODY", text);

      if (!res.ok || text.trim() === "") {
        // Use dummy data if no profile is found
        setProfile(DUMMY_PROFILE);
        setLoading(false);
        return;
      }

      const data = JSON.parse(text) as { user: UserProfile };
      setProfile(data.user);
    } catch (e: any) {
      // Fallback to dummy data on error
      setProfile(DUMMY_PROFILE);
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const pickAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access photos was denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      setAvatarUri(uri);
      // TODO: optionally upload avatar to backend here
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    router.replace("/(auth)/user-login");
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-100 dark:bg-slate-900">
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  // Use profile or dummy data
  const currentProfile = profile || DUMMY_PROFILE;
  const driverId = `DRV-${String(currentProfile.email.split("@")[0]).toUpperCase()}`;

  return (
    <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900">
      {/* Header gradient-style block */}
      <View className="px-4 pt-10 pb-6 bg-blue-600 rounded-b-3xl">
        <View className="flex-row items-center">
          {/* Avatar circle */}
          <TouchableOpacity
            onPress={pickAvatar}
            className="w-20 h-20 rounded-full bg-white/15 items-center justify-center mr-4 overflow-hidden"
          >
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
            ) : (
              <Text className="text-3xl text-white">
                {currentProfile.name.charAt(0).toUpperCase()}
              </Text>
            )}
          </TouchableOpacity>

          <View className="flex-1">
            <Text className="text-white text-2xl font-semibold" numberOfLines={1}>
              {currentProfile.name}
            </Text>
            <Text className="text-white/90 text-lg mt-1" numberOfLines={1}>
              {currentProfile.email}
            </Text>
            <Text className="text-white/90 text-lg mt-2">
              Driver ID: {driverId}
            </Text>
          </View>
        </View>
      </View>

      {/* Content cards */}
      <View className="flex-1 px-4 pt-4">
        {/* Basic info card */}
        <View className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-3 shadow-sm">
          <Text className="text-lg font-semibold text-slate-500 dark:text-slate-300 mb-2">
            Basic Info
          </Text>
          <Text className="text-lg text-slate-600 dark:text-slate-300">
            Role: <Text className="font-semibold">{currentProfile.role}</Text>
          </Text>
          <Text className="text-lg text-slate-600 dark:text-slate-300 mt-1">
            Phone: <Text className="font-semibold">{currentProfile.contactNumber || DUMMY_PROFILE.contactNumber}</Text>
          </Text>
          <Text className="text-lg text-slate-600 dark:text-slate-300 mt-1">
            Age: <Text className="font-semibold">{currentProfile.age || DUMMY_PROFILE.age}</Text>
          </Text>
        </View>

        {/* Company / fleet info card */}
        <View className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-3 shadow-sm">
        <Text className="text-lg font-semibold text-slate-500 dark:text-slate-300 mb-2">
          Company
        </Text>
        <Text className="text-xl text-slate-900 dark:text-slate-50">
          {currentProfile.companyDetails?.companyName || DUMMY_PROFILE.companyDetails.companyName}
        </Text>
        <Text className="text-lg text-slate-600 dark:text-slate-300 mt-1">
          GSTIN: {currentProfile.companyDetails?.gstin || DUMMY_PROFILE.companyDetails.gstin}
        </Text>
        <Text className="text-lg text-slate-600 dark:text-slate-300 mt-1">
          {currentProfile.companyDetails?.address || DUMMY_PROFILE.companyDetails.address}
        </Text>
      </View>

        {/* Actions card (logout only) */}
        <View className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <TouchableOpacity onPress={handleLogout}>
            <Text className="text-lg text-red-600 font-semibold">
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
