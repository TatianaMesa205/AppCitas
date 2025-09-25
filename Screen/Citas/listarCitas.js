import React, { useEffect, useState } from "react"
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DateTimePicker from "@react-native-community/datetimepicker"
import API_BASE_URL from "../../Src/Config"

export default function ListarCitas({ navigation }) {
  const [citas, setCitas] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        const response = await fetch(`${API_BASE_URL}/listarCitas`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        })
        const data = await response.json()
        if (response.ok) {
          setCitas(data)
        } else {
          console.error("Error en la respuesta:", data)
        }
      } catch (error) {
        console.error("Error obteniendo citas:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCitas()
  }, [])

  const handleDateChange = (event, date) => {
    setShowDatePicker(false)
    if (date) {
      const isoDate = date.toISOString().split("T")[0]
      setSelectedDate(isoDate)
    }
  }

  const citasPendientes = citas.filter((c) => c.estado === "pendiente")
  const citasConfirmadas = citas.filter((c) => c.estado === "confirmada")
  const citasCanceladas = citas.filter((c) => c.estado === "cancelada")

  const groupedData = [
    { type: "header", title: "PENDIENTES" },
    ...citasPendientes,
    { type: "header", title: "CONFIRMADAS" },
    ...citasConfirmadas,
    { type: "header", title: "CANCELADAS" },
    ...citasCanceladas,
  ]

  const renderItem = ({ item }) => {
    if (item.type === "header") {
      return <Text style={styles.subtitle}>{item.title}</Text>
    }
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("DetalleCita", { cita: item })}
      >
      <View style={styles.cardContent}>
        <Ionicons name="calendar-outline" size={28} color="#b2a3c0ff" style={{ marginRight: 10 }} />
        <View>
          <Text style={styles.date}>{item.fecha} - {item.hora}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.doctor}>👨‍⚕️ {item.medico?.nombre_m} {item.medico?.apellido_m}</Text>
            <View
              style={[
                styles.estadoBadge,
                item.estado === "pendiente"
                  ? { backgroundColor: "#fff4b3" }
                  : item.estado === "confirmada"
                  ? { backgroundColor: "#c6f6d5" }
                  : { backgroundColor: "#feb2b2" },
              ]}
            >
              <Text style={styles.estadoText}>{item.estado.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>


        <Ionicons name="chevron-forward-outline" size={24} color="#706180ff" />
      </TouchableOpacity>
    )
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#706180ff" />
        <Text style={{ marginTop: 10, color: "#706180ff" }}>Cargando citas...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 LISTA DE CITAS</Text>

      <FlatList
        data={groupedData}
        keyExtractor={(item, index) =>
          item.type === "header" ? `header-${index}` : item.id.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CrearCita")}>
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.addButtonText}>CREAR CITA</Text>
          </TouchableOpacity>
        )}
      />

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate ? new Date(selectedDate) : new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f0ff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#706180ff", marginBottom: 15, textAlign: "center" },
  list: { paddingBottom: 20 },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5a4a70",
    marginTop: 15,
    marginBottom: 8,
    textAlign: "left",
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
  cardContent: { flexDirection: "row", alignItems: "center" },
  date: { fontSize: 16, fontWeight: "600", color: "#776985ff" },
  doctor: { fontSize: 14, color: "#675285ff" },
  addButton: {
    backgroundColor: "#9b80beff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 30,
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  estadoBadge: {
  paddingVertical: 2,
  paddingHorizontal: 8,
  borderRadius: 15,
  marginLeft: 6,
},
estadoText: {
  fontSize: 12,
  fontWeight: "bold",
  color: "#333",
},

})
