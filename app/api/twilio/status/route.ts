import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { callNextContact } from "@/actions/call-next-contact.actions";

const statusMap: Record<string, $Enums.CallStatus> = {
  queued: "QUEUED",
  initiated: "INITIATED",
  ringing: "RINGING",
  "in-progress": "IN_PROGRESS",
  completed: "COMPLETED",
  busy: "BUSY",
  "no-answer": "NO_ANSWER",
  failed: "FAILED",
  canceled: "CANCELED",
};

const RETRY_STATUSES = new Set([
  "busy",
  "failed",
  "no-answer",
  "canceled",
]);

export async function POST(req: Request) {
  try {

  
    const formData = await req.formData();

    const callSid = formData.get("CallSid")?.toString();
    const callStatus = formData.get("CallStatus")?.toString();
    const callDuration = formData.get("CallDuration")?.toString();

    if (!callSid || !callStatus) {
      return new Response("Missing data", {
        status: 400,
      });
    }

    // -----------------------------
    // Update current call status
    // -----------------------------
    const call = await prisma.emergencyCallLog.update({
      where: {
        callSid,
      },
      data: {
        status: statusMap[callStatus] ?? "FAILED",
        duration: callDuration ? Number(callDuration) : null,
      },
    });

    console.log("========== TWILIO CALLBACK ==========");
    console.log("SID:", callSid);
    console.log("STATUS:", callStatus);
    console.log("CONTACT:", call.contactName);
    console.log("ATTEMPT:", call.attempt);

    // -----------------------------
    // Retry next contact only once
    // -----------------------------
    if (RETRY_STATUSES.has(callStatus)) {
      const retryCall = await prisma.$transaction(async (tx) => {
        const latest = await tx.emergencyCallLog.findUnique({
          where: {
            callSid,
          },
        });

        if (!latest) {
          return null;
        }

        // Retry already started
        if (latest.retryStarted) {
          return null;
        }

        await tx.emergencyCallLog.update({
          where: {
            callSid,
          },
          data: {
            retryStarted: true,
          },
        });

        return latest;
      });

      if (retryCall) {
        console.log("Retrying next emergency contact...");
        await callNextContact(callSid);
      } else {
        console.log("Retry already processed.");
      }
    }

    console.log("====================================");

    return new Response("OK");
  } catch (error) {
    console.error("TWILIO CALLBACK ERROR:", error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}