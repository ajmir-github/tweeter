import { useAppDispatch } from "@/state";
import authSlice from "@/state/authSlice";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const handleLogout = () => dispatch(authSlice.actions.signOut());
  return (
    <div className="flex justify-between">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
