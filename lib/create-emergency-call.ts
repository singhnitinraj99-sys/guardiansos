import { prisma } from "@/lib/prisma";
import { twilio } from "@/lib/twilio";
import { log } from "console";

interface CreateEmergencyCallParams {
  userId: string;
  phone: string;
  contactId: string;
  contactName: string;
  attempt: number;
  sosLogId: string;
}

export async function createEmergencyCall({
  userId,
  phone,
  contactId,
  contactName,
  attempt,
  sosLogId,
}: CreateEmergencyCallParams) {

  console.log("========== CREATE CALL ==========");
console.log("Contact:", contactName);
console.log("Phone:", phone);
console.log("Attempt:", attempt);
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
console.log("Next contact queued successfully.");
console.log("Saving EmergencyCallLog...");

  const log =  await prisma.emergencyCallLog.create({
  data: {
    callSid: call.sid,
    phone,
    contactId,
    contactName,
    status: "QUEUED",
    attempt,
    userId,
    sosLogId,
  },
});

console.log("Saved Log:", log.id);
console.log("==============================");
  return call;
}

