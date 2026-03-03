import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";

export async function registerForFcmToken() {
    // Android 13+ runtime notification permission
    if (Platform.OS === "android" && Platform.Version >= 33) {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
    }

    // iOS / general permission prompt
    await messaging().requestPermission();

    // Real FCM token
    const token = await messaging().getToken();
    return token;
}
