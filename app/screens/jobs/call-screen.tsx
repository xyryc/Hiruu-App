import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";

const CallScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{ callType?: string }>();

  useEffect(() => {
    const nextPath =
      params.callType === "video"
        ? "/screens/jobs/video-call"
        : "/screens/jobs/audio-call";

    router.replace({
      pathname: nextPath,
      params,
    });
  }, [params, router]);

  return null;
};

export default CallScreen;
