import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const hasOnboarded = false;
  const isLoading = false;
  const user = false;
  // const user = { id: "123", role: "admin" };

  useEffect(() => {
    if (!isLoading) {
      if (!hasOnboarded) {
        router.replace("/welcome");
      } else if (!user) {
        router.replace("/(auth)/login");
      }

      // If user exists, AuthContext will handle role-based redirect
      else {
        //@ts-ignore
        switch (user?.role) {
          case "user":
          default:
            router.replace("/(user)/(tabs)/home");
            break;

          case "business":
            router.replace("/(business)/home");
            break;
        }
      }
    }
  }, [isLoading, hasOnboarded, user]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );
}
