import VoiceResponse  from "twilio/lib/twiml/VoiceResponse";

function createTwiML() {
  const twiml = new VoiceResponse();

  twiml.say(
    {
      voice: "alice",
    },
    "Emergency alert. Guardian SOS user may need immediate assistance. Please check the emergency text message for the live location."
  );

  return twiml.toString();
}

export async function GET() {
  return new Response(createTwiML(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}

export async function POST() {
  return new Response(createTwiML(), {
    headers: {
      "Content-Type": "text/xml",
    },
  });
}