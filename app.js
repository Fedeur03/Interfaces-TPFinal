/* =========================================================
   AvisAR · Vicente López
   Base vacía: no hay reclamos precargados.
   El mapa real (imagen local de OpenStreetMap) muestra cada
   reclamo con el ícono de su categoría en su coordenada.
   ========================================================= */

const STORE_KEY = "avisar_vl_v2";
const THRESHOLD = 100;

const CATEGORIES = {
  seguridad:       { label: "Seguridad",       color: "#dc2626", icon: "seguridad" },
  infraestructura: { label: "Infraestructura", color: "#d97706", icon: "infraestructura" },
  alumbrado:       { label: "Alumbrado",       color: "#ca8a04", icon: "alumbrado" },
  limpieza:        { label: "Limpieza",        color: "#16a34a", icon: "limpieza" },
  transito:        { label: "Tránsito",        color: "#2563eb", icon: "transito" },
};

const ESTADOS = { abierto: "Abierto", en_proceso: "En proceso", resuelto: "Resuelto" };

const ICONS = {
  seguridad: '<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"/><path d="M9.5 11.5l1.8 1.8 3.4-3.6"/>',
  infraestructura: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  alumbrado: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4.2 12.6c.7.5 1.2 1.3 1.2 2.2V18h6v-1.2c0-.9.5-1.7 1.2-2.2A7 7 0 0 0 12 2z"/>',
  limpieza: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/>',
  transito: '<rect x="8" y="2" width="8" height="20" rx="4"/><circle cx="12" cy="7" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="17" r="1.2"/>',
  pin: '<path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  support: '<path d="M7 10v11H4V10h3z"/><path d="M7 10l4-8a2 2 0 0 1 2 2v4h5a2 2 0 0 1 2 2.4l-1.2 6A2 2 0 0 1 16.8 21H7"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  arrow: '<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h5"/>',
  building: '<path d="M3 21h18"/><path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/><path d="M15 21V9h2a2 2 0 0 1 2 2v10"/><path d="M9 7h2"/><path d="M9 11h2"/><path d="M9 15h2"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 21a6.5 6.5 0 0 1 13 0"/><path d="M17 5.5a3 3 0 0 1 0 5.8"/><path d="M19 21a6.5 6.5 0 0 0-3.5-5.8"/>',
  close: '<path d="M18 6L6 18"/><path d="M6 6l12 12"/>',
  bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  lock: '<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>',
  calendar: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M8 2v4"/><path d="M16 2v4"/><path d="M3 10h18"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>',
  upload: '<path d="M12 16V4"/><path d="M7 9l5-5 5 5"/><path d="M4 20h16"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/>',
  crosshair: '<circle cx="12" cy="12" r="7"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/>',
};

function icon(name, size = 20, stroke = 2) {
  return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}

/* ---------------- Geografía: Vicente López ---------------- */
const VL_CENTER = [-34.5225, -58.4965];
// Límites exactos de la imagen estática assets/vl-map.jpg (OSM, zoom 14).
const MAP_BOUNDS = { north: -34.469981, south: -34.569977, west: -58.550005, east: -58.394995 };
const MAP_SRC = "assets/vl-map.jpg";

const BARRIOS = {
  "La Lucila":      { lat: -34.497, lng: -58.477 },
  "Olivos":         { lat: -34.510, lng: -58.485 },
  "Florida":        { lat: -34.523, lng: -58.490 },
  "Florida Oeste":  { lat: -34.536, lng: -58.512 },
  "Munro":          { lat: -34.531, lng: -58.498 },
  "Villa Martelli": { lat: -34.548, lng: -58.500 },
  "Villa Adelina":  { lat: -34.515, lng: -58.512 },
  "Carapachay":     { lat: -34.505, lng: -58.505 },
};

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function mercator(lat) { return Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360)); }
const MERC_N = mercator(MAP_BOUNDS.north);
const MERC_S = mercator(MAP_BOUNDS.south);

function latlngToPct(lat, lng) {
  return {
    x: clamp(((lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100, 0, 100),
    y: clamp(((MERC_N - mercator(lat)) / (MERC_N - MERC_S)) * 100, 0, 100),
  };
}
function pctToLatlng(xPct, yPct) {
  const lng = MAP_BOUNDS.west + (xPct / 100) * (MAP_BOUNDS.east - MAP_BOUNDS.west);
  const m = MERC_N - (yPct / 100) * (MERC_N - MERC_S);
  const lat = ((2 * Math.atan(Math.exp(m)) - Math.PI / 2) * 180) / Math.PI;
  return { lat, lng };
}
function nearestBarrio(lat, lng) {
  let best = "Florida", bd = Infinity;
  Object.entries(BARRIOS).forEach(([name, b]) => {
    const d = Math.pow(b.lat - lat, 2) + Math.pow((b.lng - lng) * 0.82, 2);
    if (d < bd) { bd = d; best = name; }
  });
  return best;
}

/* ---------------- Estado (vacío) ---------------- */
function defaults() {
  return {
    claims: [],
    supported: [],
    session: { logged: false, email: "", nombre: "" },
    notifications: [],
    ui: { collapsed: false },
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      if (p && Array.isArray(p.claims)) {
        p.claims.forEach((c) => {
          if (typeof c.lat !== "number" || typeof c.lng !== "number") {
            const b = BARRIOS[c.barrio] || BARRIOS["Florida"];
            c.lat = b.lat; c.lng = b.lng;
          }
          if (!Array.isArray(c.comentarios)) c.comentarios = [];
          if (!c.numero) c.numero = "F-" + (15300 + Math.floor(Math.random() * 700));
        });
        return {
          claims: p.claims,
          supported: p.supported || [],
          session: p.session || { logged: false, email: "", nombre: "" },
          notifications: Array.isArray(p.notifications) ? p.notifications : [],
          ui: p.ui || { collapsed: false },
        };
      }
    }
  } catch (e) { /* ignore */ }
  return defaults();
}

let state = loadState();
let draftLatLng = { lat: VL_CENTER[0], lng: VL_CENTER[1] };
let draftBarrio = nearestBarrio(draftLatLng.lat, draftLatLng.lng);
let draftCat = "infraestructura";
let draftPicked = false;

function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } }
function getClaim(id) { return state.claims.find((c) => c.id === id); }

