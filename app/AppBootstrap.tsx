import OfflineScreen from "@/components/ui/states/OfflineScreen";
import ServerStatusScreen from "@/components/ui/states/ServerStatusScreen";
import { useIncomingCallListener } from "@/hooks/useIncomingCallListener";
import { useSocketLifecycle } from "@/hooks/useSocketLifecycle";
import { registerForFcmToken } from "@/services/notificationService";
import { useAuthStore } from "@/stores/authStore";
import { useProfileStore } from "@/stores/profileStore";
import { useServerStatusStore } from "@/stores/serverStatusStore";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
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
  const netInfo = useNetInfo();
  const { isServerDown, message, checkHealthNow } = useServerStatusStore();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const init = async () => {
      await initializeAuth();
      const { user: authUser, accessToken } = useAuthStore.getState();

      if (authUser && accessToken) {
        void useProfileStore
          .getState()
          .getProfile()
          .catch((error) => {
            console.error("Failed to refresh profile on app launch:", error);
          });
      }

      if (fontsLoaded) {
        timer = setTimeout(() => {
          setAppIsReady(true);
        }, 500);
      }
    };

    init();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [fontsLoaded, initializeAuth]);

  useSocketLifecycle(Boolean(user && appIsReady));
  useIncomingCallListener(Boolean(user && appIsReady));

  useEffect(() => {
    const setupFcm = async () => {
      if (!user) return;
      try {
        const token = await registerForFcmToken();
        console.log("FCM_TOKEN =>", token);
      } catch (e) {
        console.log("FCM setup error:", e);
      }
    };

    setupFcm();
  }, [user]);



  if (!appIsReady) {
    return <SplashScreen />;
  }

  const isOffline =
    netInfo.isConnected === false || netInfo.isInternetReachable === false;

  if (isOffline) {
    return (
      <OfflineScreen
        onReload={() => {
          void NetInfo.refresh();
        }}
      />
    );
  }

  if (isServerDown) {
    return (
      <ServerStatusScreen
        message={message}
        onReload={() => {
          void checkHealthNow();
        }}
      />
    );
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

