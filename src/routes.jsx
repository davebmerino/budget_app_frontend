import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import { DashboardPage } from "./features/dashboard/page/DashboardPage";
import { BudgetCategoryDetailPage } from "./features/budgets/page/BudgetCategoryDetailPage";
import { AppShell } from "./components/layout/AppShell";
import { AddTransactionPage } from "./features/transactions/pages/AddTransactionPage";
import { AnalyticsPage } from "./features/analytics/page/AnalyticsPage";
import { SettingsPage } from "./features/settings/page/SettingsPage";

export const router = createBrowserRouter([
  {
    path: paths.login,
    element: <Login />,
  },
  { path: paths.signup, element: <Signup /> },

  {
    element: <AppShell />,
    children: [
      { path: paths.dashboard, element: <DashboardPage /> },
      { path: paths.budgets, element: <BudgetCategoryDetailPage /> },
      { path: paths.analytics, element: <AnalyticsPage /> },
      { path: paths.settings, element: <SettingsPage /> },
    ],
  },
]);
