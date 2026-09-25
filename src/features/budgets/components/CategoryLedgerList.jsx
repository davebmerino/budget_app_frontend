import { formatCurrency } from "@/utils/formatCurrency";

function LedgerItem({ icon: Icon, merchant, timeLabel, subcategory, amount }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-vault-card">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-vault-surface text-foreground">
        <Icon className="size-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium leading-tight">{merchant}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {timeLabel} · {subcategory}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-semibold">{formatCurrency(amount)}</p>
        <p className="text-xs text-primary">Verified</p>
      </div>
    </div>
  );
}

export function CategoryLedgerList({ entries, onSeeHistory }) {
  return (
    <section className="mx-5 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Recent Category Ledger</h2>
        <button
          type="button"
          onClick={onSeeHistory}
          className="text-xs font-medium text-primary hover:underline"
        >
          History
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {entries.map((entry) => (
          <LedgerItem key={entry.id} {...entry} />
        ))}
      </div>
    </section>
  );
}
