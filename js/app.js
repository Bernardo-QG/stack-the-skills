/*
 * Stack the Skills — lógica de la página.
 * El contenido vive en /data/*.json; este archivo solo lo carga y lo dibuja.
 *
 * Progreso: cada casilla se guarda en localStorage con la llave "<id de sección>-<posición>".
 * Por eso, al editar un JSON, agrega puntos nuevos AL FINAL de su lista (o del último grupo):
 * si los insertas a la mitad o cambias el orden, las marcas guardadas se recorren.
 */

const STORAGE_KEY = "ruta-java-angular-v1";
const OPEN_KEY = STORAGE_KEY + "-open";
const LOG_KEY = STORAGE_KEY + "-log";

const DATA_FILES = {
  fundamentos: "data/fundamentos.json",
  checklist: "data/checklist.json",
  estandares: "data/estandares.json",
  niveles: "data/niveles.json",
  oficio: "data/oficio.json",
  carrera: "data/carrera.json",
  plan: "data/plan.json",
  reglas: "data/reglas.json",
  ingles: "data/ingles.json",
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
let logState = load(LOG_KEY);       // bitácora mensual
let diagnosticResults = [];         // mensajes según cuántos temas del autodiagnóstico marcaste

/* ---------- utilidades ---------- */

const $ = (id) => document.getElementById(id);

const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Resalta como <code> anotaciones, rutas de API, archivos de migración y comandos.
const CODE_PATTERN = /(@\w+|\/api\/[\w/?=&;.-]+|V\d__\w+\.sql|ddl-auto=update|mvn verify|docker compose up|git clone|\/health)/g;
const formatText = (s) => escapeHtml(s).replace(CODE_PATTERN, (m) => `<code>${m}</code>`);

function table(headers, rows) {
  const head = `<thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>`;
  const body = rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
  return head + `<tbody>${body}</tbody>`;
}

/* ---------- componentes ---------- */

const sections = {};   // id -> { title, groups } para copiar como Markdown
const groups = [];     // { id, total, kind, persist } para calcular avance

function renderChecklist(sectionId, items, persist, offset = 0) {
  const rows = items.map((item, i) => {
    const id = `${sectionId}-${offset + i}`;
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
 * Recibe `items` (una lista) o `groups` ([{ title, items }]) para listas con subtítulos.
 * @param {object} o  id, kind, eyebrow, title, items|groups, pill?, hot?, before?, after?, persist?
 */
function renderAccordion(o) {
  const persist = o.persist !== false;
  const parts = o.groups || [{ title: null, items: o.items }];
  const total = parts.reduce((n, g) => n + g.items.length, 0);
  sections[o.id] = { title: o.title, groups: parts };
  groups.push({ id: o.id, total, kind: o.kind, persist });

  let offset = 0;
  const lists = parts.map((g) => {
    const html = (g.title ? `<h4 class="group">${escapeHtml(g.title)}</h4>` : "") +
      renderChecklist(o.id, g.items, persist, offset);
    offset += g.items.length;
    return html;
  }).join("");

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
    ${lists}
    ${o.after || ""}
    <div class="toolbar"><button type="button" class="btn-sm" data-copy="${o.id}">Copiar como checklist Markdown</button></div>
  </div>
</details>`;
}

// Acordeón sin casillas (tablas o listas de consulta).
function renderPlainAccordion(id, eyebrow, title, body) {
  return `
<details class="acc" data-acc="${id}"${openState[id] ? " open" : ""}>
  <summary>
    <div class="sum-main"><span class="eyebrow">${escapeHtml(eyebrow)}</span><h3>${escapeHtml(title)}</h3></div>
    <div class="sum-side"><span class="chev" aria-hidden="true"></span></div>
  </summary>
  <div class="acc-body">${body}</div>
</details>`;
}

/* ---------- secciones ---------- */

function renderReference(d) {
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
}

function renderLevel(n) {
  $("matrix").innerHTML = table(["Aspecto", "Junior", "Intermedio", "Senior"],
    n.matrix.map(([area, ...cols]) => [`<b>${escapeHtml(area)}</b>`, ...cols.map(escapeHtml)]));
  $("diagStack").innerHTML = renderAccordion({
    id: n.diagnostic.id, kind: "a", eyebrow: "Checklist de autodiagnóstico", title: "Lo que ya domino",
    items: n.diagnostic.items,
    before: `<p class="goal">${escapeHtml(n.diagnostic.rule)}</p>`,
    after: `<p class="dod"><b>Tu resultado</b><span id="diagResult"></span></p>`,
  });
  diagnosticResults = n.diagnostic.results;
  $("signals").innerHTML = n.signals.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
}

function renderCraft(o, c) {
  $("daily").innerHTML = o.daily.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  $("growth").innerHTML = o.growth.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  $("tshape").textContent = c.tshape;
  $("spec").innerHTML = table(["Ruta", "Enfoque", "Siguiente paso típico"],
    c.specializations.map(([a, b, d]) => [`<b>${escapeHtml(a)}</b>`, escapeHtml(b), escapeHtml(d)]));
  $("certs").innerHTML = c.certifications.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  $("community").innerHTML = c.community.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
}

function renderPlan(p, r) {
  $("planGoal").innerHTML = `<b>Meta:</b> ${escapeHtml(p.goal)}`;
  $("planInsight").textContent = p.insight;
  $("startTable").innerHTML = table(["Área", "Hoy", "Meta en 12 meses"],
    p.start.map((s) => [`<b>${escapeHtml(s.area)}</b>`, escapeHtml(s.today), escapeHtml(s.goal)]));

  $("rules").innerHTML = r.rules.map((x) =>
    `<div class="rule"><span class="k">${escapeHtml(x.key)}</span><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.text)}</p></div>`).join("");
  $("avoid").innerHTML = r.avoid.map((x) =>
    `<div class="avoid-item"><b>${escapeHtml(x.title)}.</b> ${escapeHtml(x.text)}</div>`).join("");
  $("habits").innerHTML = r.habits.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  $("sustain").textContent = r.sustain;

  $("phases").innerHTML = p.phases.map((ph, i) => `
  <div class="layer" data-layer="${ph.id}">
    <div class="num" aria-hidden="true">${i + 1}</div>
    ${renderAccordion({
      id: ph.id, kind: "p", eyebrow: `Fase ${i + 1} · ${ph.months}`, title: ph.title,
      pill: `inglés ${ph.english}`, hot: true, groups: ph.groups,
      before: `<p class="goal">${escapeHtml(ph.objective)}</p>`,
      after: `<div class="dod"><b>Checkpoint</b><ul class="plain">${ph.checkpoint.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul></div>`,
    })}
  </div>`).join("");

  $("week").innerHTML = table(["Día", "Qué hacer", "Tiempo"],
    p.week.map((w) => [escapeHtml(w.day), escapeHtml(w.what), `<span class="mono">${escapeHtml(w.time)}</span>`]));
  $("weekTotal").textContent = p.weekTotal;

  $("budget").innerHTML = table(["Concepto", "Costo mensual aprox."],
    p.budget.map((b) => [escapeHtml(b.item), `<span class="mono">${escapeHtml(b.cost)}</span>`]));
  $("budgetNote").textContent = p.budgetNote;

  $("review").innerHTML = p.review.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  renderLog(p.log);
  $("reminder").innerHTML = `<b>Para cuando te dé flojera:</b> ${escapeHtml(p.reminder)}`;
}

function renderEnglish(e) {
  $("levels").innerHTML = e.levels.map((l) =>
    `<div class="level"><span class="eyebrow">${escapeHtml(l.label)}</span><b>${escapeHtml(l.level)}</b><span>${escapeHtml(l.note)}</span></div>`).join("");
  $("principles").innerHTML = e.principles.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  $("subtitles").innerHTML = e.subtitles.map((x) => `<li>${escapeHtml(x)}</li>`).join("");
  $("routine").innerHTML = table(["Tiempo", "Qué", "Cómo"],
    e.routine.map((x) => [`<span class="mono">${escapeHtml(x.time)}</span>`, `<b>${escapeHtml(x.what)}</b>`, escapeHtml(x.how)]));
  $("routineExtra").textContent = e.routineExtra;

  const stageNames = ["Etapa 1", "Etapa 2", "Etapa 3"];
  $("engStack").innerHTML =
    renderAccordion({ id: e.grammar.id, kind: "i", eyebrow: "Gramática, en orden", title: "Ruta de gramática",
      items: e.grammar.items, before: `<p class="goal">${escapeHtml(e.grammar.rule)}</p>` }) +
    e.stages.map((s, i) => renderAccordion({ id: s.id, kind: "i", eyebrow: stageNames[i] || "Etapa", title: s.title, items: s.items })).join("") +
    renderAccordion({ id: e.technical.id, kind: "i", eyebrow: "Para el trabajo", title: e.technical.title, items: e.technical.items }) +
    renderPlainAccordion("ing-frases", "Consulta", "Frases útiles",
      `<div class="tablebox"><table class="week">${table(["Inglés", "Español"], e.phrases.map(([en, es]) => [`<b>${escapeHtml(en)}</b>`, escapeHtml(es)]))}</table></div>`) +
    renderPlainAccordion("ing-trucos", "Consulta", "Trucos para el día a día",
      `<ul class="plain">${e.tips.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`);
}

function renderPractice(d) {
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
}

function renderResources(categories) {
  $("res").innerHTML = categories.map((cat) => `
    <div class="res-cat">
      <h3>${escapeHtml(cat.category)}</h3>
      <div class="res">${cat.items.map((r) => {
        if (!r.url) return `<div class="res-item"><strong>${escapeHtml(r.name)}</strong><span>${escapeHtml(r.description)}</span></div>`;
        let host = "";
        try { host = new URL(r.url).hostname.replace("www.", ""); } catch (e) { /* url inválida */ }
        return `<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener"><strong>${escapeHtml(r.name)}</strong><span>${escapeHtml(r.description)}</span><span class="mono">${escapeHtml(host)}</span></a>`;
      }).join("")}</div>
    </div>`).join("");
}

/* ---------- bitácora ---------- */

function renderLog(log) {
  const head = `<thead><tr><th>Mes</th>${log.columns.map((c) => `<th>${escapeHtml(c.label)}</th>`).join("")}</tr></thead>`;
  const rows = log.months.map((m) => {
    const cells = log.columns.map((c) => {
      const key = `${m.id}.${c.key}`;
      const saved = logState[key];
      const value = saved !== undefined ? saved : (m.values && m.values[c.key]) || "";
      const target = (m.targets && m.targets[c.key]) || "";
      const cls = c.key === "notes" ? "log-in wide" : "log-in";
      return `<td><input class="${cls}" data-log="${key}" value="${escapeHtml(value)}" placeholder="${escapeHtml(target)}" aria-label="${escapeHtml(m.label + " · " + c.label)}"></td>`;
    }).join("");
    return `<tr><th scope="row">${escapeHtml(m.label)}</th>${cells}</tr>`;
  }).join("");
  $("log").innerHTML = head + `<tbody>${rows}</tbody>`;
}

/* ---------- avance ---------- */

function updateProgress() {
  let total = 0, done = 0;
  const byKind = { a: [0, 0], f: [0, 0], s: [0, 0], p: [0, 0], i: [0, 0], r: [0, 0], t: [0, 0] };

  for (const g of groups) {
    let checked = 0;
    if (g.persist) {
      for (let i = 0; i < g.total; i++) if (progress[`${g.id}-${i}`]) checked++;
      byKind[g.kind][0] += checked; byKind[g.kind][1] += g.total;
      // El autodiagnóstico mide dónde estás, no tu avance del plan: no cuenta en el total.
      if (g.kind !== "a") { total += g.total; done += checked; }
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

  const result = diagnosticResults.find((r) => byKind.a[0] <= r.max);
  if ($("diagResult") && result) $("diagResult").textContent = `${byKind.a[0]} de ${byKind.a[1]}. ${result.text}`;

  const pct = total ? Math.round((done / total) * 100) : 0;
  $("gPct").textContent = pct + "%";
  $("gBar").style.width = pct + "%";
  const stat = (label, k, strong) =>
    `<span>${label}: ${strong ? "<b>" : ""}${byKind[k][0]}/${byKind[k][1]}${strong ? "</b>" : ""}</span>`;
  $("gStats").innerHTML =
    stat("Fundamentos", "f", true) + stat("Estándares", "s", true) +
    stat("Fases", "p") + stat("Inglés", "i") + stat("Proyecto", "r") + stat("Temario", "t");
}

/* ---------- copiar como Markdown ---------- */

function toMarkdown(id) {
  const s = sections[id];
  const body = s.groups.map((g) =>
    (g.title ? `#### ${g.title}\n` : "") + g.items.map((it) => `- [ ] ${it.text}`).join("\n")).join("\n\n");
  return `### ${s.title}\n${body}\n`;
}

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

  // La bitácora se guarda mientras escribes.
  document.addEventListener("input", (e) => {
    const key = e.target.dataset?.log;
    if (!key) return;
    logState[key] = e.target.value;
    store(LOG_KEY, logState);
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
      const container = $(b.dataset.open || b.dataset.close);
      container.querySelectorAll("details.acc").forEach((det) => {
        det.open = open;
        if (open) openState[det.dataset.acc] = 1; else delete openState[det.dataset.acc];
      });
      store(OPEN_KEY, openState);
    }
  });

  $("uniClear").addEventListener("click", () => {
    document.querySelectorAll("input[data-u]").forEach((i) => (i.checked = false));
    updateProgress();
  });

  setupReset();
}

function setupReset() {
  const box = $("resetBox");
  const idle = () => {
    box.innerHTML = '<button type="button" id="resetBtn">Reiniciar mi avance</button>';
    $("resetBtn").onclick = ask;
  };
  const ask = () => {
    box.innerHTML = '<span>¿Borrar todas las casillas marcadas? La bitácora no se borra.</span>' +
      '<button type="button" class="danger" id="resetYes">Sí, borrar</button>' +
      '<button type="button" id="resetNo">Cancelar</button>';
    $("resetYes").onclick = () => {
      progress = {};
      store(STORAGE_KEY, progress);
      document.querySelectorAll("input[data-k]").forEach((i) => (i.checked = false));
      updateProgress();
      idle();
    };
    $("resetNo").onclick = idle;
  };
  idle();
}

/* ---------- arranque ---------- */

async function loadData() {
  const entries = await Promise.all(Object.entries(DATA_FILES).map(async ([key, url]) => {
    // "no-cache" pide al servidor confirmar si el archivo cambió, así siempre ves el contenido más reciente.
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`);
    return [key, await res.json()];
  }));
  return Object.fromEntries(entries);
}

function showLoadError(err) {
  const msg = `<p class="load-error">No se pudo cargar el contenido: ${escapeHtml(err.message)}. ` +
    `Si abriste el archivo con doble clic, usa un servidor local (ver README).</p>`;
  ["diagStack", "fundStack", "uniStack", "stdStack", "phases", "engStack", "timeline", "temarioStack"].forEach((id) => {
    $(id).innerHTML = msg;
  });
}

loadData()
  .then((d) => {
    renderLevel(d.niveles);
    renderReference(d);
    renderCraft(d.oficio, d.carrera);
    renderPlan(d.plan, d.reglas);
    renderEnglish(d.ingles);
    renderPractice(d);
    renderResources(d.recursos);
    bindEvents(d);
    updateProgress();
  })
  .catch(showLoadError);