/* ---------------- Helpers ---------------- */
function esc(str) {
  return String(str == null ? "" : str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
function fmtDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
}
function catMeta(key) { return CATEGORIES[key] || { label: key, color: "#64748b", icon: "pin" }; }
function catChip(key) { const c = catMeta(key); return `<span class="chip" style="--c:${c.color}"><span class="sw"></span>${esc(c.label)}</span>`; }
function statusBadge(e) { return `<span class="badge badge-${e}">${ESTADOS[e] || e}</span>`; }
function initials(name) {
  const parts = String(name || "V").trim().split(/\s+/);
  return ((parts[0] || "V")[0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}

function claimCard(c) {
  const cat = catMeta(c.categoria);
  const media = c.foto ? `<img class="media-img" src="${c.foto}" alt="">` : `<span class="big-ic">${icon(cat.icon, 52, 1.7)}</span>`;
  return `
    <a class="claim-card" href="#/reclamo/${c.id}">
      <div class="claim-photo" style="--c:${cat.color}">${media}</div>
      <div class="claim-body">
        <div style="display:flex;gap:7px;flex-wrap:wrap">${catChip(c.categoria)}${statusBadge(c.estado)}</div>
        <h3 class="claim-title">${esc(c.titulo)}</h3>
        <div class="claim-meta">${icon("pin", 15)} ${esc(c.barrio)} · ${esc(c.direccion)}</div>
        <p class="claim-desc">${esc(c.descripcion)}</p>
        <div class="claim-foot">
          <span class="support-count">${icon("support", 16)} ${c.apoyos} apoyos</span>
          <span class="muted" style="font-size:.78rem">${fmtDate(c.fecha)}</span>
        </div>
      </div>
    </a>`;
}

function mapLegend() {
  return Object.entries(CATEGORIES).map(([k, c]) => `<span><i style="background:${c.color}"></i>${c.label}</span>`).join("");
}

/* ---------------- Mapa real estático (imagen local de OpenStreetMap) ---------------- */
function pinSVG(catKey, size = 30) {
  const c = catMeta(catKey);
  const h = Math.round(size * 1.3125);
  return `<svg viewBox="0 0 32 42" width="${size}" height="${h}" aria-hidden="true">
    <path d="M16 41C16 41 2 27 2 15A14 14 0 1 1 30 15c0 12-14 26-14 26Z" fill="${c.color}" stroke="#ffffff" stroke-width="2.2"/>
    <svg x="8" y="7" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ICONS[c.icon]}</svg>
  </svg>`;
}

function mapPin(c) {
  const p = latlngToPct(c.lat, c.lng);
  return `<a class="map-pin" href="#/reclamo/${c.id}" style="left:${p.x.toFixed(3)}%;top:${p.y.toFixed(3)}%" title="${esc(c.titulo)} · ${esc(c.barrio)}">
    ${pinSVG(c.categoria)}
  </a>`;
}

function draftPin() {
  const p = latlngToPct(draftLatLng.lat, draftLatLng.lng);
  return `<span class="map-pin is-draft" id="draftPin" style="left:${p.x.toFixed(3)}%;top:${p.y.toFixed(3)}%">
    ${pinSVG(draftCat)}
  </span>`;
}

function barrioTags() {
  return Object.entries(BARRIOS).map(([name, b]) => {
    const p = latlngToPct(b.lat, b.lng);
    return `<span class="barrio-tag" style="left:${p.x.toFixed(2)}%;top:${p.y.toFixed(2)}%">${esc(name)}</span>`;
  }).join("");
}

function staticMap(claims, opts = {}) {
  const { labels = true, pick = false, cls = "" } = opts;
  const pins = pick ? draftPin() : claims.map(mapPin).join("");
  return `<div class="static-map ${cls}" ${pick ? 'id="pickMap" data-action="pick-map"' : ""}>
    <img class="static-map-img" src="${MAP_SRC}" alt="Mapa de Vicente López" draggable="false" />
    <span class="map-tint" aria-hidden="true"></span>
    ${labels ? `<span class="map-labels" aria-hidden="true">${barrioTags()}</span>` : ""}
    <span class="map-pins">${pins}</span>
    <span class="map-credit">© OpenStreetMap</span>
  </div>`;
}

/* ---------------- Shell ---------------- */
function updateShell(view) {
  const ua = document.getElementById("userArea");
  if (ua) {
    if (state.session.logged) {
      ua.innerHTML = `<a class="user-chip" href="#/perfil" title="Mi perfil"><span class="avatar-sm">${esc(initials(state.session.nombre))}</span><span class="uname">${esc(state.session.nombre)}</span></a>
        <button class="icon-btn" data-action="logout" title="Cerrar sesión" aria-label="Cerrar sesión">${icon("logout", 18)}</button>`;
    } else {
      ua.innerHTML = `<a class="btn btn-ghost btn-sm" href="#/login">Ingresar</a><a class="btn btn-primary btn-sm" href="#/registro">Registrarse</a>`;
    }
  }
  const unread = state.notifications.filter((n) => !n.leida).length;
  const dot = document.getElementById("notifDot");
  if (dot) dot.hidden = unread === 0;
  const activeMap = { reclamo: "reclamos", enviado: "crear" };
  const active = activeMap[view] || view;
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("is-active", a.dataset.nav === active));
}

function authGate(title, text) {
  const next = encodeURIComponent(location.hash || "#/");
  return `<section class="section"><div class="container"><div class="auth-wrap"><div class="auth-card center">
    <span class="brand-mark" style="margin:0 auto 14px;width:52px;height:52px;border-radius:14px">${icon("user", 26)}</span>
    <h1>${esc(title)}</h1><p class="sub">${esc(text)}</p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn btn-primary" href="#/login?next=${next}">Iniciar sesión</a><a class="btn btn-ghost" href="#/registro?next=${next}">Crear cuenta</a></div>
  </div></div></div></section>`;
}

/* ---------------- Vistas ---------------- */
function renderHome() {
  const claims = state.claims;
  const total = claims.length;
  const apoyos = claims.reduce((s, c) => s + c.apoyos, 0);
  const resueltos = claims.filter((c) => c.estado === "resuelto").length;
  const ultimos = [...claims].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 6);

  return `
    <section class="home-hero">
      <div class="container home-hero-grid">
        <div class="home-hero-text">
          <span class="eyebrow">${icon("pin", 15)} Vicente López · Participación ciudadana</span>
          <h1>Los problemas de tu barrio, <span class="hl">a la vista de todos</span>.</h1>
          <p class="lead">Creá un reclamo, ubicalo en el mapa del municipio y seguí su estado. Todo lo que reportan los vecinos queda visible en un solo lugar.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#/crear">${icon("plus", 18)} Crear reclamo</a>
            <a class="btn btn-ghost" href="#/reclamos">${icon("search", 17)} Ver reclamos</a>
          </div>
        </div>
        <div class="home-map-col">
          <div class="map-card home-map-card">
            ${staticMap(state.claims, { labels: true, cls: "home-map" })}
            ${total === 0 ? `<div class="map-empty"><div class="me-card"><span class="me-ic">${icon("pin", 24)}</span><strong>Todavía no hay reclamos</strong><p>Cuando los vecinos publiquen, van a aparecer en el mapa con el ícono de su categoría y su ubicación.</p><a class="btn btn-primary btn-sm" href="#/crear">${icon("plus", 15)} Crear el primero</a></div></div>` : ""}
            <div class="map-legend">${mapLegend()}</div>
          </div>
          <p class="map-caption">${icon("crosshair", 14)} ${total} ${total === 1 ? "reclamo ubicado" : "reclamos ubicados"} en el partido de Vicente López</p>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:30px">
      <div class="container">
        <div class="stat-cards">
          <div class="stat-card"><span class="ic" style="color:var(--primary);background:var(--primary-soft)">${icon("doc", 20)}</span><div><div class="n">${total}</div><div class="l">Reclamos en el municipio</div></div></div>
          <div class="stat-card"><span class="ic" style="color:var(--accent);background:var(--accent-soft)">${icon("support", 20)}</span><div><div class="n">${apoyos}</div><div class="l">Apoyos ciudadanos</div></div></div>
          <div class="stat-card"><span class="ic" style="color:var(--ok);background:var(--ok-soft)">${icon("check", 20)}</span><div><div class="n">${resueltos}</div><div class="l">Resueltos con evidencia</div></div></div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><div><h2>Explorá por categoría</h2><p>Cinco tipos de problemas relevados en el partido.</p></div><a class="btn btn-ghost btn-sm" href="#/reclamos">Ver todos</a></div>
        <div class="cat-grid">${Object.entries(CATEGORIES).map(([key, c]) => {
          const n = claims.filter((x) => x.categoria === key).length;
          return `<a class="cat-card" href="#/reclamos?cat=${key}" style="--c:${c.color}"><span class="ic">${icon(c.icon, 20)}</span><span class="name">${c.label}</span><span class="count">${n} ${n === 1 ? "reclamo" : "reclamos"}</span></a>`;
        }).join("")}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><div><h2>Conocé Vicente López</h2><p>Un partido con costa, espacios verdes y una comunidad que participa.</p></div><a class="btn btn-ghost btn-sm" href="#/municipio">Ver el Municipio</a></div>
        <div class="photo-band">
          <a class="photo-card" href="#/municipio"><img src="assets/municipio-costa.jpg" alt="Paseo de la Costa de Vicente López" loading="lazy" /><span class="pc-cap">${icon("pin", 13)} Paseo de la Costa</span></a>
          <a class="photo-card" href="#/municipio"><img src="assets/municipio-avenida.jpg" alt="Avenida del Libertador en Vicente López" loading="lazy" /><span class="pc-cap">${icon("pin", 13)} Avenida del Libertador</span></a>
          <a class="photo-card" href="#/municipio"><img src="assets/municipio-edificio.jpg" alt="Edificio municipal de Vicente López" loading="lazy" /><span class="pc-cap">${icon("building", 13)} Palacio Municipal</span></a>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><div><h2>Últimos reclamos</h2><p>Lo que los vecinos reportaron recientemente.</p></div>${total ? `<a class="btn btn-ghost btn-sm" href="#/reclamos">Ver todos →</a>` : ""}</div>
        ${total ? `<div class="claim-grid">${ultimos.map(claimCard).join("")}</div>` : `<div class="empty"><p style="font-weight:700;color:var(--ink);margin:0 0 6px">Todavía no hay reclamos</p><p style="margin:0 0 14px">Sé el primero en reportar un problema de tu barrio.</p><a class="btn btn-primary" href="#/crear">${icon("plus", 16)} Crear reclamo</a></div>`}
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="cta-band"><div><h2>¿Detectaste un problema en tu barrio?</h2><p>Sumá tu reclamo y ayudá a que la comunidad lo vea.</p></div><a class="btn btn-accent" href="#/crear">${icon("plus", 18)} Publicar reclamo</a></div>
      </div>
    </section>`;
}

function filteredClaims() {
  const { params } = getRoute();
  const cat = params.get("cat") || "todos";
  const estado = params.get("estado") || "todos";
  const q = (params.get("q") || "").toLowerCase();
  return state.claims.filter((c) => {
    if (cat !== "todos" && c.categoria !== cat) return false;
    if (estado !== "todos" && c.estado !== estado) return false;
    if (q && !`${c.titulo} ${c.descripcion} ${c.barrio} ${c.direccion}`.toLowerCase().includes(q)) return false;
    return true;
  }).sort((a, b) => b.apoyos - a.apoyos);
}

function renderReclamos() {
  const { params } = getRoute();
  const cat = params.get("cat") || "todos";
  const estado = params.get("estado") || "todos";
  const list = filteredClaims();
  const catOpts = Object.entries(CATEGORIES).map(([k, c]) => `<option value="${k}" ${cat === k ? "selected" : ""}>${c.label}</option>`).join("");
  const chips = [["todos", "Todas", "#0f766e"]].concat(Object.entries(CATEGORIES).map(([k, c]) => [k, c.label, c.color]))
    .map(([k, label, color]) => `<a class="chipbtn ${cat === k ? "is-active" : ""}" style="--c:${color}" href="${reclamosURL({ cat: k === "todos" ? "" : k })}"><span class="sw"></span>${label}</a>`).join("");

  return `
    <section class="section"><div class="container">
      <div class="section-head"><div><span class="eyebrow">${icon("search", 15)} Explorar</span><h2 style="margin-top:12px">Explorar reclamos</h2><p>Buscá por palabra, filtrá por categoría y estado, y apoyá los reclamos que te importan.</p></div><a class="btn btn-primary" href="#/crear">${icon("plus", 17)} Crear reclamo</a></div>
      <div class="explore-layout">
        <form class="filter-panel" data-form="filters">
          <h3>Aplicar filtros</h3>
          <div class="field"><label for="fcat">Categoría</label><select class="select" id="fcat" name="cat"><option value="todos">Todas las categorías</option>${catOpts}</select></div>
          <div class="field"><label for="festado">Estado</label><select class="select" id="festado" name="estado">
            <option value="todos" ${estado === "todos" ? "selected" : ""}>Todos</option>
            <option value="abierto" ${estado === "abierto" ? "selected" : ""}>Abierto</option>
            <option value="en_proceso" ${estado === "en_proceso" ? "selected" : ""}>En proceso</option>
            <option value="resuelto" ${estado === "resuelto" ? "selected" : ""}>Resuelto</option>
          </select></div>
          <div class="field"><label for="fq">Palabra clave</label><input class="input" id="fq" name="q" type="search" value="${esc(params.get("q") || "")}" placeholder="Ej.: bache, luminaria…" /></div>
          <button class="btn btn-primary btn-block" type="submit">${icon("search", 16)} Aplicar filtros</button>
        </form>
        <div>
          <div class="chipbar" style="margin-bottom:16px">${chips}</div>
          <div class="results-head"><span class="count">${list.length} ${list.length === 1 ? "resultado" : "resultados"}</span>${params.toString() ? `<a class="muted" style="font-size:.84rem" href="#/reclamos">Limpiar filtros</a>` : ""}</div>
          ${list.length ? `<div class="claim-grid">${list.map(claimCard).join("")}</div>` : `<div class="empty"><p style="font-weight:700;color:var(--ink);margin:0 0 6px">Todavía no hay reclamos</p><p style="margin:0 0 14px">Cuando los vecinos publiquen, van a aparecer acá.</p><a class="btn btn-primary" href="#/crear">${icon("plus", 16)} Crear el primero</a></div>`}
        </div>
      </div>
    </div></section>`;
}

function reclamosURL(overrides) {
  const { params } = getRoute();
  const p = new URLSearchParams(params);
  Object.entries(overrides).forEach(([k, v]) => { if (v) p.set(k, v); else p.delete(k); });
  return "#/reclamos" + (p.toString() ? "?" + p.toString() : "");
}

function renderReclamo(id) {
  const c = getClaim(id);
  if (!c) return `<section class="section"><div class="container"><div class="empty"><p style="font-weight:700;color:var(--ink)">Reclamo no encontrado</p><a class="btn btn-ghost" href="#/reclamos" style="margin-top:12px">Volver a reclamos</a></div></div></section>`;

  const cat = catMeta(c.categoria);
  const supported = state.supported.includes(c.id);
  const pct = Math.min(100, Math.round((c.apoyos / THRESHOLD) * 100));
  const ready = c.apoyos >= THRESHOLD;
  const media = c.foto ? `<img class="media-img" src="${c.foto}" alt="">` : icon(cat.icon, 64, 1.6);
  const news = state.notifications.slice(0, 3);
  const comments = c.comentarios.length ? c.comentarios.map((m) => `
    <div class="comment"><div class="avatar ${m.muni ? "muni" : ""}">${m.muni ? icon("building", 18) : esc((m.autor || "V").slice(0, 1).toUpperCase())}</div>
    <div><div class="who">${esc(m.autor)} ${m.muni ? '<span class="badge badge-verified">Oficial</span>' : ""} <span class="when">${fmtDate(m.fecha)}</span></div><p>${esc(m.texto)}</p></div></div>`).join("") : `<p class="muted" style="font-size:.88rem">Todavía no hay comentarios.</p>`;

  return `
    <section class="section"><div class="container">
      <a href="#/reclamos" class="muted" style="display:inline-flex;align-items:center;gap:6px;font-size:.88rem;font-weight:600;margin-bottom:16px">${icon("arrow", 16)} Volver a explorar</a>
      <div class="detail-grid">
        <div>
          <div class="panel panel-pad">
            <div class="media-frame" style="--c:${cat.color}">${media}</div>
            <div style="display:flex;gap:8px;flex-wrap:wrap">${catChip(c.categoria)}${statusBadge(c.estado)}${c.verificado ? '<span class="badge badge-verified">' + icon("check", 13) + " Verificado</span>" : ""}</div>
            <h1 class="detail-title">${esc(c.titulo)}</h1>
            <div class="detail-meta">
              <span style="display:inline-flex;align-items:center;gap:6px">${icon("calendar", 16)} Publicado el ${fmtDate(c.fecha)}</span>
              <span style="display:inline-flex;align-items:center;gap:6px">${icon("pin", 16)} ${esc(c.direccion)}</span>
              <span style="display:inline-flex;align-items:center;gap:6px">${icon("doc", 16)} N° ${esc(c.numero || "")}</span>
            </div>
            <p class="detail-desc">${esc(c.descripcion)}</p>
            <div class="divider"></div>
            <h3 style="margin:0 0 14px;font-size:1rem">Estado del problema</h3>
            <div class="state-compare">
              <div class="state-box"><div class="st-label">Estado reportado</div><div class="st-value">${icon("users", 17)} Reportado por vecinos</div><p>Publicado el ${fmtDate(c.fecha)} · ${c.apoyos} apoyos comunitarios.</p></div>
              <div class="state-box official"><div class="st-label">Estado actual · Municipio</div><div class="st-value">${statusBadge(c.estado)} ${c.verificado ? "Verificado" : ""}</div><p>${c.evidencia ? esc(c.evidencia) : "El municipio todavía no informó una solución con evidencia."}</p></div>
            </div>
            <div class="divider"></div>
            <h3 style="margin:0 0 14px;font-size:1rem">Seguimiento</h3>
            <ul class="timeline">
              <li class="done"><div class="t">Reclamo publicado</div><div class="d">${fmtDate(c.fecha)}</div></li>
              <li class="${c.verificado ? "done" : ""}"><div class="t">Verificado por el municipio</div><div class="d">${c.verificado ? "Información validada" : "Pendiente"}</div></li>
              <li class="${c.estado !== "abierto" ? "done" : ""}"><div class="t">En proceso</div><div class="d">${c.estado !== "abierto" ? "El municipio está interviniendo" : "Aún no iniciado"}</div></li>
              <li class="${c.estado === "resuelto" ? "done" : ""}"><div class="t">Resuelto con evidencia</div><div class="d">${c.estado === "resuelto" ? "Solución verificada" : "Pendiente"}</div></li>
            </ul>
          </div>

          <div class="panel panel-pad" style="margin-top:18px">
            <h3 style="margin:0 0 8px;font-size:1rem">Comentarios de la comunidad</h3>
            ${comments}
            <form data-form="comment" data-id="${c.id}" style="margin-top:16px;display:flex;flex-direction:column;gap:10px">
              <textarea class="textarea" name="texto" placeholder="Escribí tu comentario…" required style="min-height:84px"></textarea>
              <button class="btn btn-primary" type="submit" style="align-self:flex-start">Comentar</button>
            </form>
          </div>
        </div>

        <aside style="display:flex;flex-direction:column;gap:16px">
          <div class="support-box">
            <div class="big">${c.apoyos}</div><div class="lbl">apoyos de vecinos</div>
            <button class="btn ${supported ? "btn-ghost" : "btn-accent"} btn-block" data-action="support" data-id="${c.id}" ${supported ? "disabled" : ""}>${icon("support", 18)} ${supported ? "Ya apoyaste" : "Apoyar este reclamo"}</button>
            <div style="width:100%;margin-top:4px"><div class="progress"><i style="width:${pct}%"></i></div><div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--muted);margin-top:6px"><span>${ready ? "Meta alcanzada" : "Petición colectiva"}</span><span>${c.apoyos}/${THRESHOLD}</span></div></div>
            ${ready ? `<a class="btn btn-primary btn-block" href="#/peticiones">${icon("doc", 17)} Ver petición colectiva</a>` : `<p class="muted" style="font-size:.77rem;margin:0">Faltan ${THRESHOLD - c.apoyos} apoyos para la carta pública.</p>`}
          </div>

          <div class="panel panel-pad"><h3 style="margin:0 0 10px;font-size:.95rem">Ubicación</h3><div class="map-card map-card-detail">${staticMap([c], { labels: false, cls: "detail-map" })}</div><p class="muted" style="font-size:.8rem;margin:10px 0 0">${esc(c.barrio)} · ${c.lat.toFixed(5)}, ${c.lng.toFixed(5)}</p></div>

          <div class="panel panel-pad"><h3 style="margin:0 0 12px;font-size:.95rem">Noticias y novedades</h3>
            ${news.length ? `<div class="aside-news">${news.map((n) => `<a class="news-item" href="${n.ref ? "#/reclamo/" + n.ref : "#/notificaciones"}"><span class="dot"></span><div><div class="nt">${esc(n.titulo)}</div><div class="nd">${fmtDate(n.fecha)}</div></div></a>`).join("")}</div>` : `<p class="muted" style="font-size:.84rem;margin:0">No hay novedades por ahora.</p>`}
          </div>
        </aside>
      </div>
    </div></section>`;
}

function renderCrear() {
  if (!state.session.logged) return authGate("Iniciá sesión para crear un reclamo", "Necesitás una cuenta vecinal para publicar, comentar y apoyar reclamos.");
  const opts = Object.entries(CATEGORIES).map(([k, c]) => `<option value="${k}" ${k === draftCat ? "selected" : ""}>${c.label}</option>`).join("");
  return `
    <section class="section"><div class="container"><div class="form-panel">
      <span class="eyebrow">${icon("plus", 15)} Nuevo reclamo</span>
      <h2 style="margin:12px 0 6px;letter-spacing:-.02em">Crear reclamo</h2>
      <p class="muted" style="margin:0 0 20px">Elegí la categoría, describí el problema y marcá la ubicación exacta en el mapa.</p>
      <form class="panel panel-pad" data-form="crear">
        <div class="field"><label for="categoria">Categoría</label><select class="input" id="categoria" name="categoria">${opts}</select></div>
        <div class="field"><label for="descripcion">Descripción del problema</label><span class="hint">Contá qué pasa, desde cuándo y a quién afecta.</span><textarea class="textarea" id="descripcion" name="descripcion" required minlength="20" placeholder="Contanos el problema…"></textarea></div>
        <div class="field">
          <label>Seleccioná en el mapa</label>
          <span class="hint">Hacé clic sobre el mapa para marcar el lugar exacto del reclamo.</span>
          <div class="map-card map-card-pick">${staticMap([], { labels: true, pick: true, cls: "pick-map" })}</div>
          <p class="hint" id="draftBarrio" style="margin-top:8px">${draftPicked ? `Ubicación elegida: <strong>${esc(draftBarrio)}</strong> · ${draftLatLng.lat.toFixed(5)}, ${draftLatLng.lng.toFixed(5)}` : "Todavía no marcaste la ubicación en el mapa."}</p>
        </div>
        <div class="field">
          <label>Adjuntá foto o video</label>
          <label class="upload-box" for="foto"><span class="uic">${icon("camera", 30)}</span><div><strong>Subí tu archivo</strong></div><div class="hint">JPG, PNG o MP4 · opcional</div><input id="foto" name="foto" type="file" accept="image/*,video/*" /></label>
        </div>
        <button class="btn btn-primary" type="submit">${icon("upload", 17)} Enviar reclamo</button>
      </form>
    </div></div></section>`;
}

function renderEnviado(id) {
  const c = getClaim(id);
  if (!c) return renderHome();
  return `
    <section class="section"><div class="container"><div class="success-card">
      <div class="success-badge">${icon("check", 38, 2.4)}</div>
      <h1>¡Reclamo enviado con éxito!</h1>
      <p class="muted">Tu reclamo ya está en el mapa y los vecinos pueden apoyarlo.</p>
      <div class="ticket"><span>N° de reclamo</span><b>#${esc(c.numero)}</b><span>Fecha de envío: ${fmtDate(c.fecha)}</span></div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn btn-primary" href="#/reclamo/${c.id}">${icon("doc", 17)} Ver mi reclamo</a><a class="btn btn-ghost" href="#/">Volver al inicio</a></div>
    </div></div></section>`;
}

function renderRegistro() {
  return `<section class="section"><div class="container"><div class="auth-wrap"><div class="auth-card">
    <h1>Crear cuenta</h1><p class="sub">Sumate a AvisAR para publicar, apoyar y seguir reclamos.</p>
    <div class="social-row">
      <button type="button" class="social-btn" data-action="demo-social"><span class="g">G</span> Continuar con Google</button>
      <button type="button" class="social-btn" data-action="demo-social"><span style="color:#1877f2;font-weight:800">f</span> Continuar con Facebook</button>
      <button type="button" class="social-btn" data-action="demo-social"> Continuar con Apple</button>
    </div>
    <div class="or">o registrate con tu email</div>
    <form data-form="registro">
      <div class="field"><label for="remail">Email</label><input class="input" id="remail" name="email" type="email" required placeholder="prueba@gmail.com" /></div>
      <div class="field"><label for="remail2">Confirmar email</label><input class="input" id="remail2" name="email2" type="email" required placeholder="prueba@gmail.com" /></div>
      <div class="row2">
        <div class="field"><label for="fnac">Fecha de nacimiento</label><input class="input" id="fnac" name="nacimiento" type="date" required /></div>
        <div class="field"><label for="fcel">Celular</label><input class="input" id="fcel" name="celular" type="tel" placeholder="11 1234-5678" /></div>
      </div>
      <div class="row2">
        <div class="field"><label for="rpass">Contraseña</label><input class="input" id="rpass" name="password" type="password" required minlength="6" placeholder="••••••••" /></div>
        <div class="field"><label for="rpass2">Confirmar contraseña</label><input class="input" id="rpass2" name="password2" type="password" required minlength="6" placeholder="••••••••" /></div>
      </div>
      <button class="btn btn-primary btn-block" type="submit">Registrarse</button>
    </form>
    <p class="auth-foot">¿Ya tenés cuenta? <a href="#/login">Iniciar sesión</a></p>
  </div></div></div></section>`;
}

function renderLogin() {
  return `<section class="section"><div class="container"><div class="auth-wrap"><div class="auth-card">
    <h1>Inicio de sesión</h1><p class="sub">Ingresá para crear reclamos, apoyar y comentar.</p>
    <div class="social-row">
      <button type="button" class="social-btn" data-action="demo-social"><span class="g">G</span> Continuar con Google</button>
      <button type="button" class="social-btn" data-action="demo-social"><span style="color:#1877f2;font-weight:800">f</span> Continuar con Facebook</button>
      <button type="button" class="social-btn" data-action="demo-social"> Continuar con Apple</button>
    </div>
    <div class="or">o ingresá con tu email</div>
    <form data-form="login">
      <div class="field"><label for="lemail">Email</label><input class="input" id="lemail" name="email" type="email" required placeholder="prueba@gmail.com" /></div>
      <div class="field"><label for="lpass">Contraseña</label><input class="input" id="lpass" name="password" type="password" required placeholder="••••••••" /><a href="#/login" class="hint" data-action="forgot" style="align-self:flex-end">¿Olvidaste tu contraseña?</a></div>
      <button class="btn btn-primary btn-block" type="submit">Ingresar</button>
    </form>
    <p class="auth-foot">¿No tenés cuenta? <a href="#/registro">Crear cuenta</a></p>
  </div></div></div></section>`;
}

function renderPerfil() {
  if (!state.session.logged) return authGate("Ingresá a tu perfil", "Iniciá sesión para ver tus datos y tus reclamos.");
  const mine = state.claims.filter((c) => c.owner === state.session.email);
  return `<section class="section"><div class="container">
    <div class="profile-head"><div class="avatar-lg">${esc(initials(state.session.nombre))}</div><div style="flex:1"><h1>${esc(state.session.nombre)}</h1><p>${esc(state.session.email)} · Vecino/a de Vicente López</p></div><button class="btn btn-ghost btn-sm" data-action="logout">${icon("logout", 16)} Cerrar sesión</button></div>
    <div class="stat-cards" style="margin-top:18px">
      <div class="stat-card"><span class="ic" style="color:var(--primary);background:var(--primary-soft)">${icon("doc", 20)}</span><div><div class="n">${mine.length}</div><div class="l">Reclamos creados</div></div></div>
      <div class="stat-card"><span class="ic" style="color:var(--accent);background:var(--accent-soft)">${icon("support", 20)}</span><div><div class="n">${state.supported.length}</div><div class="l">Reclamos apoyados</div></div></div>
      <div class="stat-card"><span class="ic" style="color:var(--ok);background:var(--ok-soft)">${icon("bell", 20)}</span><div><div class="n">${state.notifications.filter((n) => !n.leida).length}</div><div class="l">Notificaciones sin leer</div></div></div>
    </div>
    <div class="section-head" style="margin-top:26px"><div><h2>Mis reclamos</h2></div><a class="btn btn-primary btn-sm" href="#/crear">${icon("plus", 15)} Crear reclamo</a></div>
    ${mine.length ? `<div class="claim-grid">${mine.map(claimCard).join("")}</div>` : `<div class="empty">Todavía no creaste reclamos. <a href="#/crear" style="color:var(--primary);font-weight:700">Creá el primero</a>.</div>`}
  </div></section>`;
}

function renderMisReclamos() {
  if (!state.session.logged) return authGate("Ingresá para ver tus reclamos", "Iniciá sesión para consultar el estado de los reclamos que creaste.");
  const mine = state.claims.filter((c) => c.owner === state.session.email);
  return `<section class="section"><div class="container">
    <div class="section-head"><div><span class="eyebrow">${icon("doc", 15)} Mi cuenta</span><h2 style="margin-top:12px">Mis reclamos</h2><p>Reclamos hechos por vos y su estado actual.</p></div><a class="btn btn-primary" href="#/crear">${icon("plus", 17)} Crear reclamo</a></div>
    ${mine.length ? `<div class="claim-grid">${mine.map(claimCard).join("")}</div>` : `<div class="empty"><p style="font-weight:700;color:var(--ink);margin:0 0 6px">Todavía no tenés reclamos</p><p style="margin:0 0 14px">Cuando crees uno, vas a poder seguirlo desde acá.</p><a class="btn btn-primary" href="#/crear">${icon("plus", 16)} Crear mi primer reclamo</a></div>`}
  </div></section>`;
}

function renderNotificaciones() {
  const list = state.notifications;
  const tipoIcon = { estado: "check", apoyo: "support", municipio: "building", sistema: "bell" };
  return `<section class="section"><div class="container">
    <div class="section-head"><div><span class="eyebrow">${icon("bell", 15)} Mi cuenta</span><h2 style="margin-top:12px">Notificaciones</h2><p>Novedades, estados actualizados y respuestas del municipio.</p></div>${list.length ? `<button class="btn btn-ghost btn-sm" data-action="mark-all">Marcar todas como leídas</button>` : ""}</div>
    ${list.length ? `<div class="notif-list">${list.map((n) => `<a class="notif-item ${n.leida ? "" : "unread"}" data-id="${n.id}" href="${n.ref ? "#/reclamo/" + n.ref : "#/"}"><span class="nic">${icon(tipoIcon[n.tipo] || "bell", 19)}</span><span style="flex:1"><span class="nt" style="display:block">${esc(n.titulo)}</span><span class="nd" style="display:block">${esc(n.texto)}</span><span class="nh" style="display:block">${fmtDate(n.fecha)}</span></span>${n.leida ? "" : '<span class="new-dot"></span>'}</a>`).join("")}</div>` : `<div class="empty"><p style="font-weight:700;color:var(--ink);margin:0 0 6px">No tenés notificaciones</p><p style="margin:0">Cuando haya novedades sobre tus reclamos, van a aparecer acá.</p></div>`}
  </div></section>`;
}

function renderMunicipio() {
  return `<section class="section"><div class="container">
    <div class="muni-hero with-photo">
      <span class="eyebrow" style="background:rgba(255,255,255,.16);color:#fff">${icon("building", 15)} El Municipio</span>
      <h1>Un Municipio más cerca tuyo</h1>
      <p>Somos el Municipio, una institución comprometida con el bienestar y el desarrollo de nuestra comunidad. Trabajamos día a día para construir una ciudad mejor, brindando servicios, atendiendo las necesidades de los vecinos y promoviendo espacios de participación ciudadana.</p>
      <p>Creemos que escuchar a nuestros vecinos es fundamental para seguir creciendo. Por eso ponemos a tu disposición esta plataforma, donde podés realizar reclamos, informar inconvenientes y ayudarnos a identificar las situaciones que necesitan una solución.</p>
      <a class="btn btn-accent" href="#/crear" style="margin-top:8px">${icon("plus", 17)} Realizar reclamo</a>
      <div class="muni-facts">
        <div><b>8</b><span>barrios</span></div>
        <div><b>24/7</b><span>reclamos online</span></div>
        <div><b>1</b><span>solo lugar</span></div>
      </div>
    </div>
    <div class="muni-blocks">
      <div class="step"><span class="num">${icon("building", 18)}</span><h3>Conocé tu Municipio</h3><p>Información institucional, servicios y canales de atención para los vecinos de Vicente López.</p></div>
      <div class="step"><span class="num">${icon("users", 18)}</span><h3>Participación ciudadana</h3><p>Un espacio para escuchar, acompañar y resolver las necesidades de la comunidad.</p></div>
      <div class="step"><span class="num">${icon("check", 18)}</span><h3>Construyamos juntos</h3><p>Seguimos trabajando para construir una ciudad mejor, con respuestas claras y evidencia pública.</p></div>
    </div>
    <div class="section-head" style="margin-top:30px"><div><span class="eyebrow">${icon("pin", 15)} Vicente López</span><h2 style="margin-top:10px">El municipio, en imágenes</h2><p>La costa, las avenidas y los espacios verdes que compartimos todos los días.</p></div></div>
    <div class="muni-gallery">
      <figure><img src="assets/municipio-costa.jpg" alt="Vista aérea del Paseo de la Costa de Vicente López" loading="lazy" /><figcaption>${icon("pin", 13)} Paseo de la Costa</figcaption></figure>
      <figure><img src="assets/municipio-avenida.jpg" alt="Avenida del Libertador en Vicente López" loading="lazy" /><figcaption>${icon("pin", 13)} Avenida del Libertador</figcaption></figure>
      <figure><img src="assets/municipio-reserva.jpg" alt="Reserva ecológica de Vicente López" loading="lazy" /><figcaption>${icon("pin", 13)} Reserva ecológica</figcaption></figure>
    </div>
    <p class="photo-credit">Fotos del partido de Vicente López · Wikimedia Commons</p>
  </div></section>`;
}

function renderMunicipal() {
  if (!state.claims.length) {
    return `<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">${icon("building", 15)} Municipio</span><h2 style="margin-top:12px">Panel municipal</h2><p>Respondé, verificá y cargá evidencia de las soluciones.</p></div></div><div class="empty"><p style="font-weight:700;color:var(--ink);margin:0 0 6px">No hay reclamos para gestionar</p><p style="margin:0">Cuando los vecinos publiquen reclamos, van a aparecer en este panel.</p></div></div></section>`;
  }
  const { params } = getRoute();
  const selectedId = params.get("id") || state.claims[0]?.id;
  const c = getClaim(selectedId) || state.claims[0];
  const options = state.claims.map((x) => `<option value="${x.id}" ${x.id === c.id ? "selected" : ""}>${esc(x.titulo)} · ${esc(x.barrio)}</option>`).join("");
  const recent = [...state.claims].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 4).map((x) => `<a class="map-mini" href="#/municipal?id=${x.id}" style="--c:${catMeta(x.categoria).color}"><span class="ic">${icon(catMeta(x.categoria).icon, 20)}</span><span><span class="t">${esc(x.titulo)}</span><span class="s">${ESTADOS[x.estado]} · ${x.apoyos} apoyos</span></span></a>`).join("");

  return `<section class="section"><div class="container">
    <div class="section-head"><div><span class="eyebrow">${icon("building", 15)} Municipio</span><h2 style="margin-top:12px">Panel municipal</h2><p>Respondé, verificá y cargá evidencia de las soluciones. Un reclamo solo se cierra con evidencia.</p></div></div>
    <div class="detail-grid">
      <div class="panel panel-pad">
        <div class="field"><label for="selClaim">Reclamo a gestionar</label><select class="input" id="selClaim" onchange="window.location.hash='#/municipal?id='+this.value">${options}</select></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin:6px 0 4px">${catChip(c.categoria)}${statusBadge(c.estado)}${c.verificado ? '<span class="badge badge-verified">' + icon("check", 13) + " Verificado</span>" : ""}</div>
        <h3 style="margin:10px 0 4px">${esc(c.titulo)}</h3>
        <p class="muted" style="margin:0 0 18px;font-size:.86rem">${esc(c.barrio)} · ${c.apoyos} apoyos</p>
        <form data-form="municipal" data-id="${c.id}">
          <div class="row2">
            <div class="field"><label for="estado">Estado</label><select class="input" id="estado" name="estado"><option value="abierto" ${c.estado === "abierto" ? "selected" : ""}>Abierto</option><option value="en_proceso" ${c.estado === "en_proceso" ? "selected" : ""}>En proceso</option><option value="resuelto" ${c.estado === "resuelto" ? "selected" : ""}>Resuelto</option></select></div>
            <div class="field"><label>Verificación</label><label style="display:flex;align-items:center;gap:8px;font-weight:500;padding:11px 0"><input type="checkbox" name="verificado" ${c.verificado ? "checked" : ""} /> Información verificada</label></div>
          </div>
          <div class="field"><label for="evidencia">Evidencia de la solución</label><span class="hint">Obligatoria para marcar como resuelto.</span><textarea class="textarea" id="evidencia" name="evidencia" style="min-height:80px" placeholder="Ej.: Se repavimentó el tramo y se verificó el 12/11…">${esc(c.evidencia || "")}</textarea></div>
          <div class="field"><label for="respuesta">Respuesta pública al vecino</label><textarea class="textarea" id="respuesta" name="respuesta" style="min-height:90px" placeholder="Escribí una respuesta que se publicará en el reclamo…"></textarea></div>
          <button class="btn btn-primary" type="submit">${icon("check", 17)} Guardar actualización</button>
        </form>
      </div>
      <aside style="display:flex;flex-direction:column;gap:16px">
        <div class="panel panel-pad"><h3 style="margin:0 0 12px;font-size:.95rem">Reclamos recientes</h3><div class="map-side">${recent}</div></div>
        <div class="form-note" style="background:var(--warn-soft);border-color:#f5d9a8;color:#92400e">${icon("check", 18)} <span>Regla de cierre: un reclamo solo pasa a <strong>Resuelto</strong> con evidencia cargada.</span></div>
      </aside>
    </div>
  </div></section>`;
}

