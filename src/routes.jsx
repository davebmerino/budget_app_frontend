import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";
import { DashboardPage } from "./features/dashboard/components/DashboardPage";

export const router = createBrowserRouter([
  {
    path: paths.login,
    element: <Login />,
  },
  { path: paths.signup, element: <Signup /> },
  { path: paths.dashboard, element: <DashboardPage /> },
]);
