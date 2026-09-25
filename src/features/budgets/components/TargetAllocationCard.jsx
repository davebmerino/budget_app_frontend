import { Minus, Plus, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export function TargetAllocationCard({
  monthlyLimit,
  onDecrement,
  onIncrement,
  onQuickAdjust,
  surplusRollover,
  onSurplusRolloverChange,
}) {
  const quickAdjustments = [
    { label: "-$50", delta: -50 },
    { label: "+$50", delta: 50 },
    { label: "+$100", delta: 100 },
  ];

  return (
    <section className="mx-5 mt-4 rounded-3xl border border-border bg-card p-5 shadow-vault-card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="size-4 text-primary" />
          <h3 className="font-semibold">Target Allocation</h3>
        </div>
        <Badge className="bg-vault-surface text-muted-foreground hover:bg-vault-surface">
          Auto-Calculated
        </Badge>
      </div>

      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Monthly Capital Limit
      </p>
      <div className="mt-1.5 flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">
          <span className="text-primary">$</span>
          {monthlyLimit}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDecrement}
            aria-label="Decrease limit"
            className="flex size-8 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-secondary/80"
          >
            <Minus className="size-4" />
          </button>
          <button
            type="button"
            onClick={onIncrement}
            aria-label="Increase limit"
            className="flex size-8 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-secondary/80"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {quickAdjustments.map(({ label, delta }) => (
          <Button
            key={label}
            type="button"
            size="sm"
            variant="secondary"
            className="rounded-full"
            onClick={() => onQuickAdjust?.(delta)}
          >
            {label}
          </Button>
        ))}
        <Button type="button" size="sm" variant="secondary" className="rounded-full">
          Current
        </Button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
        <div>
          <p className="text-sm font-medium">Surplus Rollover</p>
          <p className="text-xs text-muted-foreground">
            Transfer unspent funds directly into next month's balance
          </p>
        </div>
        <Switch checked={surplusRollover} onCheckedChange={onSurplusRolloverChange} />
      </div>
    </section>
  );
}
