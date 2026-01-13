import {
  HashIcon,
  HomeIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="flex justify-center absolute bottom-0 left-0 md:bottom-4 w-full">
      <div className="flex gap-2 justify-center border-t md:border grow md:grow-0 p-2 md:rounded-lg">
        <Link
          to={"/"}
          className="p-2 hover:bg-secondary rounded-lg flex items-center gap-2"
        >
          <HomeIcon />
          <span className="hidden md:inline">Home</span>
        </Link>
        <Link
          to={"/explore"}
          className="p-2 hover:bg-secondary cursor-pointer rounded-lg flex items-center gap-2"
        >
          <HashIcon />
          <span className="hidden md:inline">Explore</span>
        </Link>
        <Link
          to={"/add"}
          className="p-2 text-primary hover:bg-secondary cursor-pointer rounded-lg flex items-center gap-2"
        >
          <PlusIcon />
          <span className="hidden md:inline">Post</span>
        </Link>
        <Link
          to={"/search"}
          className="p-2 hover:bg-secondary cursor-pointer rounded-lg flex items-center gap-2"
        >
          <SearchIcon />
          <span className="hidden md:inline">Search</span>
        </Link>
        <Link
          to={"/profile"}
          className="p-2 hover:bg-secondary cursor-pointer rounded-lg flex items-center gap-2"
        >
          <UserIcon />
          <span className="hidden md:inline">Profile</span>
        </Link>
      </div>
    </div>
  );
}
