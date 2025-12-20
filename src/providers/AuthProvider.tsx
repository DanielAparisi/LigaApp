/**
 * 🎯 EJERCICIO 4: PROVEEDOR DE AUTENTICACIÓN
 * 
 * OBJETIVO: Crear el sistema de autenticación y manejo de roles
 * 
 * QUÉ TIENES QUE IMPLEMENTAR:
 * 
 * 1. CREAR EL CONTEXTO:
 *    - AuthContext con createContext
 *    - Interface AuthContextType con:
 *      * user: User | null (usuario de Supabase)
 *      * profile: Profile | null (perfil con rol desde BD)
 *      * loading: boolean
 *      * signIn: (email, password) => Promise<void>
 *      * signUp: (email, password) => Promise<void>
 *      * signOut: () => Promise<void>
 *      * hasPermission: (action: string) => boolean
 * 
 * 2. CREAR EL PROVIDER COMPONENT:
 *    - AuthProvider que envuelve children
 *    - useState para user, profile, loading
 *    - useEffect para escuchar cambios de auth con supabase.auth.onAuthStateChange
 *    - Cuando cambie user, consultar tabla profiles para obtener rol
 * 
 * 3. IMPLEMENTAR FUNCIONES:
 *    - signIn: usar supabase.auth.signInWithPassword
 *    - signUp: usar supabase.auth.signUp
 *    - signOut: usar supabase.auth.signOut
 *    - hasPermission: lógica según rol (Arbitro puede editar, Jugador solo ver sus datos, etc.)
 * 
 * 4. CREAR HOOK PERSONALIZADO:
 *    - useAuth() que use useContext(AuthContext)
 *    - Verificar que se use dentro del provider
 * 
 * PERMISOS POR ROL:
 * - Arbitro: edit_match, add_goals, add_cards, edit_result
 * - Jugador: view_own_stats, view_team_info
 * - Espectador: view_public_info
 * 
 * RESULTADO ESPERADO:
 * - AuthProvider component
 * - useAuth hook
 * - Sistema de permisos funcionando
 */