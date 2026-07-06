import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export async function POST() {
  const twiml = new VoiceResponse();

  twiml.say(
    {
      voice: "alice",
    },
    "Emergency alert. The Guardian SOS user may need immediate assistance. Please check the SMS sent by Guardian SOS for the live location."
  );

  return new Response(twiml.toString(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}