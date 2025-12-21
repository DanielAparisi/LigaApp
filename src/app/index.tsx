import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Animated,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useAuth } from '../providers/AuthProvider';

export default function IndexScreen() {
  const { session, role, loading } = useAuth();
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (!loading) {
      // Agregar un pequeño delay para mostrar la animación
      const timeout = setTimeout(() => {
        if (!session) {
          // No autenticado -> Login
          router.replace('/(auth)/login');
        } else if (!role) {
          // Autenticado pero sin rol -> Selección de rol
          router.replace('/(auth)/seleccion-rol');
        } else {
          // Autenticado y con rol -> App principal
          router.replace('/(app)/sedes');
        }
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [loading, session, role]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <View style={styles.container}>
        {/* Logo Section */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.logoBackground}>
            <Image 
              source={require('../../assets/images/logoA+7Naranja.jpg')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Liga A + 7</Text>
            <Text style={styles.subtitle}>Tu liga de barrio</Text>
          </View>
        </Animated.View>

        {/* Loading Section */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color="#FF6B35" 
            style={styles.spinner}
          />
          <Text style={styles.loadingText}>
            {loading ? 'Iniciando...' : 'Redirigiendo...'}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.versionContainer}>
            <Ionicons name="football" size={16} color="#666" />
            <Text style={styles.versionText}>v1.0.0</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoBackground: {
    width: 140,
    height: 140,
    backgroundColor: '#2a2a2a',
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
    borderWidth: 3,
    borderColor: '#FF6B35',
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#FF6B35',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  spinner: {
    marginBottom: 16,
  },
  loadingText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  versionText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 6,
    fontWeight: '500',
  },
});