import { getApp } from "@react-native-firebase/app";
import {
    getMessaging,
    getToken,
    registerDeviceForRemoteMessages,
    requestPermission,
} from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";

export async function registerForFcmToken() {
    const messaging = getMessaging(getApp());

    // Android 13+ runtime notification permission
    if (Platform.OS === "android" && Platform.Version >= 33) {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
    }

    // iOS / general permission prompt
    await requestPermission(messaging);
    await registerDeviceForRemoteMessages(messaging);

    // Real FCM token
    const token = await getToken(messaging);
    return token;
}
