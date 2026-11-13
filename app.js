/* AvisAR · Vicente López */

const STORE_KEY = "avisar_vl_v2";
const THRESHOLD = 100;
const CLAIM_TITLE_LIMIT = 48;
const EMPTY_SESSION = { logged: false, email: "", nombre: "" };
const SESSION_KEY = STORE_KEY + "_session";
const ADMIN_EMAIL = "admin@avisar.test";
const ADMIN_PASSWORD = "admin123";
const CATEGORY_COLOR = "#39776d";

const CATEGORIES = {
  seguridad:       { label: "Seguridad",       color: CATEGORY_COLOR, icon: "seguridad" },
  infraestructura: { label: "Infraestructura", color: CATEGORY_COLOR, icon: "infraestructura" },
  alumbrado:       { label: "Alumbrado",       color: CATEGORY_COLOR, icon: "alumbrado" },
  limpieza:        { label: "Limpieza",        color: CATEGORY_COLOR, icon: "limpieza" },
  transito:        { label: "Tránsito",        color: CATEGORY_COLOR, icon: "transito" },
};

const REPORT_CATEGORIES = {
  seguridad: CATEGORIES.seguridad,
  infraestructura: { ...CATEGORIES.infraestructura, label: "Calles y veredas" },
  alumbrado: CATEGORIES.alumbrado,
  espacios_verdes: { label: "Espacios verdes", color: CATEGORY_COLOR, icon: "tree" },
  desagues: { label: "Desagües e inundaciones", color: CATEGORY_COLOR, icon: "water" },
  transito: { ...CATEGORIES.transito, label: "Señalización" },
  limpieza: CATEGORIES.limpieza,
  otro: { label: "Otro", color: CATEGORY_COLOR, icon: "pin" },
};

const ESTADOS = { abierto: "En revisión", en_proceso: "En curso", resuelto: "Resuelto" };
const ESTADO_DESC = { abierto: "El reclamo fue recibido y está pendiente de inspección municipal.", en_proceso: "El municipio está interviniendo en el lugar.", resuelto: "La intervención finalizó y quedó registrada." };

const ICONS = {
  seguridad: '<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z"/><path d="M9.5 11.5l1.8 1.8 3.4-3.6"/>',
  infraestructura: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  alumbrado: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4.2 12.6c.7.5 1.2 1.3 1.2 2.2V18h6v-1.2c0-.9.5-1.7 1.2-2.2A7 7 0 0 0 12 2z"/>',
  limpieza: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/>',
  transito: '<rect x="8" y="2" width="8" height="20" rx="4"/><circle cx="12" cy="7" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="17" r="1.2"/>',
  pin: '<path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  tree: '<path d="M12 22v-5M5 17h14l-4-6h2l-5-8-5 8h2z"/>',
  water: '<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11Z"/>',
  support: '<path d="M7 10v11H4V10h3z"/><path d="M7 10l4-8a2 2 0 0 1 2 2v4h5a2 2 0 0 1 2 2.4l-1.2 6A2 2 0 0 1 16.8 21H7"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  "check-ring": '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5 5.5-5.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  chart: '<path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  arrow: '<path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
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
const MAP_SRC = "assets/vl-map.webp";
const MAP_OVERVIEW_SRC = "assets/vl-map-overview.webp";

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

/* ---------------- Estado local ---------------- */
function defaults() {
  return {
    claims: makeDemoClaims().concat(makePetitionClaims()),
    demoSeeded: true,

    supported: {},
    session: { ...EMPTY_SESSION },
    notifications: [],
    profiles: [],
  };
}

function normalizeProfile(profile) {
  if (profile?.email === "vecino.demo@avisar.gob.ar" && profile.nombre === "Vecino Demo") {
    return { ...profile, nombre: "Vecino" };
  }
  return profile;
}

function hasMunicipalAccess(session = state.session) {
  return Boolean(session?.logged && session.email === ADMIN_EMAIL && session.role === "municipal-admin");
}

function normalizeSession(session) {
  const profile = normalizeProfile(session);
  if (!profile || (profile.email?.toLowerCase() === ADMIN_EMAIL && !hasMunicipalAccess(profile))) return { ...EMPTY_SESSION };
  return profile;
}

function browserSession() {
  try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); }
  catch { return null; }
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
          if (c.demo) c.comentarios.forEach((entry) => {
            if (entry.muni && entry.autor === "Municipio de Vicente López · Demo") entry.autor = "Municipio de Vicente López";
          });
          if (!c.numero) c.numero = "F-" + (15300 + Math.floor(Math.random() * 700));
        });
        const ids = new Set(p.claims.map((claim) => claim.id));
        const missing = (p.demoSeeded ? makePetitionClaims() : makeDemoClaims().concat(makePetitionClaims()))
          .filter((sample) => !ids.has(sample.id));
        const session = normalizeSession(browserSession() || p.session);
        return {
          claims: p.claims.concat(missing),
          demoSeeded: true,

          supported: Array.isArray(p.supported) ? { [session.email]: p.supported } : p.supported || {},
          session,
          notifications: Array.isArray(p.notifications) ? p.notifications : [],
          profiles: Array.isArray(p.profiles) ? p.profiles.map(normalizeProfile) : [],
        };
      }
    }
  } catch (e) { /* ignore */ }
  const initial = defaults();
  initial.session = normalizeSession(browserSession());
  return initial;
}

let state = loadState();
let draftLatLng = { lat: VL_CENTER[0], lng: VL_CENTER[1] };
let draftBarrio = nearestBarrio(draftLatLng.lat, draftLatLng.lng);
let draftCat = "";
let draftPicked = false;
let draftAddress = "";
let addressRequest;

function persist() {
  const session = state.session.remember === false ? { logged: false, email: "", nombre: "" } : state.session;
  localStorage.setItem(STORE_KEY, JSON.stringify({ ...state, session }));
}

function save() { try { persist(); } catch { /* storage may be full */ } }
function ownSupports() { return Object.hasOwn(state.supported, state.session.email) ? state.supported[state.session.email] : []; }
function getClaim(id) { return state.claims.find((c) => c.id === id); }
function ownsClaim(claim) { return Boolean(state.session.logged && state.session.email && claim?.owner === state.session.email); }

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
function catMeta(key) { return REPORT_CATEGORIES[key] || { label: key, color: "#64748b", icon: "pin" }; }
function catChip(key) { const c = catMeta(key); return `<span class="chip" style="--c:${c.color}"><span class="sw"></span>${esc(c.label)}</span>`; }
function statusBadge(e) { return `<span class="badge badge-${e}">${ESTADOS[e] || e}</span>`; }
function initials(name) {
  const parts = String(name || "V").trim().split(/\s+/);
  return ((parts[0] || "V")[0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}

function claimCard(c) {
  const cat = catMeta(c.categoria);
  const photo = claimPhoto(c, "card");
  const media = photo && !photo.startsWith("data:video/") ? `<img class="media-img" src="${esc(photo)}" alt="" loading="lazy">` : `<span class="big-ic">${icon(cat.icon, 52, 1.7)}</span>`;
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

function mapLegend(categories) {
  return Object.values(categories).map((category) => `<span>${icon(category.icon, 14)}${category.label}</span>`).join("");
}

/* ---------------- Mapa interactivo ---------------- */
function pinSVG(catKey, size = 30) {
  const c = catMeta(catKey);
  const h = Math.round(size * 1.3125);
  return `<svg viewBox="0 0 32 42" width="${size}" height="${h}" aria-hidden="true">
    <path d="M16 41C16 41 2 27 2 15A14 14 0 1 1 30 15c0 12-14 26-14 26Z" fill="${c.color}" stroke="#ffffff" stroke-width="2.2"/>
    <svg x="8" y="7" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${ICONS[c.icon]}</svg>
  </svg>`;
}



function draftPin() {
  const p = latlngToPct(draftLatLng.lat, draftLatLng.lng);
  return `<span class="map-pin is-draft" id="draftPin" ${draftPicked ? "" : "hidden"} style="left:${p.x.toFixed(3)}%;top:${p.y.toFixed(3)}%">
    ${pinSVG(draftCat)}
  </span>`;
}

function barrioTags() {
  return Object.entries(BARRIOS).map(([name, b]) => {
    const p = latlngToPct(b.lat, b.lng);
    return `<span class="barrio-tag" style="left:${p.x.toFixed(2)}%;top:${p.y.toFixed(2)}%">${esc(name)}</span>`;
  }).join("");
}

const mapConfigs = [];
const liveMaps = [];

function reportMap(claims, { labels = true, pick = false, focus, cls = "" } = {}) {
  const index = mapConfigs.push({ claims, focus, pick: pick ? selectMapLocation : null }) - 1;
  const hint = pick ? "Tocá el mapa o usá Enter para marcar un punto. Usá dos dedos para cambiar el zoom."
    : "Acercate con dos dedos, los botones o la rueda. Arrastrá para recorrer el mapa.";
  return `<div class="static-map claim-map ${cls} ${pick ? "is-picker" : ""} ${focus ? "is-zoomed" : ""}" data-claim-map="${index}" ${pick ? 'id="pickMap"' : ""} tabindex="0" role="region" aria-label="Mapa interactivo de Vicente López" aria-describedby="mapHint-${index}">
    <div class="map-world">
      <img class="static-map-img" src="${focus ? MAP_SRC : MAP_OVERVIEW_SRC}" alt="" draggable="false" ${cls === "home-map" ? 'fetchpriority="high"' : ""}>
      <span class="map-tint" aria-hidden="true"></span>
      ${labels ? `<span class="map-labels" aria-hidden="true">${barrioTags()}</span>` : ""}
      ${pick ? draftPin() : ""}
    </div>
    <div class="map-pins"></div>
    <div class="map-controls" role="group" aria-label="Controles del mapa">
      <button type="button" data-map-control="in" aria-label="Acercar mapa" title="Acercar">+</button>
      <button type="button" data-map-control="out" aria-label="Alejar mapa" title="Alejar">−</button>
      <button type="button" data-map-control="reset" aria-label="Volver al mapa completo" title="Mapa completo">${icon("crosshair", 17)}</button>
    </div>
    <div class="map-hud"><span class="map-level" aria-label="Nivel de zoom">1×</span><span id="mapHint-${index}">${hint}</span></div>
    <div class="map-group-results" hidden></div>
    <span class="map-credit">© OpenStreetMap</span>
  </div>`;
}

function draftLocationLabel() {
  if (!draftPicked) return "Buscá una dirección o marcá un punto en el mapa.";
  const location = draftAddress || `${draftBarrio} · ${draftLatLng.lat.toFixed(5)}, ${draftLatLng.lng.toFixed(5)}`;
  return `Ubicación elegida: <strong>${esc(location)}</strong>`;
}

function setDraftLocation({ lat, lng }, address = "", barrio = nearestBarrio(lat, lng)) {
  draftLatLng = { lat, lng };
  draftBarrio = barrio;
  draftPicked = true;
  const resolvedAddress = address || `${barrio} · ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  draftAddress = resolvedAddress;
  const input = document.getElementById("draftAddress");
  if (input) input.value = resolvedAddress;
  const label = document.getElementById("draftBarrio");
  if (label) label.innerHTML = draftLocationLabel();
}

function cancelAddressSearch() {
  addressRequest?.abort();
  addressRequest = undefined;
}

function clearAddressResults() {
  cancelAddressSearch();
  const search = document.querySelector('[data-action="find-address"]');
  if (!search) return;
  search.disabled = false;
  const matches = document.getElementById("addressMatches");
  if (matches) {
    matches.onchange = null;
    matches.replaceChildren();
    if (matches.parentElement) matches.parentElement.hidden = true;
  }
  const feedback = document.getElementById("addressFeedback");
  if (feedback) feedback.textContent = "";
}

function selectMapLocation(location) {
  clearAddressResults();
  setDraftLocation(location);
}

function normalizeAddressText(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

const STREET_PREFIXES = new Set([
  "av", "avda", "avenida", "calle", "de", "del", "la", "las", "los",
  "gral", "general", "pte", "presidente", "tte", "teniente", "dr", "doctor", "cnl", "coronel",
]);

function streetWords(text) {
  return normalizeAddressText(text).match(/[a-z0-9]+/g)?.filter((word) => !STREET_PREFIXES.has(word)) || [];
}

function parseDraftAddress(input) {
  const [line, ...suffixes] = input.split(",").map((part) => part.trim());
  let streetLine = line;
  let locality = suffixes[0] || "";
  if (!locality) {
    const normalized = normalizeAddressText(line);
    const suffix = [...Object.keys(BARRIOS), "Vicente López"].find((name) => normalized.endsWith(" " + normalizeAddressText(name)));
    if (suffix) {
      streetLine = line.slice(0, -suffix.length).trim();
      locality = suffix;
    }
  }
  const match = streetLine.match(/^(.+?)\s*(?:\s+al\s+|\s+n(?:ro\.?|[°º]|úmero)?\s*|\s*#\s*|\s+)(\d+)(?:\s*[-–—]\s*(\d+))?$/i);
  if (!match || !streetWords(match[1]).length) return null;
  const first = Number(match[2]);
  const last = Number(match[3] || match[2]);
  if (!Number.isSafeInteger(first) || !Number.isSafeInteger(last) || first < 1 || last < 1) return null;
  const low = Math.min(first, last);
  const high = Math.max(first, last);
  return { street: match[1].trim(), low, high, locality: normalizeAddressText(locality) };
}

function matchesStreet(queryWords, candidateName) {
  const remaining = streetWords(candidateName);
  const pending = [];
  let exactName = false;
  for (const word of queryWords) {
    const index = word.length > 1 ? remaining.indexOf(word) : -1;
    if (index === -1) pending.push(word);
    else {
      exactName = true;
      remaining.splice(index, 1);
    }
  }
  return exactName && pending.sort((a, b) => b.length - a.length).every((word) => {
    const index = remaining.findIndex((candidate) => (word.length === 1 || candidate.length === 1) && word[0] === candidate[0]);
    if (index < 0) return false;
    remaining.splice(index, 1);
    return true;
  });
}

function locateAddressResults(rows, address, number) {
  const words = streetWords(address.street);
  const results = [];
  for (const row of rows) {
    const { lat, lon: lng } = row.ubicacion || {};
    if (row.departamento?.id !== "06861" || row.altura?.valor !== number || !row.calle?.nombre || !row.nomenclatura) continue;
    if (!Number.isFinite(lat) || !Number.isFinite(lng)
      || lat < MAP_BOUNDS.south || lat > MAP_BOUNDS.north || lng < MAP_BOUNDS.west || lng > MAP_BOUNDS.east) continue;
    if (!matchesStreet(words, row.calle.nombre)) continue;
    if (results.some((result) => Math.hypot(result.location.lat - lat, result.location.lng - lng) < .00018)) continue;
    const locality = row.localidad?.nombre || row.nomenclatura.split(",")[1]?.trim() || "";
    const barrio = Object.hasOwn(BARRIOS, locality) ? locality : nearestBarrio(lat, lng);
    const suffix = row.nomenclatura.split(",").slice(1).join(",");
    const label = address.low === address.high ? row.nomenclatura
      : `${row.calle.nombre} ${address.low}–${address.high}${suffix ? "," + suffix : ""}`;
    const preferred = Boolean(address.locality) && [locality, barrio].some((name) => normalizeAddressText(name) === address.locality);
    results.push({ location: { lat, lng }, label, barrio, preferred });
  }
  return results.sort((a, b) => Number(b.preferred) - Number(a.preferred));
}

async function lookupDraftAddress(address, signal) {
  const midpoint = Math.round((address.low + address.high) / 2);
  const shortStreet = streetWords(address.street).filter((word) => word.length > 1).at(-1) || address.street;
  const queries = [["api/v2.1", address.street, midpoint]];
  if (normalizeAddressText(shortStreet) !== normalizeAddressText(address.street)) queries.push(["api/v2.1", shortStreet, midpoint]);
  queries.push(["api", shortStreet, midpoint]);
  if (address.low !== address.high) {
    for (const endpoint of new Set([address.low, address.high])) {
      if (endpoint !== midpoint) queries.push(["api/v2.1", shortStreet, endpoint]);
    }
  }

  let failed = false;
  for (const [version, street, number] of queries) {
    const query = new URLSearchParams({
      direccion: `${street} ${number}`, provincia: "Buenos Aires", departamento: "Vicente Lopez", max: "30",
    });
    try {
      const response = await fetch(`https://apis.datos.gob.ar/georef/${version}/direcciones?${query}`, { signal, credentials: "omit" });
      if (!response.ok) throw new Error("Georef HTTP " + response.status);
      const { direcciones = [] } = await response.json();
      const results = locateAddressResults(direcciones, address, number);
      if (results.length) return { results, approximateHeight: number === midpoint ? null : number };
    } catch (error) {
      if (signal.aborted) throw error;
      failed = true;
    }
  }
  if (failed) throw new Error("Georef no completó la búsqueda");
  return { results: [], approximateHeight: null };
}

async function findDraftAddress() {
  const input = document.getElementById("draftAddress");
  const button = document.querySelector('[data-action="find-address"]');
  if (button.disabled) return;
  clearAddressResults();
  const feedback = document.getElementById("addressFeedback");
  const address = parseDraftAddress(input.value);
  if (!address) {
    feedback.textContent = "Escribí una calle y una altura, o un tramo como Maipú 1100–1200.";
    input.focus();
    return;
  }

  const controller = new AbortController();
  addressRequest = controller;
  const timeout = setTimeout(() => controller.abort(), 16000);
  button.disabled = true;
  feedback.textContent = "Buscando la dirección…";
  try {
    const { results, approximateHeight } = await lookupDraftAddress(address, controller.signal);
    if (addressRequest !== controller || !input.isConnected || location.hash.split("?")[0] !== "#/crear") return;
    if (!results.length) {
      feedback.textContent = "No encontramos esa dirección en Vicente López. Revisá la calle y el número o marcá un punto en el mapa.";
      return;
    }
    const map = liveMaps.find((item) => item.stage.id === "pickMap");
    const choose = (result) => {
      setDraftLocation(result.location, result.label, result.barrio);
      map.showPin(result.location);
    };
    choose(results[0]);
    if (address.low !== address.high) {
      const message = approximateHeight === null ? "Marcamos un punto aproximado en el tramo."
        : `Marcamos la altura ${approximateHeight} como referencia del tramo.`;
      feedback.textContent = message + (results.length > 1 ? " Podés elegir otra coincidencia." : " Revisá el punto antes de enviar.");
    } else {
      feedback.textContent = results.length === 1 ? "Dirección marcada. Revisá el punto antes de enviar."
        : "Hay varias coincidencias. Revisá el punto o elegí otra dirección.";
    }
    if (results.length > 1) {
      const matches = document.getElementById("addressMatches");
      results.forEach((result, i) => matches.add(new Option(`${i + 1}. ${result.label}`, i)));
      matches.parentElement.hidden = false;
      matches.onchange = () => choose(results[Number(matches.value)]);
    }
  } catch {
    if (addressRequest === controller && input.isConnected) {
      feedback.textContent = "No pudimos consultar la dirección. Podés reintentar o marcar el punto en el mapa.";
    }
  } finally {
    clearTimeout(timeout);
    if (addressRequest === controller) {
      addressRequest = undefined;
      button.disabled = false;
    }
  }
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
  const unread = accountNotifications().filter((n) => !n.leida).length;
  const dot = document.getElementById("notifDot");
  if (dot) dot.hidden = unread === 0;
  const activeMap = { reclamo: "reclamos", enviado: "crear" };
  const active = activeMap[view] || view;
  document.querySelector('[data-nav="municipal"]').hidden = !hasMunicipalAccess();
  document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("is-active", a.dataset.nav === active));
}

