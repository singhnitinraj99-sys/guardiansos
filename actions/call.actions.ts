
"use server";

import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { twilio } from "@/lib/twilio";

interface CallResult {
  success: boolean;
  sid?: string;
  status?: string;
  message?: string;
}

export async function startEmergencyCall(
  phone: string,
  contactId: string,
  contactName: string,
  attempt = 1
): Promise<CallResult> {
  try {
    const clerkUser = await currentUser();

    if (!clerkUser) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }
   
    console.log("=== STARTING TWILIO CALL ===");
console.log({
  phone,
  contactId,
  contactName,
  from: process.env.TWILIO_PHONE,
  voiceUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/voice`,
});
   
      const call = await twilio.calls.create({
  to: phone,
  from: process.env.TWILIO_PHONE!,
  url: `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/voice`,

  statusCallback: `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/status`,
  statusCallbackMethod: "POST",
  statusCallbackEvent: [
    "initiated",
    "ringing",
    "answered",
    "completed",
      "busy",
       "failed",
     "no-answer",

  ],
});

console.log("=== TWILIO CALL CREATED ===");
console.log(call.sid);
console.log(call.status);

   await prisma.emergencyCallLog.create({
  data: {
    callSid: call.sid,
    phone,
    contactId,
    contactName,
    status: "QUEUED",
    attempt,
    userId: user.id,
  },
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

