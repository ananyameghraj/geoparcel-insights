import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  BadgeCheck,
  ClipboardCheck,
  Download,
  Layers,
  Map as MapIcon,
  Upload,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader, Panel, StatCard, StatusBadge } from "@/components/gp/ui-bits";
import { Button } from "@/components/ui/button";
import { useApp, useStats } from "@/lib/app-state";
import { ACTIVITY_7D } from "@/lib/geo-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — GeoParcel AI" },
      { name: "description", content: "Monitor parcel mapping, extraction and validation activity." },
      { property: "og:title", content: "Dashboard — GeoParcel AI" },
      { property: "og:description", content: "Monitor parcel mapping, extraction and validation activity." },
    ],
  }),
  component: Dashboard,
});

const ACTIONS = [
  { to: "/upload", label: "Upload Drone Imagery", icon: Upload },
  { to: "/map", label: "Open GIS Map", icon: MapIcon },
  { to: "/review", label: "Review Parcels", icon: ClipboardCheck },
  { to: "/export", label: "Export Data", icon: Download },
] as const;

function Dashboard() {
  const { jobs } = useApp();
  const s = useStats();

  return (
    <>
      <PageHeader
        title="Urban Parcel Intelligence"
        subtitle="Monitor mapping, extraction and validation activities."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Parcels Processed" value={(1222 + s.total).toLocaleString()} icon={Layers} hint="Across all jobs" />
        <StatCard label="High Confidence" value={(1010 + s.high).toLocaleString()} icon={BadgeCheck} tone="good" hint="≥ 90% confidence" />
        <StatCard label="Needs Review" value={(130 + s.review).toLocaleString()} icon={ClipboardCheck} tone="warn" hint="Awaiting decision" />
        <StatCard label="Validation Errors" value={(66 + s.errors).toLocaleString()} icon={AlertTriangle} tone="bad" hint="Topology failures" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel className="lg:col-span-2" title="Recent Processing Jobs" description="Latest imagery batches">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="py-2 pr-3 font-medium">Job ID</th>
                  <th className="py-2 pr-3 font-medium">File</th>
                  <th className="py-2 pr-3 font-medium">Parcels</th>
                  <th className="py-2 pr-3 font-medium">Confidence</th>
                  <th className="py-2 pr-3 font-medium">Status</th>
                  <th className="py-2 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr key={j.id} className="border-b border-border/70 hover:bg-accent/60">
                    <td className="py-2.5 pr-3 font-medium">{j.id}</td>
                    <td className="py-2.5 pr-3 text-muted-foreground">{j.file}</td>
                    <td className="py-2.5 pr-3 tabular-nums">{j.parcels}</td>
                    <td className="py-2.5 pr-3 tabular-nums">{j.confidence}%</td>
                    <td className="py-2.5 pr-3">
                      <StatusBadge status={j.status} />
                    </td>
                    <td className="py-2.5 tabular-nums text-muted-foreground">{j.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Quick Actions" description="Jump into the workflow">
          <div className="grid gap-2">
            {ACTIONS.map((a) => (
              <Button key={a.to} asChild variant="outline" className="justify-start">
                <Link to={a.to}>
                  <a.icon className="mr-2 h-4 w-4" /> {a.label}
                </Link>
              </Button>
            ))}
          </div>
        </Panel>
      </div>

      <Panel
        className="mt-4"
        title="Processing Activity — Last 7 Days"
        description="Parcels generated vs reviewed"
      >
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ACTIVITY_7D}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 250)" vertical={false} />
              <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="parcels" name="Parcels" fill="oklch(0.55 0.13 255)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="reviewed" name="Reviewed" fill="oklch(0.75 0.07 255)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </>
  );
}
