import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Skin Clinic — Dermatology | Mangalore" },
      {
        name: "description",
        content:
          "Skin, hair and laser care for the whole family in Mangaluru. Qualified dermatologists, led by Dr. Vindhya A. Pai since 2018.",
      },
      { property: "og:title", content: "The Skin Clinic — Dermatology | Mangalore" },
      { property: "og:description", content: "Skin, hair and laser care for the whole family in Mangaluru. Qualified dermatologists, led by Dr. Vindhya A. Pai since 2018." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <HomePage />,
});