function authGate(title, text, { municipal = false } = {}) {
  const next = encodeURIComponent(location.hash || "#/");
  return `<section class="section"><div class="container"><div class="auth-wrap"><div class="auth-card center">
    <span class="brand-mark" style="margin:0 auto 14px;width:52px;height:52px;border-radius:14px">${icon(municipal ? "lock" : "user", 26)}</span>
    <h1>${esc(title)}</h1><p class="sub">${esc(text)}</p>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn btn-primary" href="#/login?next=${next}">${municipal ? "Ingresar como administrador" : "Iniciar sesión"}</a>${municipal ? "" : `<a class="btn btn-ghost" href="#/registro?next=${next}">Crear cuenta</a>`}</div>
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
      <div class="container home-hero-shell">
        <div class="home-municipal"><img src="assets/municipio-logo.svg" alt="Vicente López" width="168" height="48"><span>Plataforma municipal de participación ciudadana</span></div>
        <div class="home-hero-grid">
        <div class="home-hero-text">
          <h1>¿Qué pasa en <span class="hl">tu barrio</span>?</h1>
          <p class="lead">Si hay una luminaria apagada, un bache o algo que dificulta el paso, marcá el lugar en el mapa. Podés seguir tu reclamo y apoyar el de otro vecino.</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#/crear">${icon("plus", 18)} Crear reclamo</a>
            <a class="btn btn-ghost" href="#/ver-reclamos">${icon("search", 17)} Ver reclamos</a>
          </div>
          <ol class="home-steps" aria-label="Cómo participar">
            <li><span>1</span>Marcá el lugar</li>
            <li><span>2</span>Seguí tu reclamo</li>
            <li><span>3</span>Apoyá a un vecino</li>
          </ol>
          <div class="home-highlights">
            <article class="home-highlight">
              <span class="home-highlight-icon">${icon("check", 19)}</span>
              <div><h2>Seguimiento transparente</h2><p>Consultá el estado, las respuestas y la evidencia del municipio.</p></div>
            </article>
            <article class="home-highlight">
              <span class="home-highlight-icon">${icon("users", 19)}</span>
              <div><h2>La comunidad suma</h2><p>Con ${THRESHOLD} apoyos, el reclamo habilita una petición colectiva al municipio para pedir una respuesta.</p></div>
            </article>
          </div>
        </div>
        <div class="home-map-col">
          <div class="map-card home-map-card">
            ${reportMap(claims, { cls: "home-map" })}
            ${total === 0 ? `<div class="map-empty"><div class="me-card"><span class="me-ic">${icon("pin", 24)}</span><strong>Todavía no hay reclamos</strong><p>Cuando los vecinos publiquen, van a aparecer en el mapa con el ícono de su categoría y su ubicación.</p><a class="btn btn-primary btn-sm" href="#/crear">${icon("plus", 15)} Crear el primero</a></div></div>` : ""}
            <div class="map-legend">${mapLegend(REPORT_CATEGORIES)}</div>
          </div>
          <p class="map-caption">${icon("crosshair", 14)} ${total} ${total === 1 ? "reclamo ubicado" : "reclamos ubicados"} en el partido de Vicente López</p>
        </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:30px">
      <div class="container">
        <div class="stat-cards">
          <div class="stat-card"><span class="ic">${icon("doc", 32, 1.9)}</span><div><div class="n">${total}</div><div class="l">Reclamos en el municipio</div></div></div>
          <div class="stat-card stat-support"><span class="ic">${icon("support", 32, 1.9)}</span><div><div class="n">${apoyos}</div><div class="l">Apoyos ciudadanos</div></div></div>
          <div class="stat-card stat-resolved"><span class="ic">${icon("check-ring", 34, 1.9)}</span><div><div class="n">${resueltos}</div><div class="l">Resueltos con evidencia</div></div></div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><div><h2>Explorá por categoría</h2><p>Encontrá los reclamos que más te interesan.</p></div><a class="btn btn-ghost btn-sm" href="#/reclamos">Ver todos</a></div>
        <div class="cat-grid">${Object.entries(CATEGORIES).map(([key, c]) => {
          const n = claims.filter((x) => x.categoria === key).length;
          return `<a class="cat-card" href="#/reclamos?cat=${key}" style="--c:${c.color}"><span class="ic">${icon(c.icon, 32, 1.9)}</span><span class="name">${c.label}</span><span class="count">${n} ${n === 1 ? "reclamo" : "reclamos"}</span></a>`;
        }).join("")}</div>
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container home-municipal-grid">
        <div class="home-places">
          <div class="section-head"><div><h2>Conocé Vicente López</h2><p>Un partido con costa, espacios verdes y una comunidad que participa.</p></div><a class="btn btn-ghost btn-sm" href="#/municipio">Ver el Municipio</a></div>
          ${renderPlaceSlider()}
        </div>
        ${renderHomeNews()}
      </div>
    </section>

    <section class="section" style="padding-top:0">
      <div class="container">
        <div class="section-head"><div><h2>Últimos reclamos</h2><p>Lo que los vecinos reportaron recientemente.</p></div>${total ? `<a class="btn btn-ghost btn-sm" href="#/ver-reclamos">Ver todos →</a>` : ""}</div>
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
  const { page, count, navigation } = claimPagination(list, "reclamos", params);
  const hasFilters = ["cat", "estado", "q"].some((key) => params.has(key));
  const catOpts = Object.entries(REPORT_CATEGORIES).map(([k, c]) => `<option value="${k}" ${cat === k ? "selected" : ""}>${c.label}</option>`).join("");

  return `
    <section class="section"><div class="container">
      <div class="section-head"><div><span class="eyebrow">${icon("search", 15)} Explorar</span><h2 style="margin-top:12px">Explorar reclamos</h2><p>Buscá por palabra, filtrá por categoría y estado, y apoyá los reclamos que te importan.</p></div><a class="btn btn-primary" href="#/crear">${icon("plus", 17)} Crear reclamo</a></div>
      <div class="explore-layout">
        <form class="filter-panel" data-form="filters">
          <h3>Aplicar filtros</h3>
          <div class="field"><label for="fcat">Categoría</label><select class="select" id="fcat" name="cat"><option value="todos">Todas las categorías</option>${catOpts}</select></div>
          <div class="field"><label for="festado">Estado</label><select class="select" id="festado" name="estado">
            <option value="todos" ${estado === "todos" ? "selected" : ""}>Todos</option>
            <option value="abierto" ${estado === "abierto" ? "selected" : ""}>En revisión</option>
            <option value="en_proceso" ${estado === "en_proceso" ? "selected" : ""}>En curso</option>
            <option value="resuelto" ${estado === "resuelto" ? "selected" : ""}>Resuelto</option>
          </select></div>
          <div class="field"><label for="fq">Palabra clave</label><input class="input" id="fq" name="q" type="search" value="${esc(params.get("q") || "")}" placeholder="Ej.: bache, luminaria…" /></div>
          <button class="btn btn-primary btn-block" type="submit">${icon("search", 16)} Aplicar filtros</button>
        </form>
        <div>
          <div class="map-card explore-results-map">${reportMap(list, { cls: "explore-map" })}</div>
          <div class="results-head"><h3 id="claim-results" class="results-title" tabindex="-1">Resultados</h3>${hasFilters ? `<a class="muted" style="font-size:.84rem" href="#/reclamos">Limpiar filtros</a>` : ""}</div>
          ${page.length ? `<p class="page-count" role="status">${count}</p><div class="claim-list">${page.map((c) => claimRow(c, { thumbnail: true, status: true })).join("")}</div>${navigation}` : `<div class="empty"><p style="font-weight:700;color:var(--ink);margin:0 0 6px">${state.claims.length ? "No hay reclamos que coincidan" : "Todavía no hay reclamos"}</p><p style="margin:0 0 14px">${state.claims.length ? "Probá con otros filtros." : "Cuando los vecinos publiquen, van a aparecer acá."}</p><a class="btn btn-primary" href="#/crear">${icon("plus", 16)} Crear el primero</a></div>`}
        </div>
      </div>
    </div></section>`;
}

function claimRow(c, { thumbnail = false, status = false } = {}) {
  const cat = catMeta(c.categoria);
  const photo = claimPhoto(c, "thumb");
  const image = photo && !photo.startsWith("data:video/");
  return `<article class="claim-row">
    ${thumbnail ? `<div class="claim-thumb" style="--c:${cat.color}">${image ? `<img src="${esc(photo)}" alt="" loading="lazy">` : icon(cat.icon, 26)}</div>` : ""}
    <div class="claim-row-body">
      <h2>${esc(c.titulo)}</h2>
      <p class="muted">${esc(cat.label)} · ${esc(c.barrio)} · ${fmtDate(c.fecha)} · #${esc(c.numero)}</p>
      <p class="claim-summary">${esc(c.descripcion)}</p>
    </div>
    <div class="claim-row-actions">${status ? statusBadge(c.estado) : ""}<a href="#/reclamo/${esc(c.id)}">Ver detalle →</a></div>
  </article>`;
}

function claimPagination(claims, route, params, perPage = 10, compact = false) {
  const last = Math.max(1, Math.ceil(claims.length / perPage));
  const requested = Number(params.get("pagina"));
  const current = clamp(Number.isSafeInteger(requested) ? requested : 1, 1, last);
  const start = (current - 1) * perPage;
  const page = claims.slice(start, start + perPage);
  const url = (number) => {
    const query = new URLSearchParams(params);
    if (number === 1) query.delete("pagina");
    else query.set("pagina", number);
    return `#/${route}${query.size ? "?" + query : ""}`;
  };
  const numberedLinks = Array.from({ length: last }, (_, i) => i + 1).map((number) => {
    if (number === current) return `<span class="page-link is-current" aria-current="page">${number}</span>`;
    if (number === 1 || number === last || Math.abs(number - current) <= 1) return `<a class="page-link" href="${url(number)}" aria-label="Página ${number}">${number}</a>`;
    if (Math.abs(number - current) === 2) return '<span class="page-ellipsis" aria-hidden="true">…</span>';
    return "";
  }).join("");
  const count = `Mostrando ${start + 1}–${start + page.length} de ${claims.length} ${claims.length === 1 ? "reclamo" : "reclamos"}`;
  const navigation = last > 1 ? `<nav class="claim-pagination" aria-label="Páginas de reclamos">
    ${current > 1 ? `<a class="page-link page-step" href="${url(current - 1)}" rel="prev">‹ Anterior</a>` : '<span class="page-link page-step" aria-disabled="true">‹ Anterior</span>'}
    <div class="page-numbers">${compact ? `<span aria-current="page">${current} / ${last}</span>` : numberedLinks}</div>
    ${current < last ? `<a class="page-link page-step" href="${url(current + 1)}" rel="next">Siguiente ›</a>` : '<span class="page-link page-step" aria-disabled="true">Siguiente ›</span>'}
  </nav>` : "";
  return { page, count, navigation };
}

