import { AuthError } from '@supabase/supabase-js';

export const getAuthErrorMessage = (error: AuthError | any): string => {
  if (!error) return '';

  const message = error.message || '';
  const code = error.code || '';

  // Errores de Login
  if (message.includes('Invalid login credentials') || message.includes('invalid_credentials')) {
    return 'Correo electrónico o contraseña incorrectos. Por favor, verifica tus datos.';
  }
  if (message.includes('Email not confirmed') || message.includes('email_not_confirmed')) {
    return 'Tu correo electrónico no ha sido confirmado. Por favor, revisa tu bandeja de entrada.';
  }
  
  // Errores de Registro
  if (message.includes('User already registered') || code === 'user_already_exists') {
    return 'Ya existe una cuenta registrada con este correo electrónico.';
  }
  if (message.includes('Password should be at least') || message.includes('weak_password')) {
    return 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
  }
  if (message.includes('Unable to validate email address: invalid format') || message.includes('invalid_email')) {
    return 'El formato del correo electrónico no es válido.';
  }

  // Errores de Límite y Red
  if (message.includes('Too many requests') || message.includes('rate_limit') || message.includes('Email rate limit exceeded')) {
    return 'Has realizado demasiados intentos. Por favor, espera unos minutos antes de volver a intentarlo.';
  }
  if (message.includes('Network request failed')) {
    return 'Error de conexión. Por favor, verifica tu conexión a internet.';
  }

  // Errores Genéricos
  if (code === '500' || code === '502' || code === '503' || code === '504') {
    return 'Error en el servidor. Por favor, inténtalo más tarde.';
  }

  // Fallback para errores no manejados específicamente pero mostrando el mensaje original si es útil
  console.log('Error de autenticación no manejado:', error);
  return message || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
};
