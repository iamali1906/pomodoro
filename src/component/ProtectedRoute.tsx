import { Outlet, Navigate } from "react-router";
import MainLayout from "./layout/MainLayout";

export const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  let login = false;
  if (token) {
    login = token ? true : false;
  }
  return login ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/signin" />
  );
};
