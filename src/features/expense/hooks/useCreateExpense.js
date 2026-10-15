import { apiFetch } from "@/lib/apiFetch.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Function to create an expense
const createExpense = async (expense) => {
  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/expense`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(expense),
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
        `Creating expense failed with status ${response.status}`,
    );
  }

  return result;
};

// Create mutation hook
export default function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });

      // queryClient.invalidateQueries({
      //   queryKey: ["monthly-summary"],
      // });
    },
  });
}
