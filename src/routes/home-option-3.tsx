import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/home-option-3")({
  head: () => ({
    meta: [
      { title: "Tha Skin Clinic — Thoughtful Skin Care | Option 3" },
      { name: "description", content: "Discover thoughtful dermatologist-led skin care, medical treatments and clinical skincare at Tha Skin Clinic in Mangalore." },
      { property: "og:title", content: "Tha Skin Clinic — Thoughtful Skin Care | Option 3" },
      { property: "og:description", content: "Medical dermatology, considered aesthetic treatments and skincare, led by Dr. Vindhya A. Pai." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <HomePage option={3} />,
});