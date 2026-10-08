// Mirrors the Salary schema's `payPeriod` enum exactly.
export const PAY_PERIODS = [
  { id: "first-half", name: "First Half" },
  { id: "second-half", name: "Second Half" },
];

const toISODate = (date) => date.toISOString().slice(0, 10);

/**
 * Default periodStart/periodEnd for a given payPeriod, based on calendar
 * month halves (1st-15th, 16th-end) for `reference`'s month. This is a
 * starting guess the person can still override — once the real
 * SalarySchedule (firstPayDay/secondPayDay) is wired in here, swap this for
 * their actual configured days instead of the calendar midpoint.
 */
export function getDefaultPeriodRange(payPeriod, reference = new Date()) {
  const year = reference.getFullYear();
  const month = reference.getMonth();

  if (payPeriod === "first-half") {
    return {
      periodStart: toISODate(new Date(year, month, 1)),
      periodEnd: toISODate(new Date(year, month, 15)),
    };
  }

  const lastDay = new Date(year, month + 1, 0).getDate();
  return {
    periodStart: toISODate(new Date(year, month, 16)),
    periodEnd: toISODate(new Date(year, month, lastDay)),
  };
}
