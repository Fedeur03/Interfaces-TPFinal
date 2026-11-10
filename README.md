# AvisAR · Vicente López

Prototipo académico de participación vecinal para reportar problemas del espacio público, ubicarlos en el mapa y seguir su resolución. Los reclamos y las intervenciones iniciales son ficticios. Para gestiones reales, usá los [canales de atención de Vicente López](https://www.vicentelopez.gov.ar/canales-de-atencion/).

## Cómo abrir el proyecto

Abrí `index.html` en un navegador moderno o iniciá un servidor desde la carpeta del proyecto:

```bash
python -m http.server 8123
```

Después entrá a `http://localhost:8123`. Usar el mismo navegador y dirección permite conservar los datos locales. El servidor local es la opción más predecible para las pruebas de almacenamiento y búsqueda de direcciones.

## Vistas

| Ruta | Función |
| --- | --- |
| `#/` | Inicio, indicadores, mapa, carrusel de lugares y reclamos recientes |
| `#/reclamos`, `#/ver-reclamos` | Listados públicos con paginación y búsqueda |
| `#/reclamo/:id` | Detalle, apoyo, comentarios, seguimiento y evidencia municipal |
| `#/crear`, `#/enviado/:id` | Alta por dirección o selección en el mapa y confirmación animada |
| `#/mapa` | Zoom, agrupación, filtros y paginación de resultados en el panel lateral |
| `#/estadisticas` | Gráficos animados con valores al pasar el cursor o enfocar con el teclado |
| `#/peticiones` | Iniciativas habilitadas y en camino a los 100 apoyos |
| `#/registro`, `#/login`, `#/perfil` | Cuenta local y opción de mantener la sesión |
| `#/mis-reclamos`, `#/notificaciones` | Seguimiento personal y bandeja con borrado individual o completo |
| `#/municipio`, `#/novedades` | Información institucional, intervenciones y selección editorial de noticias |
| `#/municipal` | Gestión del estado, verificación, respuesta pública y adjuntos |
| `#/contacto`, `#/preguntas`, `#/terminos` | Soporte, guía de uso y términos ficticios |

## Datos, navegación y archivos

- HTML, CSS y JavaScript sin compilación. `app.js` contiene el enrutador y el estado, `claim-map.js` gestiona el mapa y `civic-content.js` reúne el contenido institucional.
- Se cargan 40 reclamos iniciales y 56 iniciativas adicionales repartidas en ocho barrios. Hay 50 iniciativas nuevas que superan los 100 apoyos y seis que todavía se acercan a la meta. Las nuevas iniciativas se incorporan también al almacenamiento previo, conservando los cambios de los reclamos existentes.
- Cada cuenta puede apoyar un reclamo una vez. Con 100 apoyos se habilita una carta pública que se puede copiar desde Peticiones.
- El mapa base de OpenStreetMap y las fotos se sirven como archivos locales. Los filtros actualizan marcadores y resultados sin reconstruir el mapa. La búsqueda escrita de direcciones necesita conexión a OpenStreetMap Nominatim.
- Los reclamos, apoyos, perfiles y notificaciones se guardan en `localStorage` con la clave `avisar_vl_v2`. En el login, sin **Mantener sesión**, el acceso dura lo que dure la pestaña. Al marcarlo, el acceso persiste en el navegador.
- El inicio de sesión y los accesos de Google, Facebook y Apple se simulan localmente. Usá datos ficticios al probarlos.
- El panel municipal se habilita con la cuenta de prueba `admin@avisar.test` y la contraseña `admin123`. El acceso se valida en el navegador y las credenciales son públicas en el código de la maqueta. Para proteger datos reales se requiere autenticación y autorización en un servidor.
- Para cerrar un reclamo, el panel requiere un parte de intervención o un adjunto. Acepta imágenes PNG, JPEG, WebP y GIF y videos MP4, WebM y MOV de hasta 15 MB. `evidence.js` administra esos archivos en IndexedDB. Los medios y los cambios quedan en el navegador donde se cargaron.
- En escritorio, el menú lateral se expande en 0,8 s. En móvil se puede abrir con un gesto desde el borde izquierdo y cerrar deslizando dentro del menú.
- Para reiniciar, borrá los datos del sitio en el navegador. Esto elimina la cuenta local, los cambios y los adjuntos de IndexedDB.

## Créditos institucionales

- Identidad gráfica y enlaces de atención, prensa y agenda del [Municipio de Vicente López](https://www.vicentelopez.gov.ar/).
- La vista Novedades consulta las publicaciones del portal municipal y muestra una selección fechada si la consulta falla. También enlaza al [listado municipal actualizado](https://www.vicentelopez.gov.ar/novedades/).
- Fotografías del partido provenientes de Wikimedia Commons. Mapa base © colaboradores de OpenStreetMap.

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
