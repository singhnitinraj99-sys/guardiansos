"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/shared/Logo";
import { adminNavigation } from "@/lib/admin-navigation";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background">
      <div className="border-b p-6">
        <Logo />

        <p className="mt-2 text-xs text-muted-foreground">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-4">
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

              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}