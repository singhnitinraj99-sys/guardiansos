"use client";

import { useEffect } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";


import { renderToStaticMarkup } from "react-dom/server";
import {
  PlayCircle,
  MapPin,
  Navigation,
} from "lucide-react";

import "leaflet/dist/leaflet.css";

interface Props {
  points: {
    latitude: number;
    longitude: number;
  }[];
}

const startIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white shadow-lg ring-4 ring-green-200">
      <PlayCircle size={20} />
    </div>
  ),
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});

const pointIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md ring-2 ring-blue-200">
      <Navigation size={16} />
    </div>
  ),
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -20],
});

const currentIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg ring-4 ring-red-200 animate-pulse">
      <MapPin size={20} />
    </div>
  ),
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
});
function FollowLatest({
  positions,
}: {
  positions: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    if (!positions.length) return;

    map.flyTo(
      positions[positions.length - 1],
      map.getZoom(),
      {
        animate: true,
        duration: 1.2,
      }
    );
  }, [positions, map]);

  return null;
}
export default function RouteMapLeaflet({
  points,
}: Props) {
  if (points.length === 0) {
    return (
      <div className="flex h-[450px] items-center justify-center rounded-xl border bg-muted/20">
        No live tracking data available.
      </div>
    );
  }

  const positions = points.map((point) => [
    point.latitude,
    point.longitude,
  ]) as [number, number][];

  return (
    <MapContainer
    key={points.length}
      center={positions[0]}
      zoom={16}
      scrollWheelZoom
      className="h-[500px] w-full rounded-xl"
    >
      <FollowLatest positions={positions} />

      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      <Polyline
        positions={positions}
        pathOptions={{
          color: "#2563eb",
          weight: 5,
          opacity: 0.85,
        }}
      />

      {/* Start Marker */}
      <Marker
        position={positions[0]}
        icon={startIcon}
      >
        <Popup>
          <strong>SOS Started</strong>
        </Popup>
      </Marker>

      {/* Tracking Points */}
      {positions.slice(1, -1).map((position, index) => (
        <Marker
          key={index}
          position={position}
          icon={pointIcon}
        >
          <Popup>
            Tracking Point {index + 1}
          </Popup>
        </Marker>
      ))}

      {/* Current Marker */}
      <Marker
        position={positions[positions.length - 1]}
        icon={currentIcon}
      >
        <Popup>
          <strong>Latest Location</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
}