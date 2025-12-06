import {
  BellIcon,
  HashIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";

export default function Navbar() {
  return (
    <div className="bg-slate-200/50 sm:bg-transparent sm:sticky font-semibold sm:top-4 max-[40rem]:border-gray-300 max-[40rem]:border-t max-[40rem]:backdrop-blur-sm w-full p-4 max-[40rem]:shadowa-2xl flex justify-around  sm:justify-start gap-4 sm:flex-col">
      <h1 className="hidden sm:inline uppercase font-extrabold font-mono text-3xl bg-linear-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
        Tweeter
      </h1>
      <div className="flex flex-col sm:flex-row gap-2 items-center hover:text-blue-700 duration-200 cursor-pointer">
        <SearchIcon />
        <div className="">Search</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-center hover:text-blue-700 duration-200 cursor-pointer">
        <HomeIcon />
        <div className="">Home</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-center hover:text-blue-700 duration-200 cursor-pointer">
        <HashIcon />
        <div className="">Explore</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-center hover:text-blue-700 duration-200 cursor-pointer">
        <BellIcon />
        <div className="">Notification</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 items-center hover:text-blue-700 duration-200 cursor-pointer">
        <UserIcon />
        <div className="">Profile</div>
      </div>
    </div>
  );
}
