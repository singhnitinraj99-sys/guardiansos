let interval: ReturnType<typeof setInterval> | null = null;

export function startVibration() {
  if (typeof navigator === "undefined") return;

  if (!("vibrate" in navigator)) return;

  if (interval) return;

  navigator.vibrate([700, 300]);

  interval = setInterval(() => {
    navigator.vibrate([700, 300]);
  }, 1000);
}

export function stopVibration() {
  if (typeof navigator === "undefined") return;

  if (!("vibrate" in navigator)) return;

  navigator.vibrate(0);

  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}