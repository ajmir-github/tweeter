import { useAppSelector } from "@/state";
import { Navigate, Outlet } from "react-router";

export default function PublicLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.user);
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="h-full overflow-y-scroll hide-scrollbar flex justify-center">
      <div className="grid max-w-md w-full p-4">
        <img src="/images/logo/l.png" className="h-60 object-cover w-full" />
        <Outlet />
      </div>
    </div>
  );
}
