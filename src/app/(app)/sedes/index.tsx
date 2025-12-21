import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ConfirmModal, InfoModal } from '../../../components/Modals';
import { useAuth } from '../../../providers/AuthProvider';

interface Sede {
  id: string;
  nombre: string;
  descripcion: string;
  total_equipos: number;
  activa: boolean;
  created_at: string;
}

// Datos estáticos de las sedes disponibles
const SEDES_DISPONIBLES: Sede[] = [
  {
    id: '1',
    nombre: 'SedeGuadalajara',
    descripcion: 'Liga de fútbol 7 en Guadalajara con los mejores equipos de la zona',
    total_equipos: 16,
    activa: true,
    created_at: '2024-01-01'
  },
  {
    id: '2',
    nombre: 'sede EL CASAR',
    descripcion: 'Liga de fútbol 7 en El Casar con equipos locales y competición intensa',
    total_equipos: 12,
    activa: true,
    created_at: '2024-01-02'
  }
];

export default function SedesScreen() {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const { session, role, signOut } = useAuth();
  const router = useRouter();

  // Cargar sedes
  const fetchSedes = async () => {
    try {
      // Simular un pequeño delay para mostrar el loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSedes(SEDES_DISPONIBLES);
    } catch (error) {
      setShowErrorModal(true);
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSedes();
  };

  const handleSedePress = (sedeId: string) => {
    router.push(`/(app)/sedes/${sedeId}`);
  };

  const handleSignOut = () => {
    setShowSignOutModal(true);
  };

  const confirmSignOut = () => {
    signOut();
    setShowSignOutModal(false);
  };

  const renderSedeCard = ({ item }: { item: Sede }) => (
    <TouchableOpacity 
      style={styles.sedeCard}
      onPress={() => handleSedePress(item.id)}
      activeOpacity={0.8}
    >
      <View style={styles.sedeHeader}>
        <View style={styles.sedeIconContainer}>
          <Ionicons name="football" size={32} color="#FF6B35" />
        </View>
        <View style={styles.sedeInfo}>
          <Text style={styles.sedeNombre} numberOfLines={1}>
            {item.nombre}
          </Text>
          <Text style={styles.sedeDescripcion} numberOfLines={2}>
            {item.descripcion}
          </Text>
        </View>
        <View style={styles.chevronContainer}>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </View>
      </View>
      
      <View style={styles.sedeFooter}>
        <View style={styles.equiposContainer}>
          <Ionicons name="people" size={16} color="#FF6B35" />
          <Text style={styles.equiposText}>
            {item.total_equipos} equipos
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Activa</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="football-outline" size={64} color="#666" />
      <Text style={styles.emptyTitle}>No hay ligas disponibles</Text>
      <Text style={styles.emptyDescription}>
        Por el momento no hay ligas activas. Vuelve a intentar más tarde.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.welcomeText}>¡Bienvenido!</Text>
          <Text style={styles.roleText}>
            {role === 'arbitro' ? 'Árbitro' : 
             role === 'jugador' ? 'Jugador' : 
             role === 'espectador' ? 'Espectador' : 'Usuario'}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleSignOut}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF6B35" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>Selecciona una Liga</Text>
        <Text style={styles.headerSubtitle}>
          Elige la liga donde quieres participar
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Cargando ligas...</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <View style={styles.container}>
        <FlatList
          data={sedes}
          renderItem={renderSedeCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#FF6B35']}
              tintColor="#FF6B35"
            />
          }
        />
      </View>

      {/* Modales */}
      <InfoModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        message="Ocurrió un error inesperado al cargar las ligas"
        type="error"
        buttonText="Entendido"
      />

      <ConfirmModal
        visible={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={confirmSignOut}
        title="Cerrar Sesión"
        message="¿Estás seguro que quieres cerrar sesión?"
        confirmText="Cerrar Sesión"
        cancelText="Cancelar"
        type="danger"
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#888',
    fontSize: 16,
    marginTop: 16,
  },
  listContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  roleText: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '500',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  headerContent: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  sedeCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
  sedeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sedeIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  sedeInfo: {
    flex: 1,
  },
  sedeNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  sedeDescripcion: {
    fontSize: 14,
    color: '#cccccc',
    lineHeight: 20,
  },
  chevronContainer: {
    padding: 4,
  },
  sedeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  equiposContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  equiposText: {
    color: '#cccccc',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  statusText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 32,
  },
});