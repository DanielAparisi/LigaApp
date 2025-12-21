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
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../providers/AuthProvider';

export default function SeleccionRol() {
  const { session } = useAuth();
  const router = useRouter();

  const updateRole = async (role: 'jugador' | 'arbitro' | 'espectador') => {
    if (!session) return;

    // Actualizamos el rol en la tabla profiles
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
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="football" size={40} color="#FF6B35" />
          </View>
          <Text style={styles.title}>¿Quién eres en la liga?</Text>
          <Text style={styles.subtitle}>Selecciona tu rol para personalizar tu experiencia</Text>
        </View>

        {/* Roles Cards */}
        <View style={styles.rolesContainer}>
          {/* Árbitro */}
          <TouchableOpacity 
            style={styles.roleCard} 
            onPress={() => updateRole('arbitro')}
            activeOpacity={0.8}
          >
            <View style={styles.roleIconContainer}>
              <Ionicons name="flag" size={32} color="#FF6B35" />
            </View>
            <Text style={styles.roleTitle}>Árbitro</Text>
            <Text style={styles.roleDescription}>
              Controla los partidos, edita actas y registra goles, tarjetas y eventos del juego
            </Text>
            <View style={styles.roleFeatures}>
              <Text style={styles.featureText}>• Editar actas de partidos</Text>
              <Text style={styles.featureText}>• Registrar goles y tarjetas</Text>
              <Text style={styles.featureText}>• Control total del juego</Text>
            </View>
          </TouchableOpacity>

          {/* Jugador */}
          <TouchableOpacity 
            style={styles.roleCard} 
            onPress={() => updateRole('jugador')}
            activeOpacity={0.8}
          >
            <View style={styles.roleIconContainer}>
              <Ionicons name="person" size={32} color="#FF6B35" />
            </View>
            <Text style={styles.roleTitle}>Jugador</Text>
            <Text style={styles.roleDescription}>
              Accede a tus estadísticas personales, equipos y sigue tu rendimiento
            </Text>
            <View style={styles.roleFeatures}>
              <Text style={styles.featureText}>• Ver estadísticas personales</Text>
              <Text style={styles.featureText}>• Seguir tu equipo</Text>
              <Text style={styles.featureText}>• Historial de partidos</Text>
            </View>
          </TouchableOpacity>

          {/* Espectador */}
          <TouchableOpacity 
            style={styles.roleCard} 
            onPress={() => updateRole('espectador')}
            activeOpacity={0.8}
          >
            <View style={styles.roleIconContainer}>
              <Ionicons name="eye" size={32} color="#FF6B35" />
            </View>
            <Text style={styles.roleTitle}>Espectador</Text>
            <Text style={styles.roleDescription}>
              Disfruta siguiendo la liga, resultados y estadísticas generales
            </Text>
            <View style={styles.roleFeatures}>
              <Text style={styles.featureText}>• Ver todos los partidos</Text>
              <Text style={styles.featureText}>• Seguir clasificaciones</Text>
              <Text style={styles.featureText}>• Estadísticas generales</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Podrás cambiar tu rol más tarde en la configuración
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 22,
  },
  rolesContainer: {
    gap: 20,
  },
  roleCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  roleIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  roleTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 8,
  },
  roleDescription: {
    fontSize: 16,
    color: '#CCCCCC',
    lineHeight: 22,
    marginBottom: 16,
  },
  roleFeatures: {
    gap: 6,
  },
  featureText: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});