import Navbar from "@/components/Navbar";
import { useAppSelector } from "@/state";
import { Navigate, Outlet } from "react-router";

export default function PrivateLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.user);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="grow w-full h-full p-4 overflow-x-hidden overflow-y-auto snap-y snap-mandatory touch-pan-y scroll-smooth hide-scrollbar">
        <Outlet />
      </div>
      <Navbar />
    </div>
  );
}
