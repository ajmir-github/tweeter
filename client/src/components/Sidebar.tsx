import {
  BellIcon,
  HomeIcon,
  LayoutListIcon,
  LogOutIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link, NavLink } from "react-router";
import { useAppSelector } from "../state";
import classes from "../utils/classes";

function CustomNavLink({
  icon,
  href,
  lebal,
  className,
}: {
  lebal: string;
  href: string;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        classes.join(
          className,
          "flex flex-row gap-2 p-2 items-center hover:bg-slate-600 rounded-lg duration-400 cursor-pointer  grow",
          isActive && "bg-slate-700"
        )
      }
    >
      {icon}
      <div className="hidden sm:inline">{lebal}</div>
    </NavLink>
  );
}

export default function Sidebar() {
  const auth = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex flex-col items-stretch gap-2 justify-between h-full ">
      <Link
        to="/"
        className="text-center uppercase font-extrabold text-4xl sm:text-6xl bg-linear-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
      >
        X
      </Link>
      <div className="flex flex-col gap-2">
        <CustomNavLink href="/" lebal="Home" icon={<HomeIcon />} />
        <CustomNavLink href="/search" lebal="Search" icon={<SearchIcon />} />
        <CustomNavLink
          href="/explore"
          lebal="Explore"
          icon={<LayoutListIcon />}
        />
        <CustomNavLink href="/profile" lebal="Profile" icon={<UserIcon />} />
        <CustomNavLink
          href="/notifcations"
          lebal="Notification"
          icon={<BellIcon />}
        />
        <CustomNavLink href="/signin" lebal="Sign out" icon={<LogOutIcon />} />
      </div>
    </div>
  );
}
