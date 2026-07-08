"use client";

import {
  Smartphone,
  TimerReset,
  ShieldAlert,
} from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "Shake Your Phone",
    description:
      "GuardianSOS detects two strong shakes while the app is open.",
  },
  {
    icon: TimerReset,
    title: "5 Second Countdown",
    description:
      "A countdown lets you cancel accidental activation before SOS starts.",
  },
  {
    icon: ShieldAlert,
    title: "Emergency Activated",
    description:
      "Your location, SMS alerts, and emergency calls are sent automatically.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 bg-white"
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="text-center mt-4 mb-14">
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 text-4xl font-bold">
            Stay Safe in{" "}
            <span className="text-red-600">
              3 Simple Steps
            </span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            GuardianSOS helps you reach your trusted contacts
            instantly during an emergency.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
                  <Icon className="h-8 w-8 text-red-600" />
                </div>

                <h3 className="mb-3 text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}