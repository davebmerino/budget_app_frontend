import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/utils/cn";
import { formatCurrency, formatPercent } from "@/utils/formatCurrency";
import { percentChange } from "../utils/summarizeRange";

function DeltaChip({ delta, suffix, goodWhenDown, rangeLabel }) {
  if (delta == null) return null;

  const isGood = goodWhenDown ? delta <= 0 : delta >= 0;
  const Icon = delta >= 0 ? TrendingUp : TrendingDown;
  const sign = delta > 0 ? "+" : delta < 0 ? "-" : "";

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
          isGood
            ? "bg-emerald-dim text-emerald-accent"
            : "bg-destructive/15 text-destructive",
        )}
      >
        <Icon className="size-3" />
        {sign}
        {Math.abs(delta).toFixed(1)}
        {suffix}
      </span>
      <span className="text-xs text-muted-foreground">
        vs prior {rangeLabel}
      </span>
    </div>
  );
}

function StatTile({ label, value, delta, suffix, goodWhenDown, rangeLabel }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-vault-card">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
      <div className="mt-2 min-h-5">
        <DeltaChip
          delta={delta}
          suffix={suffix}
          goodWhenDown={goodWhenDown}
          rangeLabel={rangeLabel}
        />
      </div>
    </div>
  );
}

/**
 * `summary` comes from summarizeRange(); `previous` is null when there isn't
 * enough history (e.g. 1Y on 12 months of data), in which case chips hide.
 */
export function InsightStatGrid({ summary, rangeLabel, className }) {
  const { previous } = summary;

  const tiles = [
    {
      key: "spent",
      label: "Total Spent",
      value: formatCurrency(summary.expenses),
      delta: percentChange(summary.expenses, previous?.expenses),
      suffix: "%",
      goodWhenDown: true,
    },
    {
      key: "income",
      label: "Income",
      value: formatCurrency(summary.income),
      delta: percentChange(summary.income, previous?.income),
      suffix: "%",
      goodWhenDown: false,
    },
    {
      key: "net",
      label: "Net Saved",
      value: formatCurrency(summary.net),
      delta: percentChange(summary.net, previous?.net),
      suffix: "%",
      goodWhenDown: false,
    },
    {
      key: "rate",
      label: "Savings Rate",
      value: formatPercent(summary.savingsRate),
      delta: previous ? summary.savingsRate - previous.savingsRate : null,
      suffix: " pts",
      goodWhenDown: false,
    },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", className)}>
      {tiles.map(({ key, ...tile }) => (
        <StatTile key={key} rangeLabel={rangeLabel} {...tile} />
      ))}
    </div>
  );
}
