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