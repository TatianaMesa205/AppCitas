// Tabs.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Importa tus pantallas reales
import Inicio from "../Screen/Inicio/inicio";
import Perfil from "../Screen/Perfil/perfil";
import Citas from "../Screen/Citas/citas";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Inicio") {
            iconName = "home-outline";
          } else if (route.name === "Citas") {
            iconName = "calendar-outline";
          } else if (route.name === "Perfil") {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#63718aff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Citas"
        component={Citas}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
