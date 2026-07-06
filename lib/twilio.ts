import Twilio from "twilio";

console.log("SID:", process.env.TWILIO_SID);

export const twilio = Twilio(
  process.env.TWILIO_SID!,
  process.env.TWILIO_TOKEN!
);