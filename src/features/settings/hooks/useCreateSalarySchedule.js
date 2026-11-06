import { apiFetch } from "@/lib/apiFetch.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Function to create a salary schedule
const createSalarySchedule = async (schedule) => {
  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/salary-schedule/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(schedule),
    },
  );

  // Get the response
  const result = await response.json().catch(() => null);

  // Handle API errors
  if (!response.ok) {
    const validationErrors = Array.isArray(result?.error?.data)
      ? result.error.data
      : Array.isArray(result?.data)
        ? result.data
        : [];

    throw new Error(
      validationErrors[0]?.msg ||
        result?.error?.message ||
        result?.message ||
        `Creating salary schedule failed with status ${response.status}`,
    );
  }

  return result;
};

// Create mutation hook
export default function useCreateSalarySchedule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSalarySchedule,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["salary-schedule"],
      });
    },
  });
}
