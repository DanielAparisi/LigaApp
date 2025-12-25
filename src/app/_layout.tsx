import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import AuthProvider, { useAuth } from '../providers/AuthProvider';
//import QueryProvider from '../providers/QueryProvider';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAppGroup = segments[0] === '(app)';

    if (!session && inAppGroup) {
      // Si el usuario cierra sesión y está dentro de la app, redirigir al login
      router.replace('/(auth)/login');
    }
  }, [session, loading, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  return (
   // <QueryProvider> Todo ---->QueryProvider
      <AuthProvider>
        <AuthGuard>
          <StatusBar style="light" backgroundColor="#1a1a1a" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#1a1a1a' },
              animation: 'slide_from_right',
            }}
          >
            {/* Pantalla inicial/splash */}
            <Stack.Screen 
              name="index" 
              options={{ 
                headerShown: false,
                gestureEnabled: false 
              }} 
            />
            
            {/* Grupo de Autenticación */}
            <Stack.Screen 
              name="(auth)" 
              options={{ 
                headerShown: false,
                gestureEnabled: false
              }} 
            />
            
            {/* Grupo de App Principal */}
            <Stack.Screen 
              name="(app)" 
              options={{ 
                headerShown: false,
                gestureEnabled: true
              }} 
            />
          </Stack>
        </AuthGuard>
      </AuthProvider>
    //</QueryProvider>
  );
}
