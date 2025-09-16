import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DetalleEspecialidad({ route, navigation }) {
  const { especialidad } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle de la especialidad</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons name="layers-outline" size={24} color="#0097A7" />
          <Text style={styles.info}>Nombre de la especialidad: {especialidad.nombreE}</Text>
        </View>

      </View>

      {/* Botón editar */}
      <TouchableOpacity
        style={[styles.button, styles.editButton]}
        onPress={() => navigation.navigate("EditarEspecialidad")}
      >
        <Ionicons name="create-outline" size={20} color="white" />
        <Text style={styles.buttonText}>Editar especialidad</Text>
      </TouchableOpacity>

      {/* Botón regresar */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={20} color="white" />
        <Text style={styles.buttonText}>Regresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#E0F7FA", 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#006064" 
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    marginLeft: 10,
    color: "#004D40", 
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0097A7", 
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    marginTop: 12,
  },
  editButton: {
    backgroundColor: "#6fbeb4ff", 
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
});
