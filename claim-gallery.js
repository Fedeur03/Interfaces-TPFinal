/* Adjuntos del reclamo. La primera foto también se usa en las listas y el mapa. */
const pendingClaimUploads = new Set();

// Mantener los videos fuera de localStorage evita su límite de unos pocos MB.
const CLAIM_VIDEO_PREFIX = "data:video/avisar;key=";
async function storeClaimVideo(file) {
  if (!file || file.size > CLAIM_FILE_MAX_BYTES) return "";
  const key = "claim-video-" + crypto.randomUUID();
  try {
    await evidenceTransaction("readwrite", store => store.put(file, key));
    return CLAIM_VIDEO_PREFIX + key;
  } catch {
    return "";
  }
}

function claimVideoAttributes(src) {
  return src.startsWith(CLAIM_VIDEO_PREFIX)
    ? `data-claim-video="${esc(src.slice(CLAIM_VIDEO_PREFIX.length))}"`
    : `src="${esc(src)}"`;
}

function loadClaimVideos() {
  document.querySelectorAll("video[data-claim-video]:not([data-loading])").forEach(async video => {
    video.dataset.loading = "true";
    try {
      const file = await evidenceTransaction("readonly", store => store.get(video.dataset.claimVideo));
      if (!file) throw new Error("Video no disponible");
      if (!video.isConnected) return;
      const url = URL.createObjectURL(file);
      evidenceURLs.add(url);
      video.src = url;
    } catch {
      if (video.isConnected) {
        const message = document.createElement("p");
        message.textContent = "No se pudo cargar el video guardado en este navegador.";
        video.replaceWith(message);
      }
    }
  });
}
new MutationObserver(loadClaimVideos).observe(document.body, { childList: true, subtree: true });

function attachedClaimMedia(claim) {
  return claimMediaItems(claim).map(item => item.src);
}

