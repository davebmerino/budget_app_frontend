import { apiFetch } from "@/lib/apiFetch.js";
import { useQuery } from "@tanstack/react-query";

// Function to fetch salary schedule
const fetchSalarySchedule = async () => {
  const response = await apiFetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/salary-schedule/fetch`,
    {
      method: "GET",
      credentials: "include",
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
        `Fetching salary schedule failed with status ${response.status}`,
    );
  }

  return result;
};

// Create query hook
export default function useSalarySchedule() {
  return useQuery({
    queryKey: ["salary-schedule"],
    queryFn: fetchSalarySchedule,
  });
}
