import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/home-option-2")({
  head: () => ({
    meta: [
      { title: "Expert Dermatology & Aesthetic Care in Mangalore | Tha Skin Clinic" },
      { name: "description", content: "A calm, clinic-led introduction to medical dermatology and aesthetic care at Tha Skin Clinic, led by Dr. Vindhya A. Pai." },
      { property: "og:title", content: "Expert Dermatology & Aesthetic Care in Mangalore | Tha Skin Clinic" },
      { property: "og:description", content: "Explore dermatologist-led medical and aesthetic care, clinic hours and consultations in Mangalore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <HomePage option={2} />,
});