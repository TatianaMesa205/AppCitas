import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function EditarPaciente({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");



  const handleEditar = () => {
    if (nombre && apellido && documento && telefono) {
      alert("✅ Paciente creado (simulado)");
      navigation.navigate("ListarPacientes");
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese el nombre del paciente"
        placeholderTextColor="#8e9aaf"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el apellido del paciente"
        placeholderTextColor="#8e9aaf"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el documento"
        placeholderTextColor="#8e9aaf"
        value={documento}
        onChangeText={setDocumento}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el teléfono"
        placeholderTextColor="#8e9aaf"
        value={telefono}
        onChangeText={setTelefono}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese el email"
        placeholderTextColor="#8e9aaf"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese la fecha de nacimiento"
        placeholderTextColor="#8e9aaf"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingrese la direccion"
        placeholderTextColor="#8e9aaf"
        value={direccion}
        onChangeText={setDireccion}
      />


      <TouchableOpacity style={styles.button} onPress={handleEditar}>
        <Text style={styles.buttonText}>Editar Paciente</Text>
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