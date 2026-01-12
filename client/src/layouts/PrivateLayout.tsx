import Sidebar from "@/components/Sidebar";
import { useAppSelector } from "@/state";
import { Navigate, Outlet } from "react-router";

export default function PrivateLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.user);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <div className=" h-full w-full flex justify-center">
      <div className="grow max-w-5xl flex">
        <div className=" p-2 sm:p-4 bg-slate-800">
          <Sidebar />
        </div>
        <div className="grow  p-2 sm:p-4 overflow-y-auto flex flex-col gap-2 sm:gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
