"use client";

import Link from "next/link";
import {
  Shield,
  
  Mail,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-20 text-center text-4xl text-black">
      <div className="mx-auto max-w-7xl bg-zinc-950 px-6 py-16">

        <div className="grid gap-12 bg-md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-600 p-2">
                <Shield className="h-6 w-6" />
              </div>

              <span className="text-2xl font-bold">
                GuardianSOS
              </span>
            </div>

            <p className="mt-5 text-sm leading-7 text-zinc-400">
              GuardianSOS helps you protect yourself by
              automatically sharing your location,
              sending emergency SMS alerts and calling
              trusted contacts when every second matters.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Product
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>
                <Link href="/">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link href="/history">
                  History
                </Link>
              </li>

              <li>
                <Link href="/contacts">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Resources
            </h3>

            <ul className="space-y-3 text-zinc-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Support</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3 text-zinc-400">
                <Mail className="h-5 w-5 text-red-500" />
                support@guardiansos.app
              </div>

              {/* <div className="flex items-center gap-3 text-zinc-400">
                <Github className="h-5 w-5 text-red-500" />
                GitHub
              </div> */}

            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-zinc-800 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} GuardianSOS.
              All rights reserved.
            </p>

            <p className="flex items-center gap-2 text-sm text-zinc-500">
              Made with
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              using Next.js, Clerk, Prisma & Neon.
            </p>

          </div>

        </div>

      </div>
    </footer>
  );
}