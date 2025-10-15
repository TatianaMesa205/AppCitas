import {View, Text, Switch, Alert} from 'react-native'
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Configuracion () {

    const [permisoNotificaciones, setPermisoNotificaciones] = useState(false);
    const [Loading, setLoading] = useState(true);

    const checkPermisos = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        const preferencia = await AsyncStorage.getItem('notificaciones_activas');
        setPermisoNotificaciones(status === 'granted' && preferencia === 'true');
        setLoading(false);
    };

    useEffect(() => {
        checkPermisos();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            checkPermisos();
        }, [])
    );

    // Se crea funcion para validar si la notificacion está o no activada

    const toggleSwitch = async (valor) => {
        if (valor) {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                await AsyncStorage.setItem('notificaciones_activas', 'true');
                setPermisoNotificaciones(true);
                Alert.alert('Permiso concedido');
            } else {
                await AsyncStorage.setItem('notificaciones_activas', 'false');
                setPermisoNotificaciones(false);
                Alert.alert('Permiso denegado');
            }
        } else {
            await AsyncStorage.setItem('notificaciones_activas', 'false');
            setPermisoNotificaciones(false);
            Alert.alert('Notificaciones desactivadas');
        }
    }

    const programarNotificacion = async () => {
        const { status } = await Notifications.getPermissionsAsync();
        const preferencia = await AsyncStorage.getItem('notificaciones_activas');
        if (status !== 'granted' || preferencia !== 'true') {
            Alert.alert('No tienes permisos para recibir notificaciones');
            return; // Se calculan aproximadamente dos minutos para que llegue la notificacion 
        }

        const trigger = new Date(Date.now() + 5 * 60 * 1000); // 2 minutos

        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Notificacion programada',
                    body: 'Esta es una notificacion programada para dos minutos después',
                },
                trigger,
            })
            Alert.alert('Notificación programada para dos minutos despues');
        } catch (error) {
            Alert.alert('Error al prpgramar la notificacion');
        }
    }

    return (
        <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style = {{ fontSize: 18, marginBotton:10}}>
                Notificaciones: {permisoNotificaciones ? 'Activadas' : 'Desactivadas'}
            </Text>
            <Switch
                value={permisoNotificaciones}
                onValueChange={toggleSwitch}
            />
            <Button title='Programar notificacion en dos minutos' onPress={programarNotificacion} />
        </View>
    );
}