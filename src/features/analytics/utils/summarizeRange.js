export const RANGES = [
  { key: "3M", label: "3M", months: 3 },
  { key: "6M", label: "6M", months: 6 },
  { key: "1Y", label: "1Y", months: 12 },
];

const sum = (rows, key) => rows.reduce((total, row) => total + row[key], 0);

function totals(rows) {
  const income = sum(rows, "income");
  const expenses = sum(rows, "expenses");
  return {
    income,
    expenses,
    net: income - expenses,
    savingsRate: income > 0 ? ((income - expenses) / income) * 100 : 0,
  };
}

/**
 * Totals for the last `months` rows, plus the same totals for the `months`
 * before them (`previous`) when there's enough history to compare against.
 */
export function summarizeRange(monthly, months) {
  const rows = monthly.slice(-months);
  const previousRows = monthly.length >= months * 2 ? monthly.slice(-months * 2, -months) : null;

  return {
    rows,
    ...totals(rows),
    previous: previousRows ? totals(previousRows) : null,
  };
}

/** Percent change from `before` to `now`; null when there's nothing to compare. */
export function percentChange(now, before) {
  if (before == null || before === 0) return null;
  return ((now - before) / Math.abs(before)) * 100;
}
