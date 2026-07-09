"use client";

import Link from "next/link";
import { Shield, Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-12 text-center text-base text-white sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl bg-zinc-950 px-4 py-10 sm:px-6 sm:py-12 md:py-16">

        <div className="grid gap-10 text-left sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-red-600 p-2">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <span className="text-xl font-bold sm:text-2xl">
                GuardianSOS
              </span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-400 sm:mt-5 sm:leading-7">
              GuardianSOS helps you protect yourself by
              automatically sharing your location,
              sending emergency SMS alerts and calling
              trusted contacts when every second matters.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-base font-semibold sm:mb-5 sm:text-lg">
              Product
            </h3>

            <ul className="space-y-2.5 text-sm text-zinc-400 sm:space-y-3">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/history" className="transition-colors hover:text-white">
                  History
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="transition-colors hover:text-white">
                  Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-base font-semibold sm:mb-5 sm:text-lg">
              Resources
            </h3>

            <ul className="space-y-2.5 text-sm text-zinc-400 sm:space-y-3">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Support</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-base font-semibold sm:mb-5 sm:text-lg">
              Contact
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-zinc-400 break-all sm:text-base sm:break-normal">
                <Mail className="h-5 w-5 shrink-0 text-red-500" />
                support@guardiansos.app
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-zinc-800 pt-6 sm:mt-16 sm:pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-xs text-zinc-500 sm:text-sm">
              © {new Date().getFullYear()} GuardianSOS.
              All rights reserved.
            </p>

            <p className="flex items-center gap-2 text-xs text-zinc-500 sm:text-sm">
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