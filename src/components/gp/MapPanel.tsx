import { BUILDINGS, ROADS, type Parcel } from "@/lib/geo-data";

export interface MapLayers {
  parcels: boolean;
  buildings: boolean;
  roads: boolean;
  review: boolean;
  confidence: boolean;
}

export function confidenceColor(c: number) {
  if (c >= 90) return "oklch(0.55 0.13 155)";
  if (c >= 78) return "oklch(0.68 0.15 70)";
  return "oklch(0.58 0.2 25)";
}

export function MapPanel({
  parcels,
  layers,
  selectedId,
  onSelect,
  showLabels,
}: {
  parcels: Parcel[];
  layers: MapLayers;
  selectedId: string | null;
  onSelect: (id: string) => void;
  showLabels: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1000 700"
      className="h-[420px] w-full rounded-md bg-[oklch(0.97_0.005_250)] md:h-[560px] dark:bg-[oklch(0.22_0.02_260)]"
      role="img"
      aria-label="Parcel map"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="oklch(0.88 0.01 250)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1000" height="700" fill="url(#grid)" />

      {layers.roads &&
        ROADS.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill="oklch(0.86 0.01 250)" />
        ))}

      {layers.buildings &&
        BUILDINGS.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            fill="oklch(0.78 0.02 250)"
            opacity={0.65}
          />
        ))}

      {layers.parcels &&
        parcels.map((p) => {
          const stroke = layers.confidence ? confidenceColor(p.confidence) : "oklch(0.5 0.08 250)";
          const selected = p.id === selectedId;
          const flaggedRing = layers.review && p.review !== "accepted";
          return (
            <g key={p.id} className="cursor-pointer" onClick={() => onSelect(p.id)}>
              <polygon
                points={p.ring.map((pt) => pt.join(",")).join(" ")}
                fill={stroke}
                fillOpacity={selected ? 0.42 : 0.16}
                stroke={selected ? "oklch(0.48 0.16 255)" : stroke}
                strokeWidth={selected ? 3 : flaggedRing ? 2 : 1.4}
                strokeDasharray={flaggedRing && !selected ? "6 4" : undefined}
              />
              {showLabels && (
                <text
                  x={p.cx}
                  y={p.cy + 4}
                  textAnchor="middle"
                  className="pointer-events-none select-none"
                  fontSize="11"
                  fill="oklch(0.35 0.03 255)"
                >
                  {p.id}
                </text>
              )}
            </g>
          );
        })}
    </svg>
  );
}
