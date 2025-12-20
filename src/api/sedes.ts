/**
 * 🎯 EJERCICIO 6: API DE SEDES
 * 
 * OBJETIVO: Crear hooks personalizados para gestionar las sedes/ligas
 * 
 * QUÉ TIENES QUE IMPLEMENTAR:
 * 
 * 1. IMPORTACIONES NECESARIAS:
 *    - useQuery, useMutation, useQueryClient de @tanstack/react-query
 *    - supabase client de ../lib/supabase
 *    - Tipos Database de ./database.types
 * 
 * 2. HOOK useSedes():
 *    - Usar useQuery con key ['sedes']
 *    - Fetch: supabase.from('sedes').select('*')
 *    - Retornar: { data, loading, error, refetch }
 *    - Configurar staleTime apropiado (las sedes no cambian frecuentemente)
 * 
 * 3. HOOK useSedeById(id: string):
 *    - Usar useQuery con key ['sede', id]
 *    - Fetch: supabase.from('sedes').select('*').eq('id', id).single()
 *    - Manejar caso cuando id es undefined (enabled: !!id)
 *    - Retornar datos de la sede específica
 * 
 * 4. HOOK useCreateSede() (SOLO ADMIN):
 *    - Usar useMutation
 *    - Mutation: supabase.from('sedes').insert([newSede])
 *    - onSuccess: invalidar cache ['sedes']
 *    - Manejar errores de permisos
 * 
 * 5. HOOK useUpdateSede() (SOLO ADMIN):
 *    - Usar useMutation con id y data
 *    - Mutation: supabase.from('sedes').update(data).eq('id', id)
 *    - onSuccess: invalidar ['sedes'] y ['sede', id]
 * 
 * ESTRUCTURA DE SEDE:
 * {
 *   id: string,
 *   nombre: string, // 'Liga El Casar', 'Liga Guadalajara'
 *   descripcion: string,
 *   created_at: string
 * }
 * 
 * RESULTADO ESPERADO:
 * - 4-5 hooks exportados
 * - Caché funcionando correctamente
 * - Invalidación automática tras mutaciones
 */