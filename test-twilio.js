require("dotenv").config({ path: ".env.local" });
require("dotenv").config({ path: ".env.local" });

console.log("SID:", process.env.TWILIO_SID);
console.log("TOKEN:", process.env.TWILIO_TOKEN ? "FOUND" : "MISSING");
console.log("PHONE:", process.env.TWILIO_PHONE);
const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

client.messages
  .create({
    from: "+17752614639",
    to: "+919682878834",
    body: "GuardianSOS Test SMS",
  })
  .then(console.log)
  .catch(console.error);