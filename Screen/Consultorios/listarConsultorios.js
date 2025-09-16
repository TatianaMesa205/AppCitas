import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const consultorios = [
  { id: "1", numero: "101", ubicacion: "Primer piso, al lado de recepción" },
  { id: "2", numero: "204", ubicacion: "Segundo piso, mano derecha al fondo" },
  { id: "3", numero: "305", ubicacion: "Tercer piso, frente al ascensor" },
  { id: "4", numero: "112", ubicacion: "Primer piso, pasillo izquierdo" },
  { id: "5", numero: "410", ubicacion: "Cuarto piso, consultorio de cardiología" },
  { id: "6", numero: "215", ubicacion: "Segundo piso, junto a laboratorio" },
  { id: "7", numero: "322", ubicacion: "Tercer piso, esquina del pasillo" },
  { id: "8", numero: "509", ubicacion: "Quinto piso, área de pediatría" },
];


export default function ListarConsultorios({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Lista de Consultorios</Text>

      <FlatList
        data={consultorios}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetalleConsultorio", { consultorio: item })}
          >
            <View style={styles.cardContent}>
              <Ionicons name="calendar-outline" size={28} color="#b2a3c0ff" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.ubicacion}>{item.ubicacion}</Text>
                <Text style={styles.numero}>👨‍⚕️ {item.numero}</Text>
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
