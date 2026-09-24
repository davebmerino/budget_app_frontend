import { formatCurrency } from "@/utils/formatCurrency";
import { cn } from "@/utils/cn";

/**
 * @param {object} props
 * @param {React.ElementType} props.icon
 * @param {string} props.merchant
 * @param {string} props.categoryTag
 * @param {string} props.timeLabel
 * @param {number} props.amount - negative for spend, positive for income
 * @param {string} props.accountLabel
 */
export function RecentActivityItem({
  icon: Icon,
  merchant,
  categoryTag,
  timeLabel,
  amount,
  accountLabel,
}) {
  const isIncome = amount > 0;

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-vault-card">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-vault-surface text-foreground">
        <Icon className="size-4.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium leading-tight">{merchant}</p>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="rounded-full bg-secondary px-2 py-0.5">
            {categoryTag}
          </span>
          <span>{timeLabel}</span>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p
          className={cn(
            "font-semibold",
            isIncome ? "text-primary" : "text-foreground",
          )}
        >
          {formatCurrency(amount, { showSign: true })}
        </p>
        <p className="text-xs text-muted-foreground">{accountLabel}</p>
      </div>
    </div>
  );
}
