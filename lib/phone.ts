export function callPhone(phone: string) {
  if (typeof window === "undefined") return;

  window.location.href = `tel:${phone}`;
}