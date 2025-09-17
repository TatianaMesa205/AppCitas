import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ Importar
// ⚠️ Asegúrate que tu backend tenga el endpoint /api/me protegido con sanctum


export default function Inicio({ navigation }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // 🔑 recuperar token

        if (!token) {
          console.log("No hay token guardado");
          return;
        }

        const response = await fetch("http://192.168.11.29:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUserName(data.user?.name || "Usuario");
        } else {
          console.log("Error en la respuesta:", data);
        }
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };

    fetchUser();
  }, []);

    const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // el token que guardaste en el login
      const response = await fetch("http://192.168.11.29:8000/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.removeItem("token"); // borra el token local
        Alert.alert("Éxito", data.message);
        navigation.replace("Login"); // redirige al login
      } else {
        Alert.alert("Error", data.message || "No se pudo cerrar sesión");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un problema al cerrar sesión");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bienvenido al sistema de citas 💖 {userName}
      </Text>


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

        {/* Recuadro de Médicos */}
        <View style={styles.card}>
          <Ionicons name="medkit-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Médicos</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ListarMedicos")}
          >
            <Text style={styles.buttonText}>Ver Médicos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("CrearMedico")}
          >
            <Text style={styles.buttonText}>Agregar Médico</Text>
          </TouchableOpacity>
        </View>

        {/* Recuadro de Pacientes */}
        <View style={styles.card}>
          <Ionicons name="people-outline" size={40} color="#63718aff" />
          <Text style={styles.cardTitle}>Pacientes</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("ListarPacientes")}
          >
            <Text style={styles.buttonText}>Ver Pacientes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate("CrearPaciente")}
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

      {/* Botón Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dbd2e6ff",
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
  logoutButton: {
    backgroundColor: "#c09fd6ff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 30,
    marginTop: 35,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
