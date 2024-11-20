import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Redirect, Stack } from "expo-router";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";

const CheckAuthenticationLayout = () => {
  const { status, checkStatus } = useAuthStore();

  const backgroundColor = useThemeColor({}, "background");
  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={30} />
      </View>
    );
  }

  if (status === "unauthenticated") {
    //guardar ruta del usuario

    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        contentStyle: {
          backgroundColor: backgroundColor,
        },
      }}
    >
      <Stack.Screen
        name="(home)/index"
        options={{
          title: "Productos",
        }}
      />
    </Stack>
  );
};

export default CheckAuthenticationLayout;
