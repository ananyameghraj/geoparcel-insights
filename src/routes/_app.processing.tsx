import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CircleDot, Loader2, Map as MapIcon } from "lucide-react";
import { PageHeader, Panel, StatusBadge } from "@/components/gp/ui-bits";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/lib/app-state";
import { EXTRACTION_RESULTS, STAGES } from "@/lib/geo-data";

export const Route = createFileRoute("/_app/processing")({
  head: () => ({
    meta: [
      { title: "AI Processing Pipeline — GeoParcel AI" },
      { name: "description", content: "Follow the simulated parcel extraction pipeline stage by stage." },
      { property: "og:title", content: "AI Processing Pipeline — GeoParcel AI" },
      { property: "og:description", content: "Follow the simulated parcel extraction pipeline stage by stage." },
    ],
  }),
  component: ProcessingPage,
});

function ProcessingPage() {
  const { stageIndex, progress, running } = useApp();

  return (
    <>
      <PageHeader
        title="AI Processing Pipeline"
        subtitle="Prototype Simulation — no machine learning model is executing."
        actions={
          <Button asChild variant="outline">
            <Link to="/map">
              <MapIcon className="mr-2 h-4 w-4" /> Open GIS Map
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Panel
          className="lg:col-span-2"
          title="Pipeline Stages"
          right={<StatusBadge status={running ? "processing" : progress === 100 ? "completed" : "queued"} />}
        >
          <ol className="space-y-1">
            {STAGES.map((s, i) => {
              const done = i < stageIndex || progress === 100;
              const active = i === stageIndex && running;
              return (
                <li key={s.key} className="flex gap-3 rounded-md px-2 py-2.5 hover:bg-accent/50">
                  <span className="mt-0.5">
                    {done ? (
                      <Check className="h-4 w-4 text-[oklch(0.52_0.13_155)]" />
                    ) : active ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : (
                      <CircleDot className="h-4 w-4 text-muted-foreground" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium">{s.label}</p>
                      <StatusBadge status={done ? "completed" : active ? "processing" : "queued"} />
                    </div>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                    <Progress
                      className="mt-2 h-1.5"
                      value={done ? 100 : active ? Math.round((progress % 17) * 6) : 0}
                    />
                  </div>
                </li>
              );
            })}
          </ol>
        </Panel>

        <div className="space-y-4">
          <Panel title="Overall Progress">
            <p className="text-3xl font-semibold tabular-nums">{progress}%</p>
            <Progress className="mt-3" value={progress} />
            <p className="mt-2 text-xs text-muted-foreground">Current stage: {STAGES[stageIndex].key}</p>
          </Panel>
          <Panel title="Extraction Results" description="Deterministic demo values">
            <ul className="divide-y divide-border text-sm">
              {EXTRACTION_RESULTS.map((r) => (
                <li key={r.label} className="flex justify-between gap-3 py-2">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium">{r.value}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  );
}
