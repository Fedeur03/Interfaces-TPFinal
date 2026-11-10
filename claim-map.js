
const MAP_ZOOM = [1, 1.45, 2.1, 3, 4.35, 6.25, 9];
const MAP_EASE = "cubic-bezier(.37,0,.45,1)";

class ClaimMap {
  constructor(stage, { claims, focus, pick }) {
    this.stage = stage;
    this.world = stage.querySelector(".map-world");
    this.image = this.world.querySelector(".static-map-img");
    this.layer = stage.querySelector(".map-pins");
    this.ghosts = document.createElement("div");
    this.ghosts.className = "map-ghosts";
    this.ghosts.inert = true;
    this.layer.before(this.ghosts);
    this.results = stage.querySelector(".map-group-results");
    this.zoomIn = stage.querySelector('[data-map-control="in"]');
    this.zoomOut = stage.querySelector('[data-map-control="out"]');
    this.reset = stage.querySelector('[data-map-control="reset"]');
    this.draft = stage.querySelector("#draftPin");
    this.pick = pick;
    this.focusId = focus?.id;
    this.points = claims.map((claim) => ({ claim, ...latlngToPct(claim.lat, claim.lng) }));
    this.level = focus ? 3 : 0;
    this.center = focus ? latlngToPct(focus.lat, focus.lng) : { x: 50, y: 50 };
    this.left = 0;
    this.top = 0;
    this.groups = [];
    this.touchPoints = new Map();
    this.resize();
    this.stage.classList.add("is-ready");

    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(stage);
    stage.addEventListener("click", (event) => this.click(event));
    stage.addEventListener("wheel", (event) => this.wheel(event), { passive: false });
    stage.addEventListener("keydown", (event) => this.keydown(event));
    stage.addEventListener("pointerdown", (event) => this.pointerDown(event));
    stage.addEventListener("pointermove", (event) => this.pointerMove(event));
    stage.addEventListener("pointerup", (event) => this.pointerEnd(event));
    stage.addEventListener("pointercancel", (event) => this.pointerEnd(event));
    stage.addEventListener("lostpointercapture", (event) => this.pointerEnd(event));
  }

  get scale() { return MAP_ZOOM[this.level]; }

  setClaims(claims) {
    const snapshot = this.captureMarkers();
    this.points = claims.map((claim) => ({ claim, ...latlngToPct(claim.lat, claim.lng) }));
    this.closeResults();
    this.renderGroups(snapshot);
  }

  resize() {
    const { clientWidth: width, clientHeight: height } = this.stage;
    if (!width || !height || (width === this.width && height === this.height)) return;
    this.width = width;
    this.height = height;
    this.panTo(this.center, width / 2, height / 2);
    this.renderGroups();
  }

  pointAt(x, y, { left = this.left, top = this.top, scale = this.scale } = {}) {
    return {
      x: (x - left) * 100 / (this.width * scale),
      y: (y - top) * 100 / (this.height * scale),
    };
  }

  displayedPointAt(x, y) {
    const { e: left, f: top, a: scale } = new DOMMatrixReadOnly(getComputedStyle(this.world).transform);
    return this.pointAt(x, y, { left, top, scale });
  }

  panTo(point, x, y) {
    this.pan(x - this.width * this.scale * point.x / 100, y - this.height * this.scale * point.y / 100);
  }

  pan(left, top) {
    this.left = clamp(left, this.width * (1 - this.scale), 0);
    this.top = clamp(top, this.height * (1 - this.scale), 0);
    this.center = this.pointAt(this.width / 2, this.height / 2);
    this.world.style.transform = `translate(${this.left}px,${this.top}px) scale(${this.scale})`;
    this.world.style.setProperty("--inverse-zoom", 1 / this.scale);
    this.layer.style.transform = `translate(${this.left}px,${this.top}px)`;
  }

  setZoom(level, x = this.width / 2, y = this.height / 2, point = this.displayedPointAt(x, y)) {
    level = clamp(level, 0, MAP_ZOOM.length - 1);
    if (level > 0 && this.image.getAttribute("src") === MAP_OVERVIEW_SRC) this.image.src = MAP_SRC;
    if (this.level === level) {
      this.panTo(point, x, y);
      this.updateTabStops();
      return;
    }
    const snapshot = this.captureMarkers();
    this.level = level;
    this.stage.classList.toggle("is-zoomed", level > 0);
    this.panTo(point, x, y);
    this.closeResults();
    this.renderGroups(snapshot);
  }

