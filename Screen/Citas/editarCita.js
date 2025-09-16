import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function EditarCita({ navigation }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [medico, setMedico] = useState("");
  const [estado, setEstado] = useState("");
  const [motivo, setMotivo] = useState("");
  const [consultorio, setConsultorio] = useState("");

  const handleEditar = () => {
    if (fecha && hora && medico && motivo) {
      alert("✅ Cita editada (simulado)");
      navigation.navigate("ListarCitas");
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Cita</Text>
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        placeholderTextColor="#b36b00"
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        placeholderTextColor="#b36b00"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Médico"
        placeholderTextColor="#b36b00"
        value={medico}
        onChangeText={setMedico}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        placeholderTextColor="#b36b00"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Motivo"
        placeholderTextColor="#b36b00"
        value={motivo}
        onChangeText={setMotivo}
      />
      <TextInput
        style={styles.input}
        placeholder="Consultorio"
        placeholderTextColor="#b36b00"
        value={consultorio}
        onChangeText={setConsultorio}
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
    backgroundColor: "#fff4e6", // fondo naranja claro pastel
    alignItems: "stretch", 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20, 
    textAlign: "center", // alineado al inicio
    fontWeight: "bold", 
    color: "#ffb97bff" // naranja fuerte
  },
  input: {
    borderWidth: 1,
    borderColor: "#f4a261", // borde naranja medio
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    color: "#fbb565ff", // texto naranja oscuro
  },
  button: {
    backgroundColor: "#ffaa95ff", // naranja oscuro más intenso para resaltar
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