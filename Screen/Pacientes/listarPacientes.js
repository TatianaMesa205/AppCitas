import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const pacientes = [
  { 
    id: "1", 
    nombre: "Andrés", 
    apellido: "Martínez", 
    documento: "1029140636", 
    telefono: "3157788990", 
    email: "andres.martinez@gmail.com", 
    fechaNacimiento: "1987-04-12", 
    direccion: "Calle 45 #23-12"
  },
  { 
    id: "2", 
    nombre: "María", 
    apellido: "González", 
    documento: "1032459874", 
    telefono: "3124456678", 
    email: "maria.gonzalez@hotmail.com", 
    fechaNacimiento: "1992-08-25", 
    direccion: "Carrera 10 #15-30"
  },
  { 
    id: "3", 
    nombre: "Camilo", 
    apellido: "Rojas", 
    documento: "1015478963", 
    telefono: "3209981122", 
    email: "camilo.rojas@yahoo.com", 
    fechaNacimiento: "1985-11-03", 
    direccion: "Av. Siempre Viva #123"
  },
  { 
    id: "4", 
    nombre: "Laura", 
    apellido: "Fernández", 
    documento: "1045789632", 
    telefono: "3167789901", 
    email: "laura.fernandez@gmail.com", 
    fechaNacimiento: "1995-06-18", 
    direccion: "Calle 89 #45-67"
  },
  { 
    id: "5", 
    nombre: "Santiago", 
    apellido: "Ramírez", 
    documento: "1009874521", 
    telefono: "3185567789", 
    email: "santiago.ramirez@outlook.com", 
    fechaNacimiento: "1990-02-09", 
    direccion: "Carrera 50 #12-20"
  }
];



export default function ListarPacientes({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pacientes</Text>

      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("DetallePaciente", { paciente: item })}
          >
            <View style={styles.cardContent}>
              <Ionicons name="person-outline" size={28} color="#b2a3c0ff" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.nombre}>{item.nombre + " " + item.apellido} - {item.direccion}</Text>
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
  nombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#776985ff",
  },
  telefono: {
    fontSize: 14,
    color: "#675285ff",
  },
});
