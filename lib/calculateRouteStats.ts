interface Point {
  latitude: number;
  longitude: number;
  createdAt: Date;
}

function toRadians(value: number) {
  return (value * Math.PI) / 180;
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const R = 6371; // Earth's radius in km

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function calculateRouteStats(points: Point[]) {
  if (points.length === 0) {
    return {
      distance: 0,
      duration: 0,
      averageSpeed: 0,
      gpsPoints: 0,
    };
  }

  let distance = 0;

  for (let i = 1; i < points.length; i++) {
    distance += haversineDistance(
      points[i - 1].latitude,
      points[i - 1].longitude,
      points[i].latitude,
      points[i].longitude
    );
  }

  const started = new Date(points[0].createdAt).getTime();
  const ended = new Date(
    points[points.length - 1].createdAt
  ).getTime();

  const durationMinutes = Math.max(
    (ended - started) / 60000,
    0
  );

  const averageSpeed =
    durationMinutes > 0
      ? distance / (durationMinutes / 60)
      : 0;

  return {
    distance,
    duration: durationMinutes,
    averageSpeed,
    gpsPoints: points.length,
  };
}