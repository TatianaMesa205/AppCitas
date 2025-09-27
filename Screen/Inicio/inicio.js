import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../Src/Config";
import * as Animatable from "react-native-animatable";

export default function Inicio({ navigation }) {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [medicosCount, setMedicosCount] = useState(0);
  const [pacientesCount, setPacientesCount] = useState(0);

  useEffect(() => {
    const fetchUserAndStats = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        // ---- Obtener usuario (ya lo tenías) ----
        const response = await fetch(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });

        const data = await response.json();
        if (response.ok) setUserName(data.user?.name || "Usuario");

        // ---- Obtener contador de médicos ----
        const resMedicos = await fetch(`${API_BASE_URL}/contadorMedicos`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });
        const dataMedicos = await resMedicos.json();
        if (resMedicos.ok) setMedicosCount(dataMedicos.cantidad_medicos || 0);

        

        // ---- Obtener contador de pacientes ----
        const resPacientes = await fetch(`${API_BASE_URL}/contadorPacientes`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        });
        const dataPacientes = await resPacientes.json();
        if (resPacientes.ok) setPacientesCount(dataPacientes.cantidad_pacientes || 0);
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      }
    };

    // Saludo dinámico
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("🌅 Buenos días");
    else if (hour < 18) setGreeting("☀️ Buenas tardes");
    else setGreeting("🌙 Buenas noches");

    fetchUserAndStats();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header con avatar y saludo */}
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.title}>Bienvenido 💖 {userName}</Text>
        </View>
      </Animatable.View>

      {/* Estadísticas rápidas */}
      <Animatable.View animation="fadeInUp" delay={200} style={styles.statsRow}>
        <View style={styles.statBox}>
          <Ionicons name="medkit-outline" size={28} color="#4b6584" />
          <Text style={styles.statNumber}>{medicosCount}</Text>
          <Text style={styles.statLabel}>Médicos</Text>
        </View>
        <View style={styles.statBox}>
          <Ionicons name="people-outline" size={28} color="#4b6584" />
          <Text style={styles.statNumber}>{pacientesCount}</Text>
          <Text style={styles.statLabel}>Pacientes</Text>
        </View>
      </Animatable.View>

      {/* Paneles principales */}
      <View style={styles.dashboard}>
        {/* Panel Médicos */}
        <Animatable.View animation="fadeInRight" delay={300} style={[styles.panel, styles.panelLarge, { backgroundColor: "#a89b7f" }]}>
          <Ionicons name="medkit-outline" size={45} color="#fff" />
          <Text style={styles.panelTitleAlt}>Médicos</Text>
          <View style={styles.panelButtons}>
            <TouchableOpacity
              style={styles.buttonAlt}
              onPress={() => navigation.navigate("Medicos", { screen: "ListarMedicos" })}
            >
              <Text style={styles.buttonText}>Ver Médicos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonAlt, styles.secondaryButtonAlt]}
              onPress={() => navigation.navigate("Medicos", { screen: "CrearMedico" })}
            >
              <Text style={styles.buttonText}>Agregar Médico</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Pacientes */}
        <Animatable.View animation="zoomIn" delay={400} style={[styles.panel, styles.panelMedium, { backgroundColor: "#6c819b" }]}>
          <Ionicons name="people-outline" size={38} color="#fff" />
          <Text style={styles.panelTitleAlt}>Pacientes</Text>
          <View style={styles.panelButtons}>
            <TouchableOpacity
              style={styles.buttonAlt}
              onPress={() => navigation.navigate("Pacientes", { screen: "ListarPacientes" })}
            >
              <Text style={styles.buttonText}>Ver Pacientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonAlt, styles.secondaryButtonAlt]}
              onPress={() => navigation.navigate("Pacientes", { screen: "CrearPaciente" })}
            >
              <Text style={styles.buttonText}>Agregar Paciente</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Especialidades */}
        <Animatable.View animation="zoomIn" delay={500} style={[styles.panel, styles.panelMedium, { backgroundColor: "#a8c0ff" }]}>
          <Ionicons name="layers-outline" size={38} color="#fff" />
          <Text style={styles.panelTitleAlt}>Especialidades</Text>
          <View style={styles.panelButtons}>
            <TouchableOpacity
              style={styles.buttonAlt}
              onPress={() => navigation.navigate("Especialidades", { screen: "ListarEspecialidades" })}
            >
              <Text style={styles.buttonText}>Ver Especialidades</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonAlt, styles.secondaryButtonAlt]}
              onPress={() => navigation.navigate("Especialidades", { screen: "CrearEspecialidad" })}
            >
              <Text style={styles.buttonText}>Agregar Especialidad</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

        {/* Consultorios */}
        <Animatable.View animation="fadeInUp" delay={600} style={[styles.panel, styles.panelWide, { backgroundColor: "#8c78a0" }]}>
          <Ionicons name="business-outline" size={40} color="#fff" />
          <Text style={styles.panelTitleAlt}>Consultorios</Text>
          <View style={styles.panelButtons}>
            <TouchableOpacity
              style={styles.buttonAlt}
              onPress={() => navigation.navigate("Consultorios", { screen: "ListarConsultorios" })}
            >
              <Text style={styles.buttonText}>Ver Consultorios</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonAlt, styles.secondaryButtonAlt]}
              onPress={() => navigation.navigate("Consultorios", { screen: "CrearConsultorio" })}
            >
              <Text style={styles.buttonText}>Agregar Consultorio</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>

      {/* Frase motivacional */}
      <Animatable.Text animation="fadeInUp" delay={700} style={styles.footer}>
        💡 "Un sistema de salud organizado salva más vidas cada día"
      </Animatable.Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f1f6", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  greeting: { fontSize: 16, color: "#444" },
  title: { fontSize: 20, fontWeight: "bold", color: "#2d5564ff" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "40%",
    elevation: 4,
  },
  statNumber: { fontSize: 20, fontWeight: "bold", color: "#2d5564ff" },
  statLabel: { fontSize: 14, color: "#555" },
  dashboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  panel: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  panelLarge: {
    width: "100%",
    height: 160,
  },
  panelMedium: {
    width: "47%",
    height: 190, // 🔹 más largo para que entren bien los botones
  },
  panelWide: {
    width: "100%",
    height: 160,
  },
  panelTitleAlt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 8,
    textAlign: "center",
  },
  panelButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 5,
    justifyContent: "center",
  },
  buttonAlt: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 3,
  },
  secondaryButtonAlt: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontStyle: "italic",
    color: "#555",
  },
});
