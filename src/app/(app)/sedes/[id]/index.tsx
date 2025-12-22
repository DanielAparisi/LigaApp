/**
 * 🎯 HOME DE SEDE ESPECÍFICA
 * 
 * RUTA: /(app)/sedes/[id]
 * OBJETIVO: Pantalla principal de una liga específica
 * 
 * QUÉ IMPLEMENTAR:
 * 1. useLocalSearchParams() para obtener id
 * 2. useSedeById(id) para datos de la sede
 * 3. Menú principal con navegación a:
 *    - /(app)/sedes/[id]/comunidad
 *    - /(app)/sedes/[id]/informacon
 *    - /(app)/sedes/[id]/clasificacion
 *    - /(app)/sedes/[id]/goleadores
 *    - /(app)/sedes/[id]/equipos
 *    - /(app)/sedes/[id]/jornadas/partidos
 *    - /(app)/sedes/[id]/jornadas/jugadores
 * 4. Header con nombre de la liga
 * 5. Accesos rápidos según rol de usuario
 * 
 * COMPONENTES:
 * - Grid/List de opciones
 * - TouchableOpacity para navegación
 * - Iconos para cada sección
 */

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../../../providers/AuthProvider';

export default function SedeHomePage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { role, hasPermission } = useAuth();

  const menuOptions = [
    {
      id: 'comunidad',
      title: 'Comunidad',
      description: 'Conecta con otros jugadores',
      icon: 'people',
      route: `/(app)/sedes/${id}/comunidad`,
      color: '#FF6B35',
      permission: 'view_public_info'
    },
    {
      id: 'clasificacion',
      title: 'Clasificación',
      description: 'Tabla de posiciones',
      icon: 'trophy',
      route: `/(app)/sedes/${id}/clasificacion`,
      color: '#4ECDC4',
      permission: 'view_public_info'
    },
    {
      id: 'goleadores',
      title: 'Goleadores',
      description: 'Máximos anotadores',
      icon: 'football',
      route: `/(app)/sedes/${id}/goleadores`,
      color: '#45B7D1',
      permission: 'view_public_info'
    },
    {
      id: 'equipos',
      title: 'Equipos',
      description: 'Plantillas y jugadores',
      icon: 'shirt',
      route: `/(app)/sedes/${id}/equipos`,
      color: '#96CEB4',
      permission: 'view_public_info'
    },
    {
      id: 'partidos',
      title: 'Partidos',
      description: 'Calendarios y resultados',
      icon: 'calendar',
      route: `/(app)/sedes/${id}/jornadas/partidos`,
      color: '#FFEAA7',
      permission: 'view_public_info'
    },
    {
      id: 'jugadores',
      title: 'Estadísticas',
      description: 'Rendimiento individual',
      icon: 'stats-chart',
      route: `/(app)/sedes/${id}/jornadas/jugadores`,
      color: '#DDA0DD',
      permission: role === 'jugador' ? 'view_own_stats' : 'view_public_info'
    },
    {
      id: 'informacion',
      title: 'Información',
      description: 'Detalles de la liga',
      icon: 'information-circle',
      route: `/(app)/sedes/${id}/informacon`,
      color: '#F39C12',
      permission: 'view_public_info'
    }
  ];

  const quickActions = [
    {
      id: 'edit-match',
      title: 'Editar Partidos',
      icon: 'pencil',
      permission: 'edit_match',
      onPress: () => {
        // Navegar a panel de edición
        router.push(`/(app)/sedes/${id}/jornadas/partidos`);
      }
    },
    {
      id: 'manage-teams',
      title: 'Gestionar Equipos',
      icon: 'settings',
      permission: 'admin_actions',
      onPress: () => {
        router.push(`/(app)/sedes/${id}/equipos`);
      }
    }
  ];

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const filteredOptions = menuOptions.filter(option => 
    hasPermission(option.permission)
  );

  const availableQuickActions = quickActions.filter(action => 
    hasPermission(action.permission)
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liga Sede {id}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Bienvenida */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeIconContainer}>
            <Ionicons name="football" size={32} color="#FF6B35" />
          </View>
          <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
          <Text style={styles.welcomeSubtitle}>
            {role === 'arbitro' && 'Control total de la liga'}
            {role === 'jugador' && 'Sigue tu rendimiento'}
            {role === 'espectador' && 'Disfruta del espectáculo'}
            {role === 'admin' && 'Administración completa'}
          </Text>
        </View>

        {/* Acciones Rápidas */}
        {availableQuickActions.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
            <View style={styles.quickActionsContainer}>
              {availableQuickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.quickActionButton}
                  onPress={action.onPress}
                  activeOpacity={0.8}
                >
                  <Ionicons name={action.icon as any} size={20} color="#FF6B35" />
                  <Text style={styles.quickActionText}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Menú Principal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explorar Liga</Text>
          <View style={styles.menuGrid}>
            {filteredOptions.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={[styles.menuCard, { borderLeftColor: option.color }]}
                onPress={() => handleNavigation(option.route)}
                activeOpacity={0.8}
              >
                <View style={styles.menuCardContent}>
                  <View style={[styles.menuIconContainer, { backgroundColor: `${option.color}15` }]}>
                    <Ionicons 
                      name={option.icon as any} 
                      size={24} 
                      color={option.color} 
                    />
                  </View>
                  <View style={styles.menuTextContainer}>
                    <Text style={styles.menuTitle}>{option.title}</Text>
                    <Text style={styles.menuDescription}>{option.description}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666666" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Espaciado para el menú inferior */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Menú Fijo Inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity 
          style={styles.bottomMenuItem}
          onPress={() => router.push('/(app)/sedes')}
          activeOpacity={0.7}
        >
          <Ionicons name="home" size={24} color="#999999" />
          <Text style={styles.bottomMenuText}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bottomMenuItem}
          onPress={() => router.push(`/(app)/sedes/${id}/clasificacion`)}
          activeOpacity={0.7}
        >
          <Ionicons name="trophy" size={24} color="#999999" />
          <Text style={styles.bottomMenuText}>Tabla</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.bottomMenuItem, styles.bottomMenuActive]}
          activeOpacity={0.7}
        >
          <Ionicons name="football" size={24} color="#FF6B35" />
          <Text style={[styles.bottomMenuText, { color: '#FF6B35' }]}>Liga</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bottomMenuItem}
          onPress={() => router.push(`/(app)/sedes/${id}/equipos`)}
          activeOpacity={0.7}
        >
          <Ionicons name="people" size={24} color="#999999" />
          <Text style={styles.bottomMenuText}>Equipos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.bottomMenuItem}
          onPress={() => router.push(`/(app)/sedes/${id}/jornadas/partidos`)}
          activeOpacity={0.7}
        >
          <Ionicons name="calendar" size={24} color="#999999" />
          <Text style={styles.bottomMenuText}>Partidos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  welcomeCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  welcomeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#FF6B35',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuGrid: {
    gap: 12,
  },
  menuCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  menuDescription: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2a2a2a',
    borderTopWidth: 1,
    borderTopColor: '#3a3a3a',
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomMenuItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  bottomMenuActive: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  bottomMenuText: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
    fontWeight: '500',
  },
});