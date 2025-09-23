import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const medicos = [
  { id: "1", idEspecialidad: "Maternidad", nombreM: "Adriana", apellidoM: "Gonzales", edad: "36", telefono: "3142301295" },
  { id: "2", idEspecialidad: "Pediatría", nombreM: "Carlos", apellidoM: "Ramírez", edad: "42", telefono: "3124567890" },
  { id: "3", idEspecialidad: "Cardiología", nombreM: "Luisa", apellidoM: "Fernández", edad: "39", telefono: "3209876543" },
  { id: "4", idEspecialidad: "Odontología", nombreM: "Jorge", apellidoM: "Martínez", edad: "45", telefono: "3001122334" },
  { id: "5", idEspecialidad: "Dermatología", nombreM: "Mariana", apellidoM: "López", edad: "33", telefono: "3015566778" },
  { id: "6", idEspecialidad: "Oftalmología", nombreM: "Andrés", apellidoM: "Castro", edad: "50", telefono: "3157788990" },
];


export default function ListarMedicos({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Lista de medicos</Text>

      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <Ionicons name="people-outline" size={28} color="#b2a3c0ff" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.nombreM}>{item.nombreM + " " + item.apellidoM} - {item.idEspecialidad}</Text>
                <Text style={styles.telefono}>📞 {item.telefono}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="#ffffffff" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f0ff", // lila muy suave
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#706180ff",
    marginBottom: 15,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 12,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  nombreM: {
    fontSize: 16,
    fontWeight: "600",
    color: "#776985ff",
  },
  telefono: {
    fontSize: 14,
    color: "#675285ff",
  },
});
