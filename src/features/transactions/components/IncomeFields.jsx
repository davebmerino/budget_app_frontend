import { PAY_PERIODS } from "../utils/payPeriod";

const MAX_NOTES = 500;

/**
 * Matches the Salary schema: payDate, periodStart, periodEnd, payPeriod,
 * notes. Amount is handled separately by the shared AmountInput.
 */
export function IncomeFields({
  payDate,
  onPayDateChange,
  payPeriod,
  onPayPeriodChange,
  periodStart,
  onPeriodStartChange,
  periodEnd,
  onPeriodEndChange,
  notes,
  onNotesChange,
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-vault-card">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="income-pay-date" className="text-sm font-medium">
            Pay Date
          </label>
          <input
            id="income-pay-date"
            type="date"
            value={payDate}
            onChange={(event) => onPayDateChange(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary focus:ring-2 [color-scheme:dark]"
          />
        </div>

        <div>
          <label htmlFor="income-pay-period" className="text-sm font-medium">
            Pay Period
          </label>
          <select
            id="income-pay-period"
            value={payPeriod}
            onChange={(event) => onPayPeriodChange(event.target.value)}
            className="mt-2 w-full appearance-none rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary focus:ring-2"
          >
            {PAY_PERIODS.map((period) => (
              <option key={period.id} value={period.id}>
                {period.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="income-period-start" className="text-sm font-medium">
            Period Start
          </label>
          <input
            id="income-period-start"
            type="date"
            value={periodStart}
            onChange={(event) => onPeriodStartChange(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary focus:ring-2 [color-scheme:dark]"
          />
        </div>

        <div>
          <label htmlFor="income-period-end" className="text-sm font-medium">
            Period End
          </label>
          <input
            id="income-period-end"
            type="date"
            value={periodEnd}
            onChange={(event) => onPeriodEndChange(event.target.value)}
            required
            className="mt-2 w-full rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary focus:ring-2 [color-scheme:dark]"
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label htmlFor="income-notes" className="text-sm font-medium">
            Notes <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <span className="text-xs text-muted-foreground">
            {notes.length}/{MAX_NOTES}
          </span>
        </div>
        <textarea
          id="income-notes"
          value={notes}
          onChange={(event) => onNotesChange(event.target.value.slice(0, MAX_NOTES))}
          placeholder="Anything worth remembering about this payout?"
          rows={3}
          className="mt-2 w-full resize-none rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary placeholder:text-muted-foreground focus:ring-2"
        />
      </div>
    </div>
  );
}
