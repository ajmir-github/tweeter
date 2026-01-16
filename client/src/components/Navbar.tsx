import { cn } from "@/lib/utils";
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

const DLink = ({
  icon,
  label,
  to,
  className,
}: {
  icon: ReactNode;
  to: string;
  label: string;
  className?: string;
}) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex justify-center items-center gap-2 hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary/50 rounded-xl  p-2 sm:px-3 duration-200",
        isActive && "bg-primary text-primary-foreground",
        className
      )
    }
  >
    {icon}
    <span className="hidden sm:inline uppercase">{label}</span>
  </NavLink>
);

export default function Navbar() {
  return (
    <div className="fixed bottom-0 left-[50%] translate-x-[-50%] ring ring-foreground/10 bg-secondary/10 backdrop-blur-lg p-2 rounded-t-2xl flex items-center gap-2 justify-center">
      <DLink to={"/"} icon={<HomeIcon />} label="Home" />
      <DLink to={"/search"} icon={<SearchIcon />} label="Search" />
      <DLink to={"/add"} icon={<PlusIcon />} label="Add" />
      <DLink to={"/profile"} icon={<UserIcon />} label="Profile" />
      <DLink to={"/settings"} icon={<SettingsIcon />} label="Settings" />
    </div>
  );
}
