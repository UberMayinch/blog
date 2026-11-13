/* Obsidian-style knowledge graph for the home notebook's first output.
   Data: <script class="graph-data"> from layouts/_partials/graph-data.html.
   Small force simulation on a canvas; no dependencies. */
(() => {
  "use strict";
  const host = document.querySelector("[data-graph]");
  if (!host) return;
  const canvas = host.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  let data;
  try { data = JSON.parse(host.querySelector(".graph-data").textContent); } catch { return; }

  /* ---------- model ---------- */
  const nodes = data.nodes.map((n, i) => {
    const a = (i / data.nodes.length) * Math.PI * 2;
    const r = 80 + 60 * Math.random();
    return { ...n, x: Math.cos(a) * r, y: Math.sin(a) * r, vx: 0, vy: 0, deg: 0, nbrs: new Set() };
  });
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const links = [];
  for (const l of data.links) {
    const s = byId.get(l.s), t = byId.get(l.t);
    if (!s || !t || s === t) continue;
    links.push({ s, t, k: l.k });
    s.deg++; t.deg++;
    s.nbrs.add(t); t.nbrs.add(s);
  }
  const radius = (n) => (n.k === "tag" ? 3.5 : 4) + Math.sqrt(n.deg) * 1.6;

  /* ---------- simulation ---------- */
  let alpha = 1;
  function tick() {
    const k = alpha;
    // Repulsion between every pair (n is small: one node per post/tag).
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        let dx = b.x - a.x, dy = b.y - a.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) { dx = Math.random() - .5; dy = Math.random() - .5; d2 = 1; }
        const f = (2200 / d2) * k;
        const d = Math.sqrt(d2);
        const fx = (dx / d) * f, fy = (dy / d) * f;
        a.vx -= fx; a.vy -= fy; b.vx += fx; b.vy += fy;
      }
    }
    // Springs.
    for (const l of links) {
      const rest = l.k === "tag" ? 55 : 70;
      const dx = l.t.x - l.s.x, dy = l.t.y - l.s.y;
      const d = Math.max(1, Math.hypot(dx, dy));
      const f = ((d - rest) / d) * 0.06 * k;
      l.s.vx += dx * f; l.s.vy += dy * f;
      l.t.vx -= dx * f; l.t.vy -= dy * f;
    }
    // Gravity keeps isolated notes in the frame, like Obsidian's center force.
    for (const n of nodes) {
      n.vx -= n.x * 0.008 * k;
      n.vy -= n.y * 0.008 * k;
      if (n === dragNode) { n.vx = n.vy = 0; continue; }
      n.vx *= 0.6; n.vy *= 0.6;
      n.x += n.vx; n.y += n.vy;
    }
    alpha = Math.max(0, alpha * 0.985 - 0.0005);
  }

  /* ---------- view ---------- */
  let W = 0, H = 0, dpr = 1;
  const view = { x: 0, y: 0, s: 1 };
  let autoFit = true; // follow the settling layout until the user pans or zooms
  function resize() {
    const r = canvas.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    W = r.width; H = r.height;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    if (autoFit && nodes.length) fit();
    draw();
  }
  function fit() {
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const n of nodes) { x0 = Math.min(x0, n.x); y0 = Math.min(y0, n.y); x1 = Math.max(x1, n.x); y1 = Math.max(y1, n.y); }
    const pad = 60;
    view.s = Math.min(1.1, Math.max(0.3, Math.min(W / (x1 - x0 + pad * 2), H / (y1 - y0 + pad * 2))));
    view.x = -(x0 + x1) / 2;
    view.y = -(y0 + y1) / 2;
  }
  const toScreen = (n) => [(n.x + view.x) * view.s + W / 2, (n.y + view.y) * view.s + H / 2];
  const toWorld = (sx, sy) => [(sx - W / 2) / view.s - view.x, (sy - H / 2) / view.s - view.y];

  let colors = {};
  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    const v = (name) => cs.getPropertyValue(name).trim();
    colors = {
      node: v("--graph-node"), line: v("--graph-line"), tag: v("--graph-tag"),
      hi: v("--graph-hi"), nb: v("--orange"), fg: v("--fg"), bg: v("--bg"), font: v("--ui"),
    };
  }

  let hover = null;
  function draw() {
    if (!W) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const focus = hover || dragNode;
    const lit = (n) => !focus || n === focus || focus.nbrs.has(n);

    ctx.lineWidth = 1;
    for (const l of links) {
      const on = focus && (l.s === focus || l.t === focus);
      ctx.globalAlpha = focus && !on ? 0.12 : 1;
      ctx.strokeStyle = on ? colors.hi : colors.line;
      const [x1, y1] = toScreen(l.s), [x2, y2] = toScreen(l.t);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
    for (const n of nodes) {
      const [x, y] = toScreen(n);
      ctx.globalAlpha = lit(n) ? 1 : 0.18;
      ctx.fillStyle = n === focus ? colors.hi : n.k === "tag" ? colors.tag : n.k === "nb" ? colors.nb : colors.node;
      ctx.beginPath(); ctx.arc(x, y, radius(n) * Math.sqrt(view.s), 0, Math.PI * 2); ctx.fill();
    }
    // Note labels fade in as you zoom; tags and the hovered node's neighbourhood always show.
    const zoomAlpha = Math.min(1, Math.max(0, (view.s - 1.15) / 0.4));
    ctx.font = `${n2px(11)}px ${colors.font}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (const n of nodes) {
      const a = focus ? (lit(n) ? 1 : 0) : n.k === "tag" ? 0.9 : zoomAlpha;
      if (a <= 0.02) continue;
      const [x, y] = toScreen(n);
      const label = n.t.length > 34 ? `${n.t.slice(0, 33)}…` : n.t;
      ctx.globalAlpha = a;
      ctx.lineWidth = 3; ctx.strokeStyle = colors.bg; ctx.strokeText(label, x, y + radius(n) * Math.sqrt(view.s) + 3);
      ctx.fillStyle = n === focus ? colors.fg : n.k === "tag" ? colors.tag : colors.node;
      ctx.fillText(label, x, y + radius(n) * Math.sqrt(view.s) + 3);
    }
    ctx.globalAlpha = 1;
  }
  const n2px = (px) => Math.round(px * Math.min(1.3, Math.max(0.85, view.s)));

  /* ---------- loop ---------- */
  let raf = 0;
  function frame() {
    tick();
    if (autoFit) fit();
    draw();
    raf = alpha > 0.002 || dragNode ? requestAnimationFrame(frame) : 0;
  }
  function reheat(a = 0.3) {
    alpha = Math.max(alpha, a);
    if (!raf) raf = requestAnimationFrame(frame);
  }

  /* ---------- interaction ---------- */
  let dragNode = null, panning = null, moved = false;
  function hit(sx, sy) {
    const [wx, wy] = toWorld(sx, sy);
    let best = null, bestD = Infinity;
    for (const n of nodes) {
      const d = Math.hypot(n.x - wx, n.y - wy);
      const r = (radius(n) + 6) / Math.sqrt(view.s);
      if (d < r && d < bestD) { best = n; bestD = d; }
    }
    return best;
  }
  const pos = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };

  canvas.addEventListener("pointerdown", (e) => {
    canvas.setPointerCapture(e.pointerId);
    const [sx, sy] = pos(e);
    moved = false;
    dragNode = hit(sx, sy);
    if (dragNode) reheat(0.2);
    else { panning = { sx, sy, x: view.x, y: view.y }; autoFit = false; }
    canvas.classList.add("is-dragging");
  });
  canvas.addEventListener("pointermove", (e) => {
    const [sx, sy] = pos(e);
    if (dragNode) {
      const [wx, wy] = toWorld(sx, sy);
      dragNode.x = wx; dragNode.y = wy; moved = true;
      reheat(0.15);
    } else if (panning) {
      view.x = panning.x + (sx - panning.sx) / view.s;
      view.y = panning.y + (sy - panning.sy) / view.s;
      moved = moved || Math.hypot(sx - panning.sx, sy - panning.sy) > 3;
      draw();
    } else {
      const h = hit(sx, sy);
      if (h !== hover) { hover = h; canvas.classList.toggle("is-pointing", !!h); draw(); }
    }
  });
  function release(e) {
    const n = dragNode;
    canvas.classList.remove("is-dragging");
    dragNode = null; panning = null;
    if (n && !moved) {
      if (n.u) location.href = n.u;
      else window.dispatchEvent(new CustomEvent("rhizome:search", { detail: n.t }));
    }
    if (e.type === "pointerleave") { hover = null; draw(); }
  }
  canvas.addEventListener("pointerup", release);
  canvas.addEventListener("pointercancel", release);
  canvas.addEventListener("pointerleave", (e) => { if (!dragNode && !panning) { hover = null; canvas.classList.remove("is-pointing"); draw(); } });
  canvas.addEventListener("wheel", (e) => {
    e.preventDefault();
    autoFit = false;
    const [sx, sy] = pos(e);
    const [wx, wy] = toWorld(sx, sy);
    view.s = Math.min(4, Math.max(0.2, view.s * Math.exp(-e.deltaY * 0.0015)));
    // Keep the point under the cursor fixed.
    view.x = (sx - W / 2) / view.s - wx;
    view.y = (sy - H / 2) / view.s - wy;
    draw();
  }, { passive: false });
  canvas.addEventListener("dblclick", () => { autoFit = true; fit(); draw(); });

  new ResizeObserver(resize).observe(canvas);
  new MutationObserver(() => { readColors(); draw(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  readColors();
  resize();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    while (alpha > 0.002) tick();
    fit(); draw();
  } else {
    for (let i = 0; i < 60; i++) tick(); // settle the worst of the start before the first paint
    raf = requestAnimationFrame(frame);
  }
})();
