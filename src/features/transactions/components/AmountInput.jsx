import { Button } from "@/components/ui/button";

const QUICK_AMOUNTS = [5, 10, 25, 50];

export function AmountInput({ value, onChange }) {
  const addAmount = (amount) => {
    const current = Number(value) || 0;
    onChange(String(current + amount));
  };

  return (
    <div className="w-full min-w-0 max-w-full rounded-3xl border border-border bg-card p-4 text-center shadow-vault-card sm:p-6">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Total Amount
      </p>

      <div className="mt-3 flex min-w-0 items-center justify-center gap-1">
        <span className="shrink-0 text-3xl font-bold text-primary">₱</span>

        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"),
            )
          }
          placeholder="0.00"
          aria-label="Transaction amount"
          className="w-full min-w-0 max-w-52 bg-transparent text-center text-3xl font-bold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/40 sm:text-4xl"
        />
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2">
        {QUICK_AMOUNTS.map((amount) => (
          <Button
            key={amount}
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => addAmount(amount)}
            className="min-w-0 rounded-full px-1 text-xs sm:text-sm"
          >
            +₱{amount}
          </Button>
        ))}
      </div>
    </div>
  );
}
