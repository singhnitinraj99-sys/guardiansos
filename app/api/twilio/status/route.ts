import { prisma } from "@/lib/prisma";
import { $Enums } from "@prisma/client";

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

    await prisma.emergencyCallLog.update({
      where: {
        callSid,
      },
      data: {
        status: statusMap[callStatus] ?? "FAILED",
        duration: callDuration ? Number(callDuration) : null,
      },
    });

    return new Response("OK");
  } catch (error) {
    console.error(error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}