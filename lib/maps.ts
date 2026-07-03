export function createGoogleMapsLink(
  latitude: number,
  longitude: number
) {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
}