function renderMapa() {
  const { params } = getRoute();
  const cat = params.get("cat") || "todos";
  const list = state.claims.filter((c) => cat === "todos" || c.categoria === cat);
  const chips = [["todos", "Todos", "#0f766e"]].concat(Object.entries(CATEGORIES).map(([k, c]) => [k, c.label, c.color]))
    .map(([k, label, color]) => `<a class="chipbtn ${cat === k ? "is-active" : ""}" style="--c:${color}" href="#/mapa${k === "todos" ? "" : "?cat=" + k}"><span class="sw"></span>${label}</a>`).join("");
  return `<section class="section"><div class="container">
    <div class="section-head"><div><span class="eyebrow">${icon("pin", 15)} Mapa</span><h2 style="margin-top:12px">Mapa de reclamos · Vicente López</h2><p>${list.length} ${list.length === 1 ? "reclamo ubicado" : "reclamos ubicados"}. Hacé clic en un ícono para ver el detalle.</p></div></div>
    <div class="chipbar" style="margin-bottom:16px">${chips}</div>
    <div class="map-wrap">
      <div class="map-card">${staticMap(list, { labels: true, cls: "explore-map" })}<div class="map-legend">${mapLegend()}</div>
        ${list.length === 0 ? `<div class="map-empty"><div class="me-card"><span class="me-ic">${icon("pin", 24)}</span><strong>No hay reclamos</strong><p>Cuando se publiquen, vas a verlos acá con su ícono y ubicación.</p></div></div>` : ""}
      </div>
      <div class="map-side">${list.length ? list.map((c) => { const cm = catMeta(c.categoria); return `<a class="map-mini" href="#/reclamo/${c.id}" style="--c:${cm.color}"><span class="ic">${icon(cm.icon, 20)}</span><span><span class="t">${esc(c.titulo)}</span><span class="s">${esc(c.barrio)} · ${c.apoyos} apoyos</span></span></a>`; }).join("") : `<div class="empty" style="padding:34px 18px">Sin reclamos todavía.</div>`}</div>
    </div>
  </div></section>`;
}

