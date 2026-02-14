import ScreenHeader from "@/components/header/ScreenHeader";
import PrimaryButton from "@/components/ui/buttons/PrimaryButton";
import BusinessDropdown from "@/components/ui/dropdown/BusinessDropdown";
import TimePicker from "@/components/ui/inputs/TimePicker";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useMemo, useState } from "react";
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

  const [jobName, setJobName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [gender, setGender] = useState("");
  const [experience, setExperience] = useState("");
  const [ageMin, setAgeMin] = useState("");
  const [ageMax, setAgeMax] = useState("");
  const [shiftStartTime, setShiftStartTime] = useState<Date>(new Date());
  const [shiftEndTime, setShiftEndTime] = useState<Date>(new Date());
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [openings, setOpenings] = useState("");

  const genderOptions = useMemo(
    () => [
      { label: "Any", value: "any" },
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
    []
  );

  const handlePostJob = () => {
    if (!jobName.trim()) {
      toast.error("Job name is required.");
      return;
    }

    if (!jobDescription.trim()) {
      toast.error("Job description is required.");
      return;
    }

    const payload = {
      jobName: jobName.trim(),
      jobDescription: jobDescription.trim(),
      gender: gender || "any",
      experience,
      ageRange: {
        min: ageMin,
        max: ageMax,
      },
      shift: {
        startTime: shiftStartTime,
        endTime: shiftEndTime,
      },
      salaryRangePerHour: {
        min: salaryMin,
        max: salaryMax,
      },
      openings,
    };

    console.log("postJob payload:", payload);
    toast.success("Job details captured.");
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
            Job Name
          </Text>
          <TextInput
            value={jobName}
            onChangeText={setJobName}
            className="px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] mt-2.5 rounded-[10px]"
            placeholder="Cashier"
            placeholderTextColor="#7D7D7D"
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
          <BusinessDropdown
            className="mt-2.5"
            placeholder="Select gender"
            options={genderOptions}
            value={gender}
            onSelect={(value: string) => setGender(value)}
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
            Age Range
          </Text>
          <View className="flex-row items-center gap-3 mt-2.5">
            <TextInput
              value={ageMin}
              onChangeText={setAgeMin}
              keyboardType="numeric"
              className="flex-1 px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] rounded-[10px]"
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
              className="flex-1 px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] rounded-[10px]"
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
            Salary Range / Hour
          </Text>
          <View className="flex-row items-center gap-3 mt-2.5">
            <TextInput
              value={salaryMin}
              onChangeText={setSalaryMin}
              keyboardType="numeric"
              className="flex-1 px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] rounded-[10px]"
              placeholder="Min"
              placeholderTextColor="#7D7D7D"
            />
            <Text className="text-sm font-proximanova-semibold text-primary dark:text-dark-primary">
              To
            </Text>
            <TextInput
              value={salaryMax}
              onChangeText={setSalaryMax}
              keyboardType="numeric"
              className="flex-1 px-4 py-3 text-sm font-proximanova-regular text-primary dark:text-dark-primary border border-[#EEEEEE] rounded-[10px]"
              placeholder="Max"
              placeholderTextColor="#7D7D7D"
            />
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
            <PrimaryButton onPress={handlePostJob} title="Post Job" />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default PostJob;
