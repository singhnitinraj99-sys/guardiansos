export function createGoogleMapsLink(
  latitude: number,
  longitude: number
) {
 return `https://maps.google.com/?q=${latitude},${longitude}`;
}