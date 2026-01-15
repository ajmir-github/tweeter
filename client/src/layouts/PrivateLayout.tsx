import Navbar from "@/components/Navbar";
import { useAppSelector } from "@/state";
import { Navigate, Outlet } from "react-router";

export default function PrivateLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.user);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
}
