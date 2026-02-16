import ErrorBoundary from "@/components/ui/error/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "@/utils/i18n";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Toaster } from "sonner-native";
import AppBootstrap from "./AppBootstrap";
import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <ThemeProvider>
          <AppBootstrap />
          <Toaster />
        </ThemeProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
