/*
 * Stack the Skills — lógica de la página.
 * El contenido vive en /data/*.json; este archivo solo lo carga y lo dibuja.
 *
 * Progreso: cada casilla se guarda en localStorage con la llave "<id de sección>-<posición>".
 * Por eso, al editar un JSON, agrega puntos nuevos AL FINAL de su lista: si los insertas
 * a la mitad o cambias el orden, las marcas guardadas se recorren a otros puntos.
 */

const STORAGE_KEY = "ruta-java-angular-v1";
const OPEN_KEY = STORAGE_KEY + "-open";

const DATA_FILES = {
  fundamentos: "data/fundamentos.json",
  checklist: "data/checklist.json",
  estandares: "data/estandares.json",
  roadmap: "data/roadmap.json",
  temario: "data/temario.json",
  recursos: "data/recursos.json",
};

/* ---------- almacenamiento ---------- */

function load(key) {
  try { return JSON.parse(localStorage.getItem(key) || "{}") || {}; } catch (e) { return {}; }
}
function store(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* sin almacenamiento */ }
}

let progress = load(STORAGE_KEY);   // casillas marcadas
let openState = load(OPEN_KEY);     // acordeones abiertos

/* ---------- utilidades de texto ---------- */

const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Resalta como <code> anotaciones, rutas de API, archivos de migración y comandos.
const CODE_PATTERN = /(@\w+|\/api\/[\w/?=&;.-]+|V\d__\w+\.sql|ddl-auto=update|mvn verify|docker compose up|git clone|\/health)/g;
const formatText = (s) => escapeHtml(s).replace(CODE_PATTERN, (m) => `<code>${m}</code>`);

/* ---------- componentes ---------- */

const sections = {};   // id -> { title, items } para copiar como Markdown
const groups = [];     // { id, total, kind, persist } para calcular avance

function renderChecklist(sectionId, items, persist) {
  const rows = items.map((item, i) => {
    const id = `${sectionId}-${i}`;
    const attr = persist
      ? `data-k="${id}"${progress[id] ? " checked" : ""}`
      : `data-u="${sectionId}"`;
    const note = item.note ? `<small>${formatText(item.note)}</small>` : "";
    return `<li><label for="${id}"><input type="checkbox" id="${id}" ${attr}><span>${formatText(item.text)}${note}</span></label></li>`;
  });
  return `<ul class="checks">${rows.join("")}</ul>`;
}

/**
 * Acordeón con avance en la cabecera.
 * @param {object} o  id, kind, eyebrow, title, items, pill?, hot?, before?, after?, persist?
 */
function renderAccordion(o) {
  const persist = o.persist !== false;
  sections[o.id] = { title: o.title, items: o.items };
  groups.push({ id: o.id, total: o.items.length, kind: o.kind, persist });

  const pill = o.pill ? `<span class="pill${o.hot ? " hot" : ""}">${escapeHtml(o.pill)}</span>` : "";
  return `
<details class="acc" data-acc="${o.id}"${openState[o.id] ? " open" : ""}>
  <summary>
    <div class="sum-main"><span class="eyebrow">${escapeHtml(o.eyebrow)}</span><h3>${escapeHtml(o.title)}</h3></div>
    <div class="sum-side">${pill}<span class="count" data-count="${o.id}"></span><span class="chev" aria-hidden="true"></span></div>
    <div class="bar sum-bar"><i data-bar="${o.id}"></i></div>
  </summary>
  <div class="acc-body">
    ${o.before || ""}
    ${renderChecklist(o.id, o.items, persist)}
    ${o.after || ""}
    <div class="toolbar"><button type="button" class="btn-sm" data-copy="${o.id}">Copiar como checklist Markdown</button></div>
  </div>
</details>`;
}

/* ---------- secciones ---------- */

