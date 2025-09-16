import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // 👈 Importa íconos

export default function Inicio({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>𝘽𝙞𝙚𝙣𝙫𝙚𝙣𝙞𝙙𝙤 𝙖𝙡 𝙨𝙞𝙨𝙩𝙚𝙢𝙖 𝙙𝙚 𝘾𝙞𝙩𝙖𝙨</Text>

      {/* Contenedor que organiza las cards en filas */}
      <View style={styles.cardsContainer}>
        {/* Recuadro de Citas */}
        <View style={styles.card}>
          <Ionicons name="calendar-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Gestión de Citas</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ListarCitas")}
          >
            <Text style={styles.buttonText}>Ver Citas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("CrearCita")}
          >
            <Text style={styles.buttonText}>Agendar Cita</Text>
          </TouchableOpacity>
        </View>

        {/* Recuadro de Medicos */}
        <View style={styles.card}>
          <Ionicons name="medkit-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Médicos</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ListarMedicos")}
          >
            <Text style={styles.buttonText}>Ver Medicos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("CrearMedico")}
          >
            <Text style={styles.buttonText}>Agregar medico</Text>
          </TouchableOpacity>
        </View>

        {/* Recuadro de Pacientes */}
        <View style={styles.card}>
          <Ionicons name="people-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Pacientes</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ListarCitas")}
          >
            <Text style={styles.buttonText}>Ver Pacientes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("CrearCita")}
          >
            <Text style={styles.buttonText}>Agregar Pacientes</Text>
          </TouchableOpacity>
        </View>

        {/* Recuadro de Especialidades */}
        <View style={styles.card}>
          <Ionicons name="layers-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Especialidades</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ListarEspecialidades")}
          >
            <Text style={styles.buttonText}>Ver Especialidades</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("CrearEspecialidad")}
          >
            <Text style={styles.buttonText}>Agregar Especialidad</Text>
          </TouchableOpacity>
        </View>

        {/* Recuadro de Consultorios */}
        <View style={styles.card}>
          <Ionicons name="business-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Consultorios</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ListarConsultorios")}
          >
            <Text style={styles.buttonText}>Ver Consultorios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("CrearConsultorio")}
          >
            <Text style={styles.buttonText}>Agregar Consultorio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d2e2e6ff",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2d5564ff",
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "45%",
    borderRadius: 20,
    padding: 15,
    margin: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#464e58ff",
    marginBottom: 4,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#97d6afff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginVertical: 6,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: "#6a8bb6ff",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
