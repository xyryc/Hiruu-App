import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import SelectDropdown from "@/components/ui/dropdown/SelectDropdown";
import TimePicker from "@/components/ui/inputs/TimePicker";
import RoleSelector from "@/components/ui/modals/RoleSelector";
import { useBusinessStore } from "@/stores/businessStore";
import { useJobStore } from "@/stores/jobStore";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo, useState } from "react";
import {
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

const PostJob = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const selectedBusinesses = useBusinessStore((s) => s.selectedBusinesses);
  const getRoles = useBusinessStore((s) => s.getRoles);
  const getMyBusinessRoles = useBusinessStore((s) => s.getMyBusinessRoles);
  const createRecruitment = useJobStore((s) => s.createRecruitment);
  const isSubmitting = useJobStore((s) => s.isLoading);

  const businessId = selectedBusinesses[0];

  const [selectedRole, setSelectedRole] = useState<{ id: string; name: string } | null>(null);
  const [roleOptions, setRoleOptions] = useState<{ id: string; name: string }[]>(
    []
  );
  const [rolesLoading, setRolesLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [gender, setGender] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [shiftStartTime, setShiftStartTime] = useState<Date>(new Date());
  const [shiftEndTime, setShiftEndTime] = useState<Date>(new Date());
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [openings, setOpenings] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadRoles = async () => {
      try {
        setRolesLoading(true);

        // Fetch ONLY business-specific roles
        const businessRoles = await getMyBusinessRoles(businessId).catch(e => {
          console.error("getMyBusinessRoles error:", e);
          return [];
        });

        if (isMounted) {
          const validRoles = (Array.isArray(businessRoles) ? businessRoles : [])
            .filter((item: any) => item?.role?.name || item?.name) // Check for name in either place
            .map((item: any) => ({
              id: item.id, // Use the BusinessRole ID (top level)
              name: item.role?.name || item.name // Prefer nested name
            }));

          setRoleOptions(validRoles);

          if (validRoles.length === 0) {
            toast("No roles found for this business. Please create a role first.");
          }
        }
      } catch (error) {
        console.error("[PostJob] Failed to load roles:", error);
      } finally {
        if (isMounted) {
          setRolesLoading(false);
        }
      }
    };

    loadRoles();
    return () => {
      isMounted = false;
    };
  }, [getRoles, getMyBusinessRoles, businessId]);

  const genderOptions = useMemo(
    () => [
      { label: "Any", value: "Any" },
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
    []
  );
  const shiftTypeOptions = useMemo(
    () => [
      { label: "Day", value: "day" },
      { label: "Night", value: "night" },
      { label: "Weekend", value: "weekend" },
    ],
    []
  );
  const jobTypeOptions = useMemo(
    () => [
      { label: "Full-time", value: "fulltime" },
      { label: "Part-time", value: "parttime" },
      { label: "Hourly", value: "hourly" },
      { label: "Contract", value: "contract" },
      { label: "Internship", value: "internship" },
      { label: "Onsite", value: "onsite" },
      { label: "Remote", value: "remote" },
      { label: "Hybrid", value: "hybrid" },
    ],
    []
  );

  const formatTime24 = (date: Date) => {
    const hour = `${date.getHours()}`.padStart(2, "0");
    const minute = `${date.getMinutes()}`.padStart(2, "0");
    return `${hour}:${minute}`;
  };

  const handlePostJob = async () => {
    // Correctly retrieve businessId from store
    const businessId = selectedBusinesses[0];
    if (!businessId) {
      toast.error("Please select a business profile first.");
      return;
    }

    // Role ID validation
    if (!selectedRole?.id) {
      toast.error("Role is required.");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Job description is required.");
      return;
    }

    if (!gender) {
      toast.error("Gender is required.");
      return;
    }

    const parsedAgeMin = Number(ageMin);
    const parsedAgeMax = Number(ageMax);
    const parsedSalaryMin = Number(salaryMin);
    const parsedSalaryMax = Number(salaryMax);
    const parsedOpenings = Number(openings);

    if (!parsedAgeMin || !parsedAgeMax || parsedAgeMin > parsedAgeMax) {
      toast.error("Please provide a valid age range.");
      return;
    }

    if (
      !parsedSalaryMin ||
      !parsedSalaryMax ||
      parsedSalaryMin > parsedSalaryMax
    ) {
      toast.error("Please provide a valid salary range.");
      return;
    }

    if (!parsedOpenings || parsedOpenings < 1) {
      toast.error("Number of openings must be at least 1.");
      return;
    }

    // Payload formatted as per senior engineer standards
    const payload = {
      roleId: selectedRole.id, // Using selectedRole ID
      description: jobDescription.trim(),
      gender,
      experience: experience.trim() || "0",
      ageMin: parsedAgeMin,
      ageMax: parsedAgeMax,
      shiftStartTime: formatTime24(shiftStartTime),
      shiftEndTime: formatTime24(shiftEndTime),
      salaryMin: parsedSalaryMin,
      salaryMax: parsedSalaryMax,
      requiredSkills: [], // Placeholder for future enhancement
      salaryType: (jobType === "hourly" ? "hourly" : "monthly") as "hourly" | "monthly",
      numberOfOpenings: parsedOpenings,
    };

    try {
      await createRecruitment(businessId, payload);
      toast.success("Job posted successfully.");
      router.back();
    } catch (error: any) {
      // Professional error handling with specific feedback
      const errorMessage = error instanceof Error ? error.message : "Failed to post job";
      toast.error(errorMessage);
      console.error("[PostJob] API Error:", error);
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
          className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl px-5"
          style={{ paddingTop: insets.top + 10, paddingBottom: 16 }}
          onPressBack={() => router.back()}
          title="Post Job"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
        />

        <ScrollView
          className="mx-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        >
          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-7">
            Role
          </Text>
          <RoleSelector
            className="mt-2.5"
            roles={roleOptions}
            loading={rolesLoading}
            selectedRole={selectedRole}
            placeholder="Select role"
            onSelectRole={(role) => setSelectedRole(role)}
          />

          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-7">
            Job Description
          </Text>
          <TextInput
            value={jobDescription}
            onChangeText={setJobDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] mt-2.5 rounded-[10px] min-h-[110px]"
            placeholder="Write job responsibilities..."
            placeholderTextColor="#7D7D7D"
          />

          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-7">
            Gender
          </Text>
          <SelectDropdown
            className="mt-2.5"
            placeholder="Select gender"
            listMaxHeight={320}
            options={genderOptions}
            value={gender}
            onSelect={(value: string) => setGender(value)}
          />

          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-7">
            Shift Type
          </Text>
          <SelectDropdown
            className="mt-2.5"
            placeholder="Select shift type"
            listMaxHeight={320}
            options={shiftTypeOptions}
            value={shiftType}
            onSelect={(value: string) => setShiftType(value)}
          />

          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-7">
            Job Type
          </Text>
          <SelectDropdown
            className="mt-2.5"
            placeholder="Select job type"
            options={jobTypeOptions}
            value={jobType}
            listMaxHeight={320}
            onSelect={(value: string) => setJobType(value)}
          />

          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-7">
            Experience (Years)
          </Text>
          <TextInput
            value={experience}
            onChangeText={setExperience}
            keyboardType="numeric"
            className="px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] mt-2.5 rounded-[10px]"
            placeholder="2"
            placeholderTextColor="#7D7D7D"
          />

          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-7">
            Age Range (Years)
          </Text>
          <View className="flex-row items-center gap-3 mt-2.5">
            <TextInput
              value={ageMin}
              onChangeText={setAgeMin}
              keyboardType="numeric"
              className="flex-1 px-4 py-3 pr-10 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] rounded-[10px]"
              placeholder="Min"
              placeholderTextColor="#7D7D7D"
            />

            <Text className="text-sm font-proximanova-semibold text-primary dark:text-dark-primary">
              To
            </Text>

            <TextInput
              value={ageMax}
              onChangeText={setAgeMax}
              keyboardType="numeric"
              className="flex-1 px-4 py-3 pr-10 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] rounded-[10px]"
              placeholder="Max"
              placeholderTextColor="#7D7D7D"
            />
          </View>

          <View className="mt-8">
            <View className="flex-row gap-4 items-center">
              <TimePicker
                title="Shift Start Time"
                value={shiftStartTime}
                onChangeTime={setShiftStartTime}
              />
              <Text className="mt-7 font-proximanova-semibold text-sm text-primary dark:text-dark-primary">
                To
              </Text>
              <TimePicker
                title="Shift End Time"
                value={shiftEndTime}
                onChangeTime={setShiftEndTime}
              />
            </View>
          </View>

          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-8">
            Salary Range
          </Text>
          <View className="flex-row items-center gap-3 mt-2.5">
            <View className="flex-1 relative">
              <Text className="absolute left-3 top-3.5 text-sm text-secondary dark:text-dark-secondary">
                $
              </Text>
              <TextInput
                value={salaryMin}
                onChangeText={setSalaryMin}
                keyboardType="numeric"
                className="px-7 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] rounded-[10px]"
                placeholder="Min"
                placeholderTextColor="#7D7D7D"
              />
            </View>
            <Text className="text-sm font-proximanova-semibold text-primary dark:text-dark-primary">
              To
            </Text>
            <View className="flex-1 relative">
              <Text className="absolute left-3 top-3.5 text-sm text-secondary dark:text-dark-secondary">
                $
              </Text>
              <TextInput
                value={salaryMax}
                onChangeText={setSalaryMax}
                keyboardType="numeric"
                className="px-7 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] rounded-[10px]"
                placeholder="Max"
                placeholderTextColor="#7D7D7D"
              />
            </View>
          </View>

          <Text className="font-proximanova-semibold text-sm text-primary dark:text-dark-primary mt-7">
            Number of Openings
          </Text>
          <TextInput
            value={openings}
            onChangeText={setOpenings}
            keyboardType="numeric"
            className="px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] mt-2.5 rounded-[10px]"
            placeholder="1"
            placeholderTextColor="#7D7D7D"
          />

          <View className="mt-8 mb-5">
            <PrimaryButton
              onPress={handlePostJob}
              loading={isSubmitting}
              disabled={isSubmitting}
              title="Post Job"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PostJob;
