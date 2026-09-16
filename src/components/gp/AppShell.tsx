import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Download,
  LayoutDashboard,
  Map as MapIcon,
  Menu,
  Settings as SettingsIcon,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  ClipboardCheck,
  BarChart3,
  Layers,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/app-state";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload Data", icon: Upload },
  { to: "/processing", label: "Processing", icon: SlidersHorizontal },
  { to: "/map", label: "GIS Map", icon: MapIcon },
  { to: "/review", label: "Parcel Review", icon: ClipboardCheck },
  { to: "/validation", label: "Validation", icon: ShieldCheck },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/export", label: "Export", icon: Download },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { settings } = useApp();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = NAV.find((n) => pathname.startsWith(n.to))?.label ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-background">
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/30 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-sidebar transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-4">
          <span className="rounded-md bg-primary p-1.5 text-primary-foreground">
            <Layers className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">GeoParcel AI</p>
            <p className="truncate text-[11px] text-muted-foreground">Cadastral Intelligence</p>
          </div>
          <button
            className="ml-auto rounded p-1 text-muted-foreground hover:bg-sidebar-accent lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent data-[status=active]:bg-primary/10 data-[status=active]:font-medium data-[status=active]:text-primary"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border px-4 py-3">
          <span className="inline-flex items-center rounded-md border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            Prototype Mode
          </span>
          <p className="mt-1.5 text-[11px] text-muted-foreground">GeoSpatial Intelligence Platform</p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur">
          <button
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-sm font-semibold text-card-foreground">{current}</p>
          <span className="hidden items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground sm:flex">
            <Layers className="h-3.5 w-3.5" /> {settings.projectName}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              title="Notifications"
              className="relative rounded-md p-1.5 text-muted-foreground hover:bg-accent"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            <div className="flex items-center gap-2 rounded-md border border-border px-2 py-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                DU
              </span>
              <span className="hidden text-xs font-medium text-card-foreground sm:block">Demo User</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
