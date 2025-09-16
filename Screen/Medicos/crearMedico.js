import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function CrearMedico({ navigation }) {
  const [idEspecialidad, setIdEspecialidad] = useState("");
  const [nombreM, setNombreM] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [edad, setEdad] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleCrear = () => {
    if (idEspecialidad && nombreM && apellidoM && edad && telefono) {
      alert("✅ Medico creado (simulado)");
      navigation.navigate("ListarMedicos");
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar nuevo medico</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el id de la especialidad"
        placeholderTextColor="#8e9aaf"
        value={idEspecialidad}
        onChangeText={setIdEspecialidad}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre del medico"
        placeholderTextColor="#8e9aaf"
        value={nombreM}
        onChangeText={setNombreM}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el apellido"
        placeholderTextColor="#8e9aaf"
        value={apellidoM}
        onChangeText={setApellidoM}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese la edad"
        placeholderTextColor="#8e9aaf"
        value={edad}
        onChangeText={setEdad}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el teléfono"
        placeholderTextColor="#8e9aaf"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TouchableOpacity style={styles.button} onPress={handleCrear}>
        <Text style={styles.buttonText}>Crear Medico</Text>
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