  groupPoints() {
    const groups = [];
    const width = this.width * this.scale / 100;
    const height = this.height * this.scale / 100;
    const horizontal = this.width < 480 ? 76 : 88;
    const vertical = this.width < 480 ? 58 : 66;
    for (const point of this.points) {
      const group = point.claim.id === this.focusId ? null : groups.find((g) =>
        !g.focused && Math.hypot((g.x - point.x) * width / horizontal, (g.y - point.y) * height / vertical) < 1
      );
      if (group) {
        const n = group.points.length;
        group.x = (group.x * n + point.x) / (n + 1);
        group.y = (group.y * n + point.y) / (n + 1);
        group.points.push(point);
      } else {
        groups.push({ x: point.x, y: point.y, focused: point.claim.id === this.focusId, points: [point] });
      }
    }
    return groups;
  }

  captureMarkers() {
    const frame = this.stage.getBoundingClientRect();
    const duration = parseFloat(getComputedStyle(this.stage).getPropertyValue("--map-duration"));
    const { e: left, f: top } = new DOMMatrixReadOnly(getComputedStyle(this.layer).transform);
    const entries = this.groups.map((group, index) => {
      const node = this.layer.children[index];
      const box = node.getBoundingClientRect();
      return {
        group, node, opacity: Number(getComputedStyle(node).opacity),
        x: box.left + box.width / 2 - frame.left,
        y: box.bottom + box.height * .05 - frame.top,
      };
    });
    return { left, top, entries, duration };
  }

  renderGroups(snapshot) {
    const active = document.activeElement?.closest("[data-map-marker]");
    const activeClaim = active && this.groups[Number(active.dataset.mapMarker)]?.points[0]?.claim.id;
    const previousByClaim = new Map();
    for (const entry of snapshot?.entries || []) {
      for (const { claim } of entry.group.points) previousByClaim.set(claim.id, entry);
    }

    this.groups = this.groupPoints();
    this.layer.innerHTML = this.groups.map((group, index) => this.marker(group, index)).join("");
    const nodes = this.layer.children;
    const unchanged = new Set();
    const nextByClaim = new Map();
    let nextFocus;
    this.groups.forEach((group, index) => {
      const node = nodes[index];
      const old = previousByClaim.get(group.points[0].claim.id);
      for (const { claim } of group.points) nextByClaim.set(claim.id, group);
      if (old) {
        const sameGroup = old.group.points.length === group.points.length
          && group.points.every(({ claim }) => previousByClaim.get(claim.id) === old);
        if (sameGroup) unchanged.add(old);
        const dx = old.x - snapshot.left - parseFloat(node.style.left);
        const dy = old.y - snapshot.top - parseFloat(node.style.top);
        node.animate([
          { translate: `${dx}px ${dy}px`, scale: sameGroup ? 1 : .86, opacity: sameGroup ? old.opacity : 0 },
          { opacity: 1, offset: .63 },
          { translate: "0 0", scale: 1, opacity: 1 },
        ], { duration: snapshot.duration, easing: MAP_EASE });
      } else if (snapshot) {
        node.animate([{ opacity: 0, scale: .9 }, { opacity: 1, scale: 1 }], { duration: snapshot.duration * .65, easing: MAP_EASE });
      }
      if (activeClaim && group.points.some(({ claim }) => claim.id === activeClaim)) nextFocus = node;
    });

    for (const entry of snapshot?.entries || []) {
      if (unchanged.has(entry) || entry.x < -90 || entry.y < -60 || entry.x > this.width + 90 || entry.y > this.height + 60) continue;
      const next = nextByClaim.get(entry.group.points[0].claim.id);
      this.fadeMarker(entry, next, snapshot.duration);
    }

    this.zoomIn.disabled = this.level === MAP_ZOOM.length - 1;
    this.zoomOut.disabled = this.level === 0;
    this.stage.querySelector(".map-level").textContent = `${this.scale.toLocaleString("es-AR")}×`;
    this.updateTabStops();
    if (activeClaim) {
      const control = nextFocus?.tabIndex === 0 ? nextFocus : this.reset;
      control.focus({ preventScroll: true });
    }
  }

  fadeMarker({ node, x, y, opacity }, next, duration) {
    const ghost = node.cloneNode(true);
    ghost.removeAttribute("data-map-marker");
    ghost.style.left = `${x}px`;
    ghost.style.top = `${y}px`;
    this.ghosts.append(ghost);
    const dx = next ? (this.left + next.x * this.width * this.scale / 100 - x) * .62 : 0;
    const dy = next ? (this.top + next.y * this.height * this.scale / 100 - y) * .62 : 0;
    const fade = ghost.animate([
      { translate: "0 0", scale: 1, opacity },
      { translate: `${dx}px ${dy}px`, scale: .88, opacity: 0 },
    ], { duration: duration * .75, easing: MAP_EASE });
    fade.finished.then(() => ghost.remove(), () => ghost.remove());
  }

