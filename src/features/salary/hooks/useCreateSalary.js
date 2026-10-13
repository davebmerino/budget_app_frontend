import { apiFetch } from "@/lib/apiFetch.js";
import { useMutation } from "@tanstack/react-query";

// Function to create salary
const createSalary = async (salary) => {
  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/salary/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(salary),
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
        `Creating salary failed with status ${response.status}`,
    );
  }

  return result;
};

// Create mutation hook
export default function useCreateSalary() {
  return useMutation({
    mutationFn: createSalary,
  });
}
