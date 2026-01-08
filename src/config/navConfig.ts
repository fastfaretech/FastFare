import {
  Home,
  LayoutDashboard,
  Users,
  Truck,
  UserPlus,
  PackagePlus,
  ClipboardList,
  User,
  LogIn,
  Shield,
} from "lucide-react";

export type UserRole = "admin" | "partner" | "user" | "guest";

export const navConfig: Record<UserRole, any[]> = {
  /* ================= ADMIN ================= */
  admin: [
    {
      label: "Admin Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      label: "Create Admin",
      icon: UserPlus,
      href: "/admin/create-admin",
    },
    {
      label: "Partners",
      icon: Users,
      href: "/admin/partners",
    },
    {
      label: "Users",
      icon: User,
      href: "/admin/users",
    },
    {
      label: "Shipments",
      icon: Truck,
      href: "/admin/shipments",
    },
  ],

  /* ================= PARTNER ================= */
  partner: [
    {
      label: "Partner Dashboard",
      icon: LayoutDashboard,
      href: "/partner",
    },
    {
      label: "New Pickup",
      icon: PackagePlus,
      href: "/partner/new-pickup",
    },
  ],

  /* ================= USER ================= */
  user: [
    {
      label: "User Dashboard",
      icon: LayoutDashboard,
      href: "/user",
    },
    {
      label: "New Shipment",
      icon: ClipboardList,
      href: "/user/new-shipment",
    },
    {
      label: "User Details",
      icon: User,
      href: "/user/userdetails",
    },
  ],

  /* ================= GUEST ================= */
  guest: [
    {
      label: "Home",
      icon: Home,
      href: "/",
    },
    {
      label: "Login",
      icon: LogIn,
      href: "/login",
    },
    {
      label: "Register",
      icon: Shield,
      href: "/register",
    },
  ],
};
