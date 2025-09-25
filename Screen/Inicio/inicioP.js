import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  Image, 
  ScrollView 
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
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

  const imagenes = [
    { id: "1", url: "https://img.freepik.com/foto-gratis/doctor-mostrando-pulgar-arriba_23-2147896205.jpg" },
    { id: "2", url: "https://i.pinimg.com/1200x/d1/f3/fb/d1f3fb9cbc43a8c87a9806232042c429.jpg" },
    { id: "3", url: "https://i.pinimg.com/1200x/8a/45/d1/8a45d16a8e8ff9c3d39b460d680f1cb9.jpg" },
  ];

  const noticias = [
    { id: "1", titulo: "Nueva campaña de vacunación", desc: "Vacunas gratuitas contra la influenza hasta el 30 de septiembre." },
    { id: "2", titulo: "Chequeos preventivos", desc: "Realiza un chequeo general al menos una vez al año." },
    { id: "3", titulo: "Semana de la salud", desc: "Charlas y jornadas de prevención del 10 al 15 de octubre." },
  ];

  const servicios = [
    { id: "1", icon: "flask-outline", nombre: "Laboratorio" },
    { id: "2", icon: "medkit-outline", nombre: "Urgencias" },
    { id: "3", icon: "bandage-outline", nombre: "Farmacia" },
    { id: "4", icon: "heart-outline", nombre: "Cardiología" },
  ];

  return (
    <View style={styles.screen}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* Bienvenida */}
        <Animatable.Text 
          animation="fadeInDown" 
          duration={1200} 
          style={styles.title}
        >
          🏥 Bienvenido {userName}
        </Animatable.Text>

        {/* Información */}
        <Animatable.View animation="fadeInUp" duration={1200} style={styles.infoBox}>
          <Text style={styles.infoTitle}>Hospital Santa Salud</Text>
          <Text style={styles.infoText}>
            Fundado en 1998, con más de 25 años de experiencia brindando atención
            médica de calidad. Nuestro compromiso es cuidar tu salud con
            profesionalismo y calidez humana.
          </Text>
        </Animatable.View>

        {/* Carrusel */}
        <Animatable.View animation="fadeIn" duration={1200}>
          <FlatList
            data={imagenes}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Animatable.Image 
                animation="zoomIn" 
                duration={1000} 
                source={{ uri: item.url }} 
                style={styles.carouselImage} 
              />
            )}
            style={{ marginBottom: 25 }}
          />
        </Animatable.View>

        {/* Recomendaciones */}
        <Text style={styles.subtitle}>💡 Recomendaciones</Text>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.recomendacionesContainer}>
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
        </Animatable.View>

        {/* explora */}
        <Text style={styles.subtitle}>🔎 Explora</Text>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.cardsContainer}>
          <View style={[styles.card, styles.cardMedicos]}>
            <Ionicons name="medkit-outline" size={40} color="#4e342e" />
            <Text style={styles.cardTitle}>Médicos</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonMedicos]}
              onPress={() => navigation.navigate("MedicosP", { screen: "ListarMedicosP" })}
            >
              <Text style={styles.buttonText}>Ver Médicos</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, styles.cardEspecialidades]}>
            <Ionicons name="bandage-outline" size={40} color="#1a237e" />
            <Text style={styles.cardTitle}>Especialidades</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonEspecialidades]}
              onPress={() => navigation.navigate("EspecialidadesP", { screen: "ListarEspecialidadesP" })}
            >
              <Text style={styles.buttonText}>Ver Especialidades</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>


        {/* Servicios */}
        <Text style={styles.subtitle}>⚕️ Servicios Destacados</Text>
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.serviciosContainer}>
          {servicios.map((item) => (
            <View key={item.id} style={styles.servicioCard}>
              <Ionicons name={item.icon} size={30} color="#746496ff" />
              <Text style={styles.servicioText}>{item.nombre}</Text>
            </View>
          ))}
        </Animatable.View>

        {/* Noticias */}
        <Text style={styles.subtitle}>📰 Noticias</Text>
        {noticias.map((item, index) => (
          <Animatable.View 
            key={item.id} 
            animation="fadeInUp" 
            delay={index * 300} 
            style={styles.noticiaCard}
          >
            <Text style={styles.noticiaTitulo}>{item.titulo}</Text>
            <Text style={styles.noticiaDesc}>{item.desc}</Text>
          </Animatable.View>
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
    backgroundColor: "#d3eaf5ff", // sutil lila
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#2a0036ff",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
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
    backgroundColor: "#f3eefc", // sutil violeta
    width: "30%",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  recomendacionText: { fontSize: 12, textAlign: "center", marginTop: 6, color: "#444" },
  cardsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30 },
  card: {
    backgroundColor: "#d3c5e9ff", // muy suave
    width: "47%",
    borderRadius: 20,
    padding: 18,
    alignItems: "center",
    shadowColor: "#005315ff",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#5a2d82", marginBottom: 8 },
  button: {
    backgroundColor: "#c3b8e2", // botón suave
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginTop: 6,
    elevation: 2,
  },
  buttonText: { color: "white", fontSize: 14, fontWeight: "600" },
  noticiaCard: {
    backgroundColor: "#f7f2fb", // lila muy claro
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 3,
  },
  noticiaTitulo: { fontWeight: "bold", fontSize: 15, color: "#6f5975ff", marginBottom: 4 },
  noticiaDesc: { fontSize: 13, color: "#444" },
  serviciosContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 25 },
  servicioCard: { alignItems: "center" },
  servicioText: { marginTop: 5, fontSize: 13, color: "#333" },
  cardsContainer: { 
  flexDirection: "row", 
  justifyContent: "space-between", 
  marginBottom: 30 
},
card: {
  width: "47%",
  borderRadius: 20,
  padding: 18,
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 3,
},
// colores distintos
cardMedicos: { backgroundColor: "#ffe0b2" },          // naranja claro
cardEspecialidades: { backgroundColor: "#c8e6c9" },   // verde claro

// botones con contraste
button: {
  paddingVertical: 6,
  paddingHorizontal: 14,
  borderRadius: 25,
  marginTop: 6,
  elevation: 2,
},
buttonMedicos: { backgroundColor: "#fcc573ff" },        // naranja más fuerte
buttonEspecialidades: { backgroundColor: "#81c784" }, // verde más fuerte

buttonText: { color: "white", fontSize: 14, fontWeight: "600" },

});
