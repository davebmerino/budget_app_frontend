import { ArrowDownLeft, ArrowUpRight, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercent } from "@/utils/formatCurrency";

export function SafeToSpendCard({
  available,
  weeklyChangeLabel,
  spent,
  budget,
  daysRemaining,
  onTrackToSave,
  income,
  incomeChangePercent,
  expenses,
  expensesCapPercent,
}) {
  const percentUsed = budget > 0 ? (spent / budget) * 100 : 0;

  return (
    <section className="mx-5 rounded-3xl border border-border bg-card p-5 shadow-vault-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Safe-to-Spend Vault
          <span className="size-1.5 rounded-full bg-primary" />
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-dim px-2.5 py-1 text-xs font-medium text-emerald-accent">
          <TrendingUp className="size-3" />
          {weeklyChangeLabel}
        </span>
      </div>

      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight">
          {formatCurrency(available)}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Available personal liquidity after reserved obligations
      </p>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-foreground">
          {formatCurrency(spent)} spent of {formatCurrency(budget)}
        </span>
        <span className="font-medium text-primary">
          {formatPercent(percentUsed)} used
        </span>
      </div>
      <Progress percent={percentUsed} className="mt-2" />
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <span>{daysRemaining} days remaining</span>
        <span>On track to save {formatCurrency(onTrackToSave)}</span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-vault-surface p-3.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-emerald-dim text-primary">
            <ArrowDownLeft className="size-3.5" />
          </span>
          <p className="mt-2 text-xs text-muted-foreground">Income</p>
          <p className="text-base font-semibold">
            {formatCurrency(income)}{" "}
            <span className="text-xs font-medium text-primary">
              +{incomeChangePercent}%
            </span>
          </p>
        </div>
        <div className="rounded-2xl bg-vault-surface p-3.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-foreground">
            <ArrowUpRight className="size-3.5" />
          </span>
          <p className="mt-2 text-xs text-muted-foreground">Expenses</p>
          <p className="text-base font-semibold">
            {formatCurrency(expenses)}{" "}
            <span className="text-xs font-medium text-muted-foreground">
              {expensesCapPercent}% cap
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
