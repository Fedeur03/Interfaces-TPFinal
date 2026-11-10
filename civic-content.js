/* Contenido institucional de AvisAR */
const MUNICIPAL_SITE = "https://www.vicentelopez.gov.ar/";
const MUNICIPAL_FEED = MUNICIPAL_SITE + "wp-json/wp/v2/posts?per_page=6&_fields=title,link,date,excerpt";
const MUNICIPAL_NEWS = [
  ["Deportes", "6 nov 2026", "Colonia de verano 2027", "Actividades deportivas y recreativas para chicos y chicas durante enero y febrero.", "deportes/novedad/colonia-de-verano-2027-en-vicente-lopez/"],
  ["Servicios", "6 nov 2026", "Cambios de atención durante los feriados", "El Municipio publicó el cronograma de servicios para el 9 y el 11 de noviembre.", "novedad/servicios-municipales-durante-los-feriados-del-9-y-11-de-noviembre/"],
  ["Cultura", "10 oct 2026 – 3 ene 2027", "Salón de Artes Visuales El Félix", "Una muestra de artes visuales contemporáneas con acceso libre en Quinta Trabucco.", "evento/el-felix-56-o-salon-de-artes-visuales-fernan-felix-de-amador/"],
];

function newsCards(news) {
  return news.map(([area, date, title, body, url]) => `<article class="panel panel-pad civic-news">
    <span class="eyebrow">${esc(area)}</span><p class="muted">${esc(date)}</p><h2>${esc(title)}</h2>
    ${body ? `<p>${esc(body)}</p>` : ""}<a href="${esc(new URL(url, MUNICIPAL_SITE).href)}">Leer publicación municipal →</a></article>`).join("");
}

function renderNovedades() {
  return `<section class="section"><div class="container">
    <header class="civic-heading"><span class="eyebrow">Información pública</span><h1>Novedades de Vicente López</h1>
      <p class="muted" id="news-source" role="status">Selección de comunicados y actividades del portal municipal.</p></header>
    <div class="civic-card-grid" id="municipal-news">${newsCards(MUNICIPAL_NEWS)}</div>
    <div class="civic-crosslink view-actions"><a class="btn btn-primary" href="${MUNICIPAL_SITE}novedades/">Últimas novedades oficiales</a>
      <a class="btn btn-ghost" href="${MUNICIPAL_SITE}agenda-de-actividades/">Agenda actualizada</a></div>
  </div></section>`;
}
const PLACE_SLIDES = [
  ["costa", "Paseo de la Costa", "Un recorrido junto al río para caminar, pedalear o quedarse a mirar el agua."],
  ["reserva", "Reserva Ecológica", "Senderos y miradores para descubrir la naturaleza de la ribera."],
  ["avenida", "Avenida del Libertador", "Una avenida arbolada que conecta barrios y comercios del partido."],
  ["edificio", "Palacio Municipal", "Un punto de referencia del centro cívico de Olivos."],
];

const FAQ = [
  ["¿Cómo publico un reclamo?", 'Iniciá sesión y abrí <a href="#/crear">Crear reclamo</a>. Elegí la categoría, describí qué pasa y ubicá el punto. Al enviarlo vas a ver un número para hacer el seguimiento.'],
  ["¿Tengo que marcar el punto en el mapa?", 'Podés escribir calle y altura en <a href="#/crear">el formulario</a> y elegir un resultado. Si la dirección no aparece, acercá el mapa y marcá el lugar.'],
  ["¿Es obligatorio adjuntar una foto?", 'El archivo es opcional. Si tenés una foto o un video breve que ayude a ubicar el problema, podés adjuntarlo al <a href="#/crear">crear el reclamo</a>. Evitá incluir caras, patentes o documentos.'],
  ["¿Dónde consulto el estado?", 'Entrá a <a href="#/mis-reclamos">Mis reclamos</a> y abrí el detalle. Allí vas a ver los cambios de estado, las respuestas y la evidencia disponible.'],
  ["¿Qué significa cada estado?", 'Abierto indica que se registró el aviso. En proceso indica que está en gestión. Resuelto indica que se registró una solución. Podés comparar los estados en <a href="#/estadisticas">Estadísticas</a>.'],
  ["¿Qué hago si otro vecino ya reportó el problema?", 'Buscá la ubicación en <a href="#/mapa">el mapa</a>. Si encontrás el mismo problema, abrí su detalle y apoyaló para sumar tu respaldo al mismo seguimiento.'],
  ["¿Cómo se habilita una petición colectiva?", 'Cuando un reclamo llega a 100 apoyos, se habilita una carta pública que podés consultar y copiar desde <a href="#/peticiones">Peticiones</a>.'],
  ["¿Cómo sé qué se hizo para resolver un reclamo?", 'Buscá el reclamo en <a href="#/reclamos?estado=resuelto">reclamos resueltos</a>. El detalle muestra el parte de intervención y la foto o el video cuando hay material adjunto.'],
  ["¿Puedo borrar mis avisos?", 'Sí. En <a href="#/notificaciones">Notificaciones</a> podés eliminar un aviso o limpiar toda la bandeja. El reclamo y su seguimiento siguen disponibles.'],
  ["¿Qué datos se guardan?", 'El navegador guarda el perfil, las publicaciones y los cambios de esta maqueta. En los <a href="#/terminos">Términos</a> explicamos qué información conviene evitar al publicar.'],
  ["¿Dónde pido ayuda o hago un trámite real?", 'En <a href="#/contacto">Contacto y soporte</a> encontrás ayuda para usar AvisAR y accesos a los canales municipales. Si hay una emergencia, llamá al 911.'],
];

