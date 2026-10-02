import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "./components/ui/toast";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "@/routes.jsx";
import { RouterProvider } from "react-router-dom";

// Create ONE QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