function renderEstadisticas() {
  const claims = state.claims;
  const total = claims.length;
  const apoyos = claims.reduce((s, c) => s + c.apoyos, 0);
  const resueltos = claims.filter((c) => c.estado === "resuelto").length;
  const peticiones = claims.filter((c) => c.apoyos >= THRESHOLD).length;
  const byCat = Object.entries(CATEGORIES).map(([k, c]) => ({ label: c.label, color: c.color, n: claims.filter((x) => x.categoria === k).length }));
  const maxCat = Math.max(1, ...byCat.map((x) => x.n));
  const byEstado = Object.entries(ESTADOS).map(([k, label]) => ({ label, n: claims.filter((x) => x.estado === k).length, color: k === "resuelto" ? "#16a34a" : k === "en_proceso" ? "#2563eb" : "#d97706" }));
  const maxEst = Math.max(1, ...byEstado.map((x) => x.n));
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); months.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: MESES[d.getMonth()], n: 0 }); }
  claims.forEach((c) => { const m = months.find((x) => x.key === c.fecha.slice(0, 7)); if (m) m.n++; });
  const maxMonth = Math.max(1, ...months.map((m) => m.n));
  const barrios = Object.keys(BARRIOS).map((b) => ({ b, n: claims.filter((c) => c.barrio === b).length })).sort((a, b) => b.n - a.n).slice(0, 5);
  const maxBarrio = Math.max(1, ...barrios.map((x) => x.n));

  return `<section class="section"><div class="container">
    <div class="section-head"><div><span class="eyebrow">${icon("chart", 15)} Estadísticas</span><h2 style="margin-top:12px">Indicadores públicos de Vicente López</h2><p>Datos abiertos a partir de los reclamos registrados.</p></div></div>
    <div class="kpi-grid">
      <div class="kpi"><span class="ic" style="color:var(--primary);background:var(--primary-soft)">${icon("doc", 18)}</span><div class="n">${total}</div><div class="l">Reclamos totales</div></div>
      <div class="kpi"><span class="ic" style="color:var(--accent);background:var(--accent-soft)">${icon("support", 18)}</span><div class="n">${apoyos}</div><div class="l">Apoyos ciudadanos</div></div>
      <div class="kpi"><span class="ic" style="color:var(--ok);background:var(--ok-soft)">${icon("check", 18)}</span><div class="n">${resueltos}</div><div class="l">Resueltos con evidencia</div></div>
      <div class="kpi"><span class="ic" style="color:var(--info);background:var(--info-soft)">${icon("users", 18)}</span><div class="n">${peticiones}</div><div class="l">Peticiones habilitadas</div></div>
    </div>
    <div class="detail-grid">
      <div style="display:flex;flex-direction:column;gap:18px">
        <div class="panel panel-pad"><h3 style="margin:0 0 16px;font-size:1rem">Reclamos por categoría</h3><div class="bars">${byCat.map((x) => `<div class="bar-row"><span class="nm"><span style="width:9px;height:9px;border-radius:50%;background:${x.color};display:inline-block"></span>${x.label}</span><span class="bar-track"><i style="--c:${x.color};width:${(x.n / maxCat) * 100}%"></i></span><span class="val">${x.n}</span></div>`).join("")}</div></div>
        <div class="panel panel-pad"><h3 style="margin:0 0 16px;font-size:1rem">Evolución (últimos 6 meses)</h3><div class="chart-cols">${months.map((m) => `<div class="chart-col"><span class="vv">${m.n}</span><span class="bar" style="height:${(m.n / maxMonth) * 100}%"></span><span class="cap">${m.label}</span></div>`).join("")}</div></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:18px">
        <div class="panel panel-pad"><h3 style="margin:0 0 16px;font-size:1rem">Estado de los reclamos</h3><div class="bars">${byEstado.map((x) => `<div class="bar-row" style="grid-template-columns:100px 1fr 34px"><span class="nm">${x.label}</span><span class="bar-track"><i style="--c:${x.color};width:${(x.n / maxEst) * 100}%"></i></span><span class="val">${x.n}</span></div>`).join("")}</div></div>
        <div class="panel panel-pad"><h3 style="margin:0 0 16px;font-size:1rem">Barrios con más reclamos</h3><div class="bars">${barrios.map((x) => `<div class="bar-row" style="grid-template-columns:110px 1fr 30px"><span class="nm">${x.b}</span><span class="bar-track"><i style="--c:var(--primary);width:${(x.n / maxBarrio) * 100}%"></i></span><span class="val">${x.n}</span></div>`).join("")}</div></div>
      </div>
    </div>
  </div></section>`;
}

