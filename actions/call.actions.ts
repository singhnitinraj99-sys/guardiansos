"use server";

import { twilio } from "@/lib/twilio";
import { getPrimaryEmergencyContact } from "@/lib/emergency-contact";

export async function startEmergencyCall() {
  try {
    const { contact } = await getPrimaryEmergencyContact();

    const call = await twilio.calls.create({
      to: contact.phone,
      from: process.env.TWILIO_PHONE!,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/voice`,
    });

    return {
      success: true,
      sid: call.sid,
      status: call.status,
    };
  } catch (error) {
    console.error("Voice Call Error:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Voice call failed",
    };
  }
}