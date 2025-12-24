/**
 * 🎯 PROVEEDOR DE AUTENTICACIÓN
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
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any; user?: any }>;
  signOut: () => Promise<void>;
  hasPermission: (action: string) => boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
  role: null,
  isAdmin: false,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null, user: null }),
  signOut: async () => {},
  hasPermission: () => false,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Obtener sesión inicial
    const fetchSession = async () => {
      console.log(' Obteniendo sesión inicial...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log(' Sesión inicial:', session?.user?.email || 'No hay sesión');
      setSession(session);
      if (session) await fetchProfile(session.user.id);
      setLoading(false);
    };

    fetchSession();

    // 2. Escuchar cambios (login, logout) [9]
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔔 Auth state changed:', event, session?.user?.email || 'No session');
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

  // Buscar el rol en la tabla 'profiles'
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        // Si no existe el perfil, crearlo
        if (error.code === 'PGRST116') {
          console.log('Perfil no encontrado, creando...');
          await supabase
            .from('profiles')
            .insert({
              id: userId,
              role: null
            });
          setRole(null);
        } else {
          console.error('Error fetching profile:', error);
        }
      } else if (data) {
        setRole(data.role);
      }
    } catch (e) {
      console.error('Error in fetchProfile:', e);
    }
  };

  // Función para iniciar sesión
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error };
    }
  };

  // Función para registrarse
  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: undefined, // Deshabilitar confirmación de email
        }
      });

      // Si Supabase nos devuelve una sesión inmediatamente (email confirm desactivado), la guardamos
      if (data.session) {
        setSession(data.session);
        await fetchProfile(data.session.user.id);
      }
      
      // Si el registro es exitoso, crear el perfil automáticamente
      if (data.user && !error) {
        try {
          await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              role: null // Se asignará después en selección de rol
            });
        } catch (profileError) {
          console.log('Error creando perfil:', profileError);
        }
      }
      
      return { error, user: data.user };
    } catch (error) {
      return { error };
    }
  };

  // Función para cerrar sesión
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Sistema de permisos basado en roles
  const hasPermission = (action: string): boolean => {
    if (!role) return false;
    
    const permissions: Record<string, string[]> = {
      arbitro: ['edit_match', 'add_goals', 'add_cards', 'edit_result', 'view_all'],
      jugador: ['view_own_stats', 'view_team_info', 'view_public_info', 'choose_team'],
      espectador: ['view_public_info'],
      admin: ['edit_match', 'add_goals', 'add_cards', 'edit_result', 'view_all', 'admin_actions']
    };
    
    return permissions[role]?.includes(action) || false;
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      loading, 
      role, 
      isAdmin: role === 'admin' || role === 'arbitro',
      signIn,
      signUp,
      signOut,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
}