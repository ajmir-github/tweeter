import { Toaster } from "sonner";
import AppRouter from "./AppRouter.tsx";
import "./index.css";

export default function App() {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}
