export function buildEmergencyMessage(
  userName: string,
  locationUrl?: string
) {
  let message = `🚨 EMERGENCY ALERT

${userName} may need immediate help.

`;

  if (locationUrl) {
    message += `Location:
${locationUrl}

`;
  }

  message += "Sent via GuardianSOS.";

  return message;
}