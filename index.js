import { getApp } from "@react-native-firebase/app";
import {
  getMessaging,
  setBackgroundMessageHandler,
} from "@react-native-firebase/messaging";

const messagingInstance = getMessaging(getApp());

setBackgroundMessageHandler(messagingInstance, async (remoteMessage) => {
  console.log("FCM background =>", remoteMessage);
});

import "expo-router/entry";
