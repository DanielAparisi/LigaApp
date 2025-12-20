/**
 * 🎯 EJERCICIO 5: PROVEEDOR DE REACT QUERY
 * 
 * OBJETIVO: Configurar la gestión de caché y estado de datos
 * 
 * QUÉ TIENES QUE IMPLEMENTAR:
 * 
 * 1. INSTALAR DEPENDENCIA:
 *    npm install @tanstack/react-query
 * 
 * 2. CREAR QUERYCLIENT:
 *    - Importar QueryClient, QueryClientProvider
 *    - Crear nueva instancia con configuración para React Native:
 *      * staleTime: 5 * 60 * 1000 (5 minutos)
 *      * cacheTime: 10 * 60 * 1000 (10 minutos)
 *      * retry: 3
 *      * refetchOnWindowFocus: false (no aplica en móvil)
 *      * refetchOnReconnect: true
 * 
 * 3. CREAR PROVIDER COMPONENT:
 *    - QueryProvider que recibe children
 *    - Envuelve children con QueryClientProvider
 *    - Pasar el queryClient como prop
 * 
 * 4. OPCIONAL - DEVTOOLS:
 *    - Instalar @tanstack/react-query-devtools
 *    - Añadir ReactQueryDevtools solo en desarrollo
 *    - if (__DEV__) { ... }
 * 
 * CONFIGURACIÓN ADICIONAL (AVANZADO):
 * - Persistencia de caché con AsyncStorage
 * - Manejo de estados offline
 * - Configuración de mutaciones globales
 * 
 * RESULTADO ESPERADO:
 * - QueryProvider component
 * - Configuración optimizada para React Native
 * - Caché funcionando correctamente
 * 
 * BENEFICIOS:
 * - Carga instantánea al volver a pantallas visitadas
 * - Sincronización automática cuando la app vuelve a primer plano
 * - Manejo automático de estados loading/error/success
 */