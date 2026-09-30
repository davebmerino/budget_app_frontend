/** Format a day-of-month number as an ordinal, e.g. ordinal(1) -> "1st", ordinal(22) -> "22nd" */
export function ordinal(day) {
  const n = Number(day);
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;

  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}