function renderVerReclamos() {
  const claims = state.claims.slice().sort((a, b) => b.fecha.localeCompare(a.fecha));
  const { page, count, navigation } = claimPagination(claims, "ver-reclamos", getRoute().params);
  return `<section class="section"><div class="container">
    <div class="section-head"><div><h2 id="claim-results" tabindex="-1">Ver reclamos</h2><p>Reclamos hechos por vecinos.</p></div>
      <a class="btn btn-ghost" href="#/reclamos">${icon("search", 17)} Explorar y filtrar</a>
    </div>
    ${page.length ? `<p class="page-count" role="status">${count}</p><div class="claim-list">${page.map((c) => claimRow(c)).join("")}</div>` : `<div class="empty"><p>Todavía no hay reclamos publicados.</p><a class="btn btn-primary" href="#/crear">Crear reclamo</a></div>`}
    ${navigation}
  </div></section>`;
}

function renderReclamo(id) {
  const c = getClaim(id);
  if (!c) return `<section class="section"><div class="container"><div class="empty"><p style="font-weight:700;color:var(--ink)">Reclamo no encontrado</p><a class="btn btn-ghost" href="#/reclamos" style="margin-top:12px">Volver a reclamos</a></div></div></section>`;

  const cat = catMeta(c.categoria);
  // Older reports use a shortened description as their title in lists.
  const description = c.descripcion || "";
  const generatedTitle = description.length > 64 ? description.slice(0, 61).trim() + "…" : description;
  const detailTitle = c.titulo === generatedTitle ? description : c.titulo;
  const supported = ownSupports().includes(c.id);
  const pct = Math.min(100, Math.round((c.apoyos / THRESHOLD) * 100));
  const ready = c.apoyos >= THRESHOLD;
  const reference = referencePhoto(c);
  const photo = reference?.src || c.foto;
  const media = photo?.startsWith("data:video/")
    ? `<video class="media-img" src="${esc(photo)}" controls preload="metadata" aria-label="Video del reclamo"></video>`
    : photo ? `<img class="media-img" src="${esc(photo)}" alt="${esc(reference?.label || "Foto del reclamo")}">` : icon(cat.icon, 64, 1.6);
  const news = c.comentarios.filter((m) => m.muni).slice(-3).reverse();
  const comments = c.comentarios.length ? c.comentarios.map((m) => `
    <div class="comment"><div class="avatar ${m.muni ? "muni" : ""}">${m.muni ? icon("building", 18) : esc((m.autor || "V").slice(0, 1).toUpperCase())}</div>
    <div><div class="who">${esc(m.autor)} ${m.muni ? '<span class="badge badge-verified">Oficial</span>' : ""} <span class="when">${fmtDate(m.fecha)}</span></div><p>${esc(m.texto)}</p></div></div>`).join("") : `<p class="muted" style="font-size:.88rem">Todavía no hay comentarios.</p>`;

  return `
    <section class="section"><div class="container">
      <a href="#/reclamos" class="muted" style="display:inline-flex;align-items:center;gap:6px;font-size:.88rem;font-weight:600;margin-bottom:16px">${icon("arrow", 16)} Volver a explorar</a>
      <div class="detail-grid">
        <div>
          <div class="panel panel-pad">
            <div class="claim-detail-actions">
              <div class="claim-detail-badges">${catChip(c.categoria)}${statusBadge(c.estado)}${c.verificado ? '<span class="badge badge-verified">' + icon("check", 13) + " Verificado</span>" : ""}</div>
              ${ownsClaim(c) ? `<button type="button" class="btn btn-ghost btn-sm claim-delete-trigger" data-action="open-delete-claim" data-id="${esc(c.id)}">${icon("limpieza", 16)} Borrar reclamo</button>
              <dialog id="claim-delete-dialog" class="modal claim-delete-dialog" aria-labelledby="claim-delete-heading" aria-describedby="claim-delete-description">
                <h2 id="claim-delete-heading">¿Borrar este reclamo?</h2>
                <p id="claim-delete-description">Se eliminará «${esc(c.titulo)}» junto con sus comentarios y apoyos. El borrado es definitivo.</p>
                <p class="claim-delete-error" role="alert"></p>
                <form method="dialog" class="claim-delete-actions">
                  <button type="submit" class="btn btn-ghost" autofocus>Cancelar</button>
                  <button type="button" class="btn claim-delete-confirm" data-action="confirm-delete-claim" data-id="${esc(c.id)}">Borrar definitivamente</button>
                </form>
              </dialog>` : ""}
            </div>
            <h1 class="detail-title">${esc(detailTitle)}</h1>
            <div class="detail-meta">
              <span style="display:inline-flex;align-items:center;gap:6px">${icon("calendar", 16)} Publicado el ${fmtDate(c.fecha)}</span>
              <span style="display:inline-flex;align-items:center;gap:6px">${icon("pin", 16)} ${esc(c.direccion)}</span>
              <span style="display:inline-flex;align-items:center;gap:6px">${icon("doc", 16)} N° ${esc(c.numero || "")}</span>
            </div>
            <div class="claim-detail-intro">
              <div><div class="media-frame" style="--c:${cat.color}">${media}</div></div>
              <div><h2>Descripción</h2><p class="detail-desc">${esc(c.descripcion)}</p>
                <div class="support-box">
                  <div class="big">${c.apoyos}</div><div class="lbl">apoyos de vecinos</div>
                  <button class="btn ${supported ? "btn-ghost" : "btn-accent"} btn-block" data-action="support" data-id="${c.id}" ${supported ? "disabled" : ""}>${icon("support", 18)} ${supported ? "Ya apoyaste" : "Apoyar este reclamo"}</button>
                  <div style="width:100%;margin-top:4px"><div class="progress"><i style="width:${pct}%"></i></div><div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--muted);margin-top:6px"><span>${ready ? "Meta alcanzada" : "Petición colectiva"}</span><span>${c.apoyos}/${THRESHOLD}</span></div></div>
                  ${ready ? `<a class="btn btn-primary btn-block" href="#/peticiones">${icon("doc", 17)} Ver petición colectiva</a>` : `<p class="muted" style="font-size:.77rem;margin:0">Faltan ${THRESHOLD - c.apoyos} apoyos para la carta pública.</p>`}
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <h3 style="margin:0 0 14px;font-size:1rem">Estado del problema</h3>
            <div class="state-compare">
              <div class="state-box"><div class="st-label">Estado reportado</div><div class="st-value">${icon("users", 17)} Reportado por vecinos</div><p>Publicado el ${fmtDate(c.fecha)} · ${c.apoyos} apoyos comunitarios.</p></div>
              <div class="state-box official"><div class="st-label">Estado actual · Municipio</div><div class="st-value">${statusBadge(c.estado)} ${c.verificado ? "Verificado" : ""}</div><p>${ESTADO_DESC[c.estado] || ""}</p></div>
            </div>
            ${c.evidencia || c.evidenciaFoto || c.evidenciaMedia ? `<div class="resolution-evidence">
              <div><span class="eyebrow">${c.estado === "resuelto" ? icon("check", 14) + " Intervención finalizada" : "Seguimiento municipal"}</span>
                <h3>Evidencia municipal</h3>
                ${c.fechaResolucion ? `<p class="muted">Resolución registrada el ${fmtDate(c.fechaResolucion)}.</p>` : ""}
                ${c.evidencia ? `<p>${esc(c.evidencia)}</p>` : ""}
              </div>
              ${evidenceMarkup(c)}
            </div>` : ""}
            <div class="divider"></div>
            <h3 style="margin:0 0 14px;font-size:1rem">Seguimiento</h3>
            <ul class="timeline">
              <li class="done"><div class="t">Reclamo publicado</div><div class="d">${fmtDate(c.fecha)}</div></li>
              <li class="${c.verificado ? "done" : ""}"><div class="t">Verificado por el municipio</div><div class="d">${c.verificado ? "Información validada" : "Pendiente"}</div></li>
              <li class="${c.estado !== "abierto" ? "done" : ""}"><div class="t">En curso</div><div class="d">${c.estado !== "abierto" ? "El municipio está interviniendo" : "Aún no iniciado"}</div></li>
              <li class="${c.estado === "resuelto" ? "done" : ""}"><div class="t">Resuelto con evidencia</div><div class="d">${c.estado === "resuelto" ? (c.fechaResolucion ? fmtDate(c.fechaResolucion) : "Solución verificada") : "Pendiente"}</div></li>
            </ul>
          </div>

          <div class="panel panel-pad" style="margin-top:18px">
            <h3 style="margin:0 0 8px;font-size:1rem">Comentarios de la comunidad</h3>
            ${comments}
            <form data-form="comment" data-id="${c.id}" style="margin-top:16px;display:flex;flex-direction:column;gap:10px">
              <textarea class="textarea" name="texto" aria-label="Escribí tu comentario" placeholder="Escribí tu comentario…" required style="min-height:84px"></textarea>
              <button class="btn btn-primary" type="submit" style="align-self:flex-start">Comentar</button>
            </form>
          </div>
        </div>

        <aside style="display:flex;flex-direction:column;gap:16px">


          <div class="panel panel-pad"><h3 style="margin:0 0 10px;font-size:.95rem">Ubicación</h3><div class="map-card map-card-detail">${reportMap([c, ...state.claims.filter((claim) => claim.id !== c.id)], { focus: c, labels: false, cls: "detail-map" })}</div><p class="muted" style="font-size:.8rem;margin:10px 0 0">${esc(c.barrio)} · ${c.lat.toFixed(5)}, ${c.lng.toFixed(5)}</p></div>

          <div class="panel panel-pad"><h3 style="margin:0 0 12px;font-size:.95rem">Noticias y novedades</h3>
                        ${news.length ? `<div class="aside-news">${news.map((m) => `<div class="news-item"><span class="dot"></span><div><div class="nt">${esc(m.texto)}</div><div class="nd">${fmtDate(m.fecha)}</div></div></div>`).join("")}</div>` : `<p class="muted" style="font-size:.84rem;margin:0">No hay novedades por ahora.</p>`}
          </div>
        </aside>
      </div>
    </div></section>`;
}

function renderCrear() {
  if (!state.session.logged) return authGate("Iniciá sesión para crear un reclamo", "Necesitás una cuenta vecinal para publicar, comentar y apoyar reclamos.");
  const opts = Object.entries(REPORT_CATEGORIES).map(([k, c]) => `<option value="${k}" ${k === draftCat ? "selected" : ""}>${c.label}</option>`).join("");
  return `<section class="section create-claim-page"><div class="container">
    <div class="claim-hero">
      <div><span class="eyebrow">${icon("plus", 14)} Nuevo reclamo</span><h1>Subí tu reclamo</h1>
      <p>Contanos qué pasa y ubicá el reclamo. Tu reporte ayuda a mejorar Vicente López.</p></div>
      <div class="claim-hero-art" aria-hidden="true"><span class="claim-sun"></span><span class="claim-tree">♣</span><span class="claim-buildings">▥ ▥ ▥</span></div>
    </div>
    <form class="claim-layout" data-form="crear">
      <div class="panel panel-pad claim-form-panel">
        <div class="claim-steps"><div class="claim-step"><span>1</span>Datos del reclamo</div><i></i><div class="claim-step"><span>2</span>Ubicación</div><i></i><div class="claim-step"><span>3</span>Confirmación</div></div>
        <div class="claim-section-title"><span class="claim-section-icon">${icon("doc",22)}</span><div><h2>Datos del reclamo</h2><p>Describí el problema con la mayor claridad posible.</p></div></div>
        <div class="claim-identity-fields">
          <div class="field"><label for="titulo">Título del reclamo</label><input class="input claim-input" id="titulo" name="titulo" required maxlength="${CLAIM_TITLE_LIMIT}" placeholder="Ej.: Luminaria apagada"></div>
          <div class="field"><label for="categoria">Categoría</label><select class="input claim-input" id="categoria" name="categoria" required><option value="">Seleccioná una categoría</option>${opts}</select></div>
        </div>
        <div class="field"><div class="claim-label-row"><label for="descripcion">Descripción del problema</label><small>Obligatorio</small></div><textarea class="textarea claim-textarea" id="descripcion" name="descripcion" required minlength="20" maxlength="500" placeholder="Contanos el problema…"></textarea><div class="claim-counter"><span>Intentá ser claro y específico.</span><span id="claimCharCount">0 / 500</span></div></div>
        <div class="field"><label for="foto">Adjuntá fotos o videos</label><label class="claim-upload" for="foto"><span class="claim-upload-icon">${icon("camera",30)}</span><span class="claim-upload-copy"><strong>Elegí un archivo</strong><span class="hint" id="uploadName">Imagen o video · Hasta 1,2 MB · Opcional</span></span><input id="foto" name="foto" type="file" accept="image/*,video/*"></label></div>
        <div class="claim-form-actions"><a href="#/" class="btn btn-ghost">Cancelar</a><button class="btn btn-primary" type="submit">${icon("arrow",16)} Enviar reclamo</button></div>
      </div>
      <aside class="claim-side">
        <div class="panel panel-pad claim-location-panel"><div class="claim-section-title"><span class="claim-location-icon">${icon("pin",25)}</span><div><h2>Ubicación del reclamo</h2><p>Marcá el lugar exacto en el mapa o buscá una dirección.</p></div></div>
          <label for="draftAddress">Dirección</label><div class="address-search claim-address-search"><input class="input" id="draftAddress" name="direccion" type="search" maxlength="140" autocomplete="off" value="${esc(draftAddress)}" placeholder="Calle y altura o tramo" aria-describedby="addressHelp addressFeedback"><button type="button" class="btn btn-ghost" data-action="find-address">${icon("search",16)} Buscar</button></div>
          <span class="hint" id="addressHelp">Buscá una dirección o marcá un punto en el mapa.</span><span class="hint address-feedback" id="addressFeedback" role="status"></span>
          <div class="map-card map-card-pick claim-map-card">${reportMap(state.claims, { pick: true, focus: draftPicked ? draftLatLng : undefined, cls: "pick-map" })}</div>
          <div class="claim-selected-location"><span>${icon("pin",20)}</span><div><small>Ubicación seleccionada:</small><strong id="draftBarrio" aria-live="polite">${draftLocationLabel()}</strong></div><button type="button" class="btn btn-ghost" data-action="focus-map">${icon("crosshair",15)} Modificar</button></div>
        </div>
        <div class="panel panel-pad claim-tips"><div class="claim-tips-title"><span>☼</span><h2>Consejos para un mejor reclamo</h2></div><ul><li>Elegí la categoría que mejor represente el problema.</li><li>Sumá una descripción clara y breve.</li><li>Adjuntá una foto o video que muestre la situación.</li><li>Marcá la ubicación exacta en el mapa.</li></ul><div class="claim-tips-illustration">📷</div></div>
      </aside>
    </form>
  </div></section>`;
}
function renderEnviado(id) {
  const c = getClaim(id);
  if (!c) return renderVerReclamos();
  return `
    <section class="section"><div class="container"><div class="success-card is-success-pending">
      <div class="success-badge" aria-hidden="true"><svg viewBox="0 0 76 76" width="76" height="76" fill="none">
        <g class="success-drawing">
          <circle class="success-track" cx="38" cy="38" r="28"/>
          <circle class="success-ring" cx="38" cy="38" r="28" pathLength="100" transform="rotate(-90 38 38)"/>
          <path class="success-tick" d="M24 39l10 10 19-22" pathLength="100"/>
        </g>
        <path class="success-burst" d="M38 1v-5 M65 10l5-5 M75 37h6 M65 64l5 5 M38 75v5 M11 64l-5 5 M1 37h-6 M11 10l-5-5" pathLength="100"/>
      </svg></div>
      <h1>¡Reclamo enviado con éxito!</h1>
      <p class="muted" role="status">Tu reclamo ya está en el mapa y los vecinos pueden apoyarlo.</p>
      <div class="ticket"><b>N° de reclamo #${esc(c.numero)}</b><span>Fecha de envío: ${fmtDate(c.fecha)}</span></div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn btn-primary" href="#/reclamo/${c.id}">${icon("doc", 17)} Ver mi reclamo</a><a class="btn btn-ghost" href="#/">Volver al inicio</a></div>
    </div></div></section>`;
}

