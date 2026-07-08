"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  PhoneCall,
  MessageSquareText,
  Smartphone,
  Shield,
  Siren,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Live GPS Location",
    description:
      "Your exact location is shared instantly with your trusted emergency contacts.",
  },
  {
    icon: PhoneCall,
    title: "Automatic Calling",
    description:
      "GuardianSOS automatically calls your emergency contacts one after another.",
  },
  {
    icon: MessageSquareText,
    title: "Emergency SMS",
    description:
      "Emergency messages include a Google Maps location link for quick assistance.",
  },
  {
    icon: Smartphone,
    title: "Install as an App",
    description:
      "Works like a native Android app with fast installation using PWA.",
  },
  {
    icon: Siren,
    title: "Loud Emergency Alarm",
    description:
      "A loud alarm and vibration help attract attention nearby during emergencies.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description:
      "Only your trusted contacts receive emergency alerts. Your data stays protected.",
  },
];

export default function WhyGuardian() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            Why GuardianSOS?
          </span>

          <h2 className="mt-6 text-4xl font-black lg:text-5xl">
            Everything You Need
            <span className="block text-red-600">
              During an Emergency
            </span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            GuardianSOS combines smart emergency detection,
            location sharing, voice calls, SMS alerts and
            PWA technology into one powerful safety platform.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                className="group rounded-3xl border bg-white p-8 shadow-sm transition-all hover:-translate-y-2 hover:border-red-200 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 transition group-hover:bg-red-100">
                  <Icon className="h-8 w-8 text-red-600" />
                </div>

                <h3 className="text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}