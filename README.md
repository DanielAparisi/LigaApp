 Explicación de la Arquitectura

1. (auth) vs (app): Usamos "Grupos" de Expo Router (las carpetas con paréntesis). Esto permite separar la lógica de Login del resto de la app sin que afecte a la URL. Si no hay sesión, el usuario se queda en (auth); si hay sesión, pasa a (app).
2. Rutas Dinámicas [id]: Según tu sitemap, tienes "Liga El Casar" y "Liga Guadalajara". En lugar de crear una carpeta para cada una, usamos sedes/[id]. Cuando navegues, usarás el ID de la base de datos (ej. sedes/1 para El Casar) y cargarás los datos dinámicamente con React Query.
3. Api Layer: En src/api crearás "Hooks" personalizados (ej. useLeagues, useMatchDetails). Esto separa la lógica de "buscar datos" de la lógica de "mostrar datos" (UI).
4. Supabase Types: Cuando tengas tu base de datos creada, ejecutarás el comando para generar los tipos en src/types/database.types.ts, lo que te dará autocompletado inteligente en toda la app.

 He organizado la explicación por "capas" de la aplicación para que entiendas cómo fluyen los datos y la navegación.

1. El "Motor" y Configuración (src/lib, src/providers, src/types)
Estos archivos son la base invisible que hace que la aplicación funcione, conectándose a la base de datos y gestionando el estado global.
• src/lib/supabase.ts:
    ◦ Qué hace: Es el "enchufe" que conecta tu app con la nube. Inicializa el cliente de Supabase utilizando la URL y la llave anónima (API Key) de tu proyecto,.
    ◦ Detalle clave: Configura el almacenamiento (AsyncStorage) para que la sesión del usuario persista (no tenga que loguearse cada vez que cierra la app),.
• src/types/database.types.ts:
    ◦ Qué hace: Es el diccionario de tu base de datos. Se genera automáticamente con el comando de Supabase CLI y define qué tablas existen (Jugadores, Partidos, Sedes) y qué columnas tienen,. Ayuda a que TypeScript te avise si intentas acceder a un dato que no existe.
• src/providers/AuthProvider.tsx:
    ◦ Qué hace: Es el "guardia de seguridad" de la app. Utiliza un Contexto de React para vigilar si hay un usuario logueado o no.
    ◦ Función extra: Aquí deberás añadir la lógica para consultar la tabla profiles y saber si el usuario es "Árbitro", "Jugador" o "Espectador" (como indica tu sitemap), permitiendo o denegando el acceso a ciertas funciones (ej. rellenar actas),.
• src/providers/QueryProvider.tsx:
    ◦ Qué hace: Configura React Query. Envuelve toda la aplicación para gestionar la caché de datos. Si un usuario entra a ver la clasificación, esta se guarda en la memoria del teléfono; si vuelve atrás y entra de nuevo, la carga es instantánea sin volver a pedirla a la base de datos, ahorrando recursos y mejorando la velocidad,.
2. La Capa de Datos (src/api)
Aquí vivirán tus "Hooks" personalizados. En lugar de escribir código de base de datos dentro de las pantallas (lo cual es desordenado), lo hacemos aquí.
• src/api/sedes.ts, src/api/equipos.ts, etc.:
    ◦ Qué hace: Contienen funciones como useSedes, usePartidos, useJugadorById.
    ◦ Cómo funciona: Usan el cliente de Supabase para hacer SELECT, INSERT o UPDATE a la base de datos y devuelven los datos limpios a la pantalla,. Por ejemplo, en equipos.ts crearías una función que busque todos los jugadores de un equipo específico.
3. Navegación y Pantallas (src/app)
Esta estructura sigue el sistema de Expo Router, donde las carpetas y archivos se convierten automáticamente en pantallas y rutas de navegación.
Raíz
• src/app/_layout.tsx:
    ◦ Qué hace: Es el archivo maestro. Carga los Providers (Auth y Query) y define la navegación principal (normalmente un Stack). Decide qué mostrar primero mientras carga la app,.
• src/app/index.tsx:
    ◦ Qué hace: Es la pantalla de entrada o "Splash". Normalmente, aquí verificas si el usuario está autenticado. Si lo está, lo rediriges a (app)/sedes; si no, lo mandas a (auth)/login.
Grupo de Autenticación (auth)
• src/app/(auth)/login.tsx y registro.tsx:
    ◦ Qué hace: Pantallas con formularios para introducir email/contraseña. Llaman a supabase.auth.signInWithPassword o signUp,.
• src/app/(auth)/seleccion-rol.tsx:
    ◦ Qué hace: Según tu sitemap, tras el registro, el usuario elige si es Jugador, Árbitro o Espectador. Este archivo guardará esa elección en tu tabla de profiles en la base de datos, lo cual es crucial para los permisos futuros (ej. editar partidos).
Grupo de Aplicación Principal (app)
• src/app/(app)/sedes/index.tsx:
    ◦ Qué hace: Muestra la lista de ligas disponibles ("El Casar", "Guadalajara"). Al pulsar una, navega a la ruta dinámica sedes/[id].
• src/app/(app)/sedes/[id]/index.tsx:
    ◦ Qué hace: Es la pantalla de inicio de una liga específica. El [id] en el nombre del archivo captura dinámicamente si el usuario entró a la liga 1 o a la liga 2,. Desde aquí se bifurca a Jornadas, Clasificación o Equipos.
Sub-secciones Dinámicas (El núcleo de tu lógica)
• src/app/(app)/sedes/[id]/jornadas/partidos/[matchId].tsx:
    ◦ Qué hace: Pantalla de "Detalles del partido". Usa el matchId para buscar goles, tarjetas y resultado. Si el usuario logueado es Árbitro (verificado vía AuthProvider), aquí mostrarás los botones para editar el acta; si es espectador, solo verá los datos.
• src/app/(app)/sedes/[id]/clasificacion.tsx, goleadores.tsx:
    ◦ Qué hace: Pantallas de lectura. Hacen una petición a la API (useClasificacion) para mostrar la tabla de puntos o la lista de máximos anotadores filtrada por el ID de la sede actual.
• src/app/(app)/sedes/[id]/equipos/jugadores/[playerId].tsx:
    ◦ Qué hace: "Detalles del jugador". Muestra la foto, estadísticas y descripción. Al ser una ruta dinámica anidada, sabe exactamente qué jugador mostrar basándose en la URL.
Resumen con una analogía
Imagina que tu aplicación es un Restaurante (La Liga):
4. src/lib/supabase.ts: Es la tubería de gas y agua (conexión vital con el exterior/servidor).
5. src/providers: Son el Gerente y el Almacén. El Gerente (AuthProvider) decide quién entra y si es cliente o empleado (roles). El Almacén (QueryProvider) guarda ingredientes (datos) cerca para no tener que ir al mercado por cada plato.
6. src/api: Son los Cocineros. Saben cómo preparar los platos exactos (pedir datos a la base de datos) cuando un camarero se lo pide.
7. src/app: Es el Menú y las Mesas.
    ◦ auth: Es la recepción donde te identificas.
    ◦ sedes/[id]: Es una mesa específica. Aunque todas las mesas son iguales (la estructura del archivo es la misma), en una se sienta la familia "El Casar" y en otra la familia "Guadalajara" (los datos cambian dinámicamente).
