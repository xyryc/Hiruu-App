import ScreenHeader from "@/components/header/ScreenHeader";
import { useBusinessStore } from "@/stores/businessStore";
import { Entypo, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { toast } from "sonner-native";

const AllCreatedRole = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const { selectedBusinesses, getMyBusinessRoles } = useBusinessStore();
  const [roles, setRoles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const businessId = selectedBusinesses[0];

  useEffect(() => {
    let isMounted = true;

    const loadRoles = async () => {
      if (!businessId) {
        setRoles([]);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getMyBusinessRoles(businessId);
        if (isMounted) {
          setRoles(Array.isArray(data) ? data : []);
        }
      } catch (error: any) {
        toast.error(error?.message || "Failed to load roles");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadRoles();
    return () => {
      isMounted = false;
    };
  }, [businessId, getMyBusinessRoles]);

  return (
    <SafeAreaView
      className="flex-1 bg-[#FFFFFF] dark:bg-dark-background"
      edges={["left", "right", "bottom"]}
    >
      <View className="bg-[#E5F4FD] dark:bg-dark-border rounded-b-2xl px-5">
        <ScreenHeader
          style={{ paddingTop: insets.top + 15, paddingBottom: 20 }}
          className=""
          onPressBack={() => router.back()}
          title="All Created Role"
          titleClass="text-primary dark:text-dark-primary"
          iconColor={isDark ? "#fff" : "#111"}
          components={
            <TouchableOpacity
              onPress={() =>
                router.push("/screens/schedule/business/create-role")
              }
              className="h-10 w-10 rounded-full bg-[#FFFFFF] flex-row justify-center items-center "
            >
              <Feather name="plus" size={24} color="black" />
            </TouchableOpacity>
          }
        />
      </View>
      <ScrollView className="mx-5">
        <View className="mt-4">
          {isLoading ? (
            <View className="py-10 items-center">
              <ActivityIndicator size="large" />
            </View>
          ) : roles.length > 0 ? (
            roles.map((role, index) => (
              <TouchableOpacity
                onPress={() =>
                  router.push("/screens/schedule/business/create-role")
                }
                className="flex-row justify-between items-center border border-[#EEEEEE] p-4 rounded-[10px] mt-4"
                key={role?.id || index}
              >
                <Text className="font-proximanova-semibold text-primary dark:text-dark-primary capitalize">
                  {role?.name || "Role"}
                </Text>
                <Entypo name="dots-three-vertical" size={20} color="black" />
              </TouchableOpacity>
            ))
          ) : (
            <View className="py-10 items-center">
              <Text className="text-sm text-secondary dark:text-dark-secondary">
                No roles found.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllCreatedRole;