function socialOptions() {
  const providers = [
    ["Google", '<path fill="#4285f4" d="M21.6 12.2c0-.7-.1-1.4-.2-2.1H12v4h5.4a4.6 4.6 0 0 1-2 3v2.6h3.2c1.9-1.8 3-4.4 3-7.5Z"/><path fill="#34a853" d="M12 22c2.7 0 5-1 6.6-2.3l-3.2-2.6c-.9.6-2.1.9-3.4.9-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z"/><path fill="#fbbc05" d="M6.4 13.9a6 6 0 0 1 0-3.8V7.5H3.1a10 10 0 0 0 0 9l3.3-2.6Z"/><path fill="#ea4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A9.5 9.5 0 0 0 12 2a10 10 0 0 0-8.9 5.5l3.3 2.6A6 6 0 0 1 12 6Z"/>'],
    ["Facebook", '<circle cx="12" cy="12" r="10" fill="#0866ff"/><path fill="#fff" d="M13.5 22v-7.8h2.6l.4-3h-3V9.4c0-.9.3-1.5 1.6-1.5h1.6V5.2a22 22 0 0 0-2.4-.1c-2.5 0-4.2 1.5-4.2 4.3v1.8H7.5v3h2.6v7.6c1.1.2 2.3.3 3.4.2Z"/>'],
    ["Apple", '<path fill="#171717" d="M16.7 6.5c-1.5-.1-2.7.8-3.5.8-.8 0-2.1-.8-3.5-.8C7.3 6.5 5 8.4 5 11.9c0 3.4 2.4 7.9 4.4 7.9.9 0 1.8-.7 3.1-.7 1.4 0 2.1.7 3.2.7 1.7 0 3.5-3.1 4.1-5-3.2-1.3-3.4-5.1-.8-6.7-.7-1-1.6-1.5-2.3-1.6ZM15.3 5.3c.7-.9 1.1-1.9 1-3-.9 0-2.1.6-2.8 1.4-.6.7-1.2 1.8-1.1 2.9 1 .1 2.2-.5 2.9-1.3Z"/>'],
  ];
  return `<div class="social-row" aria-label="Opciones de acceso">
    ${providers.map(([label, logo]) => `<button type="button" class="social-btn" data-action="demo-social">
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">${logo}</svg><span>Continuar con ${label}</span></button>`).join("")}
  </div>`;
}

function authLink(view) {
  const next = getRoute().params.get("next");
  return `#/${view}${next ? "?next=" + encodeURIComponent(next) : ""}`;
}

function renderRegistro() {
  return `<section class="section"><div class="container"><div class="auth-wrap register-wrap"><div class="auth-card">
    <h1>Registrarse</h1><p class="sub">Creá tu cuenta vecinal para publicar, apoyar y seguir reclamos.</p>
    <div class="register-grid">
      <form data-form="registro">
        <div class="row2">
          <div class="field"><label for="remail">Email</label><input class="input" id="remail" name="email" type="email" autocomplete="email" required></div>
          <div class="field"><label for="remail2">Confirmar email</label><input class="input" id="remail2" name="email2" type="email" required></div>
        </div>
        <div class="row2">
          <div class="field"><label for="fnac">Fecha de nacimiento</label><input class="input" id="fnac" name="nacimiento" type="date" required></div>
          <div class="field"><label for="fcel">Celular</label><input class="input" id="fcel" name="celular" type="tel" autocomplete="tel" placeholder="11 1234-5678"></div>
        </div>
        <div class="row2">
          <div class="field"><label for="rpass">Contraseña</label><input class="input" id="rpass" name="password" type="password" autocomplete="new-password" required minlength="6"></div>
          <div class="field"><label for="rpass2">Confirmar contraseña</label><input class="input" id="rpass2" name="password2" type="password" autocomplete="new-password" required minlength="6"></div>
        </div>
        <label class="remember-login"><input type="checkbox" required> <span>Acepto los <a href="#/terminos">términos y condiciones</a>.</span></label>
        <div class="view-actions"><button class="btn btn-primary" type="submit">Crear cuenta</button></div>
      </form>
      <div class="register-social">${socialOptions()}</div>
    </div>
    <p class="auth-foot">¿Ya tenés cuenta? <a href="${authLink("login")}">Iniciar sesión</a></p>
  </div></div></div></section>`;
}

function renderLogin() {
  return `<section class="section"><div class="container"><div class="auth-wrap login-wrap"><div class="auth-card">
    <h1>Inicio de sesión</h1><p class="sub">Ingresá para crear reclamos, apoyar y comentar.</p>
    <form data-form="login">
      <div class="field"><label for="lemail">Email</label><input class="input" id="lemail" name="email" type="email" autocomplete="email" required></div>
      <div class="field"><label for="lpass">Contraseña</label><input class="input" id="lpass" name="password" type="password" autocomplete="current-password" required></div>
      <label class="remember-login"><input type="checkbox" name="remember"> Mantener sesión</label>
      <button class="btn btn-primary btn-block" type="submit">Ingresar</button>
    </form>
    <p class="auth-foot"><button type="button" class="btn btn-ghost btn-sm" data-action="forgot">¿Olvidaste tu contraseña?</button></p>
    <div class="or">Continuar con</div>
    ${socialOptions()}
    <p class="auth-foot">¿No tenés cuenta? <a href="${authLink("registro")}">Crear cuenta</a></p>
  </div></div></div></section>`;
}

function renderPerfil() {
  if (!state.session.logged) return authGate("Ingresá a tu perfil", "Iniciá sesión para ver tus datos y tus reclamos.");
  const account = state.session;
  const municipal = hasMunicipalAccess();
  const mine = state.claims.filter((c) => c.owner === account.email);
  return `<section class="section"><div class="container">
    <div class="section-head"><div><h2>Mi cuenta</h2><p>Administrá tus datos y preferencias.</p></div></div>
    <div class="account-grid">
      <aside class="panel panel-pad account-summary">
        <div class="avatar-lg">${esc(initials(account.nombre))}</div>
        <h3>${esc(account.nombre)}</h3><p class="muted">${esc(account.email)}</p>
        <hr class="divider"><p><strong>${municipal ? "Administración municipal" : "Cuenta vecinal"}</strong></p>
        <p>Barrio <strong>${esc(account.barrio || "Sin indicar")}</strong></p>
        <a class="btn btn-ghost" href="#/mis-reclamos">Mis reclamos · ${mine.length}</a>
      </aside>
      <form class="account-form" data-form="perfil">
        <div class="panel panel-pad"><h3>Datos personales</h3><p class="muted">Actualizá la información de tu cuenta.</p>
          <div class="row2">
            <div class="field"><label for="pnombre">Nombre y apellido</label><input class="input" id="pnombre" name="nombre" value="${esc(account.nombre)}" autocomplete="name" required></div>
            <div class="field"><label for="pemail">Correo electrónico</label><input class="input" id="pemail" name="email" type="email" autocomplete="email" value="${esc(account.email)}" ${municipal ? "readonly" : "required"}></div>
            <div class="field"><label for="pbarrio">Barrio</label><select class="input" id="pbarrio" name="barrio"><option value="">Sin indicar</option>${Object.keys(BARRIOS).map((b) => `<option ${b === account.barrio ? "selected" : ""}>${esc(b)}</option>`).join("")}</select></div>
            <div class="field"><label for="ptel">Teléfono</label><input class="input" id="ptel" name="celular" type="tel" autocomplete="tel" value="${esc(account.celular || "")}"></div>
          </div>
        </div>
        <div class="panel panel-pad"><h3>Notificaciones</h3>
          <label class="preference"><span>Recibir novedades sobre mis reclamos</span><input name="novedades" type="checkbox" ${account.novedades !== false ? "checked" : ""}></label>
          <label class="preference"><span>Preferencia de avisos por correo</span><input name="correo" type="checkbox" ${account.correo ? "checked" : ""}></label>
        </div>
        <div class="view-actions"><button class="btn btn-primary" type="submit">Guardar cambios</button></div>
      </form>
    </div>
  </div></section>`;
}

function renderMisReclamos() {
  if (!state.session.logged) return authGate("Ingresá para ver tus reclamos", "Iniciá sesión para consultar el estado de los reclamos que creaste.");
  const mine = state.claims.filter((c) => c.owner === state.session.email);
  const estado = getRoute().params.get("estado");
  const active = Object.hasOwn(ESTADOS, estado) ? estado : "";
  const tabs = [["", "Todos"], ["abierto", "En revisión"], ["en_proceso", "En curso"], ["resuelto", "Resueltos"]];
  const filtered = active ? mine.filter((c) => c.estado === active) : mine;
  const count = (key) => mine.filter((c) => !key || c.estado === key).length;
  const cards = filtered.map((c) => {
    const category = REPORT_CATEGORIES[c.categoria]?.label || c.categoria || "Espacio público";
    const status = ESTADOS[c.estado] || "En revisión";
    const statusClass = c.estado === "abierto" ? "review" : c.estado === "en_proceso" ? "progress" : "done";
    const statusIconMarkup = c.estado === "en_proceso"
      ? `<img class="my-claim-gear-icon" src="assets/ilustracion-icono-doodle-engranaje_53876-5596.avif" alt="" width="14" height="14">`
      : icon(c.estado === "resuelto" ? "check" : "clock", 13);
    // La foto que adjuntó el vecino; si no adjuntó, una genérica real según la categoría.
    const attached = c.foto && !String(c.foto).startsWith("data:video/");
    const photoSrc = attached
      ? c.foto
      : (claimPhoto({ ...c, foto: "" }, "card") || "assets/fotos-referencia/otro-card.webp");
    const photoAlt = (attached ? "Foto del reclamo" : "Imagen de referencia") + ": " + (c.titulo || category);
    return `<a class="panel my-claim-card" href="#/reclamo/${esc(c.id)}" aria-label="Ver ${esc(c.titulo || "reclamo")}">
      <img class="my-claim-thumb" src="${esc(photoSrc)}" alt="${esc(photoAlt)}" loading="lazy">
      <div class="my-claim-info"><h3>${esc(c.titulo || c.descripcion || "Reclamo vecinal")}</h3><div class="my-claim-meta"><span>${esc(category)}</span><i>·</i><span>${esc(c.direccion || c.ubicacion || "Vicente López")}</span></div><p>${esc(c.descripcion || "Seguimiento del reclamo vecinal.")}</p></div>
      <div class="my-claim-status"><span class="claim-status-pill ${statusClass}">${statusIconMarkup} ${esc(status)}</span><span class="my-claim-date">${icon("calendar", 13)} ${fmtDate(c.fecha)}</span></div>
      <span class="my-claim-arrow" aria-hidden="true">${icon("chevron",20)}</span>
    </a>`;
  }).join("");
  return `<section class="section my-claims-page"><div class="container">
    <header class="my-claims-hero"><div class="my-claims-hero-copy"><h1>Mis reclamos</h1><p>Revisá el estado y las novedades de tus reportes.</p></div><div class="my-claims-hero-art" aria-hidden="true"><span class="claims-hill hill-one"></span><span class="claims-hill hill-two"></span><span class="claims-building">▥ ▥ ▥</span><span class="claims-tree">♣</span></div></header>
    <div class="my-claims-toolbar"><nav class="chipbar status-tabs" aria-label="Filtrar por estado">${tabs.map(([key,label]) => `<a class="chipbtn ${key === active ? "is-active" : ""}" ${key === active ? 'aria-current="page"' : ""} href="#/mis-reclamos${key ? "?estado=" + key : ""}">${label} (${count(key)})</a>`).join("")}</nav><a class="btn btn-primary" href="#/crear">${icon("plus",17)} Crear reclamo</a></div>
    ${filtered.length ? `<div class="my-claims-list">${cards}</div>` : `<div class="empty"><p>${mine.length ? "No tenés reclamos en este estado." : "Todavía no tenés reclamos."}</p>${mine.length ? "" : `<a class="btn btn-primary" href="#/crear">Crear mi primer reclamo</a>`}</div>`}
  </div></section>`;
}

function renderNotificaciones() {
  if (!state.session.logged) return authGate("Ingresá para ver tus notificaciones", "Consultá las novedades y respuestas sobre tus reclamos.");
  const list = accountNotifications();
  const tipoIcon = { estado: "check", apoyo: "support", municipio: "building", sistema: "bell" };
  return `<section class="section"><div class="container">
    <div class="section-head"><div><h1 class="notification-heading" id="notification-title" tabindex="-1">${icon("bell", 30)} Notificaciones</h1><p>Novedades, estados actualizados y respuestas del municipio.</p></div>
      ${list.length ? `<div class="view-actions">${list.some((n) => !n.leida) ? '<button class="btn btn-ghost btn-sm" data-action="mark-all">Marcar todas como leídas</button>' : ""}<button class="btn btn-ghost btn-sm" data-action="delete-all-notifications">Eliminar todas</button></div>` : ""}</div>
    ${list.length ? `<ul class="notif-list">${list.map((n) => `<li class="notif-entry">
      <a class="notif-item ${n.leida ? "" : "unread"}" data-id="${esc(n.id)}" href="${n.ref ? "#/reclamo/" + esc(n.ref) : "#/"}"><span class="nic">${icon(tipoIcon[n.tipo] || "bell", 21)}</span><span class="notification-body"><span class="nt">${esc(n.titulo)}</span><span class="nd">${esc(n.texto)}</span></span><span class="nh">${fmtDate(n.fecha)}</span>${n.leida ? "" : '<span class="new-dot" aria-label="Sin leer"></span>'}</a>
      <button class="icon-btn" type="button" data-action="delete-notification" data-id="${esc(n.id)}" aria-label="Eliminar aviso: ${esc(n.titulo)}" data-tooltip="Eliminar aviso">${icon("limpieza", 18)}</button>
    </li>`).join("")}</ul>` : '<div class="empty"><p>No tenés notificaciones.</p><p>Cuando haya novedades, van a aparecer acá.</p></div>'}
  </div></section>`;
}

