import { useAuthStore } from "@/stores/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { user, isInitialized } = useAuthStore();

  // Root layout already shows splash + initializes auth.
  // Avoid rendering a second splash here to prevent flicker.
  if (!isInitialized) return null;

  // User is logged in
  if (user) {
    // Always land on Home after login/app reopen.
    // Incomplete profile can still be continued from ProgressCard.
    return <Redirect href="/(tabs)/home" />;
  }

  // Not logged in, show welcome screen
  return <Redirect href="/welcome" />;
}
