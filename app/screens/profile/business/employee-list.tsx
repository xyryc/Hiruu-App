import AssignRoleModal from "@/components/ui/modals/AssignRoleModal";
import ScreenHeader from "@/components/header/ScreenHeader";
import { useBusinessStore } from "@/stores/businessStore";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { toast } from "sonner-native";

type EmployeeItem = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
};

const MOCK_EMPLOYEES: EmployeeItem[] = [
  {
    id: "mock-1",
    name: "Alex Carter",
    email: "alex.carter@example.com",
    avatar: null,
  },
  {
    id: "mock-2",
    name: "Mia Turner",
    email: "mia.turner@example.com",
    avatar: null,
  },
  {
    id: "mock-3",
    name: "Noah Brooks",
    email: "noah.brooks@example.com",
    avatar: null,
  },
];

const EmployeeListScreen = () => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const params = useLocalSearchParams<{ businessId?: string }>();
  const { selectedBusinesses, getBusinessProfile, getMyBusinessRoles } = useBusinessStore();
  const resolvedBusinessId = params.businessId || selectedBusinesses[0];
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<EmployeeItem[]>([]);
  const [roles, setRoles] = useState<Array<{ id: string; name: string }>>([]);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [selectedAssignRole, setSelectedAssignRole] = useState<string | null>(null);

  useEffect(() => {
    if (!resolvedBusinessId) return;

    let isMounted = true;

    const loadEmployees = async () => {
      try {
        setLoading(true);
        const business = await getBusinessProfile(resolvedBusinessId);
        const source = Array.isArray(business?.employments)
          ? business.employments
          : Array.isArray(business?.employees)
            ? business.employees
            : [];

        const mapped = source
          .map((item: any) => {
            const user = item?.user || item;
            if (!user?.id) return null;
            return {
              id: user.id,
              name: user.name || "N/A",
              email: user.email || "N/A",
              avatar: user.avatar || null,
            } as EmployeeItem;
          })
          .filter(Boolean) as EmployeeItem[];

        if (isMounted) {
          setEmployees(mapped.length > 0 ? mapped : MOCK_EMPLOYEES);
        }
      } catch (error: any) {
        toast.error(error?.message || "Failed to load employees");
        if (isMounted) {
          setEmployees(MOCK_EMPLOYEES);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadEmployees();

    return () => {
      isMounted = false;
    };
  }, [resolvedBusinessId, getBusinessProfile]);

  const emptyLabel = useMemo(() => {
    if (!resolvedBusinessId) return "No business selected.";
    if (loading) return "";
    return "No employees found.";
  }, [loading, resolvedBusinessId]);

  const openRoleModal = async () => {
    setRoleModalVisible(true);
    setSelectedAssignRole(null);

    if (!resolvedBusinessId) return;

    try {
      const roleList = await getMyBusinessRoles(resolvedBusinessId);
      const mappedRoles = (Array.isArray(roleList) ? roleList : []).map((role: any) => ({
        id: role?.id,
        name: role?.name || "Unnamed role",
      }));
      setRoles(mappedRoles);
    } catch (error: any) {
      toast.error(error?.message || "Failed to load role list");
      setRoles([]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-background" edges={["top", "left", "right"]}>
      <ScreenHeader
        className="px-5 py-3"
        onPressBack={() => router.back()}
        title="Employee List"
        titleClass="text-primary dark:text-dark-primary"
        iconColor={isDark ? "#fff" : "#111"}
      />

      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, paddingTop: 8, flexGrow: 1 }}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-20">
              <Text className="text-secondary dark:text-dark-secondary">{emptyLabel}</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View className="flex-row items-center gap-3 border border-[#EEEEEE] dark:border-gray-800 rounded-xl px-4 py-3 mb-3">
              <Image
                source={item.avatar || require("@/assets/images/placeholder.png")}
                style={{ width: 42, height: 42, borderRadius: 999 }}
                contentFit="cover"
              />
              <View className="flex-1">
                <Text className="font-proximanova-semibold text-primary dark:text-dark-primary">
                  {item.name}
                </Text>
                <Text className="font-proximanova-regular text-sm text-secondary dark:text-dark-secondary">
                  {item.email}
                </Text>
              </View>

              <TouchableOpacity
                onPress={openRoleModal}
                className="h-8 w-8 rounded-full bg-[#F5F5F5] items-center justify-center"
              >
                <Ionicons name="ellipsis-vertical" size={16} color={isDark ? "#fff" : "#111"} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <AssignRoleModal
        visible={roleModalVisible}
        onClose={() => setRoleModalVisible(false)}
        assignRole={roles}
        selectedAssignRole={selectedAssignRole}
        setSelectedAssignRole={setSelectedAssignRole}
      />
    </SafeAreaView>
  );
};

export default EmployeeListScreen;
