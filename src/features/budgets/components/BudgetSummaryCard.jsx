import { Gauge } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercent } from "@/utils/formatCurrency";

export function BudgetSummaryCard({
  icon: Icon,
  categoryLabel = "Core Category",
  name,
  paceLabel = "Optimal Pace",
  spent,
  allocation,
  dayOfMonth,
  daysRemaining,
  burnPerDay,
  safePerDay,
  burnNote,
}) {
  const available = allocation - spent;
  const percentUtilized = allocation > 0 ? (spent / allocation) * 100 : 0;

  return (
    <section className="mx-5 rounded-3xl border border-border bg-card p-5 shadow-vault-card">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-vault-surface text-foreground">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {categoryLabel}
            </p>
            <h2 className="text-lg font-bold leading-tight">{name}</h2>
          </div>
        </div>
        <Badge className="bg-emerald-dim text-emerald-accent hover:bg-emerald-dim">
          {paceLabel}
        </Badge>
      </div>

      <div className="mt-5 flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold tracking-tight">
            {formatCurrency(spent)}
          </span>
          <span className="ml-1.5 text-sm text-muted-foreground">spent</span>
        </div>
        <div className="text-right text-sm">
          <p className="font-medium text-primary">
            {formatCurrency(available)} available
          </p>
          <p className="text-xs text-muted-foreground">
            Allocation: {formatCurrency(allocation)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatPercent(percentUtilized)} utilized</span>
      </div>
      <Progress percent={percentUtilized} className="mt-1.5" />

      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>Day {dayOfMonth} of 31</span>
        <span>{daysRemaining} Days Remaining</span>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-vault-surface p-3.5">
        <Gauge className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Burn: {formatCurrency(burnPerDay)}/day{" "}
          <span className="font-medium text-primary">
            Safe: {formatCurrency(safePerDay)}/day
          </span>
          <br />
          {burnNote}
        </p>
      </div>
    </section>
  );
}
