import { cn } from "@/lib/utils";
import {
  HashIcon,
  HomeIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <div className="flex justify-center w-full">
      <div className="flex  bg-primary-foreground shadow gap-2 justify-center border-t border grow p-2 rounded-t-4xl">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            cn(
              "p-2 hover:bg-secondary rounded-lg flex items-center gap-2 duration-200 flex-col sm:flex-row grow justify-center",
              isActive && "text-pink-500"
            )
          }
        >
          <HomeIcon />
          <span className="hidden sm:inline">Home</span>
        </NavLink>
        <NavLink
          to={"/explore"}
          className={({ isActive }) =>
            cn(
              "p-2 hover:bg-secondary rounded-lg flex items-center gap-2 duration-200 flex-col sm:flex-row grow justify-center",
              isActive && "text-pink-500"
            )
          }
        >
          <HashIcon />
          <span className="hidden sm:inline">Explore</span>
        </NavLink>
        <NavLink
          to={"/add"}
          className={({ isActive }) =>
            cn(
              "p-2 hover:bg-secondary rounded-lg flex items-center gap-2 duration-200 flex-col sm:flex-row grow justify-center",
              isActive && "text-pink-500"
            )
          }
        >
          <PlusIcon />
          <span className="hidden sm:inline">Snap</span>
        </NavLink>
        <NavLink
          to={"/search"}
          className={({ isActive }) =>
            cn(
              "p-2 hover:bg-secondary rounded-lg flex items-center gap-2 duration-200 flex-col sm:flex-row grow justify-center",
              isActive && "text-pink-500"
            )
          }
        >
          <SearchIcon />
          <span className="hidden sm:inline">Search</span>
        </NavLink>
        <NavLink
          to={"/profile"}
          className={({ isActive }) =>
            cn(
              "p-2 hover:bg-secondary rounded-lg flex items-center gap-2 duration-200 flex-col sm:flex-row grow justify-center",
              isActive && "text-pink-500"
            )
          }
        >
          <UserIcon />
          <span className="hidden sm:inline">Profile</span>
        </NavLink>
      </div>
    </div>
  );
}
