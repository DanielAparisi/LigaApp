# 🔧 Configuración de Supabase con validación de email y contraseña

## ⚠️ IMPORTANTE: Configurar Supabase Dashboard

Para mantener un sistema seguro con validación de email y contraseña:

### 1. 📧 Habilitar confirmación de email

Ve a tu dashboard de Supabase:

1. **Authentication** → **Settings**
2. **Email** tab
3. **Habilitar** **"Enable email confirmations"**
4. Configurar plantilla de email de confirmación
5. Guardar cambios

### 2. 🔒 Configurar validación de contraseña

En **Authentication** → **Settings** → **Password**:

1. Marcar **"Enable sign ups"**
2. **Habilitar** **"Enable email confirmations"**
3. Configurar política de contraseñas:
   - Longitud mínima: 8 caracteres
   - Requerir mayúsculas y minúsculas
   - Requerir números
   - Requerir caracteres especiales (opcional)

### 3. 🛡️ Configurar políticas RLS (Row Level Security)

En **Authentication** → **Policies**, crear política para la tabla `profiles`:

```sql
-- Política para permitir INSERT en profiles
CREATE POLICY "Users can insert their own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Política para permitir SELECT en profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- Política para permitir UPDATE en profiles  
CREATE POLICY "Users can update their own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);
```

### 4. 📋 Crear tabla profiles si no existe

```sql
-- Crear tabla profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  role TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Habilitar RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

### 3. 📨 Configurar email de confirmación

En **Authentication** → **Email Templates**:

1. Personalizar el email de confirmación
2. Asegurarse de que el enlace de confirmación funcione
3. Configurar el redirect URL para después de la confirmación

## 🚀 Con estos cambios

✅ Los usuarios deben confirmar su email antes de acceder
✅ Las contraseñas están validadas según políticas de seguridad
✅ Se crea automáticamente su perfil después de la confirmación
✅ Mayor seguridad en el sistema de autenticación
✅ El sistema de roles funciona correctamente

## 🔐 Beneficios de la validación

- **Seguridad**: Contraseñas fuertes obligatorias
- **Verificación**: Solo emails válidos pueden acceder
- **Anti-spam**: Reduce cuentas falsas
- **Confiabilidad**: Los usuarios son reales

## 🐛 Para debugging

Revisa los logs en la consola de la app para ver:

- Estado de autenticación
- Errores de confirmación de email
- Errores de validación de contraseña
- Errores de Supabase
- Creación de perfiles
