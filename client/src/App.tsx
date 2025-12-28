import AppRouter from "./AppRouter.tsx";
import AppContainer from "./components/ui/AppContainer.tsx";
import "./index.css";

export default function App() {
  return (
    <AppContainer>
      <AppRouter />
    </AppContainer>
  );
}
