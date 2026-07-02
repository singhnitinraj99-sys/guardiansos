let audio: HTMLAudioElement | null = null;

export function playAlarm(volume = 1) {
  if (typeof window === "undefined") return;

  if (!audio) {
    audio = new Audio("/alarm.mp3");
    audio.loop = true;
  }

  audio.volume = Math.min(Math.max(volume, 0), 1);

  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.error("Unable to play alarm:", error);
  });
}

export function stopAlarm() {
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
}