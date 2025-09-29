import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, FlatList } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import API_BASE_URL from "../../Src/Config";

export default function Registro({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const roles = [
    { label: "Administrador", value: "admin" },
    { label: "Paciente", value: "paciente" },
  ];

  const handleRegister = async () => {
    if (!name || !email || !password || !role) {
      alert("Error", "Por favor completa todos los campos");
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
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Éxito", "Usuario registrado correctamente 💖");
        navigation.navigate("Login");
      } else {
        console.log("Errores:", data);
        alert("Error", "No se pudo registrar el usuario");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", "Hubo un problema con la conexión al servidor");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Registro ✨</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#cc66beff"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#cc66beff"
        keyboardType="email-address"
        autoCapitalize="none"
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

      {/* Botón para seleccionar rol */}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectRow}>
          <Text style={styles.selectText}>
            {role ? roles.find((r) => r.value === role)?.label : "Seleccionar Rol"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#9b59b6" />
        </View>
      </TouchableOpacity>

      {/* Modal estilizado */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecciona tu rol</Text>
            <FlatList
              data={roles}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setRole(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Ya tengo cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ead1f0ff",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#95519bff",
  },
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
  selectButton: {
    borderWidth: 1,
    borderColor: "#eb99ffff",
    backgroundColor: "#fff0f5",
    padding: 14,
    marginVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  selectText: {
    fontSize: 16,
    color: "#cc66beff",
  },
  button: {
    backgroundColor: "#e29bdcff",
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: "center",
    elevation: 4,
  },
  secondaryButton: {
    backgroundColor: "#855ba8ff",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    elevation: 5,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#632e68ff",
    marginBottom: 15,
    textAlign: "center",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "flex-start",
  },
  optionText: {
    fontSize: 16,
    color: "#621169ff",
  },
  selectRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
},

});
