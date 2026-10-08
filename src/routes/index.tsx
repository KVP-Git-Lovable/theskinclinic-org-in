import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tha Skin Clinic — Dermatology & Formula V | Mangalore" },
      {
        name: "description",
        content:
          "Quiet confidence in your skin. Advanced dermatology, laser and Formula V medical skincare, led by Dr. Vindhya A. Pai in Mangalore since 2018.",
      },
      { property: "og:title", content: "Tha Skin Clinic — Dermatology & Formula V | Mangalore" },
      { property: "og:description", content: "Quiet confidence in your skin. Advanced dermatology, laser and Formula V medical skincare, led by Dr. Vindhya A. Pai in Mangalore since 2018." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <HomePage />,
});

