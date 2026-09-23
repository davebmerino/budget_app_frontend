import { createBrowserRouter } from "react-router-dom";
import { paths } from "./paths";
import Login from "./features/auth/pages/Login";
import Signup from "./features/auth/pages/Signup";

export const router = createBrowserRouter([
  {
    path: paths.login,
    element: <Login />,
  },
  { path: paths.signup, element: <Signup /> },
  { path: paths.dashboard, element: <h1>This is Dashboard</h1> },
]);
