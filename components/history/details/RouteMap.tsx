"use client";

import dynamic from "next/dynamic";

interface Props {
  points: {
    latitude: number;
    longitude: number;
    createdAt: Date;
  }[];
}

const RouteMapLeaflet = dynamic<Props>(
  () => import("./RouteMapLeaflet"),
  {
    ssr: false,
  }
);

export default function RouteMap(props: Props) {
  return <RouteMapLeaflet {...props} />;
}