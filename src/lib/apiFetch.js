import Cookies from "js-cookie";
import { refreshAccessToken } from "@/features/auth/api/refreshAccessToken.js";

export async function apiFetch(url, options = {}) {
  const accessToken = Cookies.get("token");

  const sendRequest = (token) =>
    fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...options.headers,
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
      },
    });

  let response = await sendRequest(accessToken);

  if (response.status !== 401) {
    return response;
  }

  const newAccessToken = await refreshAccessToken();

  if (!newAccessToken) {
    throw new Error("Session expired. Please log in again.");
  }

  return sendRequest(newAccessToken);
}
