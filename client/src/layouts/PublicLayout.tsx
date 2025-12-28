import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <div className="flex h-full justify-center items-center overflow-y-scroll">
      <Outlet />
    </div>
  );
}
