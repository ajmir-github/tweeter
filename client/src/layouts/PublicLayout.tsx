import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="bg-slate-200 min-h-dvh flex justify-center items-center">
      <Outlet />
    </div>
  );
}
