import Navbar from "@/components/Navbar";
import { useAppSelector } from "@/state";
import { Navigate, Outlet } from "react-router";

export default function PrivateLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.user);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <>
      <div className="overflow-x-hidden overflow-y-scroll hide-scrollbar grid gap-4">
        <Outlet />
      </div>
      <Navbar />
    </>
  );
}
