"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
   <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/20 bg-white/80 backdrop-blur-xl">
     <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl"
        >
          <Shield className="h-7 w-7 text-red-600" />
          GuardianSOS
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="hover:text-red-600 transition">
            Features
          </a>

          <a href="#how" className="hover:text-red-600 transition">
            How it Works
          </a>

          <a href="#stats" className="hover:text-red-600 transition">
            Stats
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/sign-in">
              Sign In
            </Link>
          </Button>

          <Button asChild>
            <Link href="/sign-up">
              Get Started
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="space-y-4 border-t bg-white p-6 md:hidden">
          <a href="#features">Features</a>

          <a href="#how">How it Works</a>

          <a href="#stats">Stats</a>

          <Button className="w-full" asChild>
            <Link href="/sign-up">
              Get Started
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}