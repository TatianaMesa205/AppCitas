import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const especialidades = [
  { id: "1", nombreE: "Maternidad" },
  { id: "2", nombreE: "Pediatría" },
  { id: "3", nombreE: "Cardiología" },
  { id: "4", nombreE: "Odontología" },
  { id: "5", nombreE: "Dermatología" },
  { id: "6", nombreE: "Oftalmología" },
  { id: "7", nombreE: "Traumatología" },
  { id: "8", nombreE: "Neurología" },
  { id: "9", nombreE: "Psicología" },
  { id: "10", nombreE: "Nutrición" },
];


export default function ListarEspecialidades({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Lista de especialidades</Text>

      <FlatList
        data={especialidades}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalleEspecialidad", { especialidad: item })}
          >
            <View style={styles.cardContent}>
              <Ionicons name="calendar-outline" size={28} color="#b2a3c0ff" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.nombreE}>{item.nombreE}</Text>
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
  ubicacion: {
    fontSize: 16,
    fontWeight: "600",
    color: "#776985ff",
  },
  numero: {
    fontSize: 14,
    color: "#675285ff",
  },
});
