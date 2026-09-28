import { cn } from "@/utils/cn";

const TYPES = ["Expense", "Income", "Transfer"];

export function TransactionTypeTabs({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-1 rounded-2xl bg-secondary p-1">
      {TYPES.map((type) => {
        const isActive = value === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onChange(type)}
            className={cn(
              "rounded-xl py-2.5 text-sm font-medium transition-colors",
              isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {type}
          </button>
        );
      })}
    </div>
  );
}
