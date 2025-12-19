import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  Appearance,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [contactMessage, setContactMessage] = useState("");

  const toggleTheme = () => {
    Appearance.setColorScheme(isDark ? "light" : "dark");
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    router.replace("/(auth)/user-login");
  };

  const handleHelpCenter = () => {
    setIsModalVisible(true);
  };

  const handleSubmitFeedback = () => {
    Alert.alert("Thank you!", "We will look into your feedback and make improvements.");
    setIsModalVisible(false);
    setFeedback("");
  };

  const handleContactSupport = () => {
    setIsContactModalVisible(true);
  };

  const handleSubmitContact = () => {
    Alert.alert("Thank you!", "We will get back to you soon.");
    setIsContactModalVisible(false);
    setContactMessage("");
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
          <TouchableOpacity
            className="flex-row justify-between items-center mb-3"
            onPress={handleHelpCenter}
          >
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                Help Center
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Report a problem with a trip or the app
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-between items-center mb-3"
            onPress={handleContactSupport}
          >
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                Contact Support
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Chat or email FastFare support
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-between items-center mb-3"
            onPress={()=>router.push("/faqs")}
          >
            <View>
              <Text className="text-base text-slate-900 dark:text-slate-50">
                FAQs
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Find answers to common questions
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Help Center Feedback Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white dark:bg-slate-800 rounded-xl p-6 w-11/12 max-w-md">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Help Center Feedback
            </Text>
            <TextInput
              placeholder="Enter your feedback here..."
              value={feedback}
              onChangeText={setFeedback}
              multiline
              className="border border-slate-300 dark:border-slate-600 rounded-lg p-3 mb-4 text-slate-900 dark:text-slate-50"
            />
            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                className="px-4 py-2 mr-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              >
                <Text className="text-slate-800 dark:text-slate-50">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmitFeedback}
                className="px-4 py-2 bg-blue-500 rounded-lg"
              >
                <Text className="text-white">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Contact Support Modal */}
      <Modal
        visible={isContactModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsContactModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white dark:bg-slate-800 rounded-xl p-6 w-11/12 max-w-md">
            <Text className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
              Contact Support
            </Text>
            <TextInput
              placeholder="Enter your message here..."
              value={contactMessage}
              onChangeText={setContactMessage}
              multiline
              className="border border-slate-300 dark:border-slate-600 rounded-lg p-3 mb-4 text-slate-900 dark:text-slate-50"
            />
            <View className="flex-row justify-end">
              <TouchableOpacity
                onPress={() => setIsContactModalVisible(false)}
                className="px-4 py-2 mr-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              >
                <Text className="text-slate-800 dark:text-slate-50">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmitContact}
                className="px-4 py-2 bg-blue-500 rounded-lg"
              >
                <Text className="text-white">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
