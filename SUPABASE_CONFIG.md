# 🔧 Configuración de Supabase para evitar problemas de autenticación

## ⚠️ IMPORTANTE: Configurar Supabase Dashboard

Para evitar problemas de confirmación de email y permitir registro inmediato:

### 1. 📧 Deshabilitar confirmación de email

Ve a tu dashboard de Supabase:

1. **Authentication** → **Settings**
2. **Email** tab
3. Deshabilitar **"Enable email confirmations"**
4. Guardar cambios

### 2. 🔒 Habilitar registro sin confirmación

En la misma sección:

1. Marcar **"Enable sign ups"**
2. Deshabilitar **"Enable email confirmations"** (si no está ya)

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

## 🚀 Con estos cambios

✅ Los usuarios se pueden registrar inmediatamente sin confirmación de email
✅ Se crea automáticamente su perfil en la tabla `profiles`
✅ Pueden hacer login inmediatamente después del registro
✅ El sistema de roles funciona correctamente

## 🐛 Para debugging

Revisa los logs en la consola de la app para ver:

- Estado de autenticación
- Errores de Supabase
- Creación de perfiles
