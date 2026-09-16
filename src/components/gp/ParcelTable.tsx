import { Check, Flag, Pencil } from "lucide-react";
import type { Parcel } from "@/lib/geo-data";
import { StatusBadge } from "./ui-bits";
import { Button } from "@/components/ui/button";

export function ParcelTable({
  parcels,
  onAccept,
  onFlag,
  onEdit,
  onSelect,
  selectedId,
}: {
  parcels: Parcel[];
  onAccept?: (id: string) => void;
  onFlag?: (id: string) => void;
  onEdit?: (p: Parcel) => void;
  onSelect?: (id: string) => void;
  selectedId?: string | null;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <th className="py-2 pr-3 font-medium">Parcel ID</th>
            <th className="py-2 pr-3 font-medium">Confidence</th>
            <th className="py-2 pr-3 font-medium">Area</th>
            <th className="py-2 pr-3 font-medium">Land use</th>
            <th className="py-2 pr-3 font-medium">Validation</th>
            <th className="py-2 pr-3 font-medium">Review</th>
            {(onAccept || onFlag || onEdit) && <th className="py-2 font-medium">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {parcels.map((p) => (
            <tr
              key={p.id}
              onClick={() => onSelect?.(p.id)}
              className={
                "border-b border-border/70 transition-colors hover:bg-accent/60 " +
                (selectedId === p.id ? "bg-primary/5" : "")
              }
            >
              <td className="py-2.5 pr-3 font-medium text-foreground">{p.id}</td>
              <td className="py-2.5 pr-3 tabular-nums">{p.confidence.toFixed(1)}%</td>
              <td className="py-2.5 pr-3 tabular-nums">{p.area.toLocaleString()} m²</td>
              <td className="py-2.5 pr-3 text-muted-foreground">{p.landUse}</td>
              <td className="py-2.5 pr-3">
                <StatusBadge status={p.validation} />
              </td>
              <td className="py-2.5 pr-3">
                <StatusBadge status={p.review} />
              </td>
              {(onAccept || onFlag || onEdit) && (
                <td className="py-2.5">
                  <div className="flex gap-1">
                    {onAccept && (
                      <Button
                        size="sm"
                        variant="outline"
                        title="Accept parcel"
                        onClick={(e) => {
                          e.stopPropagation();
                          onAccept(p.id);
                        }}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {onFlag && (
                      <Button
                        size="sm"
                        variant="outline"
                        title="Flag for review"
                        onClick={(e) => {
                          e.stopPropagation();
                          onFlag(p.id);
                        }}
                      >
                        <Flag className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="outline"
                        title="Edit parcel status"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(p);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
