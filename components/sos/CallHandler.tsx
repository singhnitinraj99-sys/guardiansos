"use client";

import { useEffect, useState } from "react";
import { getPrimaryContact } from "@/actions/contact.actions";
import CallButton from "./CallButton";

export default function CallHandler() {
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const contact = await getPrimaryContact();
        setPhone(contact?.phone ?? null);
      } catch (e) {
        console.error(e);
      }
    }

    load();
  }, []);

  if (!phone) {
    return (
      <p className="text-center text-sm text-red-500">
        No primary contact found.
      </p>
    );
  }

  return <CallButton phone={phone} />;
}