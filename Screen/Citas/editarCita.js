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
        value={fecha}
        onChangeText={setFecha}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora (HH:MM)"
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        style={styles.input}
        placeholder="Médico"
        value={medico}
        onChangeText={setMedico}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />
      <TextInput
        style={styles.input}
        placeholder="Motivo"
        value={motivo}
        onChangeText={setMotivo}
      />
      <TextInput
        style={styles.input}
        placeholder="Consultorio"
        value={consultorio}
        onChangeText={setConsultorio}
      />
      <TouchableOpacity style={styles.button} onPress={handleEditar}>
        <Text style={styles.buttonText}>Editar Cita</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 20, 
    backgroundColor: "#bcd9dbff" // tono aqua claro
  },
  title: { 
    fontSize: 24, 
    marginBottom: 25, 
    textAlign: "center", 
    fontWeight: "bold", 
    color: "#006d77" // aqua más fuerte
  },
  input: {
    borderWidth: 1,
    borderColor: "#73a39eff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#158576ff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  },
});