const TERMS = [
  ["Alcance de AvisAR", 'Estas condiciones describen el uso de un prototipo municipal ficticio. Las acciones quedan en tu navegador y no generan expedientes, turnos ni avisos al Municipio. Para gestiones reales, consultá los enlaces de <a href="#/contacto">Contacto y soporte</a>.'],
  ["Cuenta y dispositivo", 'Usá datos ficticios y una contraseña distinta a la que usás en otros servicios. Mantener sesión conserva el acceso en este navegador. Si compartís el equipo, cerrá la sesión al terminar. Los accesos sociales simulan el ingreso local.'],
  ["Publicación y convivencia", 'Describí hechos concretos, indicá la ubicación y elegí la categoría más cercana. Usá lenguaje respetuoso y evitá duplicar avisos. Los comentarios sirven para sumar información sobre el problema.'],
  ["Imágenes, video y privacidad", 'Adjuntá material propio o autorizado y evitá mostrar rostros, patentes, domicilios particulares, documentos o información de menores. El contenido del reclamo se muestra en sus vistas públicas dentro de la maqueta. Algunas fotos de referencia llevan sus créditos en el detalle.'],
  ["Apoyos, plazos y seguimiento", 'Cada cuenta puede apoyar un reclamo una vez. A partir de 100 apoyos se habilita la carta pública. El apoyo no implica aprobación automática y los estados del prototipo no representan plazos ni compromisos de atención del Municipio.'],
  ["Gestión y evidencia", 'El panel permite registrar avances y documentar el cierre con un parte, una imagen o un video. Los reclamos cargados de inicio, sus intervenciones y sus indicadores son simulados.'],
  ["Datos locales y consultas", 'Los datos se guardan en el almacenamiento del navegador. Podés editar tu <a href="#/perfil">perfil</a>, borrar notificaciones o limpiar los datos del sitio desde la configuración del navegador. Para orientación, consultá <a href="#/preguntas">Preguntas frecuentes</a>.'],
  ["Situaciones urgentes", 'Ante un riesgo inmediato, llamá al <a href="tel:911">911</a>. Para orientación municipal, consultá <a href="#/contacto">Contacto y soporte</a>.'],
];

function renderAyuda(terminos) {
  const content = terminos ? TERMS : FAQ;
  return `<section class="section"><div class="container civic-narrow">
    <header class="civic-heading"><span class="eyebrow">Atención vecinal</span><h1>${terminos ? "Términos y condiciones" : "Preguntas frecuentes"}</h1>
    <p class="muted">${terminos ? "Condiciones de uso del prototipo AvisAR." : "Cómo publicar, acompañar y seguir un reclamo en Vicente López."}</p></header>
    <div class="panel panel-pad civic-copy">${content.map(([title, body]) => terminos
      ? `<section><h2>${title}</h2><p>${body}</p></section>`
      : `<details><summary>${title}</summary><p>${body}</p></details>`).join("")}</div>
    <p class="civic-crosslink"><a class="btn btn-ghost" href="#/contacto">Ir a contacto y soporte</a></p>
  </div></section>`;
}

async function updateMunicipalNews(scope) {
  const results = scope.querySelector("#municipal-news");
  if (!results) return;
  const status = scope.querySelector("#news-source");
  const text = (html) => {
    const template = document.createElement("template");
    template.innerHTML = String(html || "");
    return template.content.textContent.trim().replace(/\s+/g, " ");
  };
  try {
    const response = await fetch(MUNICIPAL_FEED, { credentials: "omit", signal: AbortSignal.timeout(5000) });
    if (!response.ok) return;
    const posts = await response.json();
    const news = posts.flatMap((post) => {
      const title = text(post.title?.rendered);
      const url = URL.canParse(post.link) && new URL(post.link);
      const date = new Date(post.date);
      if (!title || !url || url.origin !== new URL(MUNICIPAL_SITE).origin || !Number.isFinite(date.getTime())) return [];
      const words = text(post.excerpt?.rendered).split(" ");
      const summary = words.length > 18 ? words.slice(0, 18).join(" ") + "…" : words.join(" ");
      return [["Portal municipal", fmtDate(post.date.slice(0, 10)), title, summary, url.href]];
    });
    if (!news.length || !results.isConnected) return;
    results.innerHTML = newsCards(news);
    status.textContent = "Publicaciones recientes del portal oficial de Vicente López.";
  } catch { /* La selección local sigue disponible sin conexión. */ }
}