function renderMunicipio() {
  return `<section class="section"><div class="container muni-intro">
    <div class="muni-intro-row">
      <div><span class="eyebrow">${icon("building", 15)} Vicente López</span><h1>Conocé tu Municipio</h1>
        <p>Vicente López está en el norte del Gran Buenos Aires, a orillas del Río de la Plata. Sus nueve barrios reúnen zonas residenciales, centros comerciales y espacios de encuentro como el Paseo de la Costa.</p>
        <p>El partido se creó el <strong>21 de diciembre de 1905</strong>, al separarse de San Isidro, y Olivos quedó como cabecera. Las fechas que recuerdan el origen de cada barrio quedaron reunidas en el <a href="https://www.vicentelopez.gov.ar/boletin_oficial/bulletin/uploads/historical/1533.pdf#page=14">Boletín Municipal</a>.</p>
      </div>
      <img src="assets/municipio-costa.webp" alt="Paseo de la Costa de Vicente López">
    </div>
    <div class="muni-intro-row">
      <img src="assets/municipio-edificio.webp" alt="Edificio municipal de Vicente López">
      <div><h2>De la memoria barrial a la participación</h2>
        <p>Los estudios Lumiton, en Munro, fueron pioneros del cine sonoro argentino. Hoy el museo conserva su legado. En Olivos, el Museo de la Ciudad recorre la historia de los nueve barrios. <a href="https://www.vicentelopez.gov.ar/espacio-vl/museo-lumiton/">Museo Lumiton</a> · <a href="https://www.vicentelopez.gov.ar/espacio-vl/museo-de-la-ciudad-de-vicente-lopez/">Museo de la Ciudad</a>.</p>
        <p>En AvisAR podés señalar problemas del espacio público, acompañar los reclamos de otros vecinos y seguir las intervenciones que se registran en tu barrio.</p>
        <div class="muni-actions">
          <a class="btn btn-primary" href="#/crear">${icon("plus", 17)} Realizar reclamo</a>
          ${hasMunicipalAccess() ? `<a class="btn btn-ghost" href="#/municipal">${icon("building", 17)} Abrir panel municipal</a>` : ""}
        </div>
      </div>
    </div>
    <p class="photo-credit">Fotos del partido de Vicente López · Wikimedia Commons</p>
    ${renderMunicipalImpact()}
  </div></section>`;
}

function municipalURL(queue, q, id) {
  const params = new URLSearchParams({ cola: queue });
  if (q) params.set("q", q);
  if (id) params.set("id", id);
  return "#/municipal?" + params;
}

function municipalEditor(c) {
  if (!c) return `<div class="panel panel-pad municipal-editor municipal-empty">
    <h3>Sin reclamos para editar</h3><p class="muted">Elegí otra cola o cambiá la búsqueda.</p>
  </div>`;
  const latest = c.comentarios.findLast((entry) => entry.muni);
  return `<article class="panel municipal-editor" aria-labelledby="municipal-editor-title">
    <header class="municipal-record">
      <div class="municipal-badges">${catChip(c.categoria)}${statusBadge(c.estado)}</div>
      <h3 id="municipal-editor-title" tabindex="-1">${esc(c.titulo)}</h3>
      <p class="municipal-meta">#${esc(c.numero)} · ${esc(c.barrio)} · ${fmtDate(c.fecha)} · ${c.apoyos} ${c.apoyos === 1 ? "apoyo" : "apoyos"}</p>
      <p class="municipal-description">${esc(c.descripcion)}</p>
      <a class="btn btn-ghost btn-sm" href="#/reclamo/${esc(c.id)}">Ver reclamo público →</a>
    </header>
    <form class="municipal-form" data-form="municipal" data-id="${esc(c.id)}">
      <div class="municipal-form-section">
        <h4>Estado y verificación</h4>
        <div class="row2">
          <div class="field"><label for="estado">Estado</label><select class="input" id="estado" name="estado">${Object.entries(ESTADOS).map(([key, label]) => `<option value="${key}" ${c.estado === key ? "selected" : ""}>${label}</option>`).join("")}</select></div>
          <label class="municipal-verify"><input type="checkbox" name="verificado" ${c.verificado ? "checked" : ""}> Información verificada</label>
        </div>
      </div>
      <div class="municipal-form-section">
        <h4>Evidencia y respuesta</h4>
        <div class="field"><label for="evidencia">Evidencia de la solución</label><span id="evidencia-hint" class="hint">Para cerrar el reclamo, registrá qué se hizo y cómo se comprobó la solución.</span><textarea class="textarea" id="evidencia" name="evidencia" aria-describedby="evidencia-hint" rows="3" placeholder="Ej.: Se destapó la rejilla y se comprobó el escurrimiento.">${esc(c.evidencia || "")}</textarea></div>
        <div class="field"><label for="evidence-file">Imagen o video <span class="hint">· Hasta 15 MB</span></label>
          <input class="input" id="evidence-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif,video/mp4,video/webm,video/quicktime">
          <p class="hint">Si adjuntás un archivo nuevo, reemplaza al anterior.</p></div>
        ${c.evidenciaFoto || c.evidenciaMedia ? `<details class="municipal-latest"><summary>Ver evidencia adjunta</summary>${evidenceMarkup(c)}</details>
          <label class="municipal-verify"><input type="checkbox" name="removeEvidence"> Quitar archivo adjunto</label>` : ""}
        <div class="field"><label for="respuesta">Respuesta pública <span class="hint">· Opcional</span></label><textarea class="textarea" id="respuesta" name="respuesta" rows="3" placeholder="Contale al vecino qué pasó o cuál es el próximo paso."></textarea></div>
        ${latest ? `<details class="municipal-latest"><summary>Última respuesta · ${fmtDate(latest.fecha)}</summary><p>${esc(latest.texto)}</p></details>` : ""}
      </div>
      <div class="municipal-form-footer"><button class="btn btn-primary" type="submit">${icon("check", 17)} Guardar actualización</button></div>
    </form>
  </article>`;
}

function renderMunicipal() {
  if (!hasMunicipalAccess()) return authGate("Acceso municipal restringido", "Este panel está reservado para la cuenta administradora de AvisAR.", { municipal: true });
  const claims = state.claims;
  const { params } = getRoute();
  const selectedId = params.get("id");
  const pending = claims.filter((c) => c.estado !== "resuelto");
  const resolved = claims.filter((c) => c.estado === "resuelto");
  const queues = {
    pendientes: { label: "Pendientes", items: pending },
    resueltos: { label: "Resueltos", items: resolved },
    todos: { label: "Todos", items: claims },
  };
  const requested = params.get("cola");
  const queue = Object.hasOwn(queues, requested) ? requested
    : resolved.some((c) => c.id === selectedId) ? "resueltos" : "pendientes";
  const q = (params.get("q") || "").trim();
  const query = q.toLocaleLowerCase("es-AR");
  const list = queues[queue].items.filter((c) =>
    `${c.titulo} ${c.barrio} ${c.numero}`.toLocaleLowerCase("es-AR").includes(query)
  ).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const selected = list.find((c) => c.id === selectedId) || list[0];
  return `<section class="section municipal-panel"><div class="container">
    <div class="section-head municipal-heading"><div><span class="section-kicker">Municipio · Gestión de reclamos</span><h2>Panel municipal</h2><p>Revisá la cola y publicá avances para los vecinos.</p></div><a class="btn btn-ghost" href="#/municipio">Volver al municipio</a></div>
    <nav class="municipal-tabs" aria-label="Colas de reclamos">${Object.entries(queues).map(([key, group]) =>
      `<a href="${esc(municipalURL(key, q))}" ${key === queue ? 'aria-current="page"' : ""}>${group.label}<strong>${group.items.length}</strong></a>`
    ).join("")}</nav>
    <div class="municipal-workspace">
      <aside class="panel municipal-queue" aria-labelledby="municipal-queue-title">
        <header><h3 id="municipal-queue-title">Reclamos ${queue === "todos" ? "en el panel" : queues[queue].label.toLowerCase()}</h3>
          <form data-form="municipal-search" data-queue="${queue}">
            <label for="municipalQuery">Buscar por título, barrio o número</label>
            <div class="municipal-search"><input class="input" type="search" name="q" id="municipalQuery" value="${esc(q)}" placeholder="Ej.: Olivos o E-001"><button class="btn btn-ghost" type="submit" aria-label="Buscar reclamos">${icon("search", 17)}</button></div>
          </form>
          <div class="municipal-queue-meta"><span role="status">${list.length} ${list.length === 1 ? "resultado" : "resultados"}</span>${q ? `<a href="${municipalURL(queue, "")}">Limpiar búsqueda</a>` : ""}</div>
        </header>
        ${list.length ? `<ul class="municipal-list">${list.map((c) => `<li><a href="${esc(municipalURL(queue, q, c.id))}" ${c === selected ? 'aria-current="true"' : ""}>
          <strong>${esc(c.titulo)}</strong><span class="municipal-meta">${esc(c.barrio)} · #${esc(c.numero)}</span>
          <span class="municipal-badges">${statusBadge(c.estado)}</span>
        </a></li>`).join("")}</ul>` : '<p class="municipal-queue-empty">No hay reclamos en esta selección.</p>'}
      </aside>
      ${municipalEditor(selected)}
    </div>
  </div></section>`;
}

function mapFilter(params) {
  return {
    category: params.get("cat") || "todos",
    status: params.get("estado") || "todos",
  };
}

function mapMatches({ category, status }) {
  return state.claims.filter((claim) => (category === "todos" || claim.categoria === category)
    && (status === "todos" || claim.estado === status));
}

function renderMapResults(list, params) {
  const page = claimPagination(list, "mapa", params, 5, true);
  return `<p class="map-result-count" aria-live="polite">${list.length ? page.count : "Sin reclamos para estos filtros"}</p>
    <div class="map-result-list">${page.page.map((claim) => {
      const category = catMeta(claim.categoria);
      const characters = Array.from(claim.titulo);
      const title = characters.length > CLAIM_TITLE_LIMIT ? characters.slice(0, CLAIM_TITLE_LIMIT - 3).join("").trimEnd() + "..." : claim.titulo;
      const summary = `${claim.barrio} · ${ESTADOS[claim.estado]} · ${claim.apoyos} apoyos`;
      return `<a class="map-mini" href="#/reclamo/${esc(claim.id)}" style="--c:${category.color}" aria-label="${esc(claim.titulo + " · " + summary)}">
        <span class="ic">${icon(category.icon, 20)}</span><span class="map-mini-copy"><span class="t">${esc(title)}</span>
        <span class="s">${esc(summary)}</span></span></a>`;
    }).join("")}</div>${page.navigation}`;
}

function renderMapa() {
  const { params } = getRoute();
  const filter = mapFilter(params);
  const list = mapMatches(filter);
  const categories = [["todos", "Todos", "pin"], ...Object.entries(REPORT_CATEGORIES).map(([key, item]) => [key, item.label, item.icon])];
  return `<section class="section"><div class="container">
    <div class="section-head"><div><span class="eyebrow">${icon("pin", 15)} Mapa</span><h2 style="margin-top:12px">Mapa de reclamos · Vicente López</h2>
      <p>Acercate para separar las tarjetas y abrí un reclamo para ver el detalle.</p></div>
      <label class="stats-period">Estado <select class="input" id="mapStatus"><option value="todos">Todos los estados</option>${Object.entries(ESTADOS).map(([key, label]) => `<option value="${key}" ${key === filter.status ? "selected" : ""}>${label}</option>`).join("")}</select></label>
    </div>
    <div class="chipbar map-filters" role="group" aria-label="Categorías del mapa">${categories.map(([key, label, symbol]) =>
      `<button type="button" class="chipbtn" data-map-category="${key}" aria-pressed="${key === filter.category}" style="--c:${CATEGORY_COLOR}">${icon(symbol, 15)}${label}</button>`).join("")}</div>
    <div class="map-wrap">
      <div class="map-card">${reportMap(list, { cls: "explore-map" })}<div class="map-legend">${mapLegend(REPORT_CATEGORIES)}</div>
        <div class="map-empty" id="map-empty" ${list.length ? "hidden" : ""}><div class="me-card"><span class="me-ic">${icon("pin", 24)}</span><strong>No hay reclamos en esta selección</strong><p>Probá cambiar la categoría o el estado.</p></div></div>
      </div>
      <aside class="map-side" id="map-results" aria-label="Resultados del mapa" tabindex="-1">${renderMapResults(list, params)}</aside>
    </div>
  </div></section>`;
}

function setMapFilter(key, value) {
  const { params } = getRoute();
  if (value === "todos") params.delete(key);
  else params.set(key, value);
  params.delete("pagina");
  location.hash = "#/mapa" + (params.size ? "?" + params : "");
}

function updateMapView(previous, current) {
  const filter = mapFilter(current);
  const before = mapFilter(previous);
  const list = mapMatches(filter);
  if (before.category !== filter.category || before.status !== filter.status) {
    liveMaps[0].setClaims(list);
    document.getElementById("mapStatus").value = filter.status;
    document.getElementById("map-empty").hidden = list.length > 0;
    document.querySelectorAll("[data-map-category]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.mapCategory === filter.category));
    });
  }
  const results = document.getElementById("map-results");
  const pager = document.activeElement?.closest(".claim-pagination");
  const relation = pager && document.activeElement.rel;
  results.innerHTML = renderMapResults(list, current);
  if (pager && results.contains(document.activeElement) === false) {
    const next = relation && results.querySelector(`[rel="${relation}"]`);
    (next || results).focus({ preventScroll: true });
  }
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    results.querySelector(".map-result-list").animate([{ opacity: .3, transform: "translateY(5px)" }, { opacity: 1, transform: "none" }], { duration: 210, easing: "ease-out" });
  }
}

const CHART_LEAD_MS = 240;
const CHART_TRACE_MS = 1450;
const CHART_STATES = [
  { key: "abierto", label: "En revisión", color: "#a55e2c" },
  { key: "en_proceso", label: "En curso", color: "#416b98" },
  { key: "resuelto", label: "Resueltos", color: "#327452" },
];

function chartMark(label) {
  return `data-chart-value="${esc(label)}" tabindex="0" aria-label="${esc(label)}"`;
}

