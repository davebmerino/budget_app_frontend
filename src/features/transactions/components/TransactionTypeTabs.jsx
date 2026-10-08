import { cn } from "@/utils/cn";

// Transfer removed for now — only Expense and Income are backed by a schema
// (Expense and Salary respectively). Add it back here once there's a model
// for it.
const TYPES = ["Expense", "Income"];

export function TransactionTypeTabs({ value, onChange }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-1 rounded-2xl bg-secondary p-1">
        {TYPES.map((type) => {
          const isActive = value === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={cn(
                "rounded-xl py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {type}
            </button>
          );
        })}
      </div>
    </>
  );
}