  marker(group, index) {
    const claim = group.points[0].claim;
    const count = group.points.length;
    const neighborhoods = new Set(group.points.map(({ claim }) => claim.barrio));
    const area = neighborhoods.size > 2 ? "Varios barrios" : [...neighborhoods].join(" y ");
    const title = count > 1 ? `${count} reclamos · ${area}` : `${claim.titulo} · ${ESTADOS[claim.estado] || ""}`;
    const tag = count > 1 ? "button" : this.pick ? "span" : "a";
    const extra = count > 1 ? 'type="button"' : this.pick ? 'aria-hidden="true"' : `href="#/reclamo/${esc(claim.id)}"`;
    const category = catMeta(claim.categoria);
    const photo = (c) => {
      const src = claimPhoto(c, "thumb");
      return src && !src.startsWith("data:video/") ? `<img src="${esc(src)}" alt="" draggable="false">` : "";
    };
    const preview = photo(claim) || icon(category.icon, 24);
    const backPhotos = group.points.slice(1, 3).map(({ claim: item }) => `<span class="map-marker-back">${photo(item)}</span>`).join("");

    return `<${tag} ${extra} class="map-marker ${count > 1 ? "is-group" : ""} ${group.focused ? "is-current" : ""}" data-map-marker="${index}" style="left:${group.x * this.width * this.scale / 100}px;top:${group.y * this.height * this.scale / 100}px;--category-color:${category.color}" aria-label="${esc(title)}">
      ${backPhotos}<span class="map-marker-photo">${preview}</span>
      ${count === 1 ? `<span class="map-marker-state is-${esc(claim.estado)}" aria-hidden="true"></span>` : ""}
      <span class="map-marker-badge" aria-hidden="true">${count > 1 ? count : icon(category.icon, 13)}</span>
      <span class="map-marker-tooltip" aria-hidden="true">${esc(title)}</span>
    </${tag}>`;
  }

  updateTabStops() {
    const viewWidth = this.width;
    const viewHeight = this.height;
    this.groups.forEach((group, index) => {
      const node = this.layer.children[index];
      const x = this.left + group.x * viewWidth * this.scale / 100;
      const y = this.top + group.y * viewHeight * this.scale / 100;
      if (node.matches("a, button")) node.tabIndex = x >= 10 && x <= viewWidth - 10 && y >= 34 && y <= viewHeight ? 0 : -1;
    });
  }

  showResults(group, trigger) {
    this.results.innerHTML = `<div class="map-group-header"><strong>${group.points.length} reclamos en este punto</strong><button type="button" data-map-control="close" aria-label="Cerrar reclamos agrupados">×</button></div>
      <ul>${group.points.map(({ claim }) => `<li><a href="#/reclamo/${esc(claim.id)}">${esc(claim.titulo)}</a></li>`).join("")}</ul>`;
    this.results.hidden = false;
    this.resultsTrigger = trigger;
    this.results.querySelector("button").focus({ preventScroll: true });
  }

  closeResults(returnFocus = false) {
    this.results.hidden = true;
    if (returnFocus) this.resultsTrigger?.focus({ preventScroll: true });
    this.resultsTrigger = null;
  }

  click(event) {
    if (this.dragged) { this.dragged = false; event.preventDefault(); return; }

    const control = event.target.closest("[data-map-control]")?.dataset.mapControl;
    if (control === "in") this.setZoom(this.level + 1);
    if (control === "out") this.setZoom(this.level - 1);
    if (control === "reset") this.setZoom(0, this.width / 2, this.height / 2, { x: 50, y: 50 });
    if (control === "close") this.closeResults(true);
    if (control || event.target.closest(".map-group-results")) return;

    const button = event.target.closest("button[data-map-marker]");
    if (button) {
      const group = this.groups[Number(button.dataset.mapMarker)];
      if (this.level === MAP_ZOOM.length - 1) this.showResults(group, button);
      else this.setZoom(this.level + 1, this.width / 2, this.height / 2, group);
      return;
    }

    if (this.pick && !event.target.closest("a")) {
      const rect = this.stage.getBoundingClientRect();
      this.placePin(this.displayedPointAt(event.clientX - rect.left, event.clientY - rect.top));
    }
  }

  positionPin({ x, y }) {
    this.draft.hidden = false;
    this.draft.style.left = `${x}%`;
    this.draft.style.top = `${y}%`;
  }

  placePin(point) {
    const x = clamp(point.x, 1, 99);
    const y = clamp(point.y, 1, 99);
    this.positionPin({ x, y });
    this.pick(pctToLatlng(x, y));
  }

