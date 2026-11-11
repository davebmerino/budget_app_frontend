import { MobileHeader } from "@/components/layout/MobileHeader";
import { Button } from "@/components/ui/button";
import { SalaryScheduleCard } from "@/features/settings/components/SalaryScheduleCard";

import useSalarySchedule from "../hooks/useSalarySchedule";
import useCreateSalarySchedule from "../hooks/useCreateSalarySchedule";
import useUpdateSalarySchedule from "../hooks/useUpdateSalarySchedule";
import { toast } from "@/components/ui/toast";

// Import your actual toast utility here.
// Example: import { toast } from "@/components/ui/toast";

export function SettingsPage() {
  const { data, isLoading, isError, error, refetch } = useSalarySchedule();

  const { mutateAsync: createSchedule, isPending: isCreating } =
    useCreateSalarySchedule();

  const { mutateAsync: updateSchedule, isPending: isUpdating } =
    useUpdateSalarySchedule();

  // Adjust this depending on your actual API response.
  const schedule = data?.data?.data ?? null;

  const hasSchedule = Boolean(schedule?._id);

  const isSaving = isCreating || isUpdating;

  const handleSaveSalarySchedule = async (values) => {
    try {
      if (hasSchedule) {
        await updateSchedule(values);
      } else {
        await createSchedule(values);
      }

      toast.add({
        type: "success",
        title: hasSchedule
          ? "Salary schedule updated successfully"
          : "Salary schedule created successfully",
      });
    } catch (error) {
      toast.add({
        type: "error",
        title: "Error saving salary schedule",
        description: error.message || "Failed to save salary schedule.",
      });
    }
  };

  return (
    <>
      <MobileHeader title="Vault" />

      <div className="px-5 pb-8">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

        <p className="text-sm text-muted-foreground">
          Manage how Vault tracks your money
        </p>

        <div className="mt-5 flex flex-col gap-4 lg:max-w-2xl">
          {isLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading salary schedule...
            </p>
          ) : isError ? (
            <div className="rounded-2xl border border-destructive/30 bg-card p-4">
              <p className="text-sm text-destructive">
                {error?.message || "Failed to load salary schedule."}
              </p>

              <Button
                type="button"
                variant="outline"
                onClick={() => refetch()}
                className="mt-3"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <SalaryScheduleCard
              schedule={schedule}
              onSave={handleSaveSalarySchedule}
              isSaving={isSaving}
            />
          )}
        </div>
      </div>
    </>
  );
}
