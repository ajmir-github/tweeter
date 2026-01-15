import { cn } from "@/lib/utils";
import {
  HomeIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <div className="w-full fixed bottom-4 left-0 flex justify-center">
      <div className="bg-secondary/50 backdrop-blur-lg p-2 rounded-2xl flex items-center gap-2 justify-center">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            cn(
              "flex justify-center items-center gap-2 hover:bg-primary duration-300 p-4 rounded-xl",
              isActive && "bg-primary/50"
            )
          }
        >
          <HomeIcon />
          <span className="hidden sm:inline">Home</span>
        </NavLink>
        <NavLink
          to={"/search"}
          className={({ isActive }) =>
            cn(
              "flex justify-center items-center gap-2 hover:bg-primary duration-300 p-4 rounded-xl",
              isActive && "bg-primary/50"
            )
          }
        >
          <SearchIcon />
          <span className="hidden sm:inline">Search</span>
        </NavLink>
        <NavLink
          to={"/add"}
          className={({ isActive }) =>
            cn(
              "flex justify-center items-center gap-2 hover:bg-primary duration-300 p-4 rounded-xl",
              isActive && "bg-primary/50"
            )
          }
        >
          <PlusIcon />
          <span className="hidden sm:inline">Add</span>
        </NavLink>
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            cn(
              "flex justify-center items-center gap-2 hover:bg-primary duration-300 p-4 rounded-xl",
              isActive && "bg-primary/50"
            )
          }
        >
          <UserIcon />
          <span className="hidden sm:inline">Profile</span>
        </NavLink>
        <NavLink
          to={"/settings"}
          className={({ isActive }) =>
            cn(
              "flex justify-center items-center gap-2 hover:bg-primary duration-300 p-4 rounded-xl",
              isActive && "bg-primary/50"
            )
          }
        >
          <SettingsIcon />
          <span className="hidden sm:inline">Settings</span>
        </NavLink>
      </div>
    </div>
  );
}
