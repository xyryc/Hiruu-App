import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

type Props = {
  isIncomingPending: boolean;
  accepting: boolean;
  rejecting: boolean;
  ending: boolean;
  muted: boolean;
  speakerOn: boolean;
  cameraOff: boolean;
  isVideoCall: boolean;
  onAccept: () => void;
  onReject: () => void;
  onEnd: () => void;
  onToggleMute: () => void;
  onToggleSpeaker: () => void;
  onToggleCamera: () => void;
  onSwitchCamera: () => void;
};

const CallFooterControls = ({
  isIncomingPending,
  accepting,
  rejecting,
  ending,
  muted,
  speakerOn,
  cameraOff,
  isVideoCall,
  onAccept,
  onReject,
  onEnd,
  onToggleMute,
  onToggleSpeaker,
  onToggleCamera,
  onSwitchCamera,
}: Props) => {
  if (isIncomingPending) {
    return (
      <View className="absolute bottom-10 left-0 right-0 flex-row items-center justify-center gap-8">
        <TouchableOpacity
          onPress={onReject}
          disabled={rejecting || accepting}
          className="w-16 h-16 rounded-full bg-[#EF4444] items-center justify-center"
        >
          {rejecting ? <ActivityIndicator color="#FFFFFF" /> : <Ionicons name="call" size={26} color="#FFFFFF" />}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onAccept}
          disabled={accepting || rejecting}
          className="w-16 h-16 rounded-full bg-[#22C55E] items-center justify-center"
        >
          {accepting ? <ActivityIndicator color="#FFFFFF" /> : <Ionicons name="call" size={26} color="#FFFFFF" />}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="absolute bottom-10 left-0 right-0 flex-row items-center justify-center gap-4">
      <TouchableOpacity
        onPress={onToggleMute}
        className="w-14 h-14 rounded-full bg-[#1E293B] items-center justify-center"
      >
        <Ionicons name={muted ? "mic-off-outline" : "mic-outline"} size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {isVideoCall ? (
        <TouchableOpacity
          onPress={onToggleCamera}
          className="w-14 h-14 rounded-full bg-[#1E293B] items-center justify-center"
        >
          <Ionicons name={cameraOff ? "videocam-off-outline" : "videocam-outline"} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        onPress={onEnd}
        className="w-16 h-16 rounded-full bg-[#EF4444] items-center justify-center"
      >
        {ending ? <ActivityIndicator color="#FFFFFF" /> : <Ionicons name="call" size={26} color="#FFFFFF" />}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onToggleSpeaker}
        className="w-14 h-14 rounded-full bg-[#1E293B] items-center justify-center"
      >
        <Ionicons name={speakerOn ? "volume-high-outline" : "volume-mute-outline"} size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {isVideoCall ? (
        <TouchableOpacity
          onPress={onSwitchCamera}
          className="w-14 h-14 rounded-full bg-[#1E293B] items-center justify-center"
        >
          <Ionicons name="camera-reverse-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CallFooterControls;
