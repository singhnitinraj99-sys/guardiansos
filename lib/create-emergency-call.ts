import { prisma } from "@/lib/prisma";
import { twilio } from "@/lib/twilio";

interface CreateEmergencyCallParams {
  userId: string;
  phone: string;
  contactId: string;
  contactName: string;
  attempt?: number;
}

export async function createEmergencyCall({
  userId,
  phone,
  contactId,
  contactName,
  attempt = 1,
}: CreateEmergencyCallParams) {
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
    ],
  });

  await prisma.emergencyCallLog.create({
    data: {
      callSid: call.sid,
      phone,
      contactId,
      contactName,
      status: "QUEUED",
      attempt,
      userId,
    },
  });

  return call;
}