function validateClaimFiles(files, current = []) {
  if (files.some(file => file.size > CLAIM_FILE_MAX_BYTES || !/^(image|video)\//.test(file.type))) {
    toast("Elegí imágenes o videos de hasta 5 MB por archivo."); return false;
  }
  const images = current.filter(src => !src.startsWith("data:video/")).length;
  const videos = current.length - images;
  if (images + files.filter(file => file.type.startsWith("image/")).length > CLAIM_MAX_PHOTOS
    || videos + files.filter(file => file.type.startsWith("video/")).length > 1) {
    toast("Podés adjuntar hasta 5 fotos y un video por reclamo."); return false;
  }
  return true;
}

function claimGalleryMedia(claim) {
  const attached = attachedClaimMedia(claim);
  const reference = referencePhoto(claim);
  return attached.length && !claim.demo ? attached : reference ? [reference.src] : attached;
}

function claimGallery(claim, selected = 0) {
  const attached = attachedClaimMedia(claim);
  const media = claimGalleryMedia(claim);
  selected = Math.max(0, Math.min(selected, media.length - 1));
  const src = media[selected] || "";
  const video = src.startsWith("data:video/");
  const images = attached.filter((item) => !item.startsWith("data:video/")).length;
  const canDelete = ownsClaim(claim) && attached.includes(src)
    && (video ? attached.length > 1 : images > 1);
  const nav = media.length > 1 ? `<button type="button" class="claim-gallery-nav prev" data-gallery-step="-1" aria-label="Adjunto anterior">${icon("chevron-left", 22)}</button>
          <button type="button" class="claim-gallery-nav next" data-gallery-step="1" aria-label="Adjunto siguiente">${icon("chevron", 22)}</button>` : "";
  return `<div class="claim-gallery" data-gallery-id="${esc(claim.id)}" data-selected="${selected}">
    <div class="claim-gallery-layout">
      ${media.length ? `<div class="claim-gallery-thumbs" role="group" aria-label="Adjuntos del reclamo">
        ${media.map((item, index) => `<button type="button" class="claim-gallery-thumb" data-gallery-select="${index}"
          aria-label="${item.startsWith("data:video/") ? "Ver video" : "Ver imagen"} ${index + 1}"
          aria-pressed="${index === selected}">${item.startsWith("data:video/")
            ? icon("camera", 22) + '<span aria-hidden="true">▶</span>'
            : `<img src="${esc(item)}" alt="" loading="lazy">`}</button>`).join("")}
      </div>` : ""}
      <div class="claim-gallery-main">${video
        ? `<video ${claimVideoAttributes(src)} controls preload="metadata" aria-label="Video del reclamo"></video>`
        : src ? `<button type="button" class="claim-gallery-open" data-zoom-src="${esc(src)}" aria-label="Ampliar imagen del reclamo">
            <img src="${esc(src)}" alt="Imagen ${selected + 1} del reclamo">
            <span class="claim-gallery-zoom" aria-hidden="true">${icon("expand", 16)} Ampliar</span>
          </button>`
          : icon(catMeta(claim.categoria).icon, 64)}${nav}
      </div>
    </div>
    ${ownsClaim(claim) ? `<div class="claim-gallery-actions">
      <label class="btn btn-ghost btn-sm gallery-upload">${icon("plus", 16)} Agregar fotos o videos
        <input type="file" data-gallery-add multiple accept="image/*,video/*" aria-label="Agregar fotos o videos"
          ${pendingClaimUploads.has(claim.id) ? "disabled" : ""}>
      </label>
      ${attached.length ? `<button type="button" class="btn btn-ghost btn-sm" data-gallery-delete
        ${canDelete && !pendingClaimUploads.has(claim.id) ? "" : "disabled"}>${icon("limpieza", 16)} Borrar adjunto</button>` : ""}
    </div><p class="hint">Hasta 5 fotos y 1 video · 5 MB por archivo. Conservá al menos una imagen.</p>` : ""}
  </div>`;
}

function replaceClaimGallery(container, claim, selected) {
  container.outerHTML = claimGallery(claim, selected);
}

function selectClaimMedia(button) {
  const container = button.closest("[data-gallery-id]");
  const claim = getClaim(container.dataset.galleryId);
  if (!claim || pendingClaimUploads.has(claim.id)) return;
  const index = Number(button.dataset.gallerySelect);
  if (index === Number(container.dataset.selected)) return;
  const focus = document.activeElement === button;
  replaceClaimGallery(container, claim, index);
  if (focus) document.querySelector(`[data-gallery-select="${index}"]`)?.focus({ preventScroll: true });
}

function stepClaimMedia(button, delta) {
  const container = button.closest("[data-gallery-id]");
  if (!container) return;
  const id = container.dataset.galleryId;
  const claim = getClaim(id);
  if (!claim || pendingClaimUploads.has(claim.id)) return;
  const media = claimGalleryMedia(claim);
  if (media.length < 2) return;
  const current = Number(container.dataset.selected) || 0;
  const next = (current + delta + media.length) % media.length;
  const focus = document.activeElement === button;
  replaceClaimGallery(container, claim, next);
  if (focus) document.querySelector(`[data-gallery-id="${CSS.escape(id)}"] [data-gallery-step="${delta}"]`)?.focus({ preventScroll: true });
}

function saveClaimMedia(claim, media) {
  const old = { fotos: claim.fotos, foto: claim.foto, video: claim.video };
  claim.fotos = media.filter(src => !src.startsWith("data:video/"));
  claim.video = media.find(src => src.startsWith("data:video/")) || "";
  claim.foto = claim.fotos[0] || claim.video || "";
  try {
    persist();
    return true;
  } catch {
    if (old.fotos === undefined) delete claim.fotos;
    else claim.fotos = old.fotos;
    claim.foto = old.foto;
    claim.video = old.video;
    toast("No se pudieron guardar los adjuntos. Probá con archivos más chicos.");
    return false;
  }
}

document.addEventListener("click", (event) => {
  const step = event.target.closest("[data-gallery-step]");
  if (step) { stepClaimMedia(step, Number(step.dataset.galleryStep)); return; }
  const button = event.target.closest("[data-gallery-select]");
  if (button) { selectClaimMedia(button); return; }
  const remove = event.target.closest("[data-gallery-delete]");
  if (!remove || remove.disabled) return;
  const container = remove.closest("[data-gallery-id]");
  const claim = getClaim(container.dataset.galleryId);
  if (!ownsClaim(claim) || pendingClaimUploads.has(claim.id)) return;
  const attached = attachedClaimMedia(claim);
  const selected = Number(container.dataset.selected);
  const remaining = attached.filter((_, index) => index !== selected);
  if (remaining.length === attached.length || !remaining.some((src) => !src.startsWith("data:video/"))) return;
  if (!confirm("¿Borrar este adjunto del reclamo?")) return;
  if (saveClaimMedia(claim, remaining)) {
    replaceClaimGallery(container, claim, Math.min(selected, remaining.length - 1));
    toast("Adjunto eliminado.");
  }
});

document.addEventListener("pointerover", (event) => {
  const button = event.target.closest("[data-gallery-select]");
  if (button && event.pointerType === "mouse") selectClaimMedia(button);
});

document.addEventListener("change", async (event) => {
  const input = event.target.closest("[data-gallery-add]");
  if (!input) return;
  const container = input.closest("[data-gallery-id]");
  const claim = getClaim(container.dataset.galleryId);
  const files = Array.from(input.files);
  input.value = "";
  if (!files.length || !ownsClaim(claim) || pendingClaimUploads.has(claim.id)) return;
  const previous = attachedClaimMedia(claim);
  if (!validateClaimFiles(files, previous)) return;
  pendingClaimUploads.add(claim.id);
  input.disabled = true;
  try {
    const result = await readClaimMedia(files);
    const added = [...result.fotos, ...(result.video ? [result.video] : [])];
    if (!container.isConnected || !ownsClaim(claim) || getClaim(claim.id) !== claim) return;
    if (added.length !== files.length) { toast("No se pudo leer uno de los archivos."); return; }
    if (saveClaimMedia(claim, [...previous, ...added])) {
      pendingClaimUploads.delete(claim.id);
      replaceClaimGallery(container, claim, previous.length);
      toast("Adjuntos guardados.");
    }
  } catch {
    toast("No se pudieron procesar los adjuntos. Intentá nuevamente.");
  } finally {
    pendingClaimUploads.delete(claim.id);
    input.disabled = false;
  }
});
