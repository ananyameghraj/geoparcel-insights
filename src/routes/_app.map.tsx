import { createFileRoute } from "@tanstack/react-router";
import { Check, Flag, Minus, Pencil, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MapPanel, confidenceColor, type MapLayers } from "@/components/gp/MapPanel";
import { EmptyState, PageHeader, Panel, StatusBadge } from "@/components/gp/ui-bits";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useApp } from "@/lib/app-state";

export const Route = createFileRoute("/_app/map")({
  head: () => ({
    meta: [
      { title: "GIS Map — GeoParcel AI" },
      { name: "description", content: "Interactive parcel map with confidence styling, layers and parcel review." },
      { property: "og:title", content: "GIS Map — GeoParcel AI" },
      { property: "og:description", content: "Interactive parcel map with confidence styling and layer controls." },
    ],
  }),
  component: MapPage,
});

const LAYER_LABELS: { key: keyof MapLayers; label: string }[] = [
  { key: "parcels", label: "Parcels" },
  { key: "buildings", label: "Buildings" },
  { key: "roads", label: "Roads" },
  { key: "review", label: "Review Required" },
  { key: "confidence", label: "Confidence" },
];

function MapPage() {
  const { parcels, selectedId, select, setReview, settings } = useApp();
  const [zoom, setZoom] = useState(1);
  const [query, setQuery] = useState("");
  const [layers, setLayers] = useState<MapLayers>({
    parcels: true,
    buildings: settings.showBuildings,
    roads: settings.showRoads,
    review: true,
    confidence: settings.showConfidence,
  });

  const shown = useMemo(
    () => (query ? parcels.filter((p) => p.id.toLowerCase().includes(query.toLowerCase())) : parcels),
    [parcels, query],
  );
  const selected = parcels.find((p) => p.id === selectedId) ?? null;

  const act = (status: "accepted" | "flagged", label: string) => {
    if (!selected) return;
    setReview(selected.id, status);
    toast.success(`Parcel ${selected.id} ${label}`);
  };

  return (
    <>
      <PageHeader title="GIS Workspace" subtitle="Fallback vector canvas — no map token required." />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Panel
          title="Parcel Canvas"
          right={
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search parcel / location"
                  className="h-8 w-44 pl-7 text-xs"
                />
              </div>
              <Button size="sm" variant="outline" title="Zoom in" onClick={() => setZoom((z) => Math.min(2, z + 0.2))}>
                <Plus className="h-3.5 w-3.5" />
              </Button>
              <Button size="sm" variant="outline" title="Zoom out" onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}>
                <Minus className="h-3.5 w-3.5" />
              </Button>
            </div>
          }
        >
          <div className="mb-3 flex flex-wrap gap-4 rounded-md border border-border bg-muted/40 px-3 py-2">
            {LAYER_LABELS.map((l) => (
              <label key={l.key} className="flex cursor-pointer items-center gap-2 text-xs">
                <Checkbox
                  checked={layers[l.key]}
                  onCheckedChange={(v) => setLayers((s) => ({ ...s, [l.key]: Boolean(v) }))}
                />
                {l.label}
              </label>
            ))}
          </div>
          <div className="overflow-hidden rounded-md border border-border">
            <div style={{ transform: `scale(${zoom})`, transformOrigin: "center" }} className="transition-transform">
              <MapPanel
                parcels={shown}
                layers={layers}
                selectedId={selectedId}
                onSelect={select}
                showLabels={settings.showLabels}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            {[
              { c: 95, t: "High ≥ 90%" },
              { c: 82, t: "Medium 78–90%" },
              { c: 70, t: "Low < 78%" },
            ].map((l) => (
              <span key={l.t} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: confidenceColor(l.c) }} />
                {l.t}
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Parcel Details">
          {!selected ? (
            <EmptyState
              icon={Search}
              title="No parcel selected"
              description="Click any polygon on the canvas to inspect its attributes and review status."
              action={<Button onClick={() => select(parcels[0]?.id ?? null)}>Select first parcel</Button>}
            />
          ) : (
            <div className="space-y-3 text-sm">
              {[
                ["Parcel ID", selected.id],
                ["Confidence Score", `${selected.confidence.toFixed(1)}%`],
                ["Area", `${selected.area.toLocaleString()} m²`],
                ["Land use", selected.landUse],
                ["Boundary Status", selected.boundary],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-border/70 pb-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
              <div className="flex justify-between gap-3 border-b border-border/70 pb-2">
                <span className="text-muted-foreground">Validation Status</span>
                <StatusBadge status={selected.validation} />
              </div>
              <div className="flex justify-between gap-3 pb-1">
                <span className="text-muted-foreground">Review Status</span>
                <StatusBadge status={selected.review} />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <Button size="sm" onClick={() => act("accepted", "accepted")}>
                  <Check className="mr-1 h-3.5 w-3.5" /> Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setReview(selected.id, "pending");
                    toast.success(`Parcel ${selected.id} moved to review queue`);
                  }}
                >
                  <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => act("flagged", "flagged for review")}>
                  <Flag className="mr-1 h-3.5 w-3.5" /> Flag
                </Button>
              </div>
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}
