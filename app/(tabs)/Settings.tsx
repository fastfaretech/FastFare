// app/Settings.tsx
import React from "react";
import {
  View,
  Text,
  Switch,
  Appearance,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const toggleTheme = () => {
    Appearance.setColorScheme(isDark ? "light" : "dark");
  };

  const handleLogout = async () => {
      await SecureStore.deleteItemAsync("authToken");
      router.replace("/(auth)/user-login");
    };

  return (
    <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900">
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/MyShipments")}
          className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 items-center justify-center mr-3"
        >
          <Text className="text-slate-800 dark:text-slate-50 text-lg">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          Settings
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Account section */}
        <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-4 mb-2">
          Account
        </Text>
        <View className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-4 shadow-sm">
          <TouchableOpacity className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                Profile
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                View and edit your information
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center">
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                Notifications
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Manage notification preferences
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Appearance section */}
        <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 mb-2">
          Appearance
        </Text>
        <View className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                Dark Mode
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Toggle between light and dark theme
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              thumbColor={isDark ? "#1D4ED8" : "#ffffff"}
              trackColor={{ false: "#CBD5F5", true: "#2563EB" }}
            />
          </View>
        </View>

        {/* App section */}
        <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 mb-2">
          App
        </Text>
        <View className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-4 shadow-sm">
          <TouchableOpacity className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                Language
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                English (default)
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center">
            <View>
              <Text className="text-base text-red-600" onPress={handleLogout}>Log Out</Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Sign out of this account
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Help & Support section */}
        <Text className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2 mb-2">
          Help & Support
        </Text>
        <View className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
          <TouchableOpacity className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                Help Center
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                FAQs and app usage tips
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                Contact Support
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Chat or email FastFare support
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row justify-between items-center">
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                Report an Issue
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Report a problem with a trip or the app
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={async () => {
  await SecureStore.deleteItemAsync('authToken');
  Alert.alert('Token cleared');
}}>
  <Text>Clear Token</Text>
</TouchableOpacity> */}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
