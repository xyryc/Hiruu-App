import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import BusinessDropdown from "@/components/ui/dropdown/BusinessDropdown";
import ExperienceLevel from "@/components/ui/inputs/ExperienceLevel";
import SearchBar from "@/components/ui/inputs/SearchBar";
import TimePicker from "@/components/ui/inputs/TimePicker";
import PreviewTemplateModal from "@/components/ui/modals/PreviewTemplateModal";
import { useBusinessStore } from "@/stores/businessStore";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { toast } from "sonner-native";

const CreateTemplate = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const { myBusinesses, myBusinessesLoading, getMyBusinesses } =
    useBusinessStore();
  const [selectedBusiness, setSelectedBusiness] = useState<string>("");
  const [search, setSearch] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    getMyBusinesses().catch((error: any) => {
      toast.error(error?.message || "Failed to load businesses");
    });
  }, [getMyBusinesses]);

  const businessOptions = useMemo(
    () =>
      (myBusinesses || []).map((business: any) => ({
        label: business?.name || "Business",
        value: business?.id || "",
        avatar: business?.logo || undefined,
      })),
    [myBusinesses]
  );

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "height" : "padding"}
    >
      <SafeAreaView
        className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
        edges={["left", "right", "bottom"]}
      >

        <ScreenHeader
          className="bg-[#E5F4FD] px-5 rounded-b-2xl"
          style={{ paddingTop: insets.top, paddingBottom: 16 }}
          onPressBack={() => router.back()}
          title="Create Templete"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />

        <ScrollView className="mx-5" showsVerticalScrollIndicator={false} contentContainerStyle={{
          paddingBottom: 400
        }}>
          {/* inpute */}
          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-7">
            Templete Name
          </Text>
          <TextInput
            className="px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary  border border-[#EEEEEE] mt-2.5 rounded-[10px]"
            placeholder="Morning Shift"
            placeholderTextColor="#7D7D7D"
            textAlignVertical="top"
          />

          {/* Time Picker shift  */}
          <View className="mt-8">
            <View className="flex-row gap-4 items-center">
              <View className="flex-1">
                <TimePicker title="Shift Start Time" />
              </View>
              <Text className="mt-7 font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                To
              </Text>
              <View className="flex-1">
                <TimePicker title="Shift End Time" />
              </View>
            </View>
          </View>

          {/* Time Picker shift  */}
          <View className="mt-8">
            <View className="flex-row gap-4 items-center">
              <View className="flex-1">
                <TimePicker title="Add Break" />
              </View>
              <Text className="mt-7 font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                To
              </Text>
              <View className="flex-1">
                <TimePicker title="  " />
              </View>
            </View>
          </View>

          {/* business dropdown */}
          <View>
            <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-8">
              Select business
            </Text>

            {myBusinessesLoading ? (
              <View className="mt-4 py-4 items-center border border-[#EEEEEE] rounded-[10px]">
                <ActivityIndicator size="small" />
              </View>
            ) : (
              <BusinessDropdown
                className="mt-4"
                placeholder="Choose business"
                options={businessOptions}
                value={selectedBusiness}
                onSelect={(value: string) => setSelectedBusiness(value)}
              />
            )}
          </View>

          {/* role requard */}
          <View className="mt-8 flex-row justify-between items-center">
            <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
              Roles & Required Count
            </Text>
            <View className="bg-[#E5F4FD] flex-row gap-2.5 rounded-lg items-center p-1">
              <Text>15</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="black"
              />
            </View>
          </View>

          {/* <TextInput /> */}

          <SearchBar
            className="mt-4 py-1"
            onSearch={(text) => setSearch(text)}
          />

          {/* ExperienceLevel */}
          <ExperienceLevel titleHeight={true} />

          {/* Total roles must equal required staff */}
          <View className="flex-row items-center gap-2.5 -mt-4">
            <Feather name="alert-triangle" size={16} color="#F34F4F" />
            <Text
              numberOfLines={1}
              className="ml-1.5 text-sm font-proximanova-regular text-[#F34F4F]"
            >
              Total roles must equal required staff
            </Text>
          </View>

          <View className="mt-8 mb-5">
            <PrimaryButton
              onPress={() => setIsPreview(true)}
              title="Save Template"
            />
          </View>
          <PreviewTemplateModal
            visible={isPreview}
            onClose={() => setIsPreview(false)}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateTemplate;
