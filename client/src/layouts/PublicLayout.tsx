import { useAppSelector } from "@/state";
import { Navigate, Outlet } from "react-router";

export default function PublicLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.user);
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="h-full overflow-y-scroll hide-scrollbar flex justify-center">
      <div className="grid max-w-xs w-full">
        <img src="/images/logo/l.png" className="w-full" />
        <Outlet />
      </div>
    </div>
  );
}
