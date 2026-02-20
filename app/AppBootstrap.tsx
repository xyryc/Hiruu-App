import { useIncomingCallListener } from "@/hooks/useIncomingCallListener";
import { useSocketLifecycle } from "@/hooks/useSocketLifecycle";
import { useAuthStore } from "@/stores/authStore";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import SplashScreen from "./splash";

const AppBootstrap = () => {
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
      await initializeAuth();

      if (fontsLoaded) {
        const timer = setTimeout(() => {
          setAppIsReady(true);
        }, 500);

        return () => clearTimeout(timer);
      }
    };

    init();
  }, [fontsLoaded, initializeAuth]);

  useSocketLifecycle(Boolean(user && appIsReady));
  useIncomingCallListener(Boolean(user && appIsReady));

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

export default AppBootstrap;

