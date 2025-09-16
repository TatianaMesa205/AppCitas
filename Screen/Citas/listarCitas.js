import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const citas = [
  { id: "1", fecha: "2025-09-10", hora: "10:00", medico: "Dr. Pérez", consultorio: "204", estado: "confirmada", motivo: "Gripa" },
  { id: "2", fecha: "2025-09-12", hora: "14:00", medico: "Dra. Gómez", consultorio: "204", estado: "confirmada", motivo: "Gripa" },
  { id: "4", fecha: "2025-10-01", hora: "1:00", medico: "Dra. Gonzalez", consultorio: "204", estado: "confirmada", motivo: "Gripa" },
];

export default function ListarCitas({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Lista de Citas</Text>

      <FlatList
        data={citas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalleCita", { cita: item })}
          >
            <View style={styles.cardContent}>
              <Ionicons name="calendar-outline" size={28} color="#b2a3c0ff" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.date}>{item.fecha} - {item.hora}</Text>
                <Text style={styles.doctor}>👨‍⚕️ {item.medico}</Text>
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
  date: {
    fontSize: 16,
    fontWeight: "600",
    color: "#776985ff",
  },
  doctor: {
    fontSize: 14,
    color: "#675285ff",
  },
});
