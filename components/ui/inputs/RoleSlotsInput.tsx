import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type RoleSlot = {
  id: number;
  roleName: string;
  requiredCount: number;
};

const RoleSlotsInput = ({ titleHeight }: any) => {
  const [roleSlots, setRoleSlots] = useState<RoleSlot[]>([
    { id: 1, roleName: "Cashier", requiredCount: 5 },
    { id: 2, roleName: "Receptionist", requiredCount: 5 },
  ]);

  const updateRequiredCount = (slotId: number, increment: boolean) => {
    setRoleSlots(
      roleSlots.map((slot) =>
        slot.id === slotId
          ? {
              ...slot,
              requiredCount: increment
                ? slot.requiredCount + 1
                : Math.max(0, slot.requiredCount - 1),
            }
          : slot
      )
    );
  };

  const addRoleSlot = () => {
    const maxId = roleSlots.length > 0 ? Math.max(...roleSlots.map((slot) => slot.id)) : 0;
    const newId = maxId + 1;
    setRoleSlots([...roleSlots, { id: newId, roleName: "New Role", requiredCount: 0 }]);
  };

  const removeRoleSlot = (slotId: number) => {
    setRoleSlots(roleSlots.filter((slot) => slot.id !== slotId));
  };

  return (
    <View className="py-5">
      {titleHeight || (
        <Text className="text-base font-proximanova-semibold text-primary mb-4">
          Role Slots
        </Text>
      )}

      {roleSlots.map((slot) => (
        <View key={slot.id} className="flex-row items-center mb-3 gap-3">
          {/* Role Input */}
          <View className="flex-1">
            {/* <Text className="font-proximanova-regular text-gray-600">
              {slot.roleName}
            </Text> */}
            <TextInput
              placeholder={slot.roleName}
              value={slot.roleName}
              className="border border-[#EEEEEE] px-2.5 py-2.5 rounded-lg font-proximanova-regular text-sm"
              // keyboardType="twitter"
              autoCapitalize="none"
            />
          </View>

          {/* Value Display */}
          <View className="border border-[#EEEEEE] flex-row justify-between items-center gap-6 px-2 py-3 rounded-xl">
            <View>
              <Text className="font-proximanova-semibold text-primary">
                {slot.requiredCount.toString().padStart(2, "0")}
              </Text>
            </View>

            <View className="flex-row justify-center items-center">
              {/* Plus Button */}
              <TouchableOpacity onPress={() => updateRequiredCount(slot.id, true)}>
                <Feather name="plus" size={16} color="#7A7A7A" />
              </TouchableOpacity>

              {/* Minus Button */}
              <TouchableOpacity onPress={() => updateRequiredCount(slot.id, false)}>
                <Feather name="minus" size={16} color="#7A7A7A" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add/Remove Circle Button */}
          <TouchableOpacity
            onPress={() =>
              slot.id === roleSlots[roleSlots.length - 1].id
                ? addRoleSlot()
                : removeRoleSlot(slot.id)
            }
            className={`items-center justify-center ${
              slot.id === roleSlots[roleSlots.length - 1].id
            }`}
          >
            <Feather
              name={
                slot.id === roleSlots[roleSlots.length - 1].id
                  ? "plus-circle"
                  : "minus-circle"
              }
              size={24}
              color={
                slot.id === roleSlots[roleSlots.length - 1].id
                  ? "#4FB2F3"
                  : "#F87171"
              }
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default RoleSlotsInput;
