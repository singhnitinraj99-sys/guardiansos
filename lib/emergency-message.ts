export function buildEmergencyMessage(
  userName: string,
  locationUrl?: string
) {
  let message = `🚨 EMERGENCY ALERT

${userName} may need immediate assistance.

`;

  if (locationUrl) {
    message += `📍 Live Location:
${locationUrl}

`;
  }

  message +=
    "This alert was sent automatically by GuardianSOS.";

  return message;
}