import AppRouter from "./AppRouter.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import "./index.css";

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <AppRouter />
    </ThemeProvider>
  );
}
