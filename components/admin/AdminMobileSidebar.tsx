"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";

import { adminNavigation } from "@/lib/admin-navigation";
import { cn } from "@/lib/utils";

export default function AdminMobileSidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 p-0"
      >
        <div className="border-b p-6">
          <Logo />

          <p className="mt-2 text-xs text-muted-foreground">
            Admin Panel
          </p>
        </div>

        <nav className="space-y-2 p-4">
          {adminNavigation.map((item) => {
            const Icon = item.icon;

            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

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

                {item.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}