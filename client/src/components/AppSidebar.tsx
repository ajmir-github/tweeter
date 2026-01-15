import { Link } from "react-router";

export default function AppSidebar() {
  return (
    <div className="h-full flex flex-col justify-between bg-accent">
      <div className="bg-primary rounded-br-4xl  p-2 flex flex-col items-center shadow">
        <Link to={"/"}>home</Link>
        <Link to={"/"}>profiles</Link>
        <Link to={"/"}>hashtags</Link>
        <Link to={"/"}>search</Link>
      </div>
      <div className="bg-primary rounded-tr-4xl p-2 flex flex-col items-center shadow">
        <Link to={"/"}>profile</Link>
        <Link to={"/"}>dark</Link>
        <Link to={"/"}>settings</Link>
        <Link to={"/"}>logout</Link>
      </div>
    </div>
  );
}
