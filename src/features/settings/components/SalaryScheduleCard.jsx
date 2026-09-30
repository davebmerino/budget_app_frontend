import { useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ordinal } from "@/utils/ordinal";

const FIRST_DAY_OPTIONS = Array.from({ length: 27 }, (_, i) => i + 1); // schema: min 1, max 27
const MAX_SECOND_DAY = 31; // schema: min 2, max 31, and must be > firstPayDay

function DaySelect({ id, label, value, options, onChange }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-2 w-full appearance-none rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary focus:ring-2"
      >
        {options.map((day) => (
          <option key={day} value={day}>
            {ordinal(day)} of the month
          </option>
        ))}
      </select>
    </div>
  );
}

/**
 * `schedule` = { firstPayDay, secondPayDay } — same field names as the
 * SalarySchedule Mongoose schema, so onSave's payload can go straight to
 * that endpoint. Defaults to the 1st and 15th when nothing is passed in.
 */
export function SalaryScheduleCard({ schedule, onSave }) {
  const [firstPayDay, setFirstPayDay] = useState(schedule?.firstPayDay ?? 1);
  const [secondPayDay, setSecondPayDay] = useState(
    schedule?.secondPayDay ?? 15,
  );

  // secondPayDay must stay > firstPayDay (matches the schema's custom
  // validator) — bump it forward automatically instead of letting the two
  // fall out of sync and showing an error after the fact.
  const handleFirstPayDayChange = (day) => {
    setFirstPayDay(day);
    if (secondPayDay <= day) {
      setSecondPayDay(Math.min(day + 1, MAX_SECOND_DAY));
    }
  };

  const secondDayOptions = Array.from(
    { length: MAX_SECOND_DAY - firstPayDay },
    (_, i) => firstPayDay + 1 + i,
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.({ firstPayDay, secondPayDay });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-5 shadow-vault-card"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-dim text-primary">
          <CalendarDays className="size-5" />
        </span>
        <div>
          <h2 className="font-semibold">Salary Schedule</h2>
          <p className="text-xs text-muted-foreground">
            When your paycheck lands each month
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DaySelect
          id="first-pay-day"
          label="First Payday"
          value={firstPayDay}
          options={FIRST_DAY_OPTIONS}
          onChange={handleFirstPayDayChange}
        />
        <DaySelect
          id="second-pay-day"
          label="Second Payday"
          value={secondPayDay}
          options={secondDayOptions}
          onChange={setSecondPayDay}
        />
      </div>

      <p className="mt-4 rounded-2xl bg-vault-surface p-3.5 text-sm text-muted-foreground">
        Paid on the{" "}
        <span className="font-medium text-foreground">
          {ordinal(firstPayDay)}
        </span>{" "}
        and{" "}
        <span className="font-medium text-foreground">
          {ordinal(secondPayDay)}
        </span>{" "}
        of each month.
      </p>

      <Button
        type="submit"
        className="mt-4 w-full gap-2 rounded-2xl bg-primary text-primary-foreground shadow-emerald-glow hover:bg-primary/90 sm:w-auto"
      >
        <CheckCircle2 className="size-4.5" />
        Save Schedule
      </Button>
    </form>
  );
}
