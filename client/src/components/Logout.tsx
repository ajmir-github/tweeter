import { useAppDispatch } from "@/state";
import authSlice from "@/state/authSlice";
import { useEffect } from "react";
import { Navigate } from "react-router";

export default function Logout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authSlice.actions.signOut());
  }, []);
  return <Navigate to={"/login"} />;
}
