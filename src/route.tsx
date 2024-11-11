import { createBrowserRouter } from "react-router-dom";
import TimerPage from "./pages/TimerPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import SettingPage from "./pages/SettingPage";
import { ProtectedRoute } from "./component/ProtectedRoute";

export const routers = createBrowserRouter([
  {
    path: "signin",
    element: <SigninPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <TimerPage />,
      },
      {
        path: "settings",
        element: <SettingPage />,
      },
    ],
  },
]);
