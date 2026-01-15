import { useAppDispatch } from "@/state";
import authSlice from "@/state/authSlice";
export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(authSlice.actions.signOut());
  return (
    <>
      <h1>SettingsPage</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}