function renderAll(d) {
  const $ = (id) => document.getElementById(id);

  $("fundStack").innerHTML = d.fundamentos.map((f, i) => renderAccordion({
    id: f.id, kind: "f", eyebrow: `Nivel ${i + 1}`, title: f.title, pill: f.tag, items: f.items,
  })).join("");

  $("uniStack").innerHTML = d.checklist.map((c) => renderAccordion({
    id: c.id, kind: "u", persist: false, eyebrow: "Revisión", title: c.title, items: c.items,
  })).join("");

  $("stdStack").innerHTML = d.estandares.map((s) => renderAccordion({
    id: s.id, kind: "s", eyebrow: "Estándar", title: s.title, items: s.items,
    after: s.example ? `<div class="std-ex"><span class="eyebrow">Ejemplo</span><pre>${escapeHtml(s.example)}</pre></div>` : "",
  })).join("");

  $("timeline").innerHTML = d.roadmap.map((c, i) => `
  <div class="layer" data-layer="${c.id}">
    <div class="num" aria-hidden="true">${i}</div>
    ${renderAccordion({
      id: c.id, kind: "r", eyebrow: `Capa ${i} · ${c.duration}`, title: c.title, pill: c.tags.join(" · "), items: c.items,
      before: `<p class="goal">${escapeHtml(c.goal)}</p>`,
      after: `<p class="dod"><b>Listo cuando</b>${formatText(c.done)}</p>`,
    })}
  </div>`).join("");

  $("temarioStack").innerHTML = d.temario.map((t) => renderAccordion({
    id: t.id, kind: "t", eyebrow: "Java + Angular", title: t.title,
    pill: `prioridad ${t.priority}`, hot: t.priority === "alta", items: t.items,
  })).join("");

  $("res").innerHTML = d.recursos.map((r) => {
    let host = "";
    try { host = new URL(r.url).hostname.replace("www.", ""); } catch (e) { /* url inválida */ }
    return `<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener"><strong>${escapeHtml(r.name)}</strong><span>${escapeHtml(r.description)}</span><span class="mono">${escapeHtml(host)}</span></a>`;
  }).join("");
}

/* ---------- avance ---------- */

function updateProgress() {
  let total = 0, done = 0;
  const byKind = { f: [0, 0], r: [0, 0], t: [0, 0], s: [0, 0] };

  for (const g of groups) {
    let checked = 0;
    if (g.persist) {
      for (let i = 0; i < g.total; i++) if (progress[`${g.id}-${i}`]) checked++;
      total += g.total; done += checked;
      byKind[g.kind][0] += checked; byKind[g.kind][1] += g.total;
    } else {
      checked = document.querySelectorAll(`input[data-u="${g.id}"]:checked`).length;
    }
    const complete = checked === g.total;
    const bar = document.querySelector(`[data-bar="${g.id}"]`);
    if (bar) bar.style.width = (g.total ? (checked / g.total) * 100 : 0) + "%";
    const count = document.querySelector(`[data-count="${g.id}"]`);
    if (count) count.textContent = `${checked}/${g.total}`;
    document.querySelector(`[data-acc="${g.id}"]`)?.classList.toggle("done", complete);
    document.querySelector(`[data-layer="${g.id}"]`)?.classList.toggle("done", complete);
  }

  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("gPct").textContent = pct + "%";
  document.getElementById("gBar").style.width = pct + "%";
  document.getElementById("gStats").innerHTML =
    `<span>Fundamentos: <b>${byKind.f[0]}/${byKind.f[1]}</b></span>` +
    `<span>Estándares: <b>${byKind.s[0]}/${byKind.s[1]}</b></span>` +
    `<span>Temario Java/Angular: ${byKind.t[0]}/${byKind.t[1]}</span>` +
    `<span>Proyecto: ${byKind.r[0]}/${byKind.r[1]}</span>`;
}

/* ---------- copiar como Markdown ---------- */

const toMarkdown = (id) =>
  `### ${sections[id].title}\n` + sections[id].items.map((it) => `- [ ] ${it.text}`).join("\n") + "\n";

