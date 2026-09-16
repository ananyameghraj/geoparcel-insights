import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "@/components/gp/LoginScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GeoParcel AI — Urban Parcel Mapping Prototype" },
      {
        name: "description",
        content:
          "Sign in to GeoParcel AI, an AI-powered urban parcel mapping and cadastral feature extraction prototype.",
      },
      { property: "og:title", content: "GeoParcel AI — Urban Parcel Mapping Prototype" },
      {
        property: "og:description",
        content: "AI-powered urban parcel mapping and cadastral intelligence, built as a frontend prototype.",
      },
    ],
  }),
  component: LoginScreen,
});
