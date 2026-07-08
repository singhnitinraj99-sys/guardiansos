"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  PhoneCall,
  MapPin,
  BellRing,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
   <section className="relative min-h-screen overflow-hidden pt-24 lg:pt-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-red-50 via-white to-red-100" />

     <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-16 px-6 py-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
         <div className="mb-6 inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
  <Shield className="mr-2 h-4 w-4" />
  Install as an App • Android • Desktop
</div>
          <h1 className="text-5xl font-black leading-tight lg:text-7xl">
            Your Safety.
            <br />
            <span className="text-red-600">
              One Shake Away.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          GuardianSOS is a free installable emergency safety app.
Install it on your phone to instantly send your location,
emergency SMS, and automatic voice calls when every second matters.
          </p>

        <div className="mt-10 flex flex-wrap gap-4">
  <Button size="lg">
    📲 Download App
  </Button>

  <Button size="lg" asChild>
    <Link href="/sign-up">
      Get Started
    </Link>
  </Button>

  <Button variant="outline" size="lg" asChild>
    <Link href="/sign-in">
      Sign In
    </Link>
  </Button>
</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-[340px] rounded-[40px] border-8 border-black bg-white p-6 shadow-2xl">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-red-100 p-5">
                <Shield className="h-12 w-12 text-red-600" />
              </div>
            </div>

            <h3 className="text-center text-2xl font-bold">
              SOS Activated
            </h3>
<div className="mt-3 flex justify-center">
  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
    Installable PWA
  </span>
</div>
            <p className="mt-2 text-center text-gray-500">
              Alerting trusted contacts...
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-4">
                <MapPin className="text-red-600" />
                Live Location Shared
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-4">
                <BellRing className="text-red-600" />
                Emergency SMS Sent
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-gray-100 p-4">
                <PhoneCall className="text-red-600" />
                Calling Contacts...
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}