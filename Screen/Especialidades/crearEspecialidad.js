import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../Src/Config";


export default function CrearConsultorio({ navigation }) {
  const [nombre_e, setNombreE] = useState("");

const handleCrear = async () => {
  if (!nombre_e) {
    Alert.alert("⚠️ Error", "Por favor completa todos los campos");
    return;
  }

  try {
    // recuperar token y role desde AsyncStorage
    const token = await AsyncStorage.getItem("token");
    const role = await AsyncStorage.getItem("role"); // si lo guardaste al loguear

    console.log("DEBUG crearConsultorio -> token:", token, "role:", role);

    if (!token) {
      Alert.alert("No autenticado", "Debes iniciar sesión para crear especialidades");
      navigation.navigate("Login");
      return;
    }

    // Si tu ruta está protegida por RoleMiddleware:admin, valida el role en el cliente
    if (role !== "admin") {
      Alert.alert("Permisos insuficientes", "Solo usuarios con rol 'admin' pueden crear consultorios");
      return;
    }

    const response = await fetch(`${API_BASE_URL}/crearEspecialidades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // <-- token necesario
      },
      body: JSON.stringify({
        nombre_e: nombre_e,
      }),
    });

    const status = response.status;
    // intenta parsear json, si no es json, toma texto
    let body;
    try {
      body = await response.json();
    } catch (e) {
      body = await response.text();
    }

    if (response.ok) {
      Alert.alert("✅ Éxito", (body && body.message) || "Especialidad creada correctamente");
      navigation.navigate("ListarEspecialidades");
      return;
    }

    // manejo detallado de errores
    if (status === 401) {
      console.error("401 ->", body);
      Alert.alert("No autorizado", "Token inválido o expirado. Inicia sesión nuevamente.");
      navigation.navigate("Login");
      return;
    }

    if (status === 403) {
      console.error("403 ->", body);
      Alert.alert("Prohibido", (body && body.message) || "No tienes permiso para realizar esta acción.");
      return;
    }

    // cualquier otro error
    console.error("Error crearEspecialidad:", status, body);
    Alert.alert("Error", (body && body.message) || "No se pudo crear la especialidad");
  } catch (error) {
    console.error("🚨 Error de conexión:", error);
    Alert.alert("🚨 Error", "Ocurrió un error al conectar con el servidor");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar nueva especialidad</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre de la especialidad"
        placeholderTextColor="#8e9aaf"
        value={nombre_e}
        onChangeText={setNombreE}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleCrear}>
        <Text style={styles.buttonText}>Crear Especialidad</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f8dfebff", 
    alignItems: "stretch", 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: "center", 
    fontWeight: "bold", 
    color: "#db86cdff" 
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffb1ebff", 
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    color: "#a96b6bff", 
  },
  button: {
    backgroundColor: "#ffacf4ff", 
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});
