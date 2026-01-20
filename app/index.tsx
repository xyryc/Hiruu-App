import { useStore } from "@/stores/store";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, isInitialized, initializeAuth } = useStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setIsReady(true);
    };
    init();
  }, []);

  // Show loading while checking auth state
  if (!isReady || !isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // User is logged in
  if (user) {
    // Check if user verified but hasn't completed profile setup
    // if (user.isVerified && !isProfileComplete) {
    //   return <Redirect href="/(setup)/user-setup/progress" />;
    // }

    // User has completed profile, route based on role
    // if (user.role === "user") {
    //   return <Redirect href="/(tabs)/user-home" />;
    // } else if (user.role === "business") {
    //   return <Redirect href="/(tabs)/business-home" />;
    // }

    <Redirect href="/(tabs)/home" />;
  }

  // Not logged in, show welcome screen
  return <Redirect href="/welcome" />;
}
