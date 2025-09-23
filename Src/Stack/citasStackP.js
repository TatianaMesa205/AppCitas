// CitasStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarCitasP from "../../Screen/Citas/listarCitasP";
import CrearCitaP from "../../Screen/Citas/crearCita";
import DetalleCitaP from "../../Screen/Citas/detalleCitaP";

const Stack = createStackNavigator();

export default function CitasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListarCitasP" 
        component={ListarCitasP} 
        options={{ title: "Citas Agendadas" }} 
      />
      <Stack.Screen 
        name="CrearCitaP" 
        component={CrearCitaP} 
        options={{ title: "Agendar Cita" }} 
      />
      <Stack.Screen 
        name="DetalleCitaP" 
        component={DetalleCitaP}
        options={{ title: "Detalle de la Cita" }} 
      />
    </Stack.Navigator>
  );
}
