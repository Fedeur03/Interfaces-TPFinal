/* Los archivos municipales se guardan como blobs en IndexedDB. */
const EVIDENCE_LIMIT = 15 * 1024 * 1024;
let evidenceDatabase;
const evidenceURLs = new Set();

function openEvidenceDatabase() {
  if (!evidenceDatabase) {
    evidenceDatabase = new Promise((resolve, reject) => {
      const request = indexedDB.open("avisar_vl_media", 1);
      request.onupgradeneeded = () => request.result.createObjectStore("evidence");
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }).catch((error) => {
      evidenceDatabase = null;
      throw error;
    });
  }
  return evidenceDatabase;
}

async function evidenceTransaction(mode, operation) {
  const database = await openEvidenceDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction("evidence", mode);
    const request = operation(transaction.objectStore("evidence"));
    transaction.oncomplete = () => resolve(request.result);
    transaction.onabort = () => reject(transaction.error);
  });
}

function removeEvidenceFile(key) {
  return evidenceTransaction("readwrite", (store) => store.delete(key)).catch(() => {});
}

function releaseEvidenceURLs() {
  evidenceURLs.forEach((url) => URL.revokeObjectURL(url));
  evidenceURLs.clear();
}

function evidenceMarkup(claim) {
  if (claim.evidenciaMedia) return `<div class="evidence-attachment" data-evidence-key="${esc(claim.evidenciaMedia)}"><p class="muted">Cargando archivo adjunto…</p></div>`;
  return claim.evidenciaFoto ? `<figure><img src="${esc(claim.evidenciaFoto)}" alt="Ilustración de la intervención" loading="lazy">
    <figcaption>Ilustración de la intervención</figcaption></figure>` : "";
}

function loadEvidenceFiles(scope) {
  scope.querySelectorAll("[data-evidence-key]").forEach(async (container) => {
    try {
      const file = await evidenceTransaction("readonly", (store) => store.get(container.dataset.evidenceKey));
      if (!file) throw new Error("Archivo ausente");
      if (!container.isConnected) return;
      const media = document.createElement(file.type.startsWith("video/") ? "video" : "img");
      if (media instanceof HTMLVideoElement) {
        media.controls = true;
        media.preload = "metadata";
        media.setAttribute("aria-label", "Video de la intervención");
      } else {
        media.alt = "Imagen de la intervención";
      }
      const url = URL.createObjectURL(file);
      evidenceURLs.add(url);
      media.src = url;
      container.replaceChildren(media);
    } catch {
      container.textContent = "El archivo adjunto no está disponible en este navegador.";
    }
  });
}
