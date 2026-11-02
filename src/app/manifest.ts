import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা",
    short_name: "জামিয়া নেছারিয়া",
    description: "টঙ্গী, গাজীপুরের জামিয়া নেছারিয়া ইসলামিয়া মাদরাসা ও এতিমখানা। মক্তব, হিফজ, কিতাব ও মাদানি নেসাব বিভাগের দ্বীনি শিক্ষা, ভর্তি তথ্য ও যোগাযোগ।",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F0",
    theme_color: "#016332",
    icons: [
      {
        src: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

