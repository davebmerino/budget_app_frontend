import { Progress } from "@/components/ui/progress";
import { formatCurrency, formatPercent } from "@/utils/formatCurrency";

function SubAllocationItem({ icon: Icon, name, spent, cap }) {
  const percent = cap > 0 ? (spent / cap) * 100 : 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-vault-card">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-vault-surface text-foreground">
            <Icon className="size-4.5" />
          </span>
          <div>
            <p className="font-medium leading-tight">{name}</p>
            <p className="text-xs text-muted-foreground">
              {formatPercent(percent)} of limit spent
            </p>
          </div>
        </div>
        <p className="shrink-0 text-right text-sm">
          <span className="font-medium">{formatCurrency(spent)}</span>
          <span className="text-muted-foreground">
            {" "}
            of {formatCurrency(cap)}
          </span>
        </p>
      </div>
      <Progress percent={percent} className="mt-3" />
    </div>
  );
}

export function SubAllocationList({ streams }) {
  return (
    <section className="mx-5 mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Sub-Allocations</h2>
        <span className="text-xs font-medium text-muted-foreground">
          {streams.length} Discretionary Streams
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {streams.map((stream) => (
          <SubAllocationItem key={stream.id} {...stream} />
        ))}
      </div>
    </section>
  );
}
