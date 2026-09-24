import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/utils/formatCurrency";
import { cn } from "@/utils/cn";

/**
 * @param {object} props
 * @param {React.ElementType} props.icon - lucide icon component
 * @param {string} props.name
 * @param {string} props.subtitle
 * @param {string} props.statusLabel - e.g. "93% Near Limit", "51% Optimal"
 * @param {"danger"|"primary"} props.tone
 * @param {number} props.spent
 * @param {number} props.cap
 * @param {() => void} [props.onClick]
 */
export function CategoryVaultItem({
  icon: Icon,
  name,
  subtitle,
  statusLabel,
  tone = "primary",
  spent,
  cap,
  onClick,
}) {
  const percent = cap > 0 ? (spent / cap) * 100 : 0;
  const isDanger = tone === "danger";

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-2xl border border-border bg-card p-4 text-left shadow-vault-card"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-vault-surface text-foreground">
            <Icon className="size-4.5" />
          </span>
          <div>
            <h4 className="font-semibold leading-tight">{name}</h4>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <span
          className={cn(
            "shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium",
            isDanger
              ? "bg-destructive/15 text-destructive"
              : "bg-emerald-dim text-emerald-accent",
          )}
        >
          {statusLabel}
        </span>
      </div>

      <Progress
        percent={percent}
        tone={isDanger ? "danger" : "primary"}
        className="mt-3"
      />
      <div className="mt-1.5 flex items-center justify-end gap-1 text-xs text-muted-foreground">
        <span className="font-medium text-foreground">
          {formatCurrency(spent)}
        </span>
        <span>/ {formatCurrency(cap)}</span>
      </div>
    </button>
  );
}
