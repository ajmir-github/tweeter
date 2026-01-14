import { Server } from "@/services";
import { useAppDispatch } from "@/state";
import authSlice from "@/state/authSlice";
import LocalToken from "@/utils/LocalToken";
import { Loader2Icon } from "lucide-react";
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

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );

  return (
    <div className="w-full min-h-dvh">
      <Outlet />
    </div>
  );
}
