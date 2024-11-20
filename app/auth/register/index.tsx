import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";

const RegisterScreen = () => {
  const { height } = useWindowDimensions();

  const backgroundColor = useThemeColor({}, "background");

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{
          paddingHorizontal: 40,
          backgroundColor: backgroundColor,
        }}
      >
        <View
          style={{
            paddingTop: height * 0.35,
          }}
        >
          <ThemedText type="title">Crear cuenta</ThemedText>
          <ThemedText
            style={{
              color: "grey",
            }}
          >
            Por favor crea una cuenta para continuar
          </ThemedText>

          <View style={{ marginTop: 20 }}>
            <ThemedTextInput
              placeholder="Nombre completo"
              autoCapitalize="words"
              icon="person-outline"
            />

            <ThemedTextInput
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />

            <ThemedTextInput
              placeholder="Contrasena"
              secureTextEntry
              autoCapitalize="none"
              icon="lock-closed-outline"
            />
          </View>

          <View style={{ marginTop: 10 }} />

          <ThemedButton icon="arrow-forward-outline">Crear cuenta</ThemedButton>

          <View style={{ marginTop: 50 }} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText>Ya tienes cuenta ?</ThemedText>

            <ThemedLink href="/auth/login" style={{ marginHorizontal: 5 }}>
              Ingresar
            </ThemedLink>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
