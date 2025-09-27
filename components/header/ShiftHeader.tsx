import { ShiftHeaderProps } from "@/types";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";

const ShiftHeader = ({ setShowModal }: ShiftHeaderProps) => (
  <View className="px-5 pb-4">
    <View className="flex-row justify-between items-center mb-2">
      <View>
        <Text className="font-proximanova-regular text-primary dark:text-dark-primary">
          All Shift
        </Text>
        <View className="flex-row items-center">
          <Text className="text-xl font-proximanova-bold text-primary dark:text-dark-primary">
            12 June, 2025
          </Text>
          <Ionicons
            name="chevron-down"
            size={18}
            color="#666"
            className="ml-2.5"
          />
        </View>
      </View>

      <View className="flex-row items-center gap-1.5">
        <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
          <Ionicons name="calendar-outline" size={24} color="#111111" />
        </TouchableOpacity>

        {/* notification */}
        <TouchableOpacity className="bg-[#f5f5f5] border-[0.5px] border-[#FFFFFF00] rounded-full p-2">
          <Image
            source={require("@/assets/images/bell.svg")}
            style={{
              width: 24,
              height: 24,
            }}
            contentFit="scale-down"
          />
          <View className="bg-[#4FB2F3] absolute top-1.5 right-2 w-3.5 h-3.5 items-center rounded-full">
            <Text className="text-[10px] text-white">1</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>

    <View className="flex-row justify-between items-center mt-7">
      <Text className="text-lg font-semibold text-primary dark:text-dark-primary">
        Friday, 16 June, 2025
      </Text>

      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="bg-[#E5F4FD] flex-row items-center p-0.5 rounded-[26px]"
      >
        <Image
          source="https://cdn.textstudio.com/output/studio/template/preview/stamped/g/4/c/7/z7a7c4g.webp"
          style={{ width: 30, height: 30, borderRadius: 999 }}
          contentFit="cover"
        />
        <SimpleLineIcons
          className="p-1.5"
          name="arrow-down"
          size={12}
          color="#111111"
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default ShiftHeader;
