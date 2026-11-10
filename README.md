# AvisAR · Vicente López

Plataforma municipal participativa de reclamos para los vecinos de **Vicente López**.
Hecha en **HTML + CSS + JavaScript vanilla**, sin build. El mapa usa una imagen local de **OpenStreetMap** y funciona sin conexión.

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

## Mapa interactivo

Acercá o alejá el mapa con la rueda o con los botones **+** y **−**. Arrastrá para recorrerlo.
Al acercarte, las tarjetas apiladas se separan y podés abrir cada reclamo. Los controles
también funcionan con el teclado y la vista de creación conserva la ubicación elegida al cambiar el zoom.

Se cargan 40 reclamos iniciales. Las imágenes de archivo tienen créditos de Wikimedia Commons.

## Animaciones

La navegación usa View Transitions cuando el navegador lo admite, con una entrada CSS como respaldo.
Los gráficos se animan cuando entran en pantalla y el check comienza después de la transición al comprobante.

## Pantallas (según flujo y wireframes)

| Ruta | Pantalla |
|------|----------|
| `#/` | Home: mapa de Vicente López + introducción, estadísticas, categorías y últimos reclamos |
| `#/reclamos` | Explorar reclamos con filtros (categoría, estado, palabra) |
| `#/ver-reclamos` | Listado público, 10 reclamos por página |
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
| `#/mapa` | Mapa de Vicente López con tarjetas, agrupamiento, zoom y filtros |
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

- Acceso local: cualquier email + contraseña (mín. 4 caracteres). También con los botones sociales.
- Los reclamos, apoyos, comentarios y notificaciones se guardan en `localStorage`.
- Reiniciar todo (borra los reclamos locales y vuelve a cargar los reclamos iniciales):

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

## Créditos de las fotos de referencia

- [Pothole in an asphalt pavement.jpg](https://commons.wikimedia.org/wiki/File:Pothole_in_an_asphalt_pavement.jpg) · Frankie Fouganthin · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- [Damaged footpath in India.jpg](https://commons.wikimedia.org/wiki/File:Damaged_footpath_in_India.jpg) · Vendor on Robolow Universe · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- [Small HPS street lamp.jpg](https://commons.wikimedia.org/wiki/File:Small_HPS_street_lamp.jpg) · Bidgee · [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/)
- [Paper recycling bin overflows.jpg](https://commons.wikimedia.org/wiki/File:Paper_recycling_bin_overflows.jpg) · Kotivalo · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- [Fallen trees blocking footpath - geograph.org.uk - 5305995.jpg](https://commons.wikimedia.org/wiki/File:Fallen_trees_blocking_footpath_-_geograph.org.uk_-_5305995.jpg) · Evelyn Simak · [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)
- [Storm Drain Clogged - Mid-City New Orleans.jpg](https://commons.wikimedia.org/wiki/File:Storm_Drain_Clogged_-_Mid-City_New_Orleans.jpg) · Bart Everson · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)
- [Pedestrian (Zebra) Crossing, Quarry Hill - geograph.org.uk - 1583524.jpg](https://commons.wikimedia.org/wiki/File:Pedestrian_%28Zebra%29_Crossing%2C_Quarry_Hill_-_geograph.org.uk_-_1583524.jpg) · Nigel Chadwick · [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)
- [Damaged Fence - geograph.org.uk - 1803886.jpg](https://commons.wikimedia.org/wiki/File:Damaged_Fence_-_geograph.org.uk_-_1803886.jpg) · Anne Burgess · [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/)
- [Broken bench Briant Pond Park Summit NJ 2009.jpg](https://commons.wikimedia.org/wiki/File:Broken_bench_Briant_Pond_Park_Summit_NJ_2009.jpg) · Tomwsulcer · [Dominio público](https://commons.wikimedia.org/wiki/File:Broken_bench_Briant_Pond_Park_Summit_NJ_2009.jpg)
- [Dripping Faucet.JPG](https://commons.wikimedia.org/wiki/File:Dripping_Faucet.JPG) · Angelsharum · [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

Las fotos se muestran con recorte de encuadre y algunas se redujeron para la web. Las fotografías son imágenes de archivo.
