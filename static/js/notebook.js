/* rhizoMorphic notebook UI: cell selection, copy-as-LLM-context, Ctrl+K palette.
   No dependencies. Page data comes from <script id="nb-data"> (see layouts/single.html);
   the search index from index.json (layouts/home.json). */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const wb = $("#workbench");
  const mobile = () => window.matchMedia("(max-width: 760px)").matches;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };

  /* ---------- status bar ---------- */
  const statusEl = $("#status-msg");
  let statusTimer = 0;
  function status(msg) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { statusEl.textContent = ""; }, 3500);
  }

  /* ---------- sidebar ---------- */
  if (store.get("sidebar") === "hidden" && !mobile()) wb.classList.add("sidebar-hidden");
  function toggleSidebar() {
    if (mobile()) {
      wb.classList.remove("sidebar-hidden");
      wb.classList.toggle("sidebar-open");
    } else {
      const hidden = wb.classList.toggle("sidebar-hidden");
      store.set("sidebar", hidden ? "hidden" : "shown");
      $$(".ab-item[data-act=toggle-sidebar]").forEach((b) => b.classList.toggle("is-active", !hidden));
    }
  }
  const activeFile = $(".tree-file.is-active");
  if (activeFile) activeFile.scrollIntoView({ block: "center" });
  if (wb.classList.contains("sidebar-hidden")) {
    $$(".ab-item[data-act=toggle-sidebar]").forEach((b) => b.classList.remove("is-active"));
  }

  /* ---------- page data ---------- */
  let page = null;
  try { page = JSON.parse($("#nb-data")?.textContent || "null"); } catch { page = null; }
  const cellEls = $$(".cell[data-i]");

  /* ---------- LLM context formatting ---------- */
  function fence(text, info = "") {
    const runs = text.match(/`{3,}/g) || [];
    const n = Math.max(3, ...runs.map((r) => r.length + 1));
    const f = "`".repeat(n);
    return `${f}${info}\n${text.replace(/\n+$/, "")}\n${f}`;
  }
  function cellText(c, i) {
    const kind = c.type === "code" ? c.lang || "code" : c.type;
    const head = `<!-- cell ${i} · ${kind} -->`;
    if (c.type === "code") {
      let s = `${head}\n${fence(c.src, c.lang || "")}`;
      if (c.out && c.out.trim()) s += `\n\nOutput:\n${fence(c.out, "text")}`;
      return s;
    }
    if (c.type === "raw") return `${head}\n${fence(c.src)}`;
    return `${head}\n${c.src.trim()}`;
  }
  function contextFor(indices) {
    if (!page) return "";
    const all = page.cells || [];
    const idx = indices && indices.length ? indices : all.map((_, i) => i);
    const partial = idx.length < all.length;
    const header = [
      `# ${page.title}`,
      `Source: ${page.url}${partial ? `#cell-${idx[0]}` : ""} (${page.date})`,
      partial ? `Excerpt: cells ${idx.join(", ")} of ${all.length}.` : `Full page, ${all.length} cells.`,
      "Human-written working notes; code outputs are as recorded when the notebook was run.",
    ].join("\n");
    return `${header}\n\n${idx.map((i) => cellText(all[i], i)).join("\n\n")}\n`;
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch { ok = false; }
      ta.remove();
      return ok;
    }
  }
  async function copyCells(indices, label) {
    const text = contextFor(indices);
    if (!text) return;
    const ok = await copy(text);
    status(ok ? `Copied ${label} as LLM context · ${text.length.toLocaleString()} chars` : "Copy failed");
  }
  function flash(btn) {
    if (!btn) return;
    btn.classList.add("is-done");
    setTimeout(() => btn.classList.remove("is-done"), 1200);
  }

  /* ---------- cell selection (click, shift-click range, ctrl/cmd-click toggle) ---------- */
  const selected = new Set();
  let anchor = null;
  function renderSelection() {
    cellEls.forEach((el) => el.classList.toggle("is-selected", selected.has(+el.dataset.i)));
    const btn = $("[data-act=copy-cells] [data-label]");
    if (btn) {
      btn.textContent = selected.size > 0
        ? `Copy ${selected.size} cell${selected.size > 1 ? "s" : ""} as context`
        : "Copy as context";
    }
  }
  function selectCell(i, e = {}) {
    if (e.shiftKey && anchor !== null) {
      const [a, b] = anchor < i ? [anchor, i] : [i, anchor];
      if (!(e.ctrlKey || e.metaKey)) selected.clear();
      for (let k = a; k <= b; k++) selected.add(k);
    } else if (e.ctrlKey || e.metaKey) {
      selected.has(i) ? selected.delete(i) : selected.add(i);
      anchor = i;
    } else {
      selected.clear();
      selected.add(i);
      anchor = i;
    }
    renderSelection();
  }
  const sortedSelection = () => Array.from(selected).sort((a, b) => a - b);

  document.addEventListener("click", (e) => {
    const cell = e.target.closest(".cell[data-i]");
    if (!cell || e.target.closest("a, button, input, summary")) return;
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && cell.contains(sel.anchorNode)) return; // user is selecting text
    selectCell(+cell.dataset.i, e);
  });

  function selectFromHash() {
    const m = location.hash.match(/^#cell-(\d+)$/);
    if (!m) return;
    const el = document.getElementById(`cell-${m[1]}`);
    if (!el) return;
    selectCell(+m[1]);
    el.scrollIntoView({ block: "start" });
  }
  window.addEventListener("hashchange", selectFromHash);
  selectFromHash();

  /* ---------- actions ---------- */
  function toggleOutputs() {
    const nb = $(".nb");
    if (!nb) return;
    const collapsed = nb.classList.toggle("outputs-collapsed");
    const label = $("[data-act=toggle-outputs] [data-label]");
    if (label) label.textContent = collapsed ? "Expand outputs" : "Collapse outputs";
  }
  async function copyCellLink(i) {
    const url = `${location.origin}${location.pathname}#cell-${i}`;
    history.replaceState(null, "", `#cell-${i}`);
    status((await copy(url)) ? `Copied link to cell ${i}` : "Copy failed");
  }
  function copySelectionOrAll() {
    const sel = sortedSelection();
    return sel.length
      ? copyCells(sel, `${sel.length} cell${sel.length > 1 ? "s" : ""}`)
      : copyCells(null, "page");
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const act = btn.dataset.act;
    const cell = btn.closest(".cell[data-i]");
    switch (act) {
      case "palette": e.preventDefault(); openPalette(); break;
      case "toggle-sidebar": e.preventDefault(); toggleSidebar(); break;
      case "toggle-outputs": toggleOutputs(); break;
      case "copy-cells": copySelectionOrAll().then(() => flash(btn)); break;
      case "copy-cell": if (cell) copyCells([+cell.dataset.i], `cell ${cell.dataset.i}`).then(() => flash(btn)); break;
      case "link-cell": if (cell) copyCellLink(+cell.dataset.i).then(() => flash(btn)); break;
      case "toggle-theme": toggleTheme(); break;
      case "toggle-vim": toggleVim(); break;
      case "close-tab": e.preventDefault(); e.stopPropagation(); closeTab(btn.closest(".tab")); break;
      default: return;
    }
  });

  // Close the mobile explorer after picking a file or tapping the editor.
  $(".editor")?.addEventListener("click", () => wb.classList.remove("sidebar-open"));

  /* ---------- keyboard ---------- */
  const typing = (el) => el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
  document.addEventListener("keydown", (e) => {
    const mod = e.ctrlKey || e.metaKey;
    const key = e.key.toLowerCase();
    if (mod && key === "k") { e.preventDefault(); paletteOpen() ? closePalette() : openPalette(); return; }
    if (paletteOpen()) return;
    if (typing(document.activeElement)) return;
    if (key === "/" && !mod) { e.preventDefault(); openPalette(); return; }
    if (mod && key === "c" && selected.size) {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) return; // normal text copy wins
      e.preventDefault();
      copySelectionOrAll();
      return;
    }
    if (mod && key === "a" && cellEls.length && e.shiftKey) {
      e.preventDefault();
      cellEls.forEach((el) => selected.add(+el.dataset.i));
      renderSelection();
      return;
    }
    if (key === "escape" && selected.size) { selected.clear(); renderSelection(); }
    if ((key === "arrowdown" || key === "arrowup") && e.altKey && anchor !== null) {
      e.preventDefault();
      const next = Math.min(cellEls.length - 1, Math.max(0, anchor + (key === "arrowdown" ? 1 : -1)));
      selectCell(next, { shiftKey: e.shiftKey });
      if (!e.shiftKey) anchor = next;
      document.getElementById(`cell-${next}`)?.scrollIntoView({ block: "nearest" });
    }
  });

  /* ---------- Ctrl+K palette ---------- */
  const pal = $("#palette");
  const input = $("#palette-input");
  const list = $("#palette-list");
  let index = null;
  let items = [];
  let active = 0;

  const ICONS = {
    notebook: '<path d="M3.5 1.5h10v13h-10z"/><path d="M1.5 4.5h3M1.5 8h3M1.5 11.5h3"/>',
    markdown: '<rect x="1" y="3.5" width="14" height="9" rx="1.5"/><path d="M3.5 10.5v-5l2 2.5 2-2.5v5"/>',
    cell: '<rect x="2.5" y="3.5" width="11" height="9" rx="1"/><path d="M5 6.5l2 1.5-2 1.5"/>',
    math: '<path d="M12 3H4l4 5-4 5h8"/>',
    cmd: '<path d="M4 5l3 3-3 3M8.5 11.5h4"/>',
  };
  const svg = (name) =>
    `<svg class="icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function mark(text, terms) {
    let html = esc(text);
    for (const t of terms) {
      if (!t) continue;
      const re = new RegExp(esc(t).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
      html = html.replace(re, (m) => `<mark>${m}</mark>`);
    }
    return html;
  }
  function snippet(text, terms) {
    const flat = text.replace(/\s+/g, " ").trim();
    const low = flat.toLowerCase();
    let at = -1;
    for (const t of terms) { const k = low.indexOf(t); if (k >= 0 && (at < 0 || k < at)) at = k; }
    const start = Math.max(0, at - 40);
    return (start > 0 ? "…" : "") + flat.slice(start, start + 160);
  }

  async function loadIndex() {
    if (index) return index;
    try {
      const r = await fetch(window.SEARCH_INDEX);
      index = await r.json();
    } catch {
      index = [];
    }
    return index;
  }

  function commands() {
    const cmds = [];
    if (page) {
      cmds.push({ title: "Copy page as LLM context", desc: `${page.cells.length} cells`, run: () => copyCells(null, "page") });
      if (selected.size) cmds.push({ title: "Copy selected cells as LLM context", desc: `${selected.size} selected`, run: copySelectionOrAll });
      cmds.push({ title: "Select all cells", desc: "Ctrl+Shift+A", run: () => { cellEls.forEach((el) => selected.add(+el.dataset.i)); renderSelection(); } });
    }
    if ($("[data-act=toggle-outputs]")) cmds.push({ title: "Toggle outputs", desc: "Collapse / expand", run: toggleOutputs });
    const dl = $(".nb-toolbar a[download]");
    if (dl) cmds.push({ title: "Download notebook (.ipynb)", desc: "", run: () => dl.click() });
    cmds.push({ title: "Toggle explorer", desc: "", run: toggleSidebar });
    cmds.push({ title: "Toggle color theme", desc: "GitHub Dark / Light", run: toggleTheme });
    cmds.push({ title: "Toggle Vim mode", desc: vimOn ? "on" : "off", run: toggleVim });
    cmds.push({ title: "Go to home", desc: "", run: () => { location.href = $(".titlebar-brand").href; } });
    const about = $(".ab-item[title=About]");
    if (about) cmds.push({ title: "Go to about", desc: "", run: () => { location.href = about.href; } });
    const rss = $(".ab-item[title='RSS feed']");
    if (rss) cmds.push({ title: "Open RSS feed", desc: "", run: () => { location.href = rss.href; } });
    return cmds;
  }

  function search(q) {
    const raw = q.trim();
    if (raw.startsWith(">")) {
      const terms = raw.slice(1).trim().toLowerCase().split(/\s+/).filter(Boolean);
      return commands()
        .filter((c) => terms.every((t) => c.title.toLowerCase().includes(t)))
        .map((c) => ({ icon: "cmd", title: mark(c.title, terms), desc: esc(c.desc), run: c.run }));
    }
    const posts = index || [];
    const terms = raw.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) {
      return posts.slice(0, 30).map((p) => ({
        icon: p.f.endsWith(".ipynb") ? "notebook" : "markdown",
        title: esc(p.t), desc: esc(p.d), href: p.u,
      }));
    }
    const pageHits = [];
    const cellHits = [];
    for (const p of posts) {
      const tl = `${p.t} ${(p.g || []).map((t) => `#${t}`).join(" ")}`.toLowerCase();
      const fl = p.f.toLowerCase();
      const titleAll = terms.every((t) => tl.includes(t) || fl.includes(t));
      if (titleAll) {
        pageHits.push({
          score: 100 + (tl.startsWith(terms[0]) ? 10 : 0),
          icon: p.f.endsWith(".ipynb") ? "notebook" : "markdown",
          title: mark(p.t, terms), desc: esc(`${p.f} · ${p.d}`), href: p.u,
        });
      }
      for (const c of p.c) {
        const xl = c.x.toLowerCase();
        // Every term must appear in the cell, or in the post title.
        if (!terms.every((t) => xl.includes(t) || tl.includes(t))) continue;
        if (!terms.some((t) => xl.includes(t))) continue;
        let score = 0;
        for (const t of terms) { score += xl.split(t).length - 1; if (tl.includes(t)) score += 3; }
        const isNb = p.f.endsWith(".ipynb");
        cellHits.push({
          score,
          icon: c.k === "math" ? "math" : isNb ? "cell" : "markdown",
          title: mark(p.t, terms),
          desc: esc(isNb ? `cell ${c.i} · ${c.k}` : p.d),
          snippet: mark(snippet(c.x, terms), terms),
          href: isNb ? `${p.u}#cell-${c.i}` : p.u,
        });
      }
    }
    pageHits.sort((a, b) => b.score - a.score);
    cellHits.sort((a, b) => b.score - a.score);
    return pageHits.concat(cellHits).slice(0, 80);
  }

  function render() {
    items = search(input.value);
    active = Math.min(active, Math.max(0, items.length - 1));
    if (!items.length) {
      list.innerHTML = `<li class="palette-empty">${index ? "No matching results" : "Loading…"}</li>`;
      return;
    }
    list.innerHTML = items.map((it, k) => `
      <li class="palette-item${k === active ? " is-active" : ""}" role="option" data-k="${k}">
        ${svg(it.icon)}<span class="pi-title">${it.title}</span><span class="pi-desc">${it.desc || ""}</span>
        ${it.snippet ? `<span class="pi-snippet">${it.snippet}</span>` : ""}
      </li>`).join("");
  }
  function setActive(k) {
    active = (k + items.length) % items.length;
    $$(".palette-item", list).forEach((el, j) => el.classList.toggle("is-active", j === active));
    $(".palette-item.is-active", list)?.scrollIntoView({ block: "nearest" });
  }
  function choose(k) {
    const it = items[k];
    if (!it) return;
    closePalette();
    if (it.run) { it.run(); return; }
    const target = new URL(it.href, location.href);
    if (target.pathname === location.pathname && target.hash) {
      location.hash = target.hash; // same page: hashchange selects + scrolls
      selectFromHash();
    } else {
      location.href = it.href;
    }
  }

  let lastFocus = null;
  const paletteOpen = () => pal && !pal.hidden;
  function openPalette(prefix = "") {
    if (!pal) return;
    lastFocus = document.activeElement;
    pal.hidden = false;
    input.value = prefix;
    active = 0;
    render();
    input.focus();
    loadIndex().then(render);
  }
  function closePalette() {
    if (!pal) return;
    pal.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (pal) {
    input.addEventListener("input", () => { active = 0; render(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter") { e.preventDefault(); choose(active); }
      else if (e.key === "Escape") { e.preventDefault(); closePalette(); }
    });
    list.addEventListener("mousemove", (e) => {
      const li = e.target.closest(".palette-item");
      if (li && +li.dataset.k !== active) setActive(+li.dataset.k);
    });
    list.addEventListener("click", (e) => {
      const li = e.target.closest(".palette-item");
      if (li) choose(+li.dataset.k);
    });
    pal.addEventListener("mousedown", (e) => { if (e.target === pal) closePalette(); });
  }

  /* ---------- theme (GitHub Dark / Light) ---------- */
  const root = document.documentElement;
  function themeLabel() {
    const light = root.dataset.theme === "light";
    const el = $("#theme-name");
    if (el) el.textContent = light ? "GitHub Light" : "GitHub Dark";
    $("meta[name=theme-color]")?.setAttribute("content", light ? "#f6f8fa" : "#010409");
  }
  function toggleTheme() {
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    store.set("theme", root.dataset.theme);
    themeLabel();
  }
  themeLabel();

  /* ---------- tabs: italic preview tab, double-click pins (per browser session) ---------- */
  const tabsEl = $("#tabs");
  const session = {
    get() { try { return JSON.parse(sessionStorage.getItem("tabs") || "[]"); } catch { return []; } },
    set(v) { try { sessionStorage.setItem("tabs", JSON.stringify(v)); } catch { /* ignore */ } },
  };
  const curTab = tabsEl && $(".tab[data-name]", tabsEl);
  let pinned = session.get();
  if (tabsEl) {
    for (const t of pinned) {
      if (curTab && t.u === curTab.dataset.tab) {
        curTab.classList.remove("is-preview");
        tabsEl.appendChild(curTab);
        continue;
      }
      const a = document.createElement("a");
      a.className = "tab";
      a.href = t.u;
      a.dataset.tab = t.u;
      a.dataset.icon = t.icon;
      a.title = t.title;
      a.innerHTML = `${t.svg}<span class="tab-label"></span><button type="button" class="tab-close" data-act="close-tab" aria-label="Close tab">×</button>`;
      a.querySelector(".tab-label").textContent = t.name;
      tabsEl.appendChild(a);
    }
    if (curTab && curTab.classList.contains("is-preview")) tabsEl.appendChild(curTab);
    curTab?.scrollIntoView({ inline: "nearest", block: "nearest" });
    curTab?.addEventListener("dblclick", () => {
      if (!curTab.classList.contains("is-preview")) return;
      curTab.classList.remove("is-preview");
      pinned.push({
        u: curTab.dataset.tab, name: curTab.dataset.name, icon: curTab.dataset.icon,
        title: curTab.title.replace(/ · double-click.*$/, ""), svg: $(".icon", curTab).outerHTML,
      });
      session.set(pinned);
      status("Tab kept open");
    });
  }
  function closeTab(tab) {
    if (!tab) return;
    pinned = pinned.filter((t) => t.u !== tab.dataset.tab);
    session.set(pinned);
    if (!tab.classList.contains("is-active")) { tab.parentNode.removeChild(tab); return; }
    const next = tab.previousElementSibling || tab.nextElementSibling;
    location.href = (next && next.dataset.tab) || $(".titlebar-brand").href;
  }
  function cycleTab(step) {
    const tabs = $$(".tab", tabsEl);
    const i = tabs.findIndex((t) => t.classList.contains("is-active"));
    const t = tabs[(i + step + tabs.length) % tabs.length];
    if (t && t !== tabs[i]) location.href = t.dataset.tab;
  }

  // Clicking a tag in the graph searches for it.
  window.addEventListener("rhizome:search", (e) => openPalette(e.detail));

  /* ---------- Vim keys, VSCodeVim style: mode + pending keys in the status bar ---------- */
  const vimEl = $("#vim-mode");
  const vimKeys = $("#vim-keys");
  const scroller = $("#editor-scroll");
  const LINE = 40;
  let vimOn = store.get("vim") !== "off";
  let vmode = "NORMAL";
  let pending = "";
  let count = "";
  let vStart = null;

  function vimRender() {
    if (!vimEl) return;
    vimEl.classList.toggle("is-off", !vimOn);
    vimEl.classList.toggle("is-visual", vimOn && vmode === "VISUAL LINE");
    vimEl.classList.toggle("is-insert", vimOn && vmode === "INSERT");
    vimEl.textContent = vimOn ? `-- ${vmode} --` : "VIM: off";
    if (vimKeys) vimKeys.textContent = vimOn ? count + pending : "";
  }
  function toggleVim() {
    vimOn = !vimOn;
    store.set("vim", vimOn ? "on" : "off");
    vmode = "NORMAL"; pending = ""; count = "";
    vimRender();
    status(vimOn ? "Vim keys on" : "Vim keys off");
  }
  document.addEventListener("focusin", (e) => { if (typing(e.target)) { vmode = "INSERT"; vimRender(); } });
  document.addEventListener("focusout", (e) => { if (typing(e.target)) { vmode = "NORMAL"; vimRender(); } });

  function visibleCellIdx() {
    const top = scroller.getBoundingClientRect().top + 44;
    const el = cellEls.find((c) => c.getBoundingClientRect().bottom > top);
    return el ? +el.dataset.i : null;
  }
  const curIdx = () => (anchor !== null && selected.has(anchor) ? anchor : visibleCellIdx());
  function moveCell(step) {
    if (!cellEls.length) return;
    const from = curIdx() ?? 0;
    const to = Math.min(cellEls.length - 1, Math.max(0, from + step));
    if (vmode === "VISUAL LINE" && vStart !== null) {
      selected.clear();
      for (let k = Math.min(vStart, to); k <= Math.max(vStart, to); k++) selected.add(k);
      anchor = to;
      renderSelection();
    } else {
      selectCell(to);
    }
    document.getElementById(`cell-${to}`)?.scrollIntoView({ block: "nearest" });
  }
  function yank(indices) {
    if (!indices.length) return;
    copyCells(indices, `${indices.length} cell${indices.length > 1 ? "s" : ""}`);
  }

  window.addEventListener("keydown", (e) => {
    if (!vimOn || !scroller || paletteOpen() || typing(document.activeElement) || e.altKey || e.metaKey) return;
    const key = e.key;
    if (key === "Shift" || key === "Control") return;
    const n = Math.max(1, parseInt(count || "1", 10));
    let handled = true;

    if (e.ctrlKey) {
      if (key === "d") scroller.scrollBy(0, n * scroller.clientHeight / 2);
      else if (key === "u") scroller.scrollBy(0, -n * scroller.clientHeight / 2);
      else if (key === "e") scroller.scrollBy(0, n * LINE);
      else if (key === "y") scroller.scrollBy(0, -n * LINE);
      else handled = false;
    } else if (pending) {
      const seq = pending + key;
      pending = "";
      if (seq === "gg") {
        if (count) moveCell(n - 1 - (curIdx() ?? 0)); else scroller.scrollTo(0, 0);
      } else if (seq === "gt") cycleTab(1);
      else if (seq === "gT") cycleTab(-1);
      else if (seq === "za") toggleOutputs();
      else if (seq === "zz") document.getElementById(`cell-${curIdx()}`)?.scrollIntoView({ block: "center" });
      else if (seq === "yy") {
        const i = curIdx();
        if (i !== null) yank(Array.from({ length: Math.min(n, cellEls.length - i) }, (_, k) => i + k));
      }
    } else if (/^[0-9]$/.test(key) && (key !== "0" || count)) {
      count += key;
      vimRender();
      e.preventDefault();
      e.stopImmediatePropagation();
      return;
    } else {
      switch (key) {
        case "j": vmode === "VISUAL LINE" ? moveCell(n) : scroller.scrollBy(0, n * LINE); break;
        case "k": vmode === "VISUAL LINE" ? moveCell(-n) : scroller.scrollBy(0, -n * LINE); break;
        case "h": scroller.scrollBy(-n * LINE, 0); break;
        case "l": scroller.scrollBy(n * LINE, 0); break;
        case "J": case "}": moveCell(n); break;
        case "K": case "{": moveCell(-n); break;
        case "G":
          if (count) moveCell(n - 1 - (curIdx() ?? 0));
          else scroller.scrollTo(0, scroller.scrollHeight);
          break;
        case "V": case "v":
          if (vmode === "VISUAL LINE") { vmode = "NORMAL"; vStart = null; break; }
          vStart = curIdx();
          if (vStart === null) break;
          vmode = "VISUAL LINE";
          selectCell(vStart);
          break;
        case "y":
          if (vmode === "VISUAL LINE") {
            yank(sortedSelection());
            vmode = "NORMAL"; vStart = null;
            selected.clear(); renderSelection();
          } else pending = "y";
          break;
        case "g": case "z": pending = key; break;
        case ":": openPalette(">"); break;
        case "Escape":
          vmode = "NORMAL"; vStart = null;
          handled = false; // the generic handler also clears the cell selection
          break;
        default: handled = false;
      }
    }
    if (!pending || handled) count = pending ? count : "";
    vimRender();
    if (handled) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  vimRender();
})();
