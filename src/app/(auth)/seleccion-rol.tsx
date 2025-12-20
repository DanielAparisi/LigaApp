/**
 * 🎯 PANTALLA DE SELECCIÓN DE ROL
 * 
 * RUTA: /(auth)/seleccion-rol
 * OBJETIVO: Usuario elige su rol en la aplicación
 * 
 * QUÉ IMPLEMENTAR:
 * 1. Tres opciones de rol:
 *    - Árbitro: Puede editar actas, añadir goles/tarjetas
 *    - Jugador: Puede ver sus estadísticas, equipos
 *    - Espectador: Solo visualización
 * 2. Guardar rol en tabla 'profiles' de Supabase
 * 3. Descripción clara de cada rol
 * 4. Redirect a /(app)/sedes tras selección
 * 
 * COMPONENTES:
 * - Cards para cada rol con descripción
 * - TouchableOpacity para selección
 * - Iconos representativos de cada rol
 */
import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';

export default function SeleccionRol() {
  const { session } = useAuth();
  const router = useRouter();

  const updateRole = async (role: 'jugador' | 'arbitro' | 'espectador') => {
    if (!session) return;

    // Actualizamos el rol en la tabla profiles [13]
    const { error } = await supabase
      .from('profiles')
      .update({ role: role })
      .eq('id', session.user.id);

    if (!error) {
      // Redirigir a la app principal
      router.replace('/(app)/sedes');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Quién eres en la liga?</Text>
      <Button title="Soy Jugador" onPress={() => updateRole('jugador')} />
      <View style={{height: 10}} />
      <Button title="Soy Árbitro" onPress={() => updateRole('arbitro')} />
      <View style={{height: 10}} />
      <Button title="Solo Espectador" onPress={() => updateRole('espectador')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 30, textAlign: 'center' }
});