export function buildEmergencyMessage(
  userName: string,
  locationUrl?: string
) {
  return `SOS
It's an emergency! ${userName} needs help.

${locationUrl ?? ""}`;
}