function letterText(c) {
  return `Vicente López, ${fmtDate(new Date().toISOString().slice(0, 10))}

Sr./Sra. Intendente/a del Municipio de Vicente López:

Los vecinos y las vecinas abajo firmantes, usuarios de la plataforma AvisAR, solicitamos una respuesta formal y una intervención respecto del siguiente reclamo comunitario:

"${c.titulo}"
Ubicación: ${c.direccion} (${c.lat.toFixed(5)}, ${c.lng.toFixed(5)}).
Categoría: ${catMeta(c.categoria).label}.
Apoyos reunidos: ${c.apoyos} vecinos.

Descripción del problema:
${c.descripcion}

El reclamo alcanzó el respaldo mínimo de ${THRESHOLD} apoyos, por lo que solicitamos:
1. Información sobre el estado actual de la situación.
2. Un plazo estimado de intervención.
3. Evidencia pública de la solución realizada.

Quedamos a disposición para aportar información adicional y solicitamos que la respuesta sea publicada en la plataforma para conocimiento de toda la comunidad.

Atentamente,
Vecinos de ${c.barrio} · AvisAR Vicente López`;
}

function renderPeticiones() {
  if (!state.claims.length) {
    return `<section class="section"><div class="container"><div class="section-head"><div><span class="eyebrow">${icon("users", 15)} Peticiones colectivas</span><h2 style="margin-top:12px">De reclamo vecinal a carta pública</h2><p>Cuando un reclamo reúne ${THRESHOLD} apoyos, se habilita una petición dirigida a las autoridades.</p></div></div><div class="empty"><p style="font-weight:700;color:var(--ink);margin:0 0 6px">Todavía no hay peticiones</p><p style="margin:0 0 14px">Se habilitan cuando un reclamo alcanza ${THRESHOLD} apoyos.</p><a class="btn btn-primary" href="#/crear">${icon("plus", 16)} Crear reclamo</a></div></div></section>`;
  }
  const ordered = [...state.claims].sort((a, b) => b.apoyos - a.apoyos);
  const ready = ordered.filter((c) => c.apoyos >= THRESHOLD);
  const pending = ordered.filter((c) => c.apoyos < THRESHOLD);
  return `<section class="section"><div class="container">
    <div class="section-head"><div><span class="eyebrow">${icon("users", 15)} Peticiones colectivas</span><h2 style="margin-top:12px">De reclamo vecinal a carta pública</h2><p>Cuando un reclamo reúne ${THRESHOLD} apoyos válidos, se habilita una petición dirigida a las autoridades municipales.</p></div></div>
    ${ready.length ? `<div class="form-note" style="background:var(--primary-soft);border-color:#bfe3dd;color:#115e59">${icon("doc", 18)} <span><strong>${ready.length} ${ready.length === 1 ? "petición habilitada" : "peticiones habilitadas"}</strong> en Vicente López.</span></div>` : ""}
    <h3 style="margin:22px 0 14px;font-size:1.05rem">Peticiones habilitadas</h3>
    ${ready.length ? ready.map((c) => { const cm = catMeta(c.categoria); return `<div class="petition-card ready"><div><div style="display:flex;gap:8px;flex-wrap:wrap">${catChip(c.categoria)}${statusBadge(c.estado)}</div><h3>${esc(c.titulo)}</h3><p class="muted" style="margin:0 0 10px;font-size:.86rem">${esc(c.barrio)} · ${esc(c.direccion)}</p><div class="pbar" style="--c:${cm.color}"><div class="progress"><i style="width:100%"></i></div><div class="pmeta"><span>${c.apoyos} apoyos</span><span>Meta: ${THRESHOLD}</span></div></div></div><div class="petition-actions"><button class="btn btn-primary btn-sm" data-action="letter" data-id="${c.id}">${icon("doc", 16)} Ver carta</button><a class="btn btn-ghost btn-sm" href="#/reclamo/${c.id}">Ver reclamo</a></div></div>`; }).join("") : `<div class="empty">Ningún reclamo alcanzó los ${THRESHOLD} apoyos todavía.</div>`}
    <h3 style="margin:30px 0 14px;font-size:1.05rem">En camino a la meta</h3>
    ${pending.length ? pending.map((c) => { const cm = catMeta(c.categoria); const pct = Math.round((c.apoyos / THRESHOLD) * 100); return `<div class="petition-card"><div><div style="display:flex;gap:8px;flex-wrap:wrap">${catChip(c.categoria)}</div><h3>${esc(c.titulo)}</h3><p class="muted" style="margin:0 0 10px;font-size:.86rem">${esc(c.barrio)}</p><div class="pbar" style="--c:${cm.color}"><div class="progress"><i style="width:${pct}%"></i></div><div class="pmeta"><span>${c.apoyos} apoyos</span><span>Faltan ${THRESHOLD - c.apoyos}</span></div></div></div><div class="petition-actions"><a class="btn btn-ghost btn-sm" href="#/reclamo/${c.id}">${icon("support", 16)} Apoyar</a></div></div>`; }).join("") : `<div class="empty">No hay reclamos en camino a la meta.</div>`}
  </div></section>`;
}

