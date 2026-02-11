import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import BusinessDropdown from "@/components/ui/dropdown/BusinessDropdown";
import RoleSlotsInput from "@/components/ui/inputs/RoleSlotsInput";
import TimePicker from "@/components/ui/inputs/TimePicker";
import PreviewTemplateModal from "@/components/ui/modals/PreviewTemplateModal";
import { useBusinessStore } from "@/stores/businessStore";
import { Feather } from "@expo/vector-icons";
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
  const {
    myBusinesses,
    myBusinessesLoading,
    getMyBusinesses,
    getMyBusinessRoles,
  } = useBusinessStore();
  const [selectedBusiness, setSelectedBusiness] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [requiredStaffCount, setRequiredStaffCount] = useState<string>("15");
  const [currentRoleSlotsTotal, setCurrentRoleSlotsTotal] = useState<number>(0);
  const [roleSelectionVersion, setRoleSelectionVersion] = useState(0);
  const [roleOptions, setRoleOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [rolesLoading, setRolesLoading] = useState(false);
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

  useEffect(() => {
    const loadRoles = async () => {
      if (!selectedBusiness) {
        setRoleOptions([]);
        setSelectedRole("");
        setRoleSelectionVersion(0);
        return;
      }

      try {
        setRolesLoading(true);
        const data = await getMyBusinessRoles(selectedBusiness);
        const mapped = (Array.isArray(data) ? data : []).map((item: any) => ({
          label: item?.role?.name || item?.name || "Role",
          value: item?.id || item?.roleId || "",
        }));
        setRoleOptions(mapped.filter((item: any) => item.value));
      } catch (error: any) {
        toast.error(error?.message || "Failed to load roles");
        setRoleOptions([]);
      } finally {
        setRolesLoading(false);
      }
    };

    loadRoles();
  }, [getMyBusinessRoles, selectedBusiness]);

  const selectedRoleOption = useMemo(
    () => roleOptions.find((item) => item.value === selectedRole) || null,
    [roleOptions, selectedRole]
  );
  const requiredCountOptions = useMemo(
    () => [
      { label: "5", value: "5" },
      { label: "10", value: "10" },
      { label: "15", value: "15" },
      { label: "20", value: "20" },
    ],
    []
  );
  const selectedRequiredCount = Number(requiredStaffCount) || 0;
  const isRequiredCountMatched = currentRoleSlotsTotal === selectedRequiredCount;

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
          <View className="mt-8 flex-row items-center justify-between">
            <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
              Roles & Required Count
            </Text>

            <BusinessDropdown
              placeholder="Select required staff"
              options={requiredCountOptions}
              value={requiredStaffCount}
              onSelect={(value: string) => setRequiredStaffCount(value)}
            />
          </View>

          {/* role list */}
          <View className="mt-4">
            {rolesLoading ? (
              <View className="py-4 items-center border border-[#EEEEEE] rounded-[10px]">
                <ActivityIndicator size="small" />
              </View>
            ) : (
              <BusinessDropdown
                placeholder={
                  selectedBusiness ? "Choose role" : "Select business first"
                }
                options={roleOptions}
                value={selectedRole}
                onSelect={(value: string) => {
                  setSelectedRole(value);
                  setRoleSelectionVersion((prev) => prev + 1);
                }}
              />
            )}
          </View>

          {/* <SearchBar
            className="mt-4 py-1"
            onSearch={(text) => {}}
          /> */}

          {/* role slot */}
          <RoleSlotsInput
            titleHeight={true}
            selectedRoleToAdd={
              selectedRoleOption
                ? { id: selectedRoleOption.value, name: selectedRoleOption.label }
                : null
            }
            addRoleTrigger={roleSelectionVersion}
            onTotalRequiredChange={(total) => setCurrentRoleSlotsTotal(total)}
          />

          {/* Total roles must equal required staff */}
          <View className="flex-row items-center gap-2.5 -mt-4">
            <Feather
              name={isRequiredCountMatched ? "check-circle" : "alert-triangle"}
              size={16}
              color={isRequiredCountMatched ? "#22C55E" : "#F34F4F"}
            />
            <Text
              numberOfLines={1}
              className={`ml-1.5 text-sm font-proximanova-regular ${isRequiredCountMatched ? "text-[#22C55E]" : "text-[#F34F4F]"
                }`}
            >
              {isRequiredCountMatched
                ? "Role count matches required staff"
                : `Total roles (${currentRoleSlotsTotal}) must equal required staff (${selectedRequiredCount})`}
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
