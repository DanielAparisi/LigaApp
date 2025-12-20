/**
 * 🎯 EJERCICIO 2: TIPOS DE BASE DE DATOS
 * 
 * OBJETIVO: Generar automáticamente los tipos TypeScript desde Supabase
 * 
 * PASOS A SEGUIR:
 * 1. Primero crear las tablas en Supabase Dashboard:
 *    - profiles (id, role: 'Arbitro'|'Jugador'|'Espectador', user_id, created_at)
 *    - sedes (id, nombre, descripcion, created_at)
 *    - equipos (id, nombre, sede_id, escudo_url, created_at)
 *    - jugadores (id, nombre, equipo_id, numero, posicion, created_at)
 *    - partidos (id, equipo_local_id, equipo_visitante_id, fecha, jornada, sede_id, resultado_local, resultado_visitante)
 *    - goles (id, partido_id, jugador_id, minuto, tipo)
 *    - tarjetas (id, partido_id, jugador_id, tipo: 'amarilla'|'roja', minuto)
 * 
 * 2. Luego ejecutar el comando:
 *    npx supabase gen types typescript --project-id [TU_PROJECT_ID] > src/api/database.types.ts
 * 
 * 3. Verificar que se generaron correctamente todos los tipos
 * 
 * IMPORTANTE: Este archivo se sobrescribe automáticamente, no editar manualmente
 * 
 * RESULTADO ESPERADO:
 * - Interface Database con todas las tablas
 * - Tipos para cada tabla con sus columnas
 * - Relaciones entre tablas (foreign keys)
 */