/* ---------------- Router ---------------- */
function getRoute() {
  const raw = location.hash.slice(1) || "/";
  const [path, qs] = raw.split("?");
  return { parts: path.split("/").filter(Boolean), params: new URLSearchParams(qs || "") };
}

function render() {
  const { parts } = getRoute();
  const view = parts[0] || "home";
  let html = "";
  switch (view) {
    case "home": html = renderHome(); break;
    case "reclamos": html = renderReclamos(); break;
    case "reclamo": html = renderReclamo(parts[1]); break;
    case "crear": html = renderCrear(); break;
    case "enviado": html = renderEnviado(parts[1]); break;
    case "registro": html = renderRegistro(); break;
    case "login": html = renderLogin(); break;
    case "perfil": html = renderPerfil(); break;
    case "mis-reclamos": html = renderMisReclamos(); break;
    case "notificaciones": html = renderNotificaciones(); break;
    case "municipio": html = renderMunicipio(); break;
    case "municipal": html = renderMunicipal(); break;
    case "mapa": html = renderMapa(); break;
    case "estadisticas": html = renderEstadisticas(); break;
    case "peticiones": html = renderPeticiones(); break;
    default: html = `<section class="section"><div class="container"><div class="empty"><p style="font-weight:700;color:var(--ink)">Página no encontrada</p><a class="btn btn-ghost" href="#/" style="margin-top:12px">Volver al inicio</a></div></div></section>`;
  }
  document.getElementById("app").innerHTML = html;
  updateShell(view);
}

