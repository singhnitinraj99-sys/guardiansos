// export function buildEmergencyMessage(
//   userName: string,
//   locationUrl?: string
// ) {
//   return `SOS
// It's an emergency! ${userName} needs help.

// ${locationUrl ?? ""}`;
// }

interface Props {
  name: string;
  mapsUrl?: string;
  liveUrl?: string;
}

export function buildEmergencyMessage({
  name,
 mapsUrl,
liveUrl,
}: Props) {
  return `


${name} may be in danger.

${
  liveUrl
    ? `Live Tracking:
${liveUrl}`
    : ""
}

${
  mapsUrl
    ? `Current Location:
${mapsUrl}`
    : ""
}

`;
}