import { useAppSelector } from "@/state";
import { Navigate, Outlet } from "react-router";

export default function PublicLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.user);
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Outlet />
    </div>
  );
}