function trendChart(months) {
  const tick = Math.max(1, Math.ceil(Math.max(...months.map((m) => m.n)) / 4));
  const x = (i) => months.length === 1 ? 232 : 38 + i * (388 / (months.length - 1));
  const y = (n) => 147 - n / (tick * 4) * 122;
  const path = (key) => months.map((m, i) => `${x(i)},${y(m[key])}`).join(" ");
  const series = (key, color, dash = "") => {
    let distance = 0;
    const points = months.map((month, i) => {
      if (i > 0) distance += Math.hypot(x(i) - x(i - 1), y(month[key]) - y(months[i - 1][key]));
      return { month, i, distance };
    });
    const start = CHART_LEAD_MS + (key === "n" ? 0 : 140);
    const maskId = "trend-mask-" + key;
    return `<defs><mask id="${maskId}" maskUnits="userSpaceOnUse" x="0" y="0" width="460" height="178">
      <polyline class="trend-stroke" points="${path(key)}" pathLength="100" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" style="--draw-delay:${start}ms;--draw-duration:${CHART_TRACE_MS}ms"/>
    </mask></defs>
    <polyline points="${path(key)}" mask="url(#${maskId})" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${dash}"/>
    ${points.map(({ month, i, distance: position }) => `<circle class="trend-point" ${chartMark(month.n === month.done ? `${month.label} · ${month.n} ingresados y ${month.done} resueltos` : `${month.label} · ${month[key]} ${key === "n" ? "ingresados" : "resueltos"}`)} cx="${x(i)}" cy="${y(month[key])}" r="4.5" fill="${color}" style="--point-color:${color};--point-delay:${Math.round(start + CHART_TRACE_MS * (position / (distance || 1)))}ms"></circle>`).join("")}`;
  };
  return `<svg class="stats-chart" data-chart-plot viewBox="0 0 460 178" role="group" aria-label="${months.map((m) => `${m.label}: ${m.n} ingresados, ${m.done} resueltos`).join(". ")}">
    ${[0, 1, 2, 3, 4].map((step) => `<line x1="38" x2="426" y1="${y(tick * step)}" y2="${y(tick * step)}" stroke="var(--line)"/><text x="26" y="${y(tick * step) + 4}" text-anchor="end">${tick * step}</text>`).join("")}
    <g class="trend-ink">
      <g data-chart-series="n">
        <polygon class="trend-area" points="${x(0)},147 ${path("n")} ${x(months.length - 1)},147" fill="var(--primary-soft)"/>
        ${series("n", "var(--primary)")}
      </g>
      <g data-chart-series="done">${series("done", "#416b98", "6 5")}</g>
    </g>
    ${months.map((m, i) => `<text x="${x(i)}" y="168" text-anchor="middle">${m.label}</text>`).join("")}
  </svg><div class="stats-legend" aria-label="Series de evolución">
    <button type="button" class="chart-toggle" data-series-toggle="n" aria-pressed="true">Ingresados</button>
    <button type="button" class="chart-toggle" data-series-toggle="done" aria-pressed="true">Resueltos</button>
  </div>`;
}

function statusChart(statuses, total) {
  let offset = 0;
  const slices = statuses.filter(({ n }) => n > 0).map(({ key, label, color, n }) => {
    const share = n / total * 100;
    const slice = `<circle data-status-slice="${key}" ${chartMark(`${label} · ${n} (${Math.round(share)} %)`)} cx="62" cy="62" r="48" pathLength="100" fill="none" stroke="${color}" stroke-width="13"
      stroke-dashoffset="${-offset}" style="--arc-share:${share};--arc-delay:${CHART_LEAD_MS + Math.round(offset * 16)}ms;--arc-duration:${Math.max(75, Math.round(share * 16))}ms"></circle>`;
    offset += share;
    return slice;
  }).join("");
  return `<div class="status-chart-body">
    <svg class="status-donut" data-chart-plot viewBox="0 0 124 124" role="group" aria-label="${statuses.map((item) => `${item.label}: ${item.n}`).join(". ")}">
      <circle cx="62" cy="62" r="48" fill="none" stroke="var(--line)" stroke-width="13"/>
      <g class="donut-slices" transform="rotate(-90 62 62)">${slices}</g>
      <text class="donut-count" x="62" y="60" text-anchor="middle" data-total="${total}">${total}</text><text class="donut-caption" x="62" y="78" text-anchor="middle">reclamos</text>
    </svg>
    <ul class="chart-legend">${statuses.map(({ key, label, color, n }) => `<li><button type="button" class="chart-toggle status-toggle" data-status-toggle="${key}" data-count="${n}" aria-pressed="false" ${n === 0 ? "disabled" : ""}><i style="--series:${color}"></i><span>${label}</span><strong>${n}</strong></button></li>`).join("")}</ul>
  </div>`;
}

function neighborhoodBar(label, states, max, rowDelay) {
  let elapsed = rowDelay;
  return states.filter((state) => state.n > 0).map((state) => {
    const width = state.n / max;
    const duration = Math.max(80, Math.round(width * 1280));
    const segment = `<span class="stacked-segment" ${chartMark(`${label} · ${state.label}: ${state.n}`)} style="--series:${state.color};width:${width * 100}%;--segment-delay:${elapsed}ms;--segment-duration:${duration}ms"></span>`;
    elapsed += duration;
    return segment;
  }).join("");
}

function renderEstadisticas() {
  const { params } = getRoute();
  const period = params.get("periodo") === "30" ? "30" : "180";
  const barrio = Object.hasOwn(BARRIOS, params.get("barrio")) ? params.get("barrio") : "";
  const now = new Date();
  const since = period === "30"
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29)
    : new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const firstMonth = (now.getFullYear() - since.getFullYear()) * 12 + now.getMonth() - since.getMonth();
  const claims = state.claims.filter((c) => (!barrio || c.barrio === barrio) && new Date(c.fecha + "T23:59:59") >= since);
  const byStatus = (items) => CHART_STATES.map((status) => ({ ...status, n: items.filter((c) => c.estado === status.key).length }));
  const statuses = byStatus(claims);
  const resueltos = statuses.find(({ key }) => key === "resuelto").n;
  const porcentaje = claims.length ? Math.round(resueltos * 100 / claims.length) : 0;
  const byCat = Object.entries(REPORT_CATEGORIES).map(([key, c]) => ({ ...c, n: claims.filter((x) => x.categoria === key).length })).sort((a, b) => b.n - a.n);
  const maxCat = Math.max(1, byCat[0].n);
  const byBarrio = (barrio ? [barrio] : Object.keys(BARRIOS)).map((label) => {
    const items = claims.filter((c) => c.barrio === label);
    return { label, n: items.length, states: byStatus(items) };
  }).sort((a, b) => b.n - a.n);
  const maxBarrio = Math.max(1, byBarrio[0].n);
  const months = [];
  for (let i = firstMonth; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const cohort = claims.filter((c) => c.fecha.startsWith(key));
    months.push({ label: MESES[d.getMonth()], n: cohort.length, done: cohort.filter((c) => c.estado === "resuelto").length });
  }

  return `<section class="section dashboard"><div class="container">
    <div class="section-head dashboard-head"><div><span class="section-kicker">Vicente López · En números</span><h2>Estadísticas de reclamos</h2><p>Consultá qué se reporta, dónde y cómo avanzan los reclamos.</p></div>
      <div class="stats-filters">
        <label class="stats-period">Período <select class="input" id="statsPeriod"><option value="180">Últimos 6 meses</option><option value="30" ${period === "30" ? "selected" : ""}>Últimos 30 días</option></select></label>
        <label class="stats-period">Barrio <select class="input" id="statsBarrio"><option value="">Todos los barrios</option>${Object.keys(BARRIOS).map((label) => `<option ${label === barrio ? "selected" : ""}>${esc(label)}</option>`).join("")}</select></label>
      </div>
    </div>
    <div class="kpi-grid report-kpis">
      <div class="kpi"><div class="l">Reclamos recibidos</div><div class="n">${claims.length}</div></div>
      <div class="kpi"><div class="l">Resueltos</div><div class="n">${resueltos} <small>${porcentaje}% del total</small></div></div>
      <div class="kpi"><div class="l">En gestión</div><div class="n">${claims.length - resueltos}</div></div>
    </div>
    ${claims.length ? "" : '<p class="dashboard-note" role="status">Todavía no hay reclamos para esta selección.</p>'}
    <div class="stats-grid dashboard-grid" id="stats-charts">
      <article class="panel panel-pad chart-panel chart-pending"><h3 tabindex="-1">Evolución de reclamos</h3><p class="muted">Ingresados y actualmente resueltos, por mes de publicación.</p>${trendChart(months)}</article>
      <article class="panel panel-pad chart-panel chart-pending"><h3>Estado de los reclamos</h3><p class="muted">Elegí un estado para destacarlo.</p>${statusChart(statuses, claims.length)}</article>
      <article class="panel panel-pad chart-panel chart-pending"><h3>Por categoría</h3><p class="muted">Los temas que más reportaron los vecinos.</p>
        <div class="bars" data-chart-plot>${byCat.map((c, i) => `<div class="bar-row"><span class="nm">${c.label}</span><span class="bar-track" ${chartMark(`${c.label} · ${c.n} ${c.n === 1 ? "reclamo" : "reclamos"}`)}><i class="chart-bar" style="--c:${c.color};width:${c.n / maxCat * 100}%;--chart-delay:${CHART_LEAD_MS + i * 62}ms"></i></span><span class="val chart-value" style="--value-delay:${CHART_LEAD_MS + 970 + i * 62}ms">${c.n}</span></div>`).join("")}</div>
      </article>
      <article class="panel panel-pad chart-panel chart-pending"><h3>Por barrio</h3><p class="muted">Volumen de reclamos y avance en cada barrio.</p>
        <div class="bars" data-chart-plot>${byBarrio.map(({ label, n, states }, i) => `<div class="bar-row"><span class="nm">${esc(label)}</span><span class="bar-track stacked-track" role="group" aria-label="${states.map((st) => `${st.label}: ${st.n}`).join(". ")}">
          <span class="stacked-fill">${neighborhoodBar(label, states, maxBarrio, CHART_LEAD_MS + i * 62)}</span>
        </span><span class="val">${n}</span></div>`).join("")}</div>
        <ul class="chart-legend chart-legend-inline">${CHART_STATES.map(({ label, color }) => `<li><i style="--series:${color}"></i><span>${label}</span></li>`).join("")}</ul>
      </article>
    </div>
  </div></section>`;
}

const PETITION_AREAS = {
  seguridad: "Área de Seguridad",
  infraestructura: "Área de Obras Públicas",
  alumbrado: "Área de Alumbrado Público",
  espacios_verdes: "Área de Espacios Verdes",
  desagues: "Área de Desagües",
  transito: "Área de Tránsito y Señalización",
  limpieza: "Área de Limpieza Urbana",
};

function petitionArea(c) {
  return c.peticionEnviada?.area || PETITION_AREAS[c.categoria] || "Área de Atención Vecinal";
}

