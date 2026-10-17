import { Toaster } from "sonner";
import AppRoutes from "@/routes/AppRoutes";
import { useTheme } from "@/context/ThemeContext";

export default function App() {
  const { theme } = useTheme();
  return (
    <>
      <AppRoutes />
      <Toaster theme={theme} richColors closeButton position="bottom-right" />
    </>
  );
}