/* ---------------- Acciones ---------------- */
function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("show"), 2600);
}

function requireLogin(nextHash) {
  if (state.session.logged) return true;
  toast("Iniciá sesión para continuar.");
  location.hash = "#/login?next=" + encodeURIComponent(nextHash || location.hash || "#/");
  return false;
}

function loginDemo(email, nombre) {
  state.session = { logged: true, email, nombre: nombre || email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) };
  save();
  const { params } = getRoute();
  const next = params.get("next");
  location.hash = next && next.startsWith("#") ? next : "#/";
  toast("¡Bienvenido/a, " + state.session.nombre + "!");
}

function toggleSidenav() {
  if (window.matchMedia("(max-width:900px)").matches) {
    const open = document.body.classList.toggle("sidenav-open");
    const btn = document.getElementById("menuToggle");
    if (btn) btn.setAttribute("aria-expanded", open ? "true" : "false");
  } else {
    state.ui.collapsed = !state.ui.collapsed;
    document.body.classList.toggle("sidenav-collapsed", state.ui.collapsed);
    save();
  }
}

function supportClaim(id) {
  if (!requireLogin(location.hash)) return;
  const c = getClaim(id);
  if (!c || state.supported.includes(id)) return;
  c.apoyos++;
  state.supported.push(id);
  state.notifications.unshift({ id: "n" + Date.now(), tipo: "apoyo", titulo: "Apoyo registrado", texto: `Apoyaste "${c.titulo}".`, fecha: new Date().toISOString().slice(0, 10), leida: false, ref: c.id });
  save(); render(); toast("¡Gracias! Tu apoyo quedó registrado.");
}

