import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileUp, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { EmptyState, PageHeader, Panel } from "@/components/gp/ui-bits";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/lib/app-state";
import { STAGES } from "@/lib/geo-data";

export const Route = createFileRoute("/_app/upload")({
  head: () => ({
    meta: [
      { title: "Upload Drone Data — GeoParcel AI" },
      { name: "description", content: "Upload orthophotos, DSM/DTM rasters and vector files for parcel extraction." },
      { property: "og:title", content: "Upload Drone Data — GeoParcel AI" },
      { property: "og:description", content: "Upload orthophotos, DSM/DTM rasters and vector files." },
    ],
  }),
  component: UploadPage,
});

const ACCEPT = ".tif,.tiff,.geotiff,.jpg,.jpeg,.png,.geojson,.json,.zip,.dsm,.dtm";

function fmt(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function UploadPage() {
  const { files, addFiles, removeFile, startProcessing, progress, stageIndex, running } = useApp();
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const navigate = useNavigate();

  const take = (list: FileList | null) => {
    if (!list?.length) return;
    addFiles(
      Array.from(list).map((f, i) => ({
        id: `${Date.now()}-${i}-${f.name}`,
        name: f.name,
        size: f.size,
        type: f.name.split(".").pop()?.toUpperCase() ?? "FILE",
      })),
    );
    toast.success(`${list.length} file(s) added`);
  };

  const addDemoFile = () => {
    addFiles([
      { id: `demo-${Date.now()}`, name: "sector12_ortho.tif", size: 48_233_472, type: "GEOTIFF" },
    ]);
    toast.success("Demo imagery added");
  };

  const begin = () => {
    startProcessing();
    toast.success("Processing simulation started");
    navigate({ to: "/processing" });
  };

  return (
    <>
      <PageHeader
        title="Upload Drone Data"
        subtitle="GeoTIFF, TIFF, JPG, PNG, GeoJSON, Shapefile ZIP, DSM and DTM are supported."
        actions={
          <Button variant="outline" onClick={addDemoFile}>
            <FileUp className="mr-2 h-4 w-4" /> Add demo file
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Panel title="Upload Zone" description="Drag and drop files or browse your machine">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                take(e.dataTransfer.files);
              }}
              onClick={() => inputRef.current?.click()}
              className={
                "flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed px-6 py-12 text-center transition-colors " +
                (drag ? "border-primary bg-primary/5" : "border-border hover:border-primary/50")
              }
            >
              <UploadCloud className="h-7 w-7 text-primary" />
              <p className="mt-3 text-sm font-medium">Drop drone imagery here</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Accepted: GeoTIFF · TIFF · JPG · PNG · GeoJSON · Shapefile ZIP · DSM · DTM
              </p>
              <input
                ref={inputRef}
                type="file"
                multiple
                accept={ACCEPT}
                className="hidden"
                onChange={(e) => {
                  take(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
          </Panel>

          <Panel title={`Selected Files (${files.length})`}>
            {files.length === 0 ? (
              <EmptyState
                icon={FileUp}
                title="No files selected"
                description="Add a demo GeoTIFF or drop your own imagery to start the processing simulation."
                action={<Button onClick={addDemoFile}>Add demo file</Button>}
              />
            ) : (
              <ul className="divide-y divide-border">
                {files.map((f) => (
                  <li key={f.id} className="flex items-center gap-3 py-2.5">
                    <span className="rounded bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {f.type}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm">{f.name}</span>
                    <span className="text-xs tabular-nums text-muted-foreground">{fmt(f.size)}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      title="Remove file"
                      onClick={() => {
                        removeFile(f.id);
                        toast.success("File removed");
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>

        <Panel title="Processing" description="Deterministic prototype simulation">
          <p className="text-xs text-muted-foreground">
            No AI model runs in this prototype. The pipeline below is a deterministic frontend simulation.
          </p>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium">{STAGES[stageIndex].key}</span>
              <span className="tabular-nums text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground">
              Status: {running ? "Running" : progress === 100 ? "Completed" : "Idle"} · Estimated demo time ≈ 6 s
            </p>
          </div>
          <Button className="mt-4 w-full" disabled={files.length === 0 || running} onClick={begin}>
            Start Processing
          </Button>
        </Panel>
      </div>
    </>
  );
}
