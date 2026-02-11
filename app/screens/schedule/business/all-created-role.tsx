import ScreenHeader from "@/components/header/ScreenHeader";
import DeleteConfirmModal from "@/components/ui/modals/DeleteConfirmModal";
import { useBusinessStore } from "@/stores/businessStore";
import { Entypo, Feather } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useState } from "react";
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
  const { selectedBusinesses, getMyBusinessRoles, deleteBusinessRole } =
    useBusinessStore();
  const [roles, setRoles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [menuRoleId, setMenuRoleId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const isFocused = useIsFocused();

  const businessId = selectedBusinesses[0];

  const loadRoles = useCallback(async () => {
    if (!businessId) {
      setRoles([]);
      return;
    }

    try {
      setIsLoading(true);
      const data = await getMyBusinessRoles(businessId);
      setRoles(Array.isArray(data) ? data : []);
    } catch (error: any) {
      toast.error(error?.message || "Failed to load roles");
    } finally {
      setIsLoading(false);
    }
  }, [businessId, getMyBusinessRoles]);

  useEffect(() => {
    if (isFocused) {
      loadRoles();
    }
  }, [isFocused, loadRoles]);

  const handleDeleteRole = async (roleId: string) => {
    if (!businessId) return;
    try {
      setDeleting(true);
      await deleteBusinessRole(businessId, roleId);
      setRoles((prev) => prev.filter((role) => role.id !== roleId));
      setMenuRoleId(null);
      toast.success("Role deleted");
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete role");
    } finally {
      setDeleting(false);
    }
  };

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
            <View className="flex-1 items-center">
              <ActivityIndicator size="large" />
            </View>
          ) : roles.length > 0 ? (
            roles.map((role, index) => (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/screens/schedule/business/update-role",
                    params: {
                      businessRoleId: role?.id,
                      roleId: role?.roleId,
                    },
                  })
                }
                className="flex-row justify-between items-center border border-[#EEEEEE] p-4 rounded-[10px] mt-4"
                key={role?.id || index}
              >
                <Text className="font-proximanova-semibold text-primary dark:text-dark-primary capitalize">
                  {role?.role?.name || "Role"}
                </Text>

                {/* three dot dropdown */}
                <TouchableOpacity
                  onPress={() => setMenuRoleId(role.id)}
                  className="p-2 rounded-full"
                >
                  <Entypo name="dots-three-vertical" size={16} color="black" />
                </TouchableOpacity>
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

      <DeleteConfirmModal
        visible={Boolean(menuRoleId)}
        deleting={deleting}
        onClose={() => setMenuRoleId(null)}
        onConfirm={() => menuRoleId && handleDeleteRole(menuRoleId)}
      />
    </SafeAreaView>
  );
};

export default AllCreatedRole;
