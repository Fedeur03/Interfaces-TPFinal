# AvisAR · Vicente López

Plataforma municipal participativa de reclamos para los vecinos de **Vicente López**.
Hecha en **HTML + CSS + JavaScript vanilla**, sin build. Usa **Leaflet + OpenStreetMap**
(por CDN) para el mapa real, con un mapa SVG propio como respaldo sin conexión.

## Cómo abrirla

**Opción 1 (más simple):** abrí `index.html` con doble clic.

**Opción 2 (servidor local):**

```bash
python -m http.server 8123
# o
npx serve .
```

Y entrá a `http://localhost:8123`.

## Estructura

```
avisar-web/
├── index.html    → navbar + sidenav desplegable + footer
├── styles.css    → sistema de diseño y layout responsive
├── app.js        → rutas, estado (localStorage), mapa real y lógica
└── README.md
```

## Mapa real

El mapa usa **Leaflet + OpenStreetMap** y se centra en el partido de **Vicente López**.
Cada reclamo se dibuja con un **pin del color e ícono de su categoría** en la
coordenada exacta elegida al crearlo. El Home muestra ese mapa como pieza central.

Si no hay conexión y Leaflet no carga, la app usa automáticamente un **mapa SVG
de respaldo** con los barrios del partido, para que nunca quede en blanco.

> La base arranca **vacía**: no hay reclamos precargados. El mapa se va llenando
> a medida que los vecinos publican.

## Pantallas (según flujo y wireframes)

| Ruta | Pantalla |
|------|----------|
| `#/` | Home: mapa de Vicente López + introducción, estadísticas, categorías y últimos reclamos |
| `#/reclamos` | Explorar reclamos con filtros (categoría, estado, palabra) |
| `#/reclamo/:id` | Detalle: foto, descripción, barra de apoyo, estado reportado vs. municipal, noticias |
| `#/crear` | Crear reclamo: categoría, descripción, selección en mapa y foto/video |
| `#/enviado/:id` | Reclamo enviado con N° de reclamo y fecha |
| `#/registro` | Registro (email, fecha de nacimiento, celular, contraseña + sociales) |
| `#/login` | Inicio de sesión (+ “¿Olvidaste tu contraseña?”) |
| `#/perfil` | Perfil del usuario |
| `#/mis-reclamos` | Reclamos hechos por el usuario |
| `#/notificaciones` | Notificaciones y novedades |
| `#/municipio` | Introducción institucional del Municipio |
| `#/municipal` | Panel municipal: estado, verificación, evidencia y respuesta |
| `#/mapa` | Mapa real de Vicente López con un pin por reclamo (color + ícono de categoría) |
| `#/estadisticas` | KPIs, categorías, evolución mensual y barrios |
| `#/peticiones` | Peticiones colectivas (≥ 100 apoyos) |

## Flujo implementado

1. **Ingreso** al sitio (Home).
2. **¿Está logueado?** Si no, al crear/apoyar/comentar se pide **registro o inicio de sesión**.
3. **Explorar / buscar** reclamos por categoría y estado.
4. **Leer detalle** y **apoyar** un reclamo existente.
5. **Crear reclamo**: categoría + descripción + ubicación en mapa + foto/video → **Enviar**.
6. **Reclamo enviado** con N° y fecha → “Ver mi reclamo”.
7. **Consultar novedades y estado** en notificaciones y perfil.
8. Se generan **estados actualizados, mensajería y anuncios**.
9. **Introducción del Municipio** y panel de gestión.

## Categorías, color e ícono

| Categoría | Color | Ícono |
|-----------|-------|-------|
| Seguridad | `#dc2626` | Escudo |
| Infraestructura | `#d97706` | Llave |
| Alumbrado | `#ca8a04` | Foco |
| Limpieza | `#16a34a` | Tacho |
| Tránsito | `#2563eb` | Semáforo |

## Barrios del mapa

La Lucila, Olivos, Florida, Florida Oeste, Munro, Villa Martelli, Villa Adelina y Carapachay.

## Datos y cuenta

- **No hay reclamos precargados**: la plataforma arranca de cero.
- Login demo: cualquier email + contraseña (mín. 4 caracteres). También con los botones sociales.
- Los reclamos, apoyos, comentarios y notificaciones se guardan en `localStorage`.
- Reiniciar todo (borra los reclamos locales y vuelve a cero):

```js
localStorage.removeItem("avisar_vl_v2");
location.reload();
```

## Reglas de negocio

- Un vecino apoya un reclamo **una sola vez**.
- A los **100 apoyos** se habilita la **petición colectiva** (carta pública copiable).
- El municipio cambia estado, verifica y carga evidencia.
- Un reclamo **no se marca resuelto sin evidencia**.

## Nota

El diseño se construyó a partir del **brief** y del **flujo + wireframes** (texto extraído del PDF). El modelo no puede recibir PDF/imágenes directamente, pero el contenido se recuperó extrayendo el texto.