  showPin({ lat, lng }) {
    const point = latlngToPct(lat, lng);
    this.positionPin(point);
    this.setZoom(Math.max(3, this.level), this.width / 2, this.height / 2, point);
  }

  wheel(event) {
    if (event.ctrlKey || event.target.closest(".map-group-results") || event.deltaY === 0) return;
    const next = this.level + Math.sign(-event.deltaY);
    const now = performance.now();
    if ((next >= 0 && next < MAP_ZOOM.length) || now - (this.lastWheel ?? -Infinity) < 430) event.preventDefault();
    if (next < 0 || next >= MAP_ZOOM.length || now - (this.lastWheel ?? -Infinity) < 325) return;
    this.lastWheel = now;
    const rect = this.stage.getBoundingClientRect();
    this.setZoom(next, event.clientX - rect.left, event.clientY - rect.top);
  }

  keydown(event) {
    if (event.key === "Escape" && !this.results.hidden) {
      this.closeResults(true);
      event.stopPropagation();
      return;
    }
    if (event.target !== this.stage) return;
    const arrows = { ArrowUp: [0, 52], ArrowDown: [0, -52], ArrowLeft: [52, 0], ArrowRight: [-52, 0] };
    const move = arrows[event.key];
    if (move && this.level > 0) {
      this.pan(this.left + move[0], this.top + move[1]);
      this.updateTabStops();
    } else if (event.key === "+" || event.key === "=") this.setZoom(this.level + 1);
    else if (event.key === "-") this.setZoom(this.level - 1);
    else if (event.key === "Enter" && this.pick) this.placePin(this.center);
    else return;
    event.preventDefault();
  }

  pinchCenter(first, second) {
    const rect = this.stage.getBoundingClientRect();
    return {
      x: (first.clientX + second.clientX) / 2 - rect.left,
      y: (first.clientY + second.clientY) / 2 - rect.top,
      distance: Math.hypot(first.clientX - second.clientX, first.clientY - second.clientY),
    };
  }

  startPinch() {
    const center = this.pinchCenter(...this.touchPoints.values());
    this.pinch = {
      ids: [...this.touchPoints.keys()],
      distance: Math.max(1, center.distance),
      scale: this.scale,
      point: this.displayedPointAt(center.x, center.y),
    };
    this.drag = null;
    this.dragged = true;
    this.stage.classList.remove("is-dragging");
    this.stage.classList.add("is-pinching");
    this.pinch.ids.forEach((id) => this.stage.setPointerCapture(id));
    this.closeResults();
  }

  movePinch() {
    const touches = this.pinch.ids.map((id) => this.touchPoints.get(id));
    const { x, y, distance } = this.pinchCenter(...touches);
    const scale = this.pinch.scale * distance / this.pinch.distance;
    let level = this.level;
    while (level < MAP_ZOOM.length - 1 && scale > Math.sqrt(MAP_ZOOM[level] * MAP_ZOOM[level + 1]) * 1.04) level++;
    while (level > 0 && scale < Math.sqrt(MAP_ZOOM[level] * MAP_ZOOM[level - 1]) / 1.04) level--;
    if (level !== this.level) this.setZoom(level, x, y, this.pinch.point);
  }

  pointerDown(event) {
    if (event.pointerType === "touch") {
      this.touchPoints.set(event.pointerId, event);
      if (this.touchPoints.size === 2 && !this.pinch) this.startPinch();
      if (this.pinch) return;
    }
    if (!event.isPrimary || event.button !== 0) return;
    this.dragged = false;
    if (!this.level || event.target.closest("a, button, .map-group-results")) return;
    this.drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: this.left, top: this.top };
  }

  pointerMove(event) {
    if (this.touchPoints.has(event.pointerId)) {
      this.touchPoints.set(event.pointerId, event);
      if (this.pinch) {
        this.movePinch();
        return;
      }
    }
    const drag = this.drag;
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!this.dragged) {
      if (Math.hypot(dx, dy) < 5) return;
      this.dragged = true;
      this.stage.setPointerCapture(event.pointerId);
      this.stage.classList.add("is-dragging");
      this.closeResults();
    }
    this.pan(drag.left + dx, drag.top + dy);
  }

  pointerEnd(event) {
    if (event.type === "lostpointercapture" && event.target !== this.stage) return;
    this.touchPoints.delete(event.pointerId);
    if (this.pinch?.ids.includes(event.pointerId)) {
      this.pinch = null;
      this.stage.classList.remove("is-pinching");
    }
    if (this.drag?.id !== event.pointerId) return;
    this.drag = null;
    this.stage.classList.remove("is-dragging");
    this.updateTabStops();
  }

  destroy() { this.observer.disconnect(); }
}
