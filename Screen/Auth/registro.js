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
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import API_BASE_URL from "../../Src/Config";

export default function Registro({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("⚠️ Error", "Por favor completa todos los campos");
      return;
    }

    if (password.length < 8) {
      Alert.alert("🔒 Contraseña inválida", "La contraseña debe tener mínimo 8 caracteres");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/registrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: "paciente",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("✅ Éxito", "Paciente registrado correctamente 💜");
        navigation.navigate("Login");
      } else {
        console.log("❌ Errores:", data);
        Alert.alert("❌ Error", data.message || "No se pudo registrar el paciente");
      }
    } catch (error) {
      console.error("🚨 Error en el registro:", error);
      Alert.alert("🚨 Error", "Hubo un problema con la conexión al servidor");
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

          <Text style={styles.title}>Crea tu cuenta 💖</Text>
          <Text style={styles.subtitle}>Únete para comenzar tu experiencia</Text>

          <View style={styles.card}>
            {/* Nombre */}
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={22} color="#8b5fbf" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                placeholderTextColor="#b28fcf"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Correo */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={22} color="#8b5fbf" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#b28fcf"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
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

            {/* Botón Registro */}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrarme</Text>
            </TouchableOpacity>

            {/* Ir a Login */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>
                ¿Ya tienes cuenta? <Text style={styles.loginHighlight}>Inicia sesión</Text>
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
    width: 90,
    height: 90,
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
  loginButton: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    color: "#7a4ba3",
    fontSize: 15,
  },
  loginHighlight: {
    color: "#b86fd7",
    fontWeight: "700",
  },
});
