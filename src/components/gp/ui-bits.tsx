import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  tone = "default",
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  hint?: string;
  tone?: "default" | "good" | "warn" | "bad";
}) {
  const tones = {
    default: "text-primary bg-primary/10",
    good: "text-[oklch(0.52_0.13_155)] bg-[oklch(0.52_0.13_155)]/10",
    warn: "text-[oklch(0.62_0.14_70)] bg-[oklch(0.62_0.14_70)]/10",
    bad: "text-destructive bg-destructive/10",
  };
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-card-foreground">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
        </div>
        <span className={cn("rounded-md p-2", tones[tone])}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

type BadgeKind = string;
export function StatusBadge({ status }: { status: BadgeKind }) {
  const s = status.toLowerCase();
  const map: Record<string, string> = {
    accepted: "bg-[oklch(0.52_0.13_155)]/12 text-[oklch(0.45_0.13_155)] border-[oklch(0.52_0.13_155)]/30",
    valid: "bg-[oklch(0.52_0.13_155)]/12 text-[oklch(0.45_0.13_155)] border-[oklch(0.52_0.13_155)]/30",
    passed: "bg-[oklch(0.52_0.13_155)]/12 text-[oklch(0.45_0.13_155)] border-[oklch(0.52_0.13_155)]/30",
    completed: "bg-[oklch(0.52_0.13_155)]/12 text-[oklch(0.45_0.13_155)] border-[oklch(0.52_0.13_155)]/30",
    pending: "bg-[oklch(0.62_0.14_70)]/12 text-[oklch(0.5_0.14_70)] border-[oklch(0.62_0.14_70)]/30",
    warning: "bg-[oklch(0.62_0.14_70)]/12 text-[oklch(0.5_0.14_70)] border-[oklch(0.62_0.14_70)]/30",
    review: "bg-[oklch(0.62_0.14_70)]/12 text-[oklch(0.5_0.14_70)] border-[oklch(0.62_0.14_70)]/30",
    processing: "bg-primary/10 text-primary border-primary/30",
    queued: "bg-muted text-muted-foreground border-border",
    flagged: "bg-destructive/10 text-destructive border-destructive/30",
    failed: "bg-destructive/10 text-destructive border-destructive/30",
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        map[s] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      {label}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
      <span className="rounded-md bg-muted p-3 text-muted-foreground">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-3 text-sm font-medium text-card-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Panel({
  title,
  description,
  right,
  children,
  className,
}: {
  title?: string;
  description?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("rounded-lg border border-border bg-card shadow-sm", className)}>
      {(title || right) && (
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
          <div>
            {title && <h2 className="text-sm font-semibold text-card-foreground">{title}</h2>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {right}
        </header>
      )}
      <div className="p-4">{children}</div>
    </section>
  );
}
