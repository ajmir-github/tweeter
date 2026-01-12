import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="font-mono  bg-linear-to-b  w-full h-dvh overflow-hidden">
      <div className="h-full max-w-5xl m-auto">
        <Outlet />
      </div>
    </div>
  );
}
