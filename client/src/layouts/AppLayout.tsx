import { Spinner } from "@/components/ui/spinner";
import { Server } from "@/services";
import { useAppDispatch } from "@/state";
import authSlice from "@/state/authSlice";
import LocalToken from "@/utils/LocalToken";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function AppLayout() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!LocalToken.has()) return setLoading(false);
    Server.auth.self
      .query()
      .then((user) => {
        dispatch(authSlice.actions.update(user));
      })
      .catch((error) => {
        console.error(error);
        dispatch(authSlice.actions.signOut());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="font-mono bg-linear-to-b  w-full h-dvh overflow-hidden">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner className="size-12 text-pink-500" />
        </div>
      ) : (
        <div className="h-full max-w-4xl m-auto p-4">
          <Outlet />
        </div>
      )}
    </div>
  );
}
