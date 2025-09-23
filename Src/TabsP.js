
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import InicioStackP from "./Stack/inicioStackP";
import PerfilStackP from "./Stack/perfilStack";
import CitasStackP from "./Stack/citasStackP";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "InicioP") iconName = "home-outline";
          else if (route.name === "CitasP") iconName = "calendar-outline";
          else if (route.name === "PerfilP") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7d3ef3ff",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen 
        name="InicioP" 
        component={InicioStackP} 
        options={{ headerShown: false, 
        title: "Inicio de usuario" }} 
      />
      <Tab.Screen 
        name="CitasP" 
        component={CitasStackP} 
        options={{ headerShown: false, 
        title: "Gestión de citas" }} 
      />
      <Tab.Screen 
        name="PerfilP" 
        component={PerfilStackP} 
        options={{ headerShown: false, 
        title: "Perfil usuario" }} 
      />
    </Tab.Navigator>
  );
}
