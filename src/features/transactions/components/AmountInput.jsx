import { Button } from "@/components/ui/button";

const QUICK_AMOUNTS = [5, 10, 25, 50];

export function AmountInput({ value, onChange }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 text-center shadow-vault-card">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Total Amount</p>
      <div className="mt-2 flex items-center justify-center gap-1">
        <span className="text-3xl font-bold text-primary">$</span>
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/[^0-9.]/g, ""))}
          className="w-40 bg-transparent text-center text-4xl font-bold tracking-tight text-foreground outline-none"
        />
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {QUICK_AMOUNTS.map((amount) => (
          <Button
            key={amount}
            type="button"
            size="sm"
            variant="secondary"
            className="rounded-full"
            onClick={() => onChange((prev) => String((parseFloat(prev) || 0) + amount))}
          >
            +${amount}
          </Button>
        ))}
      </div>
    </div>
  );
}
