import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function CrearCita({ navigation }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [medico, setMedico] = useState("");
  const [estado, setEstado] = useState("");
  const [motivo, setMotivo] = useState("");
  const [consultorio, setConsultorio] = useState("");

  const handleCrear = () => {
    if (fecha && hora && medico && motivo) {
      alert("✅ Cita creada (simulado)");
      navigation.navigate("ListarCitas");
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Nueva Cita</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        placeholderTextColor="#8e9aaf"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        placeholderTextColor="#8e9aaf"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Médico"
        placeholderTextColor="#8e9aaf"
        value={medico}
        onChangeText={setMedico}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        placeholderTextColor="#8e9aaf"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Motivo"
        placeholderTextColor="#8e9aaf"
        value={motivo}
        onChangeText={setMotivo}
      />
      <TextInput
        style={styles.input}
        placeholder="Consultorio"
        placeholderTextColor="#8e9aaf"
        value={consultorio}
        onChangeText={setConsultorio}
      />
      <TouchableOpacity style={styles.button} onPress={handleCrear}>
        <Text style={styles.buttonText}>Crear Cita</Text>
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