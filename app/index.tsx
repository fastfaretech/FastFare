import { router } from "expo-router";

export default function Index() {
  router.replace("/(auth)/user-login");
  return null;
}