function renderContacto() {
  return `<section class="section"><div class="container civic-narrow">
    <header class="civic-heading"><span class="eyebrow">Atención vecinal</span><h1>Contacto y soporte</h1><p class="muted">Elegí el canal según lo que necesites resolver.</p></header>
    <div class="civic-card-grid">
      <article class="panel panel-pad"><h2>Ayuda con AvisAR</h2><p>Consultá cómo ingresar, buscar una dirección o seguir un reclamo.</p><a class="btn btn-ghost" href="#/preguntas">Preguntas frecuentes</a></article>
      <article class="panel panel-pad"><h2>Atención municipal</h2><p>Para un reclamo real o una consulta sobre servicios, usá los canales del Municipio de Vicente López.</p><a class="btn btn-primary" href="tel:147">Llamar al 147</a> <a class="btn btn-ghost" href="${MUNICIPAL_SITE}canales-de-atencion/">Ver canales oficiales</a></article>
      <article class="panel panel-pad"><h2>Consultas por escrito</h2><p>Para orientación sobre trámites o dependencias, escribí al correo de Atención al Vecino.</p><a class="btn btn-ghost" href="mailto:infovecinos@vicentelopez.gov.ar">Enviar un correo</a></article>
      <article class="panel panel-pad"><h2>Urgencias</h2><p>Si hay un riesgo inmediato para personas o bienes, comunicate con emergencias.</p><a class="btn btn-ghost" href="tel:911">Llamar al 911</a></article>
    </div>
  </div></section>`;
}

function renderPlaceSlider() {
  return `<div class="place-slider" aria-label="Lugares de Vicente López" aria-roledescription="carrusel">
    <div class="place-frame">${PLACE_SLIDES.map(([key, title, text], i) => `<article class="place-slide" ${i ? "hidden" : ""}>
      <img src="assets/municipio-${key}.jpg" alt="" loading="lazy">
      <div class="place-caption"><span>Recorré Vicente López</span><h3>${title}</h3><p>${text}</p></div>
    </article>`).join("")}</div>
    <div class="place-controls"><button type="button" class="icon-btn" data-place="-1" aria-label="Lugar anterior">‹</button>
      <span class="place-position" aria-live="polite">1 de ${PLACE_SLIDES.length}</span>
      <button type="button" class="icon-btn" data-place="1" aria-label="Lugar siguiente">›</button></div>
  </div>`;
}

function renderMunicipalImpact() {
  const closed = state.claims.filter((claim) => claim.estado === "resuelto" && (claim.evidencia || claim.evidenciaFoto || claim.evidenciaMedia))
    .sort((a, b) => (b.fechaResolucion || b.fecha).localeCompare(a.fechaResolucion || a.fecha));
  return `<div class="civic-impact" data-reveal>
    <span class="eyebrow">Gestión a la vista</span><h2>Lo que cambia cuando avisás</h2>
    <p>Un problema ubicado en el mapa puede pasar de un aviso vecinal a una intervención documentada. En AvisAR podés seguir ese recorrido de principio a fin.</p>
    <div class="civic-card-grid">
      <article class="panel panel-pad"><h3>${closed.length} intervenciones documentadas</h3><p>Consultá el parte y, cuando esté disponible, la evidencia visual de cada solución registrada.</p></article>
      <article class="panel panel-pad"><h3>${Object.keys(BARRIOS).length} barrios en el mapa</h3><p>Encontrá los reportes cercanos y verificá si el problema ya está en seguimiento.</p></article>
      <article class="panel panel-pad"><h3>Avances visibles</h3><p>El historial y las estadísticas permiten ver qué se resolvió y qué sigue en gestión.</p><a href="#/estadisticas">Consultar estadísticas →</a></article>
    </div>
  </div>
  ${closed.length ? `<div class="civic-impact" data-reveal><h2>Soluciones recientes</h2><div class="claim-grid">${closed.slice(0, 3).map(claimCard).join("")}</div><a class="btn btn-ghost" href="#/reclamos?estado=resuelto">Ver reclamos resueltos</a></div>` : ""}
  <div class="civic-impact" data-reveal><h2>También pasa en Vicente López</h2><p>Encontrá información sobre servicios, espacios públicos y cultura.</p><a class="btn btn-primary" href="#/novedades">Ver novedades del municipio</a></div>`;
}
