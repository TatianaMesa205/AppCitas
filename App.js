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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
