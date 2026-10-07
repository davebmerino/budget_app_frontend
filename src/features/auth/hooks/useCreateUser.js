import { useMutation } from "@tanstack/react-query";

const useCreate = async (user) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    },
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    const validationMessage =
      Array.isArray(result?.data) && result.data.length > 0
        ? result.data[0].msg
        : null;
    throw new Error(
      validationMessage ||
        result?.error?.message ||
        "A user this email may already exists",
    );
  }

  return result;
};

// Create a custom hook that uses the useMutation

export default function useCreateUser() {
  return useMutation({
    mutationFn: useCreate,
    onSuccess: (response) => {
      console.log("User was created", response);
    },
    onError: (error) => {
      console.log("Error on creating new user", error);
    },
  });
}
