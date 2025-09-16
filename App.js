import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Importar pantallas
import Login from "./Screen/Auth/login";
import Registro from "./Screen/Auth/registro";
import Inicio from "./Screen/Inicio/inicio";

import ListarCitas from "./Screen/Citas/listarCitas";
import CrearCita from "./Screen/Citas/crearCita";
import DetalleCita from "./Screen/Citas/detalleCita";
import EditarCita from "./Screen/Citas/editarCita";

import ListarConsultorios from "./Screen/Consultorios/listarConsultorios";
import CrearConsultorio from "./Screen/Consultorios/crearConsultorio";
import DetalleConsultorio from "./Screen/Consultorios/detalleConsultorio";
import EditarConsultorio from "./Screen/Consultorios/editarConsultorio";

import ListarEspecialidades from "./Screen/Especialidades/listarEspecialidades";
import CrearEspecialidad from "./Screen/Especialidades/crearEspecialidad";
import DetalleEspecialidad from "./Screen/Especialidades/detalleEspecialidad";
import EditarEspecialidad from "./Screen/Especialidades/editarEspecialidad";

import ListarMedicos from "./Screen/Medicos/listarMedicos";
import CrearMedico from "./Screen/Medicos/crearMedico";
import DetalleMedico from "./Screen/Medicos/detalleMedico";
import EditarMedico from "./Screen/Medicos/editarMedico";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Iniciar Sesión" }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ title: "Registro" }}
        />
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ title: "Menú Principal" }}
        />


        <Stack.Screen
          name="ListarCitas"
          component={ListarCitas}
          options={{ title: "Citas Agendadas" }}
        />
        <Stack.Screen
          name="CrearCita"
          component={CrearCita}
          options={{ title: "Agendar Cita" }}
        />
        <Stack.Screen
          name="DetalleCita"
          component={DetalleCita}
          options={{ title: "Detalle de la Cita" }}
        />
        <Stack.Screen
          name="EditarCita"
          component={EditarCita}
          options={{ title: "Editar la cita" }}
        />


        <Stack.Screen
          name="ListarConsultorios"
          component={ListarConsultorios}
          options={{ title: "Lista de consultorios" }}
        />
        <Stack.Screen
          name="CrearConsultorio"
          component={CrearConsultorio}
          options={{ title: "Agregar consultorio" }}
        />
        <Stack.Screen
          name="DetalleConsultorio"
          component={DetalleConsultorio}
          options={{ title: "Detalle del consultorio" }}
        />
        <Stack.Screen
          name="EditarConsultorio"
          component={EditarConsultorio}
          options={{ title: "Editar consultorio" }}
        />


        <Stack.Screen
          name="ListarEspecialidades"
          component={ListarEspecialidades}
          options={{ title: "Lista de especialidades" }}
        />
        <Stack.Screen
          name="CrearEspecialidad"
          component={CrearEspecialidad}
          options={{ title: "Agregar especialidad" }}
        />
        <Stack.Screen
          name="DetalleEspecialidad"
          component={DetalleEspecialidad}
          options={{ title: "Detalle de la especialidad" }}
        />
        <Stack.Screen
          name="EditarEspecialidad"
          component={EditarEspecialidad}
          options={{ title: "Editar especialidad" }}
        />


        <Stack.Screen
          name="ListarMedicos"
          component={ListarMedicos}
          options={{ title: "Lista de medicos" }}
        />
        <Stack.Screen
          name="CrearMedico"
          component={CrearMedico}
          options={{ title: "Agregar medico" }}
        />
        <Stack.Screen
          name="DetalleMedico"
          component={DetalleMedico}
          options={{ title: "Detalle del medico" }}
        />
        <Stack.Screen
          name="EditarMedico"
          component={EditarMedico}
          options={{ title: "Editar medico" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