function letterText(c) {
  if (c.peticionEnviada) return c.peticionEnviada.texto;
  return `Vicente López, ${fmtDate(new Date().toISOString().slice(0, 10))}

Al equipo de ${petitionArea(c)} del Municipio de Vicente López

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
  const { params } = getRoute();
  const pending = params.get("grupo") === "en-camino";
  const ordered = [...state.claims].sort((a, b) => b.apoyos - a.apoyos);
  const readyCount = ordered.filter((claim) => claim.apoyos >= THRESHOLD).length;
  const list = ordered.filter((claim) => (claim.apoyos < THRESHOLD) === pending);
  const { page, navigation } = claimPagination(list, "peticiones", params, 8);
  return `<section class="section"><div class="container">
    <div class="section-head"><div><span class="eyebrow">${icon("users", 15)} Participación ciudadana</span><h1>Peticiones colectivas</h1>
      <p>Con ${THRESHOLD} apoyos, un reclamo habilita una carta al área responsable de su categoría.</p></div></div>
    <nav class="chipbar petition-tabs" aria-label="Grupos de peticiones">
      <a class="btn ${pending ? "btn-ghost" : "btn-primary"}" href="#/peticiones" ${pending ? "" : 'aria-current="page"'}>Habilitadas · ${readyCount}</a>
      <a class="btn ${pending ? "btn-primary" : "btn-ghost"}" href="#/peticiones?grupo=en-camino" ${pending ? 'aria-current="page"' : ""}>En camino · ${ordered.length - readyCount}</a>
    </nav>
    <div id="claim-results" tabindex="-1"><h2>${pending ? "En camino a la meta" : "Peticiones habilitadas"}</h2>
      ${page.length ? page.map((claim) => {
        const pct = Math.min(100, Math.round(claim.apoyos / THRESHOLD * 100));
        return `<article class="petition-card ${pending ? "" : "ready"}"><div>
          <div class="petition-badges">${catChip(claim.categoria)}${statusBadge(claim.estado)}</div>
          <h3>${esc(claim.titulo)}</h3><p class="muted">${esc(claim.barrio)} · ${esc(claim.direccion)}</p>
          ${pending ? "" : `<p class="muted">${claim.peticionEnviada ? '<span class="badge badge-verified">Enviada</span> a' : "Destinatario"} ${esc(petitionArea(claim))}</p>`}
          <div class="pbar" style="--c:${CATEGORY_COLOR}"><div class="progress"><i style="width:${pct}%"></i></div>
          <div class="pmeta"><span>${claim.apoyos} apoyos</span><span>${pending ? "Faltan " + (THRESHOLD - claim.apoyos) : "Meta alcanzada"}</span></div></div></div>
          <div class="petition-actions">${pending ? "" : `<button class="btn btn-primary btn-sm" data-action="letter" data-id="${esc(claim.id)}">${icon("doc", 16)} Ver carta</button>`}
          <a class="btn btn-ghost btn-sm" href="#/reclamo/${esc(claim.id)}">${pending ? "Ver y apoyar" : "Ver reclamo"}</a></div></article>`;
      }).join("") : '<div class="empty">Todavía no hay iniciativas en esta sección.</div>'}
      ${navigation}
    </div>
  </div></section>`;
}

/* ---------------- Router ---------------- */
function getRoute() {
  const raw = location.hash.slice(1) || "/";
  const [path, qs] = raw.split("?");
  return { parts: path.split("/").filter(Boolean), params: new URLSearchParams(qs || "") };
}

const chartObserver = new IntersectionObserver((entries, observer) => {
  if (document.hidden) return;
  for (const entry of entries) {
    if (!entry.isIntersecting || entry.intersectionRatio < .4) continue;
    entry.target.closest(".chart-panel").classList.replace("chart-pending", "is-chart-visible");
    observer.unobserve(entry.target);
  }
}, { rootMargin: "-58px 0px 0px", threshold: .4 });

function observePendingCharts() {
  if (document.hidden) return;
  document.querySelectorAll("#app .chart-pending [data-chart-plot]").forEach((plot) => {
    chartObserver.unobserve(plot);
    chartObserver.observe(plot);
  });
}

const civicObserver = new IntersectionObserver((entries, observer) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add("is-revealed");
    observer.unobserve(entry.target);
  }
}, { threshold: .12 });

function playViewEffects() {
  observePendingCharts();
  document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((item) => civicObserver.observe(item));
  document.querySelector("#app .is-success-pending")?.classList.replace("is-success-pending", "is-success-playing");
}

function render({ deferMotion = false, fallbackTransition = false } = {}) {
  cancelAddressSearch();
  chartObserver.disconnect();
  civicObserver.disconnect();
  liveMaps.splice(0).forEach((map) => map.destroy());
  mapConfigs.length = 0;
  const { parts } = getRoute();
  const view = parts[0] || "home";
  let html = "";
  switch (view) {
    case "home": html = renderHome(); break;
    case "reclamos": html = renderReclamos(); break;
    case "ver-reclamos": html = renderVerReclamos(); break;
    case "contacto": html = renderContacto(); break;
    case "novedades": html = renderNovedades(); break;
    case "preguntas": html = renderAyuda(false); break;
    case "terminos": html = renderAyuda(true); break;
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
  const app = document.getElementById("app");
  const queueScroll = app.querySelector(".municipal-list")?.scrollTop || 0;
  app.classList.toggle("view-arriving", fallbackTransition);
  app.dataset.path = location.hash.split("?")[0] || "#/";
  hideChartTooltip();
  hideButtonTooltip();
  releaseEvidenceURLs();
  app.innerHTML = html;
  updateImpactCards(app);
  loadEvidenceFiles(app);
  loadMunicipalNews(app);
  const queue = app.querySelector(".municipal-list");
  const selected = queue?.querySelector("a[aria-current]");
  if (selected) {
    queue.scrollTop = queueScroll;
    if (selected.offsetTop < queue.scrollTop || selected.offsetTop + selected.offsetHeight > queue.scrollTop + queue.clientHeight) {
      queue.scrollTop = selected.offsetTop - 12;
    }
  }
  app.querySelectorAll("[data-claim-map]").forEach((stage) => {
    liveMaps.push(new ClaimMap(stage, mapConfigs[Number(stage.dataset.claimMap)]));
  });
  updateShell(view);
  if (!deferMotion) playViewEffects();
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

function accountNotifications() {
  if (!state.session.logged || state.session.novedades === false) return [];
  return state.notifications.filter((n) => (n.recipient || getClaim(n.ref)?.owner) === state.session.email);
}

function saveProfile() {
  const { logged, remember, role, ...profile } = state.session;
  try {
    if (remember === false) sessionStorage.setItem(SESSION_KEY, JSON.stringify(state.session));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch { /* storage may be unavailable */ }
  if (!hasMunicipalAccess()) {
    state.profiles = state.profiles.filter((p) => p.email !== profile.email);
    state.profiles.push(profile);
  }
  save();
}

function loginDemo(email, nombre, details = {}, remember = true) {
  if (email.toLowerCase() === ADMIN_EMAIL) {
    toast("Ese correo está reservado para la cuenta administradora.");
    return;
  }
  const knownEmail = state.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase())?.email
    || state.claims.find((c) => c.owner?.toLowerCase() === email.toLowerCase())?.owner;
  email = knownEmail || email.toLowerCase();
  state.session = { logged: true, email, nombre: nombre || email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) };
  Object.assign(state.session, state.profiles.find((p) => p.email === email), details, { remember });
  delete state.session.role;
  finishLogin("#/");
}

function finishLogin(defaultRoute) {
  saveProfile();
  const { params } = getRoute();
  const next = params.get("next");
  location.hash = next && next.startsWith("#") ? next : defaultRoute;
  toast("¡Bienvenido/a, " + state.session.nombre + "!");
}

const mobileSidenav = matchMedia("(max-width:900px)");
let sidenavTouch;

document.addEventListener("touchstart", (event) => {
  sidenavTouch = null;
  if (!mobileSidenav.matches || event.touches.length !== 1) return;
  const open = document.body.classList.contains("sidenav-open");
  const { clientX, clientY } = event.touches[0];
  if (open ? !event.target.closest("#sidenav") : clientX > 44 || event.target.closest(".topbar, .claim-map")) return;
  sidenavTouch = { x: clientX, y: clientY, open };
}, { passive: true });

document.addEventListener("touchmove", (event) => {
  if (!sidenavTouch || sidenavTouch.open || !event.cancelable) return;
  const { x, y } = sidenavTouch;
  const { clientX, clientY } = event.touches[0];
  const dx = clientX - x;
  const dy = Math.abs(clientY - y);
  if (dy > 12 && dy >= Math.abs(dx)) sidenavTouch = null;
  else if (dx >= 12 && dx > dy * 1.5) event.preventDefault();
}, { passive: false });

document.addEventListener("touchend", (event) => {
  if (!sidenavTouch) return;
  const { x, y, open } = sidenavTouch;
  sidenavTouch = null;
  const { clientX, clientY } = event.changedTouches[0];
  const delta = (clientX - x) * (open ? -1 : 1);
  if (delta >= 55 && delta > Math.abs(clientY - y) * 1.5) {
    if (event.cancelable) event.preventDefault();
    setSidenav(!open);
  }
}, { passive: false });
document.addEventListener("touchcancel", () => { sidenavTouch = null; }, { passive: true });

const menuButton = document.getElementById("menuToggle");
menuButton.addEventListener("touchend", (event) => {
  if (!mobileSidenav.matches || !event.cancelable || event.changedTouches.length !== 1) return;
  const { clientX, clientY } = event.changedTouches[0];
  const { left, right, top, bottom } = menuButton.getBoundingClientRect();
  if (clientX < left || clientX > right || clientY < top || clientY > bottom) return;
  event.preventDefault();
  toggleSidenav();
}, { passive: false });

function setSidenav(open) {
  const activeClass = mobileSidenav.matches ? "sidenav-open" : "sidenav-pinned";
  document.body.classList.toggle(activeClass, open);
  menuButton.setAttribute("aria-expanded", String(open));
  document.getElementById("sidenav").inert = mobileSidenav.matches && !open;
  document.querySelector(".content").inert = mobileSidenav.matches && open;
}

function toggleSidenav() {
  const activeClass = mobileSidenav.matches ? "sidenav-open" : "sidenav-pinned";
  setSidenav(!document.body.classList.contains(activeClass));
}

function resetSidenav() {
  document.body.classList.remove("sidenav-open", "sidenav-pinned");
  setSidenav(false);
}

function supportClaim(id) {
  if (!requireLogin(location.hash)) return;
  const c = getClaim(id);
  if (!c || ownSupports().includes(id)) return;
  c.apoyos++;
  state.supported[state.session.email] = [...ownSupports(), id];
  state.notifications.unshift({ id: "n" + Date.now(), tipo: "apoyo", recipient: state.session.email, titulo: "Apoyo registrado", texto: `Apoyaste "${c.titulo}".`, fecha: new Date().toISOString().slice(0, 10), leida: false, ref: c.id });
  save(); render(); toast("¡Gracias! Tu apoyo quedó registrado.");
}

function deleteOwnClaim(id, dialog) {
  const claim = getClaim(id);
  if (!dialog?.open || !ownsClaim(claim)) return;
  const previous = state;
  state = {
    ...state,
    claims: state.claims.filter((item) => item.id !== id),
    notifications: state.notifications.filter((notice) => notice.ref !== id),
    supported: Object.fromEntries(Object.entries(state.supported).map(([email, ids]) => [email, ids.filter((item) => item !== id)])),
  };
  try {
    persist();
  } catch {
    state = previous;
    dialog.querySelector(".claim-delete-error").textContent = "No se pudo guardar el borrado. Volvé a intentarlo.";
    return;
  }
  dialog.close();
  if (claim.evidenciaMedia) removeEvidenceFile(claim.evidenciaMedia);
  location.hash = "#/mis-reclamos";
  toast("Reclamo borrado.");
}

function openLetter(id) {
  const c = getClaim(id);
  if (!c || c.apoyos < THRESHOLD) return;
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="letterTitle">
    <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start"><div><h3 id="letterTitle">Carta al área responsable</h3><p class="muted" style="margin:0 0 14px;font-size:.86rem">${c.peticionEnviada ? "Enviada a " + esc(petitionArea(c)) + " · " + fmtDate(c.peticionEnviada.fecha) : esc(petitionArea(c))}</p></div><button class="btn btn-ghost btn-sm" data-action="close-modal" aria-label="Cerrar">${icon("close", 16)}</button></div>
    <div class="letter">${esc(letterText(c))}</div>
    <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap"><button class="btn btn-ghost btn-sm" data-action="copy-letter" data-id="${esc(c.id)}">${icon("doc", 16)} Copiar carta</button>
    ${c.peticionEnviada ? "" : `<button class="btn btn-primary btn-sm" data-action="send-letter" data-id="${esc(c.id)}">Enviar al área</button>`}</div>
    <div class="letter-send-status" role="status"></div>
    <p class="hint">El envío se registra en AvisAR como parte de la demostración.</p>
  </div>`;
  document.body.appendChild(backdrop);
  requestAnimationFrame(() => backdrop.classList.add("show"));
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(backdrop); });
}

