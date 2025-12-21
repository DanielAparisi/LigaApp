/**
 * 🎯 EJERCICIO 1: CONFIGURACIÓN DE SUPABASE
 * 
 * OBJETIVO: Crear la conexión principal con la base de datos en la nube
 * 
 * QUÉ TIENES QUE IMPLEMENTAR:
 * 1. Importar createClient de '@supabase/supabase-js'
 * 2. Importar AsyncStorage para persistencia
 * 3. Configurar el cliente con tu URL y API Key de Supabase
 * 4. Habilitar persistencia de sesión para que el usuario no tenga que loguearse cada vez
 * 5. Exportar el cliente para usarlo en toda la app
 * 
 * PISTAS:
 * - Necesitas las variables: supabaseUrl y supabaseAnonKey
 * - Configurar auth.storage con AsyncStorage
 * - Habilitar autoRefreshToken y persistSession
 * - Deshabilitar detectSessionInUrl (no aplica en móvil)
 * 
 * RESULTADO ESPERADO: 
 * export const supabase = createClient(...)
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
//import 'react-native-url-polyfill/auto';

const ExpoWebSecureStoreAdapter = {
  getItem: (key: string) => {
    console.debug("getItem", { key })
    return AsyncStorage.getItem(key)
  },
  setItem: (key: string, value: string) => {
    return AsyncStorage.setItem(key, value)
  },
  removeItem: (key: string) => {
    return AsyncStorage.removeItem(key)
  },
};

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL ?? '',
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '',
  {
    auth: {
      storage: ExpoWebSecureStoreAdapter,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);