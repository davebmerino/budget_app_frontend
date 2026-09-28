import { cn } from "@/utils/cn";

export function PeriodSelector({ ranges, value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Time range"
      className="inline-flex gap-1 rounded-2xl bg-secondary p-1"
    >
      {ranges.map(({ key, label }) => {
        const isActive = key === value;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(key)}
            className={cn(
              "min-w-12 rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
