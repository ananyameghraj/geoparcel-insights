import { Outlet, createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/gp/AppShell";

export const Route = createFileRoute("/_app")({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
