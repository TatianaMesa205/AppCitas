import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Ionicons from "react-native-vector-icons/Ionicons"
import API_BASE_URL from "../../Src/Config"

export default function Perfil({ navigation }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token")
        if (!token) return

        const response = await fetch(`${API_BASE_URL}/me`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
        })
        const data = await response.json()
        if (response.ok) setUser(data.user)
        else console.log("Error en la respuesta:", data)
      } catch (error) {
        console.error("Error obteniendo usuario:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (response.ok) {
        await AsyncStorage.removeItem("token")
        Alert.alert("👋 Hasta pronto", data.message)
        navigation.replace("Login")
      } else Alert.alert("Error", data.message || "No se pudo cerrar sesión")
    } catch (error) {
      console.error(error)
      Alert.alert("Error", "Ocurrió un problema al cerrar sesión")
    }
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6f42c1" />
        <Text style={styles.loadingText}>Cargando tu perfil...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {user ? (
        <>
          <View style={styles.header}>
            <Ionicons name="person-circle" size={100} color="#fff" />
            <Text style={styles.name}>{user.name}</Text>
            <View style={styles.roleContainer}>
              <Text style={styles.role}>{user.role}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Información del Usuario</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nombre</Text>
              <Text style={styles.value}>{user.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Rol</Text>
              <Text style={styles.value}>{user.role}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>No se pudieron cargar los datos.</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f5" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f0f0f5" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#6c757d" },
  header: {
    backgroundColor: "#b2a4dbff",
    paddingVertical: 50,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  name: { fontSize: 24, fontWeight: "bold", color: "#fff", marginTop: 10 },
  roleContainer: {
    marginTop: 8,
    backgroundColor: "#93b6ddff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 50,
  },
  role: { color: "#fff", fontSize: 14, fontWeight: "600" },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginBottom: 30,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, color: "#343a40", textAlign: "center" },
  infoRow: { marginBottom: 15 },
  label: { fontSize: 14, color: "#6c757d" },
  value: { fontSize: 16, fontWeight: "600", color: "#212529" },
  logoutButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9b80be",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 20,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  errorText: { textAlign: "center", marginTop: 20, color: "#904f4f", fontSize: 16 },
})
