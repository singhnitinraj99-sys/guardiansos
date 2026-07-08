"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does GuardianSOS work?",
    answer:
      "GuardianSOS detects an emergency, starts a short countdown, then automatically shares your location, sends SMS alerts, and calls your emergency contacts.",
  },
  {
    question: "Can I install GuardianSOS as an app?",
    answer:
      "Yes. GuardianSOS is a Progressive Web App (PWA) that can be installed on Android and desktop for a native app experience.",
  },
  {
    question: "How many emergency contacts can I add?",
    answer:
      "You can save multiple emergency contacts. If the first contact doesn't answer, GuardianSOS automatically calls the next one.",
  },
  {
    question: "Will my live location be shared?",
    answer:
      "Only during an SOS activation. Your trusted contacts receive your GPS location through SMS and can open it directly in Google Maps.",
  },
  {
    question: "Does GuardianSOS work without creating an account?",
    answer:
      "No. An account is required so your emergency contacts and SOS history are securely stored.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. GuardianSOS securely stores your data and only shares emergency information with the contacts you choose.",
  },
];

export default function FAQ() {
  return (
   <section className="mt-20 bg-red-50 py-24 lg:mt-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="rounded-full  bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
            FAQ
          </span>

          <h2 className="mt-6 text-4xl font-black">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Everything you need to know before using GuardianSOS.
          </p>
        </motion.div>

        <Accordion
  type="single"
  collapsible
  className="space-y-6"
>
  {faqs.map((faq, index) => (
    <AccordionItem
      key={index}
      value={`item-${index}`}
      className="rounded-2xl border bg-white px-8 shadow-sm"
    >
      <AccordionTrigger className="text-left text-lg font-semibold leading-7">
        {faq.question}
      </AccordionTrigger>

      <AccordionContent className="pb-6 pr-8 text-base leading-7 text-muted-foreground">
        {faq.answer}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
      </div>
    </section>
  );
}