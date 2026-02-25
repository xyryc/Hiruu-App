import React from "react";
import { Text, View } from "react-native";
import { RenderModeType, VideoSourceType } from "react-native-agora";

type Props = {
  remoteVideoUid: number | null;
  cameraOff: boolean;
  localJoinedAgora: boolean;
  RemoteVideoView: any;
  LocalVideoView: any;
};

const VideoCallStage = ({
  remoteVideoUid,
  cameraOff,
  localJoinedAgora,
  RemoteVideoView,
  LocalVideoView,
}: Props) => {
  return (
    <View className="absolute inset-0">
      {remoteVideoUid !== null ? (
        <RemoteVideoView
          canvas={{
            uid: remoteVideoUid,
            renderMode: RenderModeType.RenderModeHidden,
            sourceType: VideoSourceType.VideoSourceRemote,
          }}
          style={{ flex: 1 }}
        />
      ) : (
        <View className="flex-1 items-center justify-center bg-black">
          <Text className="font-proximanova-regular text-[#CBD5E1]">Waiting for video...</Text>
        </View>
      )}

      <View
        style={{
          position: "absolute",
          right: 12,
          top: 100,
          width: 110,
          height: 160,
          borderRadius: 14,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.25)",
          backgroundColor: "#111827",
        }}
      >
        {cameraOff || !localJoinedAgora ? (
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text className="font-proximanova-regular text-[10px] text-[#CBD5E1]">
              {cameraOff ? "Camera off" : "Connecting..."}
            </Text>
          </View>
        ) : (
          <LocalVideoView
            zOrderMediaOverlay
            canvas={{
              uid: 0,
              renderMode: RenderModeType.RenderModeHidden,
              sourceType: VideoSourceType.VideoSourceCameraPrimary,
            }}
            style={{ flex: 1 }}
          />
        )}
      </View>
    </View>
  );
};

export default VideoCallStage;
