import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ordinal } from "@/utils/ordinal";

const FIRST_DAY_OPTIONS = Array.from({ length: 27 }, (_, i) => i + 1);
const MAX_SECOND_DAY = 31;

function DaySelect({ id, label, value, options, onChange, disabled = false }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>

      <select
        id={id}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        disabled={disabled}
        className="mt-2 w-full appearance-none rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
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

export function SalaryScheduleCard({ schedule, onSave, isSaving = false }) {
  // Local state for salary schedule
  const [firstPayDay, setFirstPayDay] = useState(schedule?.firstPayDay ?? 1);

  const [secondPayDay, setSecondPayDay] = useState(
    schedule?.secondPayDay ?? 15,
  );

  // Update local state when API data changes
  useEffect(() => {
    setFirstPayDay(schedule?.firstPayDay ?? 1);
    setSecondPayDay(schedule?.secondPayDay ?? 15);
  }, [schedule?.firstPayDay, schedule?.secondPayDay]);

  // Automatically adjust second payday
  const handleFirstPayDayChange = (day) => {
    setFirstPayDay(day);

    if (secondPayDay <= day) {
      setSecondPayDay(Math.min(day + 1, MAX_SECOND_DAY));
    }
  };

  // Available second payday options
  const secondDayOptions = Array.from(
    { length: MAX_SECOND_DAY - firstPayDay },
    (_, i) => firstPayDay + 1 + i,
  );

  // Check whether the user changed the schedule
  const hasSchedule = Boolean(schedule?._id);

  const hasChanges =
    !hasSchedule ||
    firstPayDay !== (schedule?.firstPayDay ?? 1) ||
    secondPayDay !== (schedule?.secondPayDay ?? 15);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSaving || !hasChanges || !onSave) return;

    await onSave?.({
      firstPayDay,
      secondPayDay,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-card p-5 shadow-vault-card"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-dim text-primary">
          <CalendarDays className="size-5" />
        </span>

        <div>
          <h2 className="font-semibold">Salary Schedule</h2>

          <p className="text-xs text-muted-foreground">
            {hasSchedule
              ? "Manage when your paycheck lands each month"
              : "You haven't set up your salary schedule yet. Choose your payday dates to get started."}
          </p>
        </div>
      </div>

      {/* Payday selections */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <DaySelect
          id="first-pay-day"
          label="First Payday"
          value={firstPayDay}
          options={FIRST_DAY_OPTIONS}
          onChange={handleFirstPayDayChange}
          disabled={isSaving}
        />

        <DaySelect
          id="second-pay-day"
          label="Second Payday"
          value={secondPayDay}
          options={secondDayOptions}
          onChange={setSecondPayDay}
          disabled={isSaving}
        />
      </div>

      {/* Salary schedule preview */}
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

      {/* Save button */}
      <Button
        type="submit"
        disabled={isSaving || !hasChanges}
        className="mt-4 w-full gap-2 rounded-2xl bg-primary text-primary-foreground shadow-emerald-glow hover:bg-primary/90 sm:w-auto"
      >
        <CheckCircle2 className="size-4.5" />

        {isSaving
          ? "Saving..."
          : hasSchedule
            ? "Update Schedule"
            : "Create Schedule"}
      </Button>
    </form>
  );
}
