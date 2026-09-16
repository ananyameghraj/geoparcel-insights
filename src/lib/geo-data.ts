export type ReviewStatus = "accepted" | "pending" | "flagged";
export type ValidationStatus = "valid" | "warning" | "failed";

export interface Parcel {
  id: string;
  area: number;
  confidence: number;
  review: ReviewStatus;
  validation: ValidationStatus;
  boundary: "Closed" | "Open";
  landUse: string;
  ring: [number, number][];
  cx: number;
  cy: number;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export interface Job {
  id: string;
  file: string;
  parcels: number;
  confidence: number;
  status: "Completed" | "Processing" | "Queued" | "Review";
  time: string;
}

// deterministic pseudo random
function prng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const LAND_USE = ["Residential", "Commercial", "Mixed Use", "Institutional", "Vacant"];

export function seedParcels(): Parcel[] {
  const rnd = prng(20260916);
  const parcels: Parcel[] = [];
  let n = 0;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 6; col++) {
      if (row === 2 && col === 3) continue; // road plaza gap
      if (row === 4 && col === 5) continue;
      n++;
      const x = 90 + col * 145 + (rnd() * 10 - 5);
      const y = 70 + row * 118 + (rnd() * 10 - 5);
      const w = 96 + rnd() * 24;
      const h = 74 + rnd() * 20;
      const j = () => rnd() * 8 - 4;
      const ring: [number, number][] = [
        [x + j(), y + j()],
        [x + w + j(), y + j()],
        [x + w + j(), y + h + j()],
        [x + j(), y + h + j()],
      ];
      const confidence = Math.round((62 + rnd() * 37) * 10) / 10;
      const validation: ValidationStatus =
        confidence > 90 ? "valid" : confidence > 78 ? (rnd() > 0.45 ? "valid" : "warning") : rnd() > 0.5 ? "warning" : "failed";
      const review: ReviewStatus = confidence >= 93 ? "accepted" : confidence < 72 ? "flagged" : "pending";
      parcels.push({
        id: `GP-${String(n).padStart(3, "0")}`,
        area: Math.round((620 + rnd() * 2100) / 10) * 10,
        confidence,
        review,
        validation,
        boundary: validation === "failed" ? "Open" : "Closed",
        landUse: LAND_USE[Math.floor(rnd() * LAND_USE.length)],
        ring,
        cx: x + w / 2,
        cy: y + h / 2,
      });
    }
  }
  return parcels;
}

export const SEED_JOBS: Job[] = [
  { id: "JOB-2291", file: "sector12_ortho.tif", parcels: 312, confidence: 94.2, status: "Completed", time: "09:42" },
  { id: "JOB-2290", file: "ward07_dsm.tif", parcels: 184, confidence: 91.7, status: "Completed", time: "09:05" },
  { id: "JOB-2289", file: "northzone_rgb.tif", parcels: 226, confidence: 88.1, status: "Review", time: "08:31" },
  { id: "JOB-2288", file: "cadastral_base.geojson", parcels: 143, confidence: 96.4, status: "Completed", time: "07:58" },
  { id: "JOB-2287", file: "sector09_ortho.tif", parcels: 201, confidence: 85.6, status: "Review", time: "07:12" },
  { id: "JOB-2286", file: "riverfront_dtm.tif", parcels: 182, confidence: 92.9, status: "Completed", time: "06:40" },
];

export const ACTIVITY_7D = [
  { day: "Mon", parcels: 148, reviewed: 96 },
  { day: "Tue", parcels: 192, reviewed: 131 },
  { day: "Wed", parcels: 164, reviewed: 118 },
  { day: "Thu", parcels: 231, reviewed: 172 },
  { day: "Fri", parcels: 208, reviewed: 165 },
  { day: "Sat", parcels: 121, reviewed: 84 },
  { day: "Sun", parcels: 184, reviewed: 140 },
];

export const BUILDINGS = (() => {
  const rnd = prng(771);
  const out: { x: number; y: number; w: number; h: number }[] = [];
  for (let i = 0; i < 46; i++) {
    out.push({
      x: 100 + rnd() * 780,
      y: 80 + rnd() * 520,
      w: 18 + rnd() * 26,
      h: 14 + rnd() * 22,
    });
  }
  return out;
})();

export const ROADS = [
  { x: 60, y: 0, w: 22, h: 700 },
  { x: 520, y: 0, w: 22, h: 700 },
  { x: 880, y: 0, w: 22, h: 700 },
  { x: 0, y: 46, w: 1000, h: 20 },
  { x: 0, y: 300, w: 1000, h: 24 },
  { x: 0, y: 630, w: 1000, h: 20 },
];

export const VALIDATION_CHECKS = [
  { check: "Overlapping polygons", count: 6, status: "Warning" as const, detail: "Adjacent parcels sharing >0.5 m² area" },
  { check: "Gaps between parcels", count: 3, status: "Warning" as const, detail: "Unassigned slivers between boundaries" },
  { check: "Duplicate geometries", count: 0, status: "Passed" as const, detail: "No identical rings detected" },
  { check: "Self-intersections", count: 2, status: "Failed" as const, detail: "Ring crosses itself — geometry invalid" },
  { check: "Sliver polygons", count: 4, status: "Warning" as const, detail: "Area below 12 m² threshold" },
  { check: "Invalid geometries", count: 1, status: "Failed" as const, detail: "Unclosed boundary ring" },
  { check: "Closed rings", count: 0, status: "Passed" as const, detail: "All remaining rings closed correctly" },
  { check: "CRS consistency", count: 0, status: "Passed" as const, detail: "All layers in EPSG:4326" },
];

export const STAGES = [
  { key: "UPLOAD", label: "Upload", desc: "Imagery tiles ingested into the workspace." },
  { key: "PREPROCESSING", label: "Preprocessing", desc: "Orthorectification, tiling and histogram normalisation." },
  { key: "AI SEGMENTATION", label: "AI Segmentation", desc: "Simulated semantic segmentation of surfaces." },
  { key: "FEATURE EXTRACTION", label: "Feature Extraction", desc: "Buildings, roads and edges vectorised." },
  { key: "PARCEL GENERATION", label: "Parcel Generation", desc: "Boundary closure and parcel polygon assembly." },
  { key: "TOPOLOGY VALIDATION", label: "Topology Validation", desc: "Overlap, gap and self-intersection checks." },
  { key: "COMPLETED", label: "Completed", desc: "Dataset ready for review and export." },
];

export const EXTRACTION_RESULTS = [
  { label: "Building Detection", value: "1,842 footprints" },
  { label: "Road Detection", value: "68.4 km centreline" },
  { label: "Parcel Boundary Extraction", value: "1,248 boundaries" },
  { label: "Polygon Generation", value: "1,248 polygons" },
  { label: "Topology Validation", value: "16 issues flagged" },
];
