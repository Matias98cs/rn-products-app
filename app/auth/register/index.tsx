import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { router } from "expo-router";

const RegisterScreen = () => {
  const { createUser } = useAuthStore();
  const { height } = useWindowDimensions();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const backgroundColor = useThemeColor({}, "background");

  const onRegister = async () => {
    const { email, password, fullName } = form;

    if (email.length === 0 || password.length === 0 || fullName.length === 0) {
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await createUser(email, password, fullName);
    setIsPosting(false);

    if (wasSuccessful) {
      return router.replace("/");
    }

    Alert.alert("Error", "Error al intentar crear la cuenta");
  };

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
              value={form.fullName}
              onChangeText={(value) => setForm({ ...form, fullName: value })}
            />

            <ThemedTextInput
              placeholder="Correo electrónico"
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />

            <ThemedTextInput
              placeholder="Contrasena"
              secureTextEntry
              autoCapitalize="none"
              icon="lock-closed-outline"
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
          </View>

          <View style={{ marginTop: 10 }} />

          <ThemedButton
            onPress={onRegister}
            disabled={isPosting}
            icon="arrow-forward-outline"
          >
            Crear cuenta
          </ThemedButton>

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
