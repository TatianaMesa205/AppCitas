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

        {/* Recuadro de Módulo 2 */}
        <View style={styles.card}>
          <Ionicons name="person-circle-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Módulo 2</Text>

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

        {/* Recuadro de Módulo 3 */}
        <View style={styles.card}>
          <Ionicons name="paw-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Módulo 3</Text>

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

        {/* Recuadro de Módulo 4 */}
        <View style={styles.card}>
          <Ionicons name="heart-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Módulo 4</Text>

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

        {/* Recuadro de Módulo 5 */}
        <View style={styles.card}>
          <Ionicons name="settings-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Módulo 5</Text>

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
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    width: "40%",
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#464e58ff",
    marginBottom: 4,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#97d6afff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginVertical: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: "#6a8bb6ff",
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
