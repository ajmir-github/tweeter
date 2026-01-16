import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch } from "@/state";
import authSlice from "@/state/authSlice";
import {
  LogOutIcon,
  MoonIcon,
  SunIcon,
  SunMoonIcon,
  TrashIcon,
} from "lucide-react";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { setTheme, theme } = useTheme();
  const handleLogout = () => dispatch(authSlice.actions.signOut());
  return (
    <div className="grid gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <ButtonGroup className="w-full">
            <Button
              variant={theme === "system" ? "default" : "outline"}
              className="grow"
              onClick={() => setTheme("system")}
            >
              <SunMoonIcon />
              System
            </Button>
            <ButtonGroupSeparator />
            <Button
              variant={theme === "light" ? "default" : "outline"}
              className="grow"
              onClick={() => setTheme("light")}
            >
              <SunIcon />
              Light
            </Button>
            <ButtonGroupSeparator />
            <Button
              variant={theme === "dark" ? "default" : "outline"}
              className="grow"
              onClick={() => setTheme("dark")}
            >
              <MoonIcon />
              Dark
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Button onClick={handleLogout} variant={"outline"}>
              <LogOutIcon /> Logout
            </Button>
            <Button onClick={handleLogout} variant={"destructive"}>
              <TrashIcon /> Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
