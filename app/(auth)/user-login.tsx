// app/(auth)/user-login.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "http://172.27.25.158:3000"; // your backend

const UserLoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login failed", data?.message || "Invalid credentials");
        return;
      }

      const token: string | undefined = data.token;
      if (!token) {
        Alert.alert("Login failed", "Token missing from response");
        return;
      }

      console.log("Login token saved:", token);
      await SecureStore.setItemAsync("authToken", token);

      // Navigate to shipments tab and pass token as a param
      router.replace({
        pathname: "/(tabs)/MyShipments",
        params: { token },
      });

      Alert.alert("Success", "Logged in successfully");
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-blue-600"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 px-6 pt-16 pb-10 justify-between">
        {/* Top content */}
        <View>
          {/* Icon circle */}
          <View className="w-20 h-20 rounded-full bg-white/15 items-center justify-center self-center mb-8">
            <Text className="text-white text-3xl">🚚</Text>
          </View>

          <Text className="text-white text-2xl font-bold text-center">
            FastFare Driver
          </Text>
          <Text className="text-white/90 text-sm text-center mt-1">
            Welcome back! Please sign in.
          </Text>

          {/* Card */}
          <View className="bg-white rounded-2xl mt-8 px-5 py-6 shadow-md">
            <View className="mb-4">
              <Text className="text-xs font-semibold text-slate-500 mb-1">
                Email
              </Text>
              <View className="border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 flex-row items-center">
                <TextInput
                  className="flex-1 text-sm text-slate-800"
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View className="mb-5">
              <Text className="text-xs font-semibold text-slate-500 mb-1">
                Password
              </Text>
              <View className="border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 flex-row items-center">
                <TextInput
                  className="flex-1 text-sm text-slate-800"
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
            </View>

            <TouchableOpacity
              className={`rounded-full py-3 items-center ${
                loading ? "bg-blue-400" : "bg-blue-600"
              }`}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text className="text-white font-semibold text-sm">
                {loading ? "Signing In..." : "Sign In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-3 items-center">
              <Text className="text-xs text-blue-600">Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <Text className="text-white/80 text-xs text-center">
          © 2024 FastFare. All rights reserved.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UserLoginScreen;