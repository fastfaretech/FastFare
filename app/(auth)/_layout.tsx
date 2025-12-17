// app/(auth)/_layout.tsx
import { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function AuthLayout() {
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("authToken");
      if (token) {
        router.replace("/(tabs)/MyShipments");
      } else {
        setShowLogin(true);
      }
    };
    checkAuth();
  }, []);

  if (!showLogin) {
    return null; // Don't render anything until check is done
  }

  return (
    <Stack>
      <Stack.Screen name="user-login" options={{ headerShown: false }} />
    </Stack>
  );
}
