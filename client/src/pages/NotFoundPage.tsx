import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="h-full flex justify-center items-center flex-col">
      <div className="font-light text-9xl">404</div>
      <div className="flex gap-2 items-center">
        <AlertCircleIcon /> URL not found!
        <Button variant={"link"} asChild>
          <Link to={"/"}>Go back</Link>
        </Button>
      </div>
    </div>
  );
}
