import React from "react";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "../store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const LogoutIconButton = () => {
  const { logout } = useAuthStore();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
      <Ionicons name="log-in-outline" size={24} color={primaryColor} />
    </TouchableOpacity>
  );
};

export default LogoutIconButton;
