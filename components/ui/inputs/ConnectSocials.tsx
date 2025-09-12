import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import SmallButton from "../buttons/SmallButton";

const ConnectSocials = () => {
  return (
    <View>
      {/* facebook */}
      <View className="flex-row justify-between items-center bg-white p-3 rounded-[10px] border border-[#EEEEEE]">
        <TouchableOpacity className="flex-row items-center gap-1.5">
          <Image
            style={{
              height: 36,
              width: 36,
            }}
            source={require("@/assets/images/facebook2.svg")}
            contentFit="scale-down"
          />

          <Text className="text-sm font-semibold">Facebook</Text>
        </TouchableOpacity>

        <SmallButton title="Link" />
      </View>

      {/* linkedin */}
      <View className="flex-row justify-between items-center bg-white p-3 rounded-[10px] border border-[#EEEEEE]">
        <TouchableOpacity className="flex-row items-center gap-1.5">
          <Image
            style={{
              height: 36,
              width: 36,
            }}
            source={require("@/assets/images/linkedin.svg")}
            contentFit="scale-down"
          />

          <Text className="text-sm font-semibold">Facebook</Text>
        </TouchableOpacity>

        <SmallButton title="Link" />
      </View>

      {/* whatsapp */}
      <View className="flex-row justify-between items-center bg-white p-3 rounded-[10px] border border-[#EEEEEE]">
        <TouchableOpacity className="flex-row items-center gap-1.5">
          <Image
            style={{
              height: 36,
              width: 36,
            }}
            source={require("@/assets/images/whatsapp.svg")}
            contentFit="scale-down"
          />

          <Text className="text-sm font-semibold">Facebook</Text>
        </TouchableOpacity>

        <SmallButton title="Link" />
      </View>

      {/* twitter */}
      <View className="flex-row justify-between items-center bg-white p-3 rounded-[10px] border border-[#EEEEEE]">
        <TouchableOpacity className="flex-row items-center gap-1.5">
          <Image
            style={{
              height: 36,
              width: 36,
            }}
            source={require("@/assets/images/twitter.svg")}
            contentFit="scale-down"
          />

          <Text className="text-sm font-semibold">Facebook</Text>
        </TouchableOpacity>

        <SmallButton title="Link" />
      </View>

      {/* telegram */}
      <View className="flex-row justify-between items-center bg-white p-3 rounded-[10px] border border-[#EEEEEE]">
        <TouchableOpacity className="flex-row items-center gap-1.5">
          <Image
            style={{
              height: 36,
              width: 36,
            }}
            source={require("@/assets/images/telegram.svg")}
            contentFit="scale-down"
          />

          <Text className="text-sm font-semibold">Facebook</Text>
        </TouchableOpacity>

        <SmallButton title="Link" />
      </View>

      {/* instagram */}
      <View className="flex-row justify-between items-center bg-white p-3 rounded-[10px] border border-[#EEEEEE]">
        <TouchableOpacity className="flex-row items-center gap-1.5">
          <Image
            style={{
              height: 36,
              width: 36,
            }}
            source={require("@/assets/images/instagram.svg")}
            contentFit="scale-down"
          />

          <Text className="text-sm font-semibold">Instagram</Text>
        </TouchableOpacity>

        <SmallButton title="Link" />
      </View>
    </View>
  );
};

export default ConnectSocials;
