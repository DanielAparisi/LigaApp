/**
 * 🎯 EJERCICIO 8: LAYOUT PRINCIPAL DE NAVEGACIÓN
 * 
 * OBJETIVO: Configurar el sistema de navegación y providers de la app
 * 
 * QUÉ TIENES QUE IMPLEMENTAR:
 * 
 * 1. IMPORTACIONES NECESARIAS:
 *    - Stack de expo-router
 *    - AuthProvider de ../providers/AuthProvider
 *    - QueryProvider de ../providers/QueryProvider
 *    - useAuth hook
 * 
 * 2. CONFIGURAR PROVIDERS:
 *    - Envolver toda la app con QueryProvider (más externo)
 *    - Dentro, envolver con AuthProvider
 *    - Dentro, poner el Stack de navegación
 * 
 * 3. CONFIGURAR STACK NAVIGATOR:
 *    - Stack.Navigator con screenOptions apropiadas
 *    - Configurar headerShown según pantalla
 *    - Gestionar navegación inicial según estado de auth
 * 
 * 4. LÓGICA DE REDIRECCIÓN:
 *    - Si loading: mostrar splash/loading screen
 *    - Si no user: redirigir a (auth) group
 *    - Si user pero no profile: redirigir a selección de rol
 *    - Si user y profile: redirigir a (app) group
 * 
 * 5. CONFIGURAR GRUPOS DE RUTAS:
 *    - (auth) group: login, registro, selección-rol
 *    - (app) group: sedes y pantallas principales
 *    - Usar Redirect component cuando sea necesario
 * 
 * 6. PANTALLA DE LOADING:
 *    - Mostrar mientras se verifica autenticación
 *    - Spinner/logo de la Liga
 *    - Evitar flashes de pantalla
 * 
 * ESTRUCTURA ESPERADA:
 * QueryProvider > AuthProvider > Stack.Navigator
 * 
 * PANTALLAS A CONFIGURAR:
 * - index: pantalla inicial/splash
 * - (auth): grupo de autenticación
 * - (app): grupo de app principal
 * 
 * RESULTADO ESPERADO:
 * - Navegación automática según estado de auth
 * - Providers funcionando en toda la app
 * - Rutas protegidas según rol de usuario
 */