import { createGoogleMapsLink } from "@/lib/maps";

interface PayloadOptions {
  userName: string;
  latitude?: number;
  longitude?: number;
}

export function buildSMSPayload({
  userName,
  latitude,
  longitude,
}: PayloadOptions) {
  let message = `🚨 EMERGENCY ALERT

${userName} may need immediate assistance.

`;

  if (
    latitude !== undefined &&
    longitude !== undefined
  ) {
    message += `📍 Location:
${createGoogleMapsLink(latitude, longitude)}

`;
  }

  message +=
    "Sent automatically by GuardianSOS.";

  return message;
}