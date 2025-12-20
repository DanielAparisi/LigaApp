/**
 * 🎯 PANTALLA DE REGISTRO
 * 
 * RUTA: /(auth)/registro
 * OBJETIVO: Crear nueva cuenta de usuario
 * 
 * QUÉ IMPLEMENTAR:
 * 1. Formulario con email, contraseña, confirmar contraseña
 * 2. Validación (email válido, contraseñas coinciden)
 * 3. Llamar signUp() del AuthProvider
 * 4. Manejar errores de registro
 * 5. Redirect a /(auth)/seleccion-rol tras registro exitoso
 * 6. Link a login
 * 
 * COMPONENTES:
 * - TextInput para datos del usuario
 * - Validación en tiempo real
 * - Link a /(auth)/login
 */
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Registro() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function signUpWithEmail() {
    setLoading(true);
    // Crea el usuario en Supabase Auth [10]
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      // Si el registro es exitoso, vamos a seleccionar rol
      // Nota: Supabase loguea automáticamente tras registro si no hay confirmación de email
      router.replace('/(auth)/seleccion-rol'); 
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Registro</Text>
      <TextInput 
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="email@address.com"
        autoCapitalize={'none'}
        style={styles.input}
      />
      <TextInput 
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Contraseña"
        autoCapitalize={'none'}
        style={styles.input}
      />
      <Button title="Crear Cuenta" disabled={loading} onPress={signUpWithEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 24, marginBottom: 10, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 }
});