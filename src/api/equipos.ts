/**
 * 🎯 EJERCICIO 7: API DE EQUIPOS
 * 
 * OBJETIVO: Crear hooks para gestionar equipos, jugadores y estadísticas
 * 
 * QUÉ TIENES QUE IMPLEMENTAR:
 * 
 * 1. HOOK useEquiposBySede(sedeId: string):
 *    - Usar useQuery con key ['equipos', 'sede', sedeId]
 *    - Fetch: supabase.from('equipos').select('*').eq('sede_id', sedeId)
 *    - Ordenar por nombre alfabéticamente
 *    - enabled: !!sedeId
 * 
 * 2. HOOK useEquipoById(id: string):
 *    - Usar useQuery con key ['equipo', id]
 *    - Fetch: supabase.from('equipos').select('*, sede:sedes(*)').eq('id', id).single()
 *    - Incluir datos de la sede relacionada
 *    - enabled: !!id
 * 
 * 3. HOOK useJugadoresByEquipo(equipoId: string):
 *    - Usar useQuery con key ['jugadores', 'equipo', equipoId]
 *    - Fetch: supabase.from('jugadores').select('*').eq('equipo_id', equipoId)
 *    - Ordenar por numero de camiseta
 *    - enabled: !!equipoId
 * 
 * 4. HOOK useJugadorById(id: string):
 *    - Usar useQuery con key ['jugador', id]
 *    - Fetch: supabase.from('jugadores').select('*, equipo:equipos(*, sede:sedes(*))').eq('id', id).single()
 *    - Incluir datos del equipo y sede
 *    - enabled: !!id
 * 
 * 5. HOOK useCreateJugador() (SOLO ARBITROS):
 *    - Usar useMutation
 *    - Mutation: supabase.from('jugadores').insert([newJugador])
 *    - Validar que numero de camiseta no esté repetido en el equipo
 *    - onSuccess: invalidar ['jugadores', 'equipo', equipoId]
 * 
 * 6. HOOK useEstadisticasJugador(jugadorId: string):
 *    - Usar useQuery con key ['estadisticas', jugadorId]
 *    - Fetch goles: supabase.from('goles').select('*').eq('jugador_id', jugadorId)
 *    - Fetch tarjetas: supabase.from('tarjetas').select('*').eq('jugador_id', jugadorId)
 *    - Combinar datos y calcular totales
 * 
 * ESTRUCTURAS:
 * Equipo: { id, nombre, sede_id, escudo_url, created_at }
 * Jugador: { id, nombre, equipo_id, numero, posicion, created_at }
 * 
 * RESULTADO ESPERADO:
 * - 6+ hooks exportados
 * - Navegación dinámica funcionando (sedes/[id]/equipos)
 * - Estadísticas calculadas correctamente
 */