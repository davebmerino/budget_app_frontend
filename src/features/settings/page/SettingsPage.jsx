import { MobileHeader } from "@/components/layout/MobileHeader";
import { SalaryScheduleCard } from "@/features/settings/components/SalaryScheduleCard";

// Props default to a sample schedule so the page renders on its own. Swap
// `schedule` for the result of a features/settings/hooks/useSalarySchedule()
// call, and have onSaveSalarySchedule persist to that endpoint (it already
// receives { firstPayDay, secondPayDay } — the schema's own field names).
export function SettingsPage({
  onNavigate,
  onAddTransaction,
  schedule = { firstPayDay: 1, secondPayDay: 15 },
  onSaveSalarySchedule,
}) {
  return (
    <>
      <MobileHeader title="Vault" />

      <div className="px-5 pb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage how Vault tracks your money
        </p>

        {/* More setting cards (e.g. accounts, notifications) can go here
            later, following the same card-per-concern pattern. */}
        <div className="mt-5 flex flex-col gap-4 lg:max-w-2xl">
          <SalaryScheduleCard
            schedule={schedule}
            onSave={onSaveSalarySchedule}
          />
        </div>
      </div>
    </>
  );
}
