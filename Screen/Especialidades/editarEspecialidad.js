import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function EditarEspecialidad({ navigation }) {
  const [nombreE, setNombreE] = useState("");

  const handleEditar = () => {
    if (nombreE) {
      alert("✅ Especialiad editada (simulado)");
      navigation.navigate("ListarEspecialidades");
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar especialidad</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la especialidad"
        placeholderTextColor="#8e9aaf"
        value={nombreE}
        onChangeText={setNombreE}
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