function openLetter(id) {
  const c = getClaim(id);
  if (!c) return;
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="letterTitle">
    <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><h3 id="letterTitle">Carta pública</h3><p class="muted" style="margin:0 0 14px;font-size:.86rem">Petición colectiva · ${esc(c.barrio)}</p></div><button class="btn btn-ghost btn-sm" data-action="close-modal" aria-label="Cerrar">${icon("close", 16)}</button></div>
    <div class="letter">${esc(letterText(c))}</div>
    <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap"><button class="btn btn-primary btn-sm" data-action="copy-letter" data-id="${c.id}">${icon("doc", 16)} Copiar carta</button></div>
  </div>`;
  document.body.appendChild(backdrop);
  requestAnimationFrame(() => backdrop.classList.add("show"));
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(backdrop); });
}

function closeModal(el) { const b = el.closest(".modal-backdrop") || el; b.classList.remove("show"); setTimeout(() => b.remove(), 200); }

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast("Carta copiada."), () => fallbackCopy(text));
  else fallbackCopy(text);
}
function fallbackCopy(text) {
  const ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); toast("Carta copiada."); } catch (e) { toast("No se pudo copiar."); }
  ta.remove();
}
function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    if (!file || file.size > 1200000) return resolve("");
    const r = new FileReader();
    r.onload = () => resolve(typeof r.result === "string" ? r.result : "");
    r.onerror = () => resolve("");
    r.readAsDataURL(file);
  });
}

/* ---------------- Eventos: click ---------------- */
document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.closest("#menuToggle")) { toggleSidenav(); return; }
  if (t.closest("#collapseBtn")) { state.ui.collapsed = !state.ui.collapsed; document.body.classList.toggle("sidenav-collapsed", state.ui.collapsed); save(); return; }
  if (t.closest("#sidenavBackdrop")) { document.body.classList.remove("sidenav-open"); return; }
  if (t.closest(".snav-item") && window.matchMedia("(max-width:900px)").matches) document.body.classList.remove("sidenav-open");

  const pick = t.closest('[data-action="pick-map"]');
  if (pick) {
    const rect = pick.getBoundingClientRect();
    const xPct = clamp(((e.clientX - rect.left) / rect.width) * 100, 1, 99);
    const yPct = clamp(((e.clientY - rect.top) / rect.height) * 100, 1, 99);
    const ll = pctToLatlng(xPct, yPct);
    draftLatLng = ll;
    draftBarrio = nearestBarrio(ll.lat, ll.lng);
    draftPicked = true;
    const pin = document.getElementById("draftPin");
    if (pin) { pin.style.left = xPct.toFixed(3) + "%"; pin.style.top = yPct.toFixed(3) + "%"; }
    const label = document.getElementById("draftBarrio");
    if (label) label.innerHTML = `Ubicación elegida: <strong>${esc(draftBarrio)}</strong> · ${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}`;
    return;
  }

  const supportBtn = t.closest('[data-action="support"]');
  if (supportBtn) { supportClaim(supportBtn.dataset.id); return; }
  const letterBtn = t.closest('[data-action="letter"]');
  if (letterBtn) { openLetter(letterBtn.dataset.id); return; }
  const copyBtn = t.closest('[data-action="copy-letter"]');
  if (copyBtn) { const c = getClaim(copyBtn.dataset.id); if (c) copyText(letterText(c)); return; }
  if (t.closest('[data-action="close-modal"]')) { closeModal(t); return; }
  if (t.closest('[data-action="demo-social"]')) { loginDemo("vecino.demo@avisar.gob.ar", "Vecino Demo"); return; }
  if (t.closest('[data-action="logout"]')) { state.session = { logged: false, email: "", nombre: "" }; save(); render(); toast("Cerraste sesión."); return; }
  if (t.closest('[data-action="forgot"]')) { toast("Te enviamos un correo para restablecer tu contraseña (demo)."); return; }
  if (t.closest('[data-action="mark-all"]')) { state.notifications.forEach((n) => (n.leida = true)); save(); render(); toast("Notificaciones marcadas como leídas."); return; }

  const notif = t.closest(".notif-item");
  if (notif) { const n = state.notifications.find((x) => x.id === notif.dataset.id); if (n && !n.leida) { n.leida = true; save(); } }
});

/* ---------------- Eventos: change ---------------- */
document.addEventListener("change", (e) => {
  if (e.target.id === "categoria") {
    draftCat = e.target.value;
    const pin = document.getElementById("draftPin");
    if (pin) pin.innerHTML = pinSVG(draftCat);
  }
});

/* ---------------- Eventos: submit ---------------- */
document.addEventListener("submit", (e) => {
  const form = e.target;
  const kind = form.dataset.form;
  if (!kind) return;
  e.preventDefault();

  if (kind === "search-home") {
    const q = form.q.value.trim();
    location.hash = "#/reclamos" + (q ? "?q=" + encodeURIComponent(q) : "");
    return;
  }

  if (kind === "filters") {
    const data = new FormData(form);
    const p = new URLSearchParams();
    const cat = data.get("cat"); const estado = data.get("estado"); const q = String(data.get("q") || "").trim();
    if (cat && cat !== "todos") p.set("cat", cat);
    if (estado && estado !== "todos") p.set("estado", estado);
    if (q) p.set("q", q);
    location.hash = "#/reclamos" + (p.toString() ? "?" + p.toString() : "");
    return;
  }

  if (kind === "comment") {
    if (!requireLogin(location.hash)) return;
    const c = getClaim(form.dataset.id); if (!c) return;
    const texto = String(new FormData(form).get("texto") || "").trim(); if (!texto) return;
    c.comentarios.push({ autor: state.session.nombre || "Vecino/a", texto, fecha: new Date().toISOString().slice(0, 10), muni: false });
    save(); render(); toast("Comentario publicado."); return;
  }

  if (kind === "crear") {
    if (!state.session.logged) { requireLogin("#/crear"); return; }
    const data = new FormData(form);
    const categoria = data.get("categoria") || "infraestructura";
    const descripcion = String(data.get("descripcion") || "").trim();
    if (descripcion.length < 20) { toast("La descripción debe tener al menos 20 caracteres."); return; }
    if (!draftPicked) { toast("Marcá la ubicación exacta en el mapa."); return; }
    const file = form.querySelector('input[type="file"]')?.files[0];
    readFileAsDataURL(file).then((foto) => {
      const id = "r" + Date.now();
      const lat = draftLatLng.lat, lng = draftLatLng.lng;
      const claim = {
        id,
        numero: "F-" + (15300 + Math.floor(Math.random() * 700)),
        titulo: descripcion.length > 64 ? descripcion.slice(0, 61).trim() + "…" : descripcion,
        categoria, barrio: draftBarrio, direccion: `${draftBarrio} · ${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        descripcion, fecha: new Date().toISOString().slice(0, 10), apoyos: 0, estado: "abierto",
        verificado: false, evidencia: "", foto, owner: state.session.email, comentarios: [],
        lat, lng,
      };
      state.claims.unshift(claim);
      state.notifications.unshift({ id: "n" + Date.now(), tipo: "sistema", titulo: "Reclamo enviado", texto: `Tu reclamo #${claim.numero} fue publicado en el mapa.`, fecha: claim.fecha, leida: false, ref: id });
      draftPicked = false;
      draftLatLng = { lat: VL_CENTER[0], lng: VL_CENTER[1] };
      draftBarrio = nearestBarrio(draftLatLng.lat, draftLatLng.lng);
      save();
      location.hash = "#/enviado/" + id;
      toast("Reclamo enviado con éxito.");
    });
    return;
  }

  if (kind === "registro") {
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const email2 = String(data.get("email2") || "").trim();
    const pass = String(data.get("password") || "");
    const pass2 = String(data.get("password2") || "");
    if (email !== email2) { toast("Los emails no coinciden."); return; }
    if (pass !== pass2) { toast("Las contraseñas no coinciden."); return; }
    if (pass.length < 6) { toast("La contraseña debe tener al menos 6 caracteres."); return; }
    loginDemo(email); return;
  }

  if (kind === "login") {
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const pass = String(data.get("password") || "");
    if (!email || pass.length < 4) { toast("Revisá el email y la contraseña."); return; }
    loginDemo(email); return;
  }

  if (kind === "municipal") {
    const c = getClaim(form.dataset.id); if (!c) return;
    const data = new FormData(form);
    const nuevoEstado = data.get("estado");
    const verificado = data.get("verificado") === "on";
    const evidencia = String(data.get("evidencia") || "").trim();
    const respuesta = String(data.get("respuesta") || "").trim();
    if (nuevoEstado === "resuelto" && !evidencia) { toast("Para marcar como resuelto necesitás cargar evidencia."); return; }
    c.estado = nuevoEstado; c.verificado = verificado; c.evidencia = evidencia;
    if (respuesta) c.comentarios.push({ autor: "Municipio de Vicente López", texto: respuesta, fecha: new Date().toISOString().slice(0, 10), muni: true });
    state.notifications.unshift({ id: "n" + Date.now(), tipo: "municipio", titulo: "Actualización del municipio", texto: `El municipio actualizó "${c.titulo}".`, fecha: new Date().toISOString().slice(0, 10), leida: false, ref: c.id });
    save(); render(); toast("Actualización guardada."); return;
  }
});

/* ---------------- Init ---------------- */
window.addEventListener("hashchange", () => {
  render();
  window.scrollTo({ top: 0, behavior: "auto" });
  document.body.classList.remove("sidenav-open");
});
window.addEventListener("resize", () => { /* layout responsive sin mapas externos */ });

if (state.ui && state.ui.collapsed) document.body.classList.add("sidenav-collapsed");
render();
