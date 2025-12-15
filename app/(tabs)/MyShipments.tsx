// app/(tabs)/MyShipments.tsx
import { useLocalSearchParams } from "expo-router";
import MyShipmentsScreen from "../MyShipmentsScreen"; // adjust path

export default function MyShipmentsRoute() {
  const { token } = useLocalSearchParams<{ token?: string }>();

  console.log("MyShipmentsRoute token param:", token);

  return <MyShipmentsScreen token={token ?? ""} />;
}
