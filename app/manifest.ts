import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",

    name: "GuardianSOS",

    short_name: "GuardianSOS",

    description:
      "GuardianSOS is an emergency safety web application that instantly alerts your emergency contacts with your live location through SMS and voice calls during critical situations.",

    start_url: "/",

    scope: "/",

    display: "standalone",

    orientation: "portrait",

    background_color: "#ffffff",

    theme_color: "#dc2626",

    lang: "en",

    dir: "ltr",

    categories: [
      "safety",
      "utilities",
      "medical",
      "security",
    ],

    icons: [
  {
    src: "/icons/icon-192.png",
    sizes: "192x192",
    type: "image/png",
  },
  {
    src: "/icons/icon-512.png",
    sizes: "512x512",
    type: "image/png",
  },
  {
    src: "/icons/maskable-512.png",
    sizes: "512x512",
    type: "image/png",
    purpose: "maskable",
  },
],

    screenshots: [
      {
        src: "/screenshots/mobile-home.png",
        sizes: "1080x1920",
        type: "image/png",
        form_factor: "narrow",
        label: "GuardianSOS Mobile Dashboard",
      },
      {
        src: "/screenshots/desktop-dashboard.png",
        sizes: "1920x1080",
        type: "image/png",
        form_factor: "wide",
        label: "GuardianSOS Desktop Dashboard",
      },
    ],

    shortcuts: [
      {
        name: "Trigger SOS",
        short_name: "SOS",
        description: "Open GuardianSOS quickly",
        url: "/dashboard",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
          },
        ],
      },
      {
        name: "Emergency Contacts",
        short_name: "Contacts",
        description: "Manage emergency contacts",
        url: "/contacts",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
          },
        ],
      },
      {
        name: "Emergency History",
        short_name: "History",
        description: "View previous emergency incidents",
        url: "/history",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
          },
        ],
      },
    ],
  };
}