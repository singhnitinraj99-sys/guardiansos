import {
  LayoutDashboard,
  Users,
  ShieldAlert,
} from "lucide-react";

export const adminNavigation = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "SOS Logs",
    href: "/admin/sos-logs",
    icon: ShieldAlert,
  },
];