/**
 * Format a number as USD-style currency, e.g. formatCurrency(1400) -> "$1,400.00"
 * Pass { showSign: true } to prefix positive values with "+" (used for income lines).
 */
export function formatCurrency(value, { currency = "USD", showSign = false } = {}) {
  const amount = Number(value) || 0;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));

  const sign = amount < 0 ? "-" : showSign ? "+" : "";
  return `${sign}${formatted}`;
}

/** Format an integer/decimal as a compact percentage, e.g. formatPercent(51.25) -> "51%" */
export function formatPercent(value) {
  return `${Math.round(Number(value) || 0)}%`;
}
