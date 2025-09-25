import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DateTimePicker from "@react-native-community/datetimepicker"
import Ionicons from "react-native-vector-icons/Ionicons"
import API_BASE_URL from "../../Src/Config"

export default function CrearCitaP({ route, navigation }) {
  const { idPaciente } = route.params
  const [medicos, setMedicos] = useState([])
  const [consultorios, setConsultorios] = useState([])
  const [loading, setLoading] = useState(true)

  const [idMedico, setIdMedico] = useState("")
  const [idConsultorio, setIdConsultorio] = useState("")
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [motivo, setMotivo] = useState("")
  const [estado, setEstado] = useState("pendiente")
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        const [medRes, conRes] = await Promise.all([
          fetch(`${API_BASE_URL}/listarMedicos`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }),
          fetch(`${API_BASE_URL}/listarConsultorios`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }),
        ])
        const medJson = await medRes.json()
        const conJson = await conRes.json()
        setMedicos(medJson)
        setConsultorios(conJson)

        if (medJson.length > 0) {
          const randomMedico = medJson[Math.floor(Math.random() * medJson.length)]
          setIdMedico(randomMedico.id)
        }
        if (conJson.length > 0) {
          const randomConsultorio = conJson[Math.floor(Math.random() * conJson.length)]
          setIdConsultorio(randomConsultorio.id)
        }
        setEstado("pendiente")
      } catch (e) {
        console.error("Error cargando datos:", e)
        Alert.alert("Error", "No se pudieron cargar médicos o consultorios")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleCrear = async () => {
    if (!idMedico || !idConsultorio || !fecha || !hora) {
      Alert.alert("⚠️ Completa todos los campos")
      return
    }

    try {
      const token = await AsyncStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/crearCitas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_pacientes: idPaciente,
          id_medicos: idMedico,
          id_consultorios: idConsultorio,
          fecha,
          hora,
          estado,
          motivo,
        }),
      })

      const body = await response.json()
      if (response.ok) {
        Alert.alert("✅ Cita creada correctamente")
        navigation.navigate("ListarMisCitas")
      } else {
        Alert.alert("Error", body.message || "Error creando cita")
      }
    } catch (e) {
      console.error(e)
      Alert.alert("Error", "Error de conexión")
    }
  }

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false)
    if (selectedTime) {
      const hh = String(selectedTime.getHours()).padStart(2, "0")
      const mm = String(selectedTime.getMinutes()).padStart(2, "0")
      setHora(`${hh}:${mm}`)
    }
  }

  const timeValue = hora
    ? (() => {
        const [h, m] = hora.split(":").map(Number)
        const d = new Date()
        d.setHours(h, m, 0, 0)
        return d
      })()
    : new Date()

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false)
    if (selectedDate) setFecha(selectedDate.toISOString().split("T")[0])
  }

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#9b59b6" />
        <Text style={{ marginTop: 10 }}>Cargando datos...</Text>
      </View>
    )

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>📅 Nueva Cita</Text>

        {/* Médico */}
        <Text style={styles.label}>Médico asignado</Text>
        <View style={styles.selectButton}>
          <Text style={styles.selectText}>
            {idMedico ? `${medicos.find((m) => m.id === idMedico)?.nombre_m} ${medicos.find((m) => m.id === idMedico)?.apellido_m}` : "Seleccionando médico..."}
          </Text>
        </View>

        {/* Consultorio */}
        <Text style={styles.label}>Consultorio asignado</Text>
        <View style={styles.selectButton}>
          <Text style={styles.selectText}>
            {idConsultorio ? `Consultorio ${consultorios.find((c) => c.id === idConsultorio)?.numero}` : "Seleccionando consultorio..."}
          </Text>
        </View>

        {/* Fecha */}
        <Text style={styles.label}>Fecha</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={{ color: fecha ? "#333" : "#aaa" }}>{fecha || "Selecciona una fecha"}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={fecha ? new Date(fecha) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}

        {/* Hora */}
        <Text style={styles.label}>Hora</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
          <Text style={{ color: hora ? "#333" : "#aaa" }}>{hora || "Selecciona una hora"}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={timeValue}
            mode="time"
            is24Hour={true}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleTimeChange}
          />
        )}

        {/* Motivo */}
        <Text style={styles.label}>Motivo</Text>
        <TextInput style={styles.input} placeholder="Motivo de la cita" value={motivo} onChangeText={setMotivo} />

        {/* Estado */}
        <Text style={styles.label}>Estado</Text>
        <View style={styles.selectButton}>
          <Text style={styles.selectText}>{estado}</Text>
        </View>

        {/* Botón */}
        <TouchableOpacity style={styles.button} onPress={handleCrear}>
          <Text style={styles.buttonText}>Crear Cita</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3e9f7", justifyContent: "center", padding: 20 },
  card: { backgroundColor: "#fff", borderRadius: 20, padding: 25, shadowColor: "#000", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 6 },
  title: { fontSize: 22, fontWeight: "bold", color: "#9b59b6", textAlign: "center", marginBottom: 20 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 5, color: "#444" },
  selectButton: { borderWidth: 1, borderColor: "#d1b3ff", borderRadius: 12, padding: 14, marginBottom: 15, backgroundColor: "#fafafa", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  selectText: { fontSize: 16, color: "#333" },
  input: { borderWidth: 1, borderColor: "#d1b3ff", padding: 12, marginBottom: 15, borderRadius: 12, backgroundColor: "#fafafa", color: "#333" },
  button: { backgroundColor: "#a564d3", padding: 15, borderRadius: 30, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
})
