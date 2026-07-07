import { twilio } from "@/lib/twilio";

export async function makeVoiceCall(
  phone: string
) {
  return twilio.calls.create({
    to: phone,
    from: process.env.TWILIO_PHONE!,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/voice`,

    statusCallback:
      `${process.env.NEXT_PUBLIC_APP_URL}/api/twilio/status`,

    statusCallbackMethod: "POST",

    statusCallbackEvent: [
      "initiated",
      "ringing",
      "answered",
      "completed",
    ],
  });
}