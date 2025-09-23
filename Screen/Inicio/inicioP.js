import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  Image, 
  ScrollView, 
  Linking 
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "../../Src/Config";

export default function Inicio({ navigation }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${API_BASE_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserName(data.user?.name || "Usuario");
        }
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
      }
    };

    fetchUser();
  }, []);

  // Carrusel de imágenes
  const imagenes = [
    { id: "1", url: "https://img.freepik.com/foto-gratis/doctor-mostrando-pulgar-arriba_23-2147896205.jpg" },
    { id: "2", url: "https://i.pinimg.com/1200x/d1/f3/fb/d1f3fb9cbc43a8c87a9806232042c429.jpg" },
    { id: "3", url: "https://i.pinimg.com/1200x/8a/45/d1/8a45d16a8e8ff9c3d39b460d680f1cb9.jpg" },
  ];

  // Noticias
  const noticias = [
    { id: "1", titulo: "Nueva campaña de vacunación", desc: "Vacunas gratuitas contra la influenza hasta el 30 de septiembre." },
    { id: "2", titulo: "Chequeos preventivos", desc: "Realiza un chequeo general al menos una vez al año." },
    { id: "3", titulo: "Semana de la salud", desc: "Charlas y jornadas de prevención del 10 al 15 de octubre." },
  ];

  // Servicios
  const servicios = [
    { id: "1", icon: "flask-outline", nombre: "Laboratorio" },
    { id: "2", icon: "medkit-outline", nombre: "Urgencias" },
    { id: "3", icon: "bandage-outline", nombre: "Farmacia" },
    { id: "4", icon: "heart-outline", nombre: "Cardiología" },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 50 }}>
        
        {/* Bienvenida */}
        <Text style={styles.title}>🏥 Bienvenido {userName}</Text>


        {/* Información */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Hospital Santa Salud</Text>
          <Text style={styles.infoText}>
            Fundado en 1998, con más de 25 años de experiencia brindando atención
            médica de calidad. Nuestro compromiso es cuidar tu salud con
            profesionalismo y calidez humana.
          </Text>
        </View>

        {/* Carrusel */}
        <FlatList
          data={imagenes}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image source={{ uri: item.url }} style={styles.carouselImage} />
          )}
          style={{ marginBottom: 25 }}
        />


        {/* Recomendaciones */}
        <Text style={styles.subtitle}>💡 Recomendaciones</Text>
        <View style={styles.recomendacionesContainer}>
          <View style={styles.recomendacionCard}>
            <Ionicons name="water-outline" size={26} color="#57545eff" />
            <Text style={styles.recomendacionText}>Toma 8 vasos de agua</Text>
          </View>
          <View style={styles.recomendacionCard}>
            <Ionicons name="walk-outline" size={26} color="#57545eff" />
            <Text style={styles.recomendacionText}>Camina 30 min diarios</Text>
          </View>
          <View style={styles.recomendacionCard}>
            <Ionicons name="nutrition-outline" size={26} color="#57545eff" />
            <Text style={styles.recomendacionText}>Come frutas y verduras</Text>
          </View>
        </View>

        {/* Explora */}
        <Text style={styles.subtitle}>🔎 Explora</Text>
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Ionicons name="medkit-outline" size={40} color="#685685ff" />
            <Text style={styles.cardTitle}>Médicos</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("MedicosP", { screen: "ListarMedicosP" })
              }
            >
              <Text style={styles.buttonText}>Ver Médicos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Ionicons name="bandage-outline" size={40} color="#685685ff" />
            <Text style={styles.cardTitle}>Especialidades</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("EspecialidadesP", { screen: "ListarEspecialidadesP" })
              }
            >
              <Text style={styles.buttonText}>Ver Especialidades</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Servicios */}
        <Text style={styles.subtitle}>⚕️ Servicios Destacados</Text>
        <View style={styles.serviciosContainer}>
          {servicios.map((item) => (
            <View key={item.id} style={styles.servicioCard}>
              <Ionicons name={item.icon} size={30} color="#746496ff" />
              <Text style={styles.servicioText}>{item.nombre}</Text>
            </View>
          ))}
        </View>

        {/* Noticias */}
        <Text style={styles.subtitle}>📰 Noticias</Text>
        {noticias.map((item) => (
          <View key={item.id} style={styles.noticiaCard}>
            <Text style={styles.noticiaTitulo}>{item.titulo}</Text>
            <Text style={styles.noticiaDesc}>{item.desc}</Text>
          </View>
        ))}



      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#f9f5ff" },
  container: { flex: 1, padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#5a2d82",
    textAlign: "center",
  },
  carouselImage: {
    width: 280,
    height: 160,
    borderRadius: 15,
    marginRight: 12,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: { fontSize: 18, fontWeight: "bold", color: "#5a2d82", marginBottom: 6 },
  infoText: { fontSize: 14, color: "#555", lineHeight: 20 },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
    color: "#5a2d82",
  },
  recomendacionesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  recomendacionCard: {
    backgroundColor: "#fff",
    width: "30%",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  recomendacionText: { fontSize: 12, textAlign: "center", marginTop: 6, color: "#444" },
  cardsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  card: {
    backgroundColor: "#fff",
    width: "47%",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#5a2d82", marginBottom: 8 },
  button: {
    backgroundColor: "#a395c0ff",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginTop: 6,
    elevation: 3,
  },
  buttonText: { color: "white", fontSize: 14, fontWeight: "600" },
  noticiaCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 5,
  },
  noticiaTitulo: { fontWeight: "bold", fontSize: 15, color: "#6f5975ff", marginBottom: 4 },
  noticiaDesc: { fontSize: 13, color: "#444" },
  serviciosContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 25 },
  servicioCard: { alignItems: "center" },
  servicioText: { marginTop: 5, fontSize: 13, color: "#333" },
  footer: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  footerText: { fontSize: 13, color: "#555", marginVertical: 2, textAlign: "center" },
});
