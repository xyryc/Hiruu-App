import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import BusinessDropdown from "@/components/ui/dropdown/BusinessDropdown";
import RoleSlotsInput from "@/components/ui/inputs/RoleSlotsInput";
import TimePicker from "@/components/ui/inputs/TimePicker";
import { useBusinessStore } from "@/stores/businessStore";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
    createShiftTemplate,
  } = useBusinessStore();
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [requiredStaffCount, setRequiredStaffCount] = useState<string>("15");
  const [currentRoleSlotsTotal, setCurrentRoleSlotsTotal] = useState<number>(0);
  const [roleRequirements, setRoleRequirements] = useState<
    { roleId: string; roleName: string; count: number }[]
  >([]);
  const [shiftStartTime, setShiftStartTime] = useState<Date>(new Date());
  const [shiftEndTime, setShiftEndTime] = useState<Date>(new Date());
  const [breakStartTime, setBreakStartTime] = useState<Date>(new Date());
  const [breakEndTime, setBreakEndTime] = useState<Date>(new Date());
  const [roleSelectionVersion, setRoleSelectionVersion] = useState(0);
  const [roleOptions, setRoleOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [rolesLoading, setRolesLoading] = useState(false);

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTotalRequiredChange = useCallback((total: number) => {
    setCurrentRoleSlotsTotal((prev) => (prev === total ? prev : total));
  }, []);

  const handleRoleSlotsChange = useCallback(
    (slots: { roleId: string; roleName: string; count: number }[]) => {
      setRoleRequirements((prev) => {
        if (
          prev.length === slots.length &&
          prev.every(
            (item, index) =>
              item.roleId === slots[index]?.roleId &&
              item.roleName === slots[index]?.roleName &&
              item.count === slots[index]?.count
          )
        ) {
          return prev;
        }
        return slots;
      });
    },
    []
  );

  const formatTime24 = (date: Date) => {
    const h = `${date.getHours()}`.padStart(2, "0");
    const m = `${date.getMinutes()}`.padStart(2, "0");
    return `${h}:${m}`;
  };

  const handleCreateTemplate = async () => {
    if (!selectedBusiness) {
      toast.error("Please select a business.");
      return;
    }

    if (!templateName.trim()) {
      toast.error("Template name is required.");
      return;
    }

    if (roleRequirements.length === 0) {
      toast.error("Please add at least one role slot.");
      return;
    }

    if (!isRequiredCountMatched) {
      toast.error("Total roles must equal required staff.");
      return;
    }

    const payload = {
      name: templateName.trim(),
      description: templateDescription.trim() || null,
      startTime: formatTime24(shiftStartTime),
      endTime: formatTime24(shiftEndTime),
      breakDuration: [
        {
          startTime: formatTime24(breakStartTime),
          endTime: formatTime24(breakEndTime),
        },
      ],
      roleRequirements: roleRequirements.map((item) => ({
        roleId: item.roleId,
        count: item.count,
      })),
      isOvertime: false,
    };

    try {
      setIsSubmitting(true);
      console.log("createShiftTemplate payload:", payload);
      await createShiftTemplate(selectedBusiness, payload);
      toast.success("Shift template created successfully.");
      router.back();
    } catch (error: any) {
      toast.error(error?.message || "Failed to create shift template");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            value={templateName}
            onChangeText={setTemplateName}
            className="px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary  border border-[#EEEEEE] mt-2.5 rounded-[10px]"
            placeholder="Morning Shift"
            placeholderTextColor="#7D7D7D"
            textAlignVertical="top"
          />
          <TextInput
            value={templateDescription}
            onChangeText={setTemplateDescription}
            className="px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] mt-3 rounded-[10px]"
            placeholder="Template description"
            placeholderTextColor="#7D7D7D"
            textAlignVertical="top"
            multiline
          />

          {/* Time Picker shift  */}
          <View className="mt-8">
            <View className="flex-row gap-4 items-center">
              <View className="flex-1">
                <TimePicker
                  title="Shift Start Time"
                  value={shiftStartTime}
                  onChangeTime={setShiftStartTime}
                />
              </View>
              <Text className="mt-7 font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                To
              </Text>
              <View className="flex-1">
                <TimePicker
                  title="Shift End Time"
                  value={shiftEndTime}
                  onChangeTime={setShiftEndTime}
                />
              </View>
            </View>
          </View>

          {/* Time Picker shift  */}
          <View className="mt-8">
            <View className="flex-row gap-4 items-center">
              <View className="flex-1">
                <TimePicker
                  title="Add Break"
                  value={breakStartTime}
                  onChangeTime={setBreakStartTime}
                />
              </View>
              <Text className="mt-7 font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                To
              </Text>
              <View className="flex-1">
                <TimePicker
                  title="  "
                  value={breakEndTime}
                  onChangeTime={setBreakEndTime}
                />
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
            onTotalRequiredChange={handleTotalRequiredChange}
            onRoleSlotsChange={handleRoleSlotsChange}
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
              onPress={handleCreateTemplate}
              loading={isSubmitting}
              disabled={isSubmitting}
              title="Save Template"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateTemplate;
