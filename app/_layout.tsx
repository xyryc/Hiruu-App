import ErrorBoundary from "@/components/ui/error/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { socketService } from "@/services/socketService";
import { useAuthStore } from "@/stores/authStore";
import "@/utils/i18n";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Toaster } from "sonner-native";
import "./global.css";
import SplashScreen from "./splash";

const AppContent = () => {
  const [fontsLoaded] = useFonts({
    "ProximaNova-Thin": require("../assets/fonts/ProximaNova-Thin.ttf"),
    "ProximaNova-Light": require("../assets/fonts/ProximaNova-Light.ttf"),
    "ProximaNova-Regular": require("../assets/fonts/ProximaNova-Regular.ttf"),
    "ProximaNova-Medium": require("../assets/fonts/ProximaNova-Medium.ttf"),
    "ProximaNova-Semibold": require("../assets/fonts/ProximaNova-Semibold.ttf"),
    "ProximaNova-Bold": require("../assets/fonts/ProximaNova-Bold.ttf"),
    "ProximaNova-Black": require("../assets/fonts/ProximaNova-Black.ttf"),
  });

  const [appIsReady, setAppIsReady] = useState(false);
  const { initializeAuth, user } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      // Initialize auth state from storage
      await initializeAuth();

      if (fontsLoaded) {
        const timer = setTimeout(() => {
          setAppIsReady(true);
        }, 500); // default: 1500

        return () => clearTimeout(timer);
      }
    };

    init();
  }, [fontsLoaded]);

  // Initialize socket connection when user is authenticated
  useEffect(() => {
    if (user && appIsReady) {
      // Connect to socket when user is logged in
      socketService.connect().catch((error) => {
        console.error('Failed to connect to socket:', error);
      });

      return () => {
        // Disconnect when user logs out or app unmounts
        socketService.disconnect();
      };
    }
  }, [user, appIsReady]);

  if (!appIsReady) {
    return <SplashScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <ThemeProvider>
          <AppContent />
          <Toaster />
        </ThemeProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
