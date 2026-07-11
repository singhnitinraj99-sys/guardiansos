"use client";

import Link from "next/link";
import { Menu, Shield } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/navigation";
import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  isAdmin: boolean;
}

export default function MobileSidebar({
  isAdmin,
}: MobileSidebarProps) {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 p-0"
      >
        <div className="border-b p-6">
          <Logo />
        </div>

        <nav className="space-y-2 p-4">
          {items.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/admin"
                ? pathname === "/admin" ||
                  pathname.startsWith("/admin/")
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-muted",
                  active &&
                    "bg-red-600 text-white hover:bg-red-600"
                )}
              >
                <Icon className="h-5 w-5" />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}