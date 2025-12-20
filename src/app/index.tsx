/**
 * 🎯 PANTALLA INICIAL - SPLASH/ENTRADA
 * 
 * RUTA: /
 * OBJETIVO: Punto de entrada de la aplicación
 * 
 * QUÉ IMPLEMENTAR:
 * 1. Verificar estado de autenticación con useAuth()
 * 2. Mostrar splash screen mientras carga
 * 3. Redirigir según estado:
 *    - Si loading: mostrar splash
 *    - Si no autenticado: redirect a /(auth)/login
 *    - Si autenticado pero sin perfil: redirect a /(auth)/seleccion-rol
 *    - Si autenticado y con perfil: redirect a /(app)/sedes
 * 
 * COMPONENTES:
 * - Logo de la Liga
 * - Spinner de carga
 * - Redirect de expo-router
 */