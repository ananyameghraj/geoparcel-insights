import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "@/components/gp/LoginScreen";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — GeoParcel AI" },
      { name: "description", content: "Access the GeoParcel AI cadastral mapping demo environment." },
      { property: "og:title", content: "Login — GeoParcel AI" },
      { property: "og:description", content: "Access the GeoParcel AI cadastral mapping demo environment." },
    ],
  }),
  component: LoginScreen,
});
