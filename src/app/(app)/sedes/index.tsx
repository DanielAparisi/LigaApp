/**
 * 🎯 LISTA DE SEDES/LIGAS
 * 
 * RUTA: /(app)/sedes
 * OBJETIVO: Mostrar todas las ligas disponibles
 * 
 * QUÉ IMPLEMENTAR:
 * 1. Usar useSedes() para obtener lista de ligas
 * 2. Card para cada liga:
 *    - Nombre (Liga El Casar, Liga Guadalajara)
 *    - Descripción
 *    - Número de equipos
 *    - Imagen/logo
 * 3. Navegación a /(app)/sedes/[id] al tocar una liga
 * 4. Estados loading/error/empty
 * 5. Pull-to-refresh
 * 
 * NAVEGACIÓN:
 * - Tap en liga → router.push(`/(app)/sedes/${sedeId}`)
 * 
 * COMPONENTES:
 * - FlatList para rendimiento
 * - Card component para cada sede
 */