import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
        // ✅ Guardar token en AsyncStorage
        await AsyncStorage.setItem("token", data.access_token);

        // ✅ Guardar role en AsyncStorage (si tu backend lo envía)
        if (data.user && data.user.role) {
          await AsyncStorage.setItem("role", data.user.role);
        }

        alert(data.message);

        // ✅ Redirección según role
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
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#cc66beff"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#cc66beff"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("Registro")}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ead1f0ff", justifyContent: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#95519bff" },
  input: {
    borderWidth: 1,
    borderColor: "#eb99ffff",
    backgroundColor: "#fff0f5",
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    fontSize: 16,
    color: "#5e0066ff",
  },
  button: {
    backgroundColor: "#e29bdcff",
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center",
  },
  secondaryButton: { backgroundColor: "#855ba8ff" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});
