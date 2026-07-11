"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";

import { navigation } from "@/lib/navigation";
import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isAdmin: boolean;
}

export default function Sidebar({
  isAdmin,
}: SidebarProps) {
  const pathname = usePathname();

  const items = [
    ...navigation,
    ...(isAdmin
      ? [
          {
            title: "Admin",
            href: "/admin",
            icon: Shield,
          },
        ]
      : []),
  ];

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background">
      <div className="border-b p-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-muted",
                pathname === item.href &&
                  "bg-red-600 text-white hover:bg-red-600"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}