function sendPetition(id, backdrop) {
  const claim = getClaim(id);
  if (!claim || claim.apoyos < THRESHOLD || claim.peticionEnviada) return;
  if (!requireLogin(location.hash)) {
    closeModal(backdrop);
    return;
  }
  claim.peticionEnviada = {
    area: petitionArea(claim),
    fecha: new Date().toISOString().slice(0, 10),
    texto: letterText(claim),
  };
  try {
    persist();
  } catch {
    delete claim.peticionEnviada;
    toast("No se pudo guardar el envío.");
    return;
  }
  const button = backdrop.querySelector('[data-action="send-letter"]');
  button.setAttribute("aria-disabled", "true");
  button.textContent = "Enviada";
  const status = backdrop.querySelector(".letter-send-status");
  status.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12 5 5L20 6" pathLength="100"/></svg>
    <span><strong>Carta enviada</strong><br>Destinatario: ${esc(claim.peticionEnviada.area)} · ${fmtDate(claim.peticionEnviada.fecha)}</span>`;
  render();
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

const chartTooltip = document.getElementById("chart-tooltip");
let chartTarget;

function hideChartTooltip() {
  chartTarget?.classList.remove("is-chart-hovered");
  chartTarget = null;
  chartTooltip.hidden = true;
}

function showChartTooltip(target, x, y) {
  if (!target || !target.closest(".is-chart-visible")) return;
  if (target !== chartTarget) {
    hideChartTooltip();
    chartTarget = target;
    target.classList.add("is-chart-hovered");
    chartTooltip.textContent = target.dataset.chartValue;
    chartTooltip.hidden = false;
  }
  const { offsetWidth: width, offsetHeight: height } = chartTooltip;
  chartTooltip.style.left = Math.max(8, Math.min(x - width / 2, innerWidth - width - 8)) + "px";
  chartTooltip.style.top = (y - height - 12 >= 8 ? y - height - 12 : y + 12) + "px";
}

document.addEventListener("pointerover", (event) => {
  const target = event.target.closest("[data-chart-value]");
  showChartTooltip(target, event.clientX, event.clientY);
});
document.addEventListener("pointerout", (event) => {
  if (chartTarget?.contains(event.target) && !chartTarget.contains(event.relatedTarget)) hideChartTooltip();
});
document.addEventListener("focusin", (event) => {
  const target = event.target.closest("[data-chart-value]");
  if (!target) return;
  const box = target.getBoundingClientRect();
  showChartTooltip(target, box.left + box.width / 2, box.top);
});
document.addEventListener("focusout", (event) => {
  if (event.target === chartTarget) hideChartTooltip();
});
document.addEventListener("scroll", hideChartTooltip, { capture: true, passive: true });
window.addEventListener("resize", hideChartTooltip);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideChartTooltip();
});

const buttonTooltip = document.getElementById("button-tooltip");
const tooltipControls = "button, .btn, .icon-btn, .chipbtn, .page-link[href], .snav-item, .user-chip";
let tooltipControl;
let tooltipTimer;

function hideButtonTooltip() {
  clearTimeout(tooltipTimer);
  tooltipControl = null;
  buttonTooltip.hidden = true;
}

function scheduleButtonTooltip(control) {
  if (!control || control === tooltipControl || control.disabled) return;
  hideButtonTooltip();
  const nativeTitle = control.getAttribute("title");
  if (nativeTitle) {
    control.dataset.tooltip ||= nativeTitle;
    control.removeAttribute("title");
  }
  const label = control.dataset.tooltip || control.getAttribute("aria-label") || control.textContent.trim().replace(/\s+/g, " ");
  if (!label) return;
  tooltipControl = control;
  tooltipTimer = setTimeout(() => {
    if (!control.isConnected) return;
    const rect = control.getBoundingClientRect();
    buttonTooltip.textContent = label;
    buttonTooltip.hidden = false;
    const { offsetWidth: width, offsetHeight: height } = buttonTooltip;
    buttonTooltip.style.left = clamp(rect.left + (rect.width - width) / 2, 8, innerWidth - width - 8) + "px";
    buttonTooltip.style.top = (rect.top - height - 9 >= 8 ? rect.top - height - 9 : rect.bottom + 9) + "px";
  }, 430);
}

document.addEventListener("pointerover", (event) => {
  if (event.pointerType === "mouse" || event.pointerType === "pen") scheduleButtonTooltip(event.target.closest(tooltipControls));
});
document.addEventListener("pointerout", (event) => {
  if (tooltipControl?.contains(event.target) && !tooltipControl.contains(event.relatedTarget)) hideButtonTooltip();
});
document.addEventListener("focusin", (event) => {
  if (event.target.matches(":focus-visible")) scheduleButtonTooltip(event.target.closest(tooltipControls));
});
document.addEventListener("focusout", (event) => {
  if (event.target === tooltipControl) hideButtonTooltip();
});
document.addEventListener("pointerdown", hideButtonTooltip, { passive: true });
document.addEventListener("scroll", hideButtonTooltip, { capture: true, passive: true });
window.addEventListener("resize", hideButtonTooltip);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideButtonTooltip();
});

function toggleChartSeries(button) {
  const chart = button.closest(".chart-panel");
  const active = button.getAttribute("aria-pressed") === "true";
  if (active && chart.querySelectorAll('[data-series-toggle][aria-pressed="true"]').length === 1) return;
  button.setAttribute("aria-pressed", String(!active));
  chart.querySelector(`[data-chart-series="${button.dataset.seriesToggle}"]`).classList.toggle("is-muted", active);
}

function highlightChartStatus(button) {
  const chart = button.closest(".chart-panel");
  const active = button.getAttribute("aria-pressed") === "true";
  const status = active ? "" : button.dataset.statusToggle;
  chart.querySelectorAll("[data-status-toggle]").forEach((item) => {
    item.setAttribute("aria-pressed", String(item.dataset.statusToggle === status));
  });
  chart.querySelectorAll("[data-status-slice]").forEach((slice) => {
    slice.classList.toggle("is-muted", Boolean(status) && slice.dataset.statusSlice !== status);
  });
  const count = chart.querySelector(".donut-count");
  count.textContent = status ? button.dataset.count : count.dataset.total;
}

/* ---------------- Eventos: click ---------------- */
document.addEventListener("click", (e) => {
  const t = e.target;
  const place = t.closest("[data-place]");
  if (place) {
    const slider = place.closest(".place-slider");
    const slides = [...slider.querySelectorAll(".place-slide")];
    const current = slides.findIndex((slide) => !slide.hidden);
    const next = (current + Number(place.dataset.place) + slides.length) % slides.length;
    slides[current].hidden = true;
    slides[next].hidden = false;
    slider.querySelector(".place-position").textContent = `${next + 1} de ${slides.length}`;
    return;
  }
  const mapCategory = t.closest("[data-map-category]");
  if (mapCategory) { setMapFilter("cat", mapCategory.dataset.mapCategory); return; }
  if (t.closest('[data-action="find-address"]')) { findDraftAddress(); return; }
  const seriesToggle = t.closest("[data-series-toggle]");
  if (seriesToggle) { toggleChartSeries(seriesToggle); return; }
  const statusToggle = t.closest("[data-status-toggle]");
  if (statusToggle) { highlightChartStatus(statusToggle); return; }
  if (t.closest("#menuToggle")) { toggleSidenav(); return; }
  if (t.closest("#sidenavBackdrop")) { setSidenav(false); return; }
  if (t.closest(".snav-item") && mobileSidenav.matches) setSidenav(false);

  const openDelete = t.closest('[data-action="open-delete-claim"]');
  if (openDelete) {
    if (ownsClaim(getClaim(openDelete.dataset.id))) document.getElementById("claim-delete-dialog").showModal();
    return;
  }
  const confirmDelete = t.closest('[data-action="confirm-delete-claim"]');
  if (confirmDelete) {
    deleteOwnClaim(confirmDelete.dataset.id, confirmDelete.closest("dialog"));
    return;
  }
  const supportBtn = t.closest('[data-action="support"]');
  if (supportBtn) { supportClaim(supportBtn.dataset.id); return; }
  const letterBtn = t.closest('[data-action="letter"]');
  if (letterBtn) { openLetter(letterBtn.dataset.id); return; }
  const sendLetter = t.closest('[data-action="send-letter"]');
  if (sendLetter) { sendPetition(sendLetter.dataset.id, sendLetter.closest(".modal-backdrop")); return; }
  const copyBtn = t.closest('[data-action="copy-letter"]');
  if (copyBtn) { const c = getClaim(copyBtn.dataset.id); if (c) copyText(letterText(c)); return; }
  if (t.closest('[data-action="close-modal"]')) { closeModal(t); return; }
  if (t.closest('[data-action="demo-social"]')) {
    const remember = document.querySelector('[name="remember"]');
    loginDemo("vecino.demo@avisar.gob.ar", "Vecino", {}, remember?.checked ?? true);
    return;
  }
  if (t.closest('[data-action="logout"]')) {
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* storage may be unavailable */ }
    state.session = { logged: false, email: "", nombre: "" }; save(); render(); toast("Cerraste sesión."); return; }
  if (t.closest('[data-action="forgot"]')) { toast("La recuperación por correo no está habilitada."); return; }
  if (t.closest('[data-action="mark-all"]')) { accountNotifications().forEach((n) => (n.leida = true)); save(); render(); toast("Notificaciones marcadas como leídas."); return; }

  const deleteNotice = t.closest('[data-action="delete-notification"], [data-action="delete-all-notifications"]');
  if (deleteNotice) {
    const notices = accountNotifications();
    const id = deleteNotice.dataset.id;
    const removing = notices.filter((notice) => !id || notice.id === id);
    state.notifications = state.notifications.filter((notice) => !removing.includes(notice));
    save();
    render();
    document.getElementById("notification-title").focus({ preventScroll: true });
    toast(id ? "Notificación eliminada." : "Bandeja vaciada.");
    return;
  }

  const notif = t.closest(".notif-item");
  if (notif) { const n = state.notifications.find((x) => x.id === notif.dataset.id); if (n && !n.leida) { n.leida = true; save(); } }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "descripcion") {
    const counter = document.getElementById("claimCharCount");
    if (counter) counter.textContent = `${event.target.value.length} / 500`;
    return;
  }
  if (event.target.id !== "draftAddress") return;
  clearAddressResults();
  if (event.target.value.trim() === draftAddress) return;
  draftAddress = "";
  draftPicked = false;
  const pin = document.getElementById("draftPin");
  if (pin) pin.hidden = true;
  const label = document.getElementById("draftBarrio");
  if (label) label.innerHTML = draftLocationLabel();
});

/* ---------------- Eventos: change ---------------- */
document.addEventListener("change", (e) => {
  if (e.target.id === "mapStatus") setMapFilter("estado", e.target.value);
  if (e.target.id === "statsPeriod" || e.target.id === "statsBarrio") {
    const { params } = getRoute();
    const key = e.target.id === "statsPeriod" ? "periodo" : "barrio";
    if (e.target.value) params.set(key, e.target.value);
    else params.delete(key);
    location.hash = "#/estadisticas" + (params.size ? "?" + params.toString() : "");
  }
  if (e.target.id === "foto") {
    document.getElementById("uploadName").textContent = e.target.files[0]?.name || "Imagen o video · Hasta 1,2 MB · Opcional";
  }
  if (e.target.id === "categoria") {
    draftCat = e.target.value;
    const pin = document.getElementById("draftPin");
    if (pin) pin.innerHTML = pinSVG(draftCat);
  }
});

/* ---------------- Eventos: submit ---------------- */
document.addEventListener("submit", async (e) => {
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
    const categoria = data.get("categoria");
    if (!Object.hasOwn(REPORT_CATEGORIES, categoria)) { toast("Elegí una categoría."); return; }
    const titulo = String(data.get("titulo") || "").trim();
    if (!titulo || titulo.length > CLAIM_TITLE_LIMIT) {
      toast(`Escribí un título de hasta ${CLAIM_TITLE_LIMIT} caracteres.`);
      form.elements.titulo.focus();
      return;
    }
    const descripcion = String(data.get("descripcion") || "").trim();
    if (descripcion.length < 20) { toast("La descripción debe tener al menos 20 caracteres."); return; }
    if (!draftPicked || String(data.get("direccion") || "").trim() !== draftAddress) {
      toast("Buscá la dirección o elegí un punto en el mapa.");
      return;
    }
    const file = form.querySelector('input[type="file"]')?.files[0];
    if (file && (file.size > 1200000 || !/^(image|video)\//.test(file.type))) {
      toast("Elegí una imagen o un video de hasta 1,2 MB.");
      return;
    }
    const owner = state.session.email;
    const { lat, lng } = draftLatLng;
    const barrio = draftBarrio;
    const direccion = draftAddress || `${barrio} · ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
    const submit = form.querySelector('button[type="submit"]');
    if (submit.disabled) return;
    submit.disabled = true;
    readFileAsDataURL(file).then((foto) => {
      submit.disabled = false;
      if (!form.isConnected || owner !== state.session.email) return;
      if (file && !foto) { toast("No se pudo leer el archivo. Volvé a elegirlo."); return; }
      const id = "r" + Date.now();
      const claim = {
        id,
        numero: "F-" + (15300 + Math.floor(Math.random() * 700)),
        titulo,
        categoria, barrio, direccion,
        descripcion, fecha: new Date().toISOString().slice(0, 10), apoyos: 0, estado: "abierto",
        verificado: false, evidencia: "", foto, owner, comentarios: [],
        lat, lng,
      };
      state.claims.unshift(claim);
      state.notifications.unshift({ id: "n" + Date.now(), tipo: "sistema", titulo: "Reclamo enviado", texto: `Tu reclamo #${claim.numero} fue publicado en el mapa.`, fecha: claim.fecha, leida: false, ref: id });
      try {
        persist();
      } catch {
        state.claims.shift();
        state.notifications.shift();
        toast("No se pudo guardar el reclamo. Probá con un archivo más chico.");
        return;
      }
      draftPicked = false;
      draftAddress = "";
      draftCat = "";
      draftLatLng = { lat: VL_CENTER[0], lng: VL_CENTER[1] };
      draftBarrio = nearestBarrio(draftLatLng.lat, draftLatLng.lng);
      location.hash = "#/enviado/" + id;
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
    loginDemo(email, undefined, { celular: String(data.get("celular") || "").trim() }); return;
  }

  if (kind === "perfil") {
    if (!state.session.logged) return;
    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    if (!nombre) { toast("Ingresá tu nombre."); return; }
    const previousEmail = state.session.email;
    const email = String(data.get("email") || "").trim().toLowerCase();
    if (email !== previousEmail && (email === ADMIN_EMAIL || hasMunicipalAccess())) {
      toast("El correo de la cuenta administradora está reservado.");
      return;
    }
    if (email !== previousEmail) {
      const emailInUse = state.profiles.some((p) => p.email.toLowerCase() === email && p.email !== previousEmail)
        || state.claims.some((c) => c.owner?.toLowerCase() === email && c.owner !== previousEmail);
      if (emailInUse) { toast("Ya existe una cuenta con ese correo."); return; }
      state.profiles = state.profiles.filter((p) => p.email !== previousEmail);
      if (Object.hasOwn(state.supported, previousEmail)) {
        state.supported[email] = state.supported[previousEmail];
        delete state.supported[previousEmail];
      }
      state.claims.forEach((c) => { if (c.owner === previousEmail) c.owner = email; });
      state.notifications.forEach((n) => { if (n.recipient === previousEmail) n.recipient = email; });
    }
    Object.assign(state.session, {
      email, nombre,
      barrio: data.get("barrio"),
      celular: String(data.get("celular") || "").trim(),
      novedades: data.has("novedades"),
      correo: data.has("correo"),
    });
    saveProfile(); render(); toast("Cambios guardados."); return;
  }

  if (kind === "login") {
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const pass = String(data.get("password") || "");
    if (email.toLowerCase() === ADMIN_EMAIL) {
      if (pass !== ADMIN_PASSWORD) { toast("Revisá el email y la contraseña."); return; }
      state.session = { logged: true, email: ADMIN_EMAIL, nombre: "Administración municipal", role: "municipal-admin", remember: data.has("remember") };
      finishLogin("#/municipal");
      return;
    }
    if (!email || pass.length < 4) { toast("Revisá el email y la contraseña."); return; }
    loginDemo(email, undefined, {}, data.has("remember")); return;
  }

  if ((kind === "municipal-search" || kind === "municipal") && !hasMunicipalAccess()) {
    toast("El panel requiere la cuenta administradora.");
    return;
  }

  if (kind === "municipal-search") {
    location.hash = municipalURL(form.dataset.queue, String(new FormData(form).get("q") || "").trim());
    return;
  }

  if (kind === "municipal") {
    const c = getClaim(form.dataset.id); if (!c) return;
    const submit = form.querySelector('button[type="submit"]');
    if (submit.disabled) return;
    const data = new FormData(form);
    const nuevoEstado = data.get("estado");
    const verificado = data.get("verificado") === "on";
    const evidencia = String(data.get("evidencia") || "").trim();
    const respuesta = String(data.get("respuesta") || "").trim();
    const file = form.querySelector("#evidence-file").files[0];
    const remove = data.has("removeEvidence");
    if (file && (file.size > EVIDENCE_LIMIT || !/^(image\/(png|jpeg|webp|gif)|video\/(mp4|webm|quicktime))$/.test(file.type))) {
      toast("Elegí una imagen PNG, JPEG, WebP o GIF, o un video MP4, WebM o MOV de hasta 15 MB.");
      return;
    }
    if (nuevoEstado === "resuelto" && !evidencia && !file && (remove || !(c.evidenciaFoto || c.evidenciaMedia))) {
      form.elements.evidencia.focus();
      toast("Para cerrar el reclamo, escribí un parte o adjuntá evidencia.");
      return;
    }
    submit.disabled = true;
    const fileKey = file ? c.id + "-" + (crypto.randomUUID?.() || Date.now()) : "";
    const today = new Date().toISOString().slice(0, 10);
    const updated = {
      ...c, estado: nuevoEstado, verificado, evidencia,
      evidenciaFoto: file || remove ? "" : c.evidenciaFoto,
      evidenciaMedia: fileKey || (remove ? "" : c.evidenciaMedia),
      fechaResolucion: nuevoEstado === "resuelto" ? c.fechaResolucion || today : "",
      comentarios: respuesta ? [...c.comentarios, { autor: "Municipio de Vicente López", texto: respuesta, fecha: today, muni: true }] : c.comentarios,
    };
    try {
      if (file) await evidenceTransaction("readwrite", (store) => store.put(file, fileKey));
      const index = state.claims.indexOf(c);
      if (!form.isConnected || index === -1 || !hasMunicipalAccess()) {
        if (fileKey) await removeEvidenceFile(fileKey);
        return;
      }
      state.claims[index] = updated;
      const notify = Boolean(c.owner);
      if (notify) state.notifications.unshift({ id: "n" + Date.now(), tipo: "municipio", recipient: c.owner, titulo: "Actualización del municipio", texto: `El municipio actualizó "${c.titulo}".`, fecha: today, leida: false, ref: c.id });
      try { persist(); }
      catch (error) {
        state.claims[index] = c;
        if (notify) state.notifications.shift();
        throw error;
      }
      if (c.evidenciaMedia && c.evidenciaMedia !== updated.evidenciaMedia) removeEvidenceFile(c.evidenciaMedia);
    } catch {
      if (fileKey) await removeEvidenceFile(fileKey);
      toast("No se pudo guardar la actualización. Revisá el espacio disponible e intentá de nuevo.");
      return;
    } finally {
      submit.disabled = false;
    }
    render(); toast("Actualización guardada.");
    return;
  }
});

/* ---------------- Init ---------------- */
let routeRevision = 0;
let routeTransition;

window.addEventListener("hashchange", (event) => {
  const revision = ++routeRevision;
  routeTransition?.skipTransition();
  routeTransition = undefined;
  const [oldPath, oldQuery] = new URL(event.oldURL).hash.split("?");
  const [path, query] = location.hash.split("?");
  const previous = new URLSearchParams(oldQuery);
  const current = new URLSearchParams(query);
  const app = document.getElementById("app");
  const viewChanged = app.dataset.path !== (path || "#/");
  if (!viewChanged && path === "#/mapa") {
    hideChartTooltip();
    hideButtonTooltip();
    updateMapView(previous, current);
    return;
  }
  const nav = document.getElementById("sidenav");
  const menuOverlaps = mobileSidenav.matches ? nav.getBoundingClientRect().right > 0
    : nav.matches(":hover, :has(:focus-visible)") || document.body.classList.contains("sidenav-pinned")
      || nav.getBoundingClientRect().width > app.getBoundingClientRect().left + 1;
  const useTransition = viewChanged && !mobileSidenav.matches && !menuOverlaps && typeof document.startViewTransition === "function";

  const update = () => {
    if (revision !== routeRevision) return;
    render({ deferMotion: useTransition, fallbackTransition: viewChanged && !useTransition });
    const isListPage = ["#/reclamos", "#/ver-reclamos", "#/peticiones"].includes(path);
    const pageChanged = isListPage && oldPath === path && previous.get("pagina") !== current.get("pagina");
    const editorSelected = mobileSidenav.matches && path === "#/municipal" && current.has("id") && previous.get("id") !== current.get("id");
    const target = pageChanged ? document.getElementById("claim-results")
      : editorSelected ? document.getElementById("municipal-editor-title") : null;
    if (target) {
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
    if (mobileSidenav.matches) setSidenav(false);
  };

  if (!useTransition) {
    update();
    return;
  }
  const transition = document.startViewTransition(update);
  routeTransition = transition;
  transition.ready.catch(() => {});
  const finish = () => {
    if (revision !== routeRevision) return;
    routeTransition = undefined;
    playViewEffects();
  };
  transition.finished.then(finish, finish);
});
document.addEventListener("visibilitychange", () => {
  if (!routeTransition) observePendingCharts();
});
mobileSidenav.addEventListener("change", resetSidenav);
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.target.id === "draftAddress") {
    event.preventDefault();
    findDraftAddress();
    return;
  }
  if (event.key === "Escape" && (document.body.classList.contains("sidenav-open") || document.body.classList.contains("sidenav-pinned"))) {
    setSidenav(false);
    document.getElementById("menuToggle").focus();
  }
});
resetSidenav();
render();
