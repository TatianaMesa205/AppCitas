import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../Src/Config";

export default function EditarConsultorio({ route, navigation }) {
  const { id, numeroInicial, ubicacionInicial } = route.params; // 📌 datos enviados desde ListarConsultorios
  const [numero, setNumero] = useState(numeroInicial || "");
  const [ubicacion, setUbicacion] = useState(ubicacionInicial || "");

  const handleEditar = async () => {
  console.log("🟢 ID recibido:", id);
  console.log("🟢 Endpoint:", `${API_BASE_URL}/actualizarConsultorios/${id}`);

  if (!numero || !ubicacion) {
    Alert.alert("⚠️ Error", "Por favor completa todos los campos");
    return;
  }

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/actualizarConsultorios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ numero, ubicacion }),
    });

    console.log("🔵 Status:", response.status);

    if (response.ok) {
      Alert.alert("✅ Éxito", "Consultorio editado correctamente");
      navigation.navigate("ListarConsultorios", { reload: true });
    } else {
      const errorData = await response.json();
      console.log("❌ Error en backend:", errorData);
      Alert.alert("❌ Error", "No se pudo editar el consultorio");
    }
  } catch (error) {
    console.error("🚨 Error de conexión:", error);
    Alert.alert("🚨 Error", "Ocurrió un error al conectar con el servidor");
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar consultorio</Text>

      <TextInput
        style={styles.input}
        placeholder="Número del consultorio"
        placeholderTextColor="#8e9aaf"
        value={numero}
        onChangeText={setNumero}
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación del consultorio"
        placeholderTextColor="#8e9aaf"
        value={ubicacion}
        onChangeText={setUbicacion}
      />

      <TouchableOpacity style={styles.button} onPress={handleEditar}>
        <Text style={styles.buttonText}>Confirmar edición</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff4e6",
    alignItems: "stretch", 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: "center",
    fontWeight: "bold", 
    color: "#ffb97bff" 
  },
  input: {
    borderWidth: 1,
    borderColor: "#f4a261",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    color: "#fbb565ff", 
  },
  button: {
    backgroundColor: "#ffaa95ff",
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
