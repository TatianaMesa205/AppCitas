import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import API_BASE_URL from "../../Src/Config";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Por favor ingresa los datos");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        await AsyncStorage.setItem("token", data.access_token);
        if (data.user?.role) await AsyncStorage.setItem("role", data.user.role);
        if (data.user?.email) await AsyncStorage.setItem("email", data.user.email);

        alert(data.message);

        if (data.user?.role === "paciente") {
          navigation.navigate("InicioP");
        } else if (data.user?.role === "admin") {
          navigation.navigate("Inicio");
        } else {
          alert("Rol no reconocido");
        }
      } else {
        alert(data.message || "Error en el login");
      }
    } catch (error) {
      console.error(error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f7e9ff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
            }}
            style={styles.logo}
          />

          <Text style={styles.title}>Bienvenido de nuevo 💜</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

          <View style={styles.card}>
            {/* Correo */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={22} color="#8b5fbf" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#b28fcf"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Contraseña */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={22} color="#8b5fbf" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#b28fcf"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            {/* Botón ingresar */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            {/* Botón registro */}
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate("Registro")}
            >
              <Text style={styles.registerText}>
                ¿No tienes cuenta? <Text style={styles.registerHighlight}>Regístrate</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 60,
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 25,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    tintColor: "#a35bcc",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#732d91",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#8f5cae",
    marginBottom: 25,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e6c4f2",
    backgroundColor: "#faf4ff",
    borderRadius: 12,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    color: "#4b006e",
  },
  button: {
    backgroundColor: "#b86fd7",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  registerButton: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: "#7a4ba3",
    fontSize: 15,
  },
  registerHighlight: {
    color: "#b86fd7",
    fontWeight: "700",
  },
});
