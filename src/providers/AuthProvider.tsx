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
import { Session } from '@supabase/supabase-js';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type AuthContextType = {
  session: Session | null;
  loading: boolean;
  role: string | null;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({ session: null, loading: true, role: null, isAdmin: false });

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtener sesión inicial
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) await fetchProfile(session.user.id);
      setLoading(false);
    };

    fetchSession();

    // 2. Escuchar cambios (login, logout) [9]
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await fetchProfile(session.user.id);
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Buscar el rol en la tabla 'profiles' [8]
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (data) setRole(data.role);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      loading, 
      role, 
      isAdmin: role === 'admin' || role === 'arbitro' // Helper para permisos
    }}>
      {children}
    </AuthContext.Provider>
  );
}