import "./index.css"; // Make sure Tailwind is imported
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import LandingPagePage from "./pages/LandingPage";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <Toaster richColors position="top-right" />
      <LandingPagePage />
    </ThemeProvider>
  );
}

export default App;
