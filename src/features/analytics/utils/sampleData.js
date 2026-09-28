// Placeholder data shaped like what features/analytics/hooks/useAnalytics()
// will return once the backend can aggregate expenses by month and category.
// The last month is month-to-date (`partial: true`), matching the Dashboard's
// October sample numbers.
export const MONTHLY_CASH_FLOW = [
  { month: "Nov", income: 5420, expenses: 3980 },
  { month: "Dec", income: 6270, expenses: 4620 },
  { month: "Jan", income: 5420, expenses: 3710 },
  { month: "Feb", income: 5420, expenses: 3540 },
  { month: "Mar", income: 5420, expenses: 3890 },
  { month: "Apr", income: 6270, expenses: 3760 },
  { month: "May", income: 5420, expenses: 4010 },
  { month: "Jun", income: 5420, expenses: 3850 },
  { month: "Jul", income: 5420, expenses: 4190 },
  { month: "Aug", income: 5420, expenses: 3920 },
  { month: "Sep", income: 6270, expenses: 3870 },
  { month: "Oct", income: 5420, expenses: 2180, partial: true },
];

// Share of total spend per category. Amounts are derived from the selected
// range's total, so the breakdown follows the period selector.
export const CATEGORY_SHARES = [
  { id: "housing", name: "Housing & Utilities", share: 0.36, color: "var(--chart-1)" },
  { id: "food", name: "Food & Dining", share: 0.21, color: "var(--chart-2)" },
  { id: "shopping", name: "Shopping & Tech", share: 0.14, color: "var(--chart-3)" },
  { id: "transport", name: "Transport", share: 0.09, color: "var(--chart-4)" },
  { id: "subscriptions", name: "Subscriptions", share: 0.04, color: "var(--chart-5)" },
  { id: "other", name: "Other", share: 0.16, color: "var(--muted-foreground)" },
];

// This month's running total, one entry per day so far (day 17 of 31).
// `reserved` = fixed obligations (rent etc.) that land up-front.
export const PACE_SAMPLE = {
  budget: 4500,
  reserved: 1400,
  daysInMonth: 31,
  cumulativeSpend: [
    1400, 1432, 1489, 1489, 1540, 1602, 1602, 1655, 1701, 1760, 1760, 1838, 1911, 1911, 2004, 2091, 2180,
  ],
};
