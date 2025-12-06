import Navbar from "./Navbar";
import Tweet from "./Tweet";

export default function Layout() {
  return (
    <div className="bg-slate-200 min-h-dvh flex justify-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 grow max-w-5xl gap-4">
        <div className="sm:static fixed w-full sm:bottom-auto bottom-0 sm:left-auto left-0 sm:row-span-2">
          <Navbar />
        </div>
        <div className="feed col-span-1 sm:col-span-2 grow rounded-xl border border-gray-300 overflow-clip grid grid-cols-1 gap-0.5">
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
          <Tweet />
        </div>
        <div className="col-span-1 sm:col-span-2 md:col-span-1 bg-white rounded-xl border border-gray-300 p-4">
          <div>right</div>
        </div>
      </div>
    </div>
  );
}
