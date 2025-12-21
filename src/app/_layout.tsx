import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AuthProvider from '../providers/AuthProvider';
//import QueryProvider from '../providers/QueryProvider';

export default function RootLayout() {
  return (
   // <QueryProvider> Todo ---->QueryProvider
      <AuthProvider>
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
      </AuthProvider>
    //</QueryProvider>
  );
}
