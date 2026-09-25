import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import { DashboardPage } from "./features/dashboard/components/DashboardPage";
import { BudgetCategoryDetailPage } from "./features/budgets/components/BudgetCategoryDetailPage";
import { AppShell } from "./components/layout/AppShell";

export const router = createBrowserRouter([
  {
    path: paths.login,
    element: <Login />,
  },

  {
    element: <AppShell />,
    children: [
      { path: paths.signup, element: <Signup /> },
      { path: paths.dashboard, element: <DashboardPage /> },
      { path: paths.budgets, element: <BudgetCategoryDetailPage /> },
    ],
  },
]);
