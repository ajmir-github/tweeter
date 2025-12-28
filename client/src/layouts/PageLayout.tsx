import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function PageLayout() {
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
