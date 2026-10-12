import { PAY_PERIODS } from "../../transactions/utils/payPeriod";

const MAX_NOTES = 500;

export function IncomeFields({
  payDate,
  onPayDateChange,
  payPeriod,
  onPayPeriodChange,
  notes,
  onNotesChange,
  errors = {},
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-4 shadow-vault-card sm:p-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="income-pay-date" className="text-sm font-medium">
            Pay Date
          </label>

          <input
            id="income-pay-date"
            type="date"
            value={payDate ?? ""}
            onChange={(e) => onPayDateChange(e.target.value)}
            aria-invalid={!!errors.payDate}
            className="mt-2 w-full min-w-0 rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary focus:ring-2 dark:[color-scheme:dark]"
          />

          {errors.payDate && (
            <p className="mt-1 text-xs text-destructive">
              {errors.payDate.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <label htmlFor="income-pay-period" className="text-sm font-medium">
            Pay Period
          </label>

          <select
            id="income-pay-period"
            value={payPeriod ?? "first-half"}
            onChange={(e) => onPayPeriodChange(e.target.value)}
            aria-invalid={!!errors.payPeriod}
            className="mt-2 w-full min-w-0 rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary focus:ring-2"
          >
            {PAY_PERIODS.map((period) => (
              <option key={period.id} value={period.id}>
                {period.name}
              </option>
            ))}
          </select>

          {errors.payPeriod && (
            <p className="mt-1 text-xs text-destructive">
              {errors.payPeriod.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="income-notes" className="text-sm font-medium">
            Notes
            <span className="ml-1 font-normal text-muted-foreground">
              (optional)
            </span>
          </label>

          <span className="text-xs text-muted-foreground">
            {(notes ?? "").length}/{MAX_NOTES}
          </span>
        </div>

        <textarea
          id="income-notes"
          value={notes ?? ""}
          onChange={(e) => onNotesChange(e.target.value.slice(0, MAX_NOTES))}
          placeholder="Anything worth remembering about this payout?"
          maxLength={MAX_NOTES}
          rows={3}
          aria-invalid={!!errors.notes}
          className="mt-2 w-full resize-none rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary placeholder:text-muted-foreground focus:ring-2"
        />

        {errors.notes && (
          <p className="mt-1 text-xs text-destructive">
            {errors.notes.message}
          </p>
        )}
      </div>
    </div>
  );
}
