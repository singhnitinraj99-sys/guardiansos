import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  History,
  Settings,
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
    href: "/admin/sos",
    icon: ShieldAlert,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: History,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];