function copyText(button, text) {
  const label = button.textContent;
  const showFallback = () => {
    let area = button.parentElement.nextElementSibling;
    if (!area || !area.classList.contains("fallback")) {
      area = document.createElement("textarea");
      area.className = "fallback";
      area.readOnly = true;
      button.parentElement.after(area);
    }
    area.value = text;
    area.focus();
    area.select();
    button.textContent = "Selecciona y copia el texto";
    setTimeout(() => (button.textContent = label), 2500);
  };
  try {
    navigator.clipboard.writeText(text).then(() => {
      button.textContent = "Copiado ✓";
      setTimeout(() => (button.textContent = label), 1800);
    }, showFallback);
  } catch (e) {
    showFallback();
  }
}

/* ---------- eventos ---------- */

function bindEvents(d) {
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (!t.dataset) return;
    if (t.dataset.k) {
      if (t.checked) progress[t.dataset.k] = 1; else delete progress[t.dataset.k];
      store(STORAGE_KEY, progress);
    }
    if (t.dataset.k || t.dataset.u) updateProgress();
  });

  // "toggle" no burbujea; se escucha en fase de captura.
  document.addEventListener("toggle", (e) => {
    const acc = e.target.dataset?.acc;
    if (!acc) return;
    if (e.target.open) openState[acc] = 1; else delete openState[acc];
    store(OPEN_KEY, openState);
  }, true);

  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.copy) {
      copyText(b, toMarkdown(b.dataset.copy));
    } else if (b.dataset.copyall === "uni") {
      copyText(b, "## Checklist de revisión\n\n" + d.checklist.map((c) => toMarkdown(c.id)).join("\n"));
    } else if (b.dataset.open || b.dataset.close) {
      const open = Boolean(b.dataset.open);
      const container = document.getElementById(b.dataset.open || b.dataset.close);
      container.querySelectorAll("details.acc").forEach((det) => {
        det.open = open;
        if (open) openState[det.dataset.acc] = 1; else delete openState[det.dataset.acc];
      });
      store(OPEN_KEY, openState);
    }
  });

  document.getElementById("uniClear").addEventListener("click", () => {
    document.querySelectorAll("input[data-u]").forEach((i) => (i.checked = false));
    updateProgress();
  });

  setupReset();
}

function setupReset() {
  const box = document.getElementById("resetBox");
  const idle = () => {
    box.innerHTML = '<button type="button" id="resetBtn">Reiniciar mi avance</button>';
    document.getElementById("resetBtn").onclick = ask;
  };
  const ask = () => {
    box.innerHTML = '<span>¿Borrar todas las casillas marcadas?</span>' +
      '<button type="button" class="danger" id="resetYes">Sí, borrar</button>' +
      '<button type="button" id="resetNo">Cancelar</button>';
    document.getElementById("resetYes").onclick = () => {
      progress = {};
      store(STORAGE_KEY, progress);
      document.querySelectorAll("input[data-k]").forEach((i) => (i.checked = false));
      updateProgress();
      idle();
    };
    document.getElementById("resetNo").onclick = idle;
  };
  idle();
}

/* ---------- arranque ---------- */

async function loadData() {
  const entries = await Promise.all(Object.entries(DATA_FILES).map(async ([key, url]) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`);
    return [key, await res.json()];
  }));
  return Object.fromEntries(entries);
}

function showLoadError(err) {
  const msg = `<p class="load-error">No se pudo cargar el contenido: ${escapeHtml(err.message)}. ` +
    `Si abriste el archivo con doble clic, usa un servidor local (ver README).</p>`;
  ["fundStack", "uniStack", "stdStack", "timeline", "temarioStack"].forEach((id) => {
    document.getElementById(id).innerHTML = msg;
  });
}

loadData()
  .then((d) => { renderAll(d); bindEvents(d); updateProgress(); })
  .catch(showLoadError);
