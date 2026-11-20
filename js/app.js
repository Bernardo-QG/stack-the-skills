/*
 * Stack the Skills — mapa de habilidades.
 *
 * El contenido vive en /data:
 *   domains.json        orden de los dominios y criterios de complejidad y utilidad
 *   domains/<id>.json   habilidades de cada dominio
 *   levels.json         definición de los niveles y comparativa
 *   resources.json      recursos generales
 *
 * Tu nivel en cada habilidad se guarda en localStorage con el ID de la habilidad
 * (por ejemplo "data-indexes"), así que puedes reordenar o agregar habilidades
 * sin perder tu avance. No cambies el "id" de una habilidad existente.
 */

const LEVELS_KEY = "sts-skill-levels-v2";   // { "data-indexes": 2, ... }
const UI_KEY = "sts-ui-v2";                 // modo, nivel objetivo, acordeones abiertos

// 0 = sin marcar, 1 = junior, 2 = intermedio, 3 = senior
const LEVELS = [
  { value: 0, key: null, short: "—", name: "Aún no" },
  { value: 1, key: "junior", short: "Jr", name: "Junior" },
  { value: 2, key: "mid", short: "Int", name: "Intermedio" },
  { value: 3, key: "senior", short: "Sr", name: "Senior" },
];
const TARGET_VALUE = { junior: 1, mid: 2, senior: 3 };
const RATING = ["baja", "media", "alta"];

/* ---------- almacenamiento ---------- */

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || "null") || fallback; } catch (e) { return fallback; }
}
function store(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* sin almacenamiento */ }
}

let myLevels = load(LEVELS_KEY, {});
let ui = Object.assign({ mode: "level", target: "mid", onlyMissing: false, open: {} }, load(UI_KEY, {}));
const saveUi = () => store(UI_KEY, ui);

/* ---------- utilidades ---------- */

const $ = (id) => document.getElementById(id);
const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const list = (items) => items.map((x) => `<li>${escapeHtml(x)}</li>`).join("");

function table(headers, rows) {
  const head = `<thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join("")}</tr></thead>`;
  return head + `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>`;
}

let data = null;          // contenido cargado
let skillsById = {};      // id -> { skill, domain }

/* ---------- componentes ---------- */

// Selector de "mi nivel": cuatro radios con el mismo name por habilidad.
function levelPicker(skill, scope) {
  const current = myLevels[skill.id] || 0;
  const options = LEVELS.map((l) => {
    const id = `${scope}-${skill.id}-${l.value}`;
    return `<input type="radio" id="${id}" name="${scope}-${skill.id}" value="${l.value}" data-skill="${skill.id}"${current === l.value ? " checked" : ""}>` +
      `<label for="${id}" title="${l.name}">${l.short}</label>`;
  }).join("");
  return `<div class="picker" role="radiogroup" aria-label="Mi nivel en ${escapeHtml(skill.name)}">${options}</div>`;
}

const ratingPills = (s) =>
  `<span class="pill rate-${s.complexity}">complejidad ${s.complexity}</span>` +
  `<span class="pill rate-${s.usefulness}">utilidad ${s.usefulness}</span>`;

function resourcesHtml(s) {
  if (!s.resources.length && !s.evidence.length) return "";
  const res = s.resources.map((r) => r.url
    ? `<a href="${escapeHtml(r.url)}" target="_blank" rel="noopener">${escapeHtml(r.name)}</a>`
    : `<span>${escapeHtml(r.name)}</span>`).join(" · ");
  const ev = s.evidence.map((e) => typeof e === "string"
    ? `<a href="${escapeHtml(e)}" target="_blank" rel="noopener">${escapeHtml(e)}</a>`
    : `<a href="${escapeHtml(e.url)}" target="_blank" rel="noopener">${escapeHtml(e.name || e.url)}</a>`).join(" · ");
  return (res ? `<p class="links"><b>Recursos</b> ${res}</p>` : "") +
         (ev ? `<p class="links"><b>Evidencia</b> ${ev}</p>` : "");
}

function levelsTable(s, highlight) {
  return `<div class="lv3">${LEVELS.slice(1).map((l) =>
    `<div class="lv${highlight === l.key ? " on" : ""}"><span class="eyebrow">${l.name}</span><p>${escapeHtml(s.levels[l.key])}</p></div>`).join("")}</div>`;
}

// Tarjeta de una habilidad en el modo "por nivel".
function skillRow(s) {
  const mine = myLevels[s.id] || 0;
  const target = ui.target;
  const meets = mine >= TARGET_VALUE[target];
  return `
<li class="skill${meets ? " meets" : ""}" data-skill-row="${s.id}">
  <div class="skill-top">
    <div class="skill-name"><h4>${escapeHtml(s.name)}</h4><div class="pills">${ratingPills(s)}</div></div>
    ${levelPicker(s, "lv")}
  </div>
  <p class="expect"><span class="eyebrow">${LEVELS[TARGET_VALUE[target]].name}</span> ${escapeHtml(s.levels[target])}</p>
  <details class="more">
    <summary>Ver detalle</summary>
    <p>${escapeHtml(s.what)}</p>
    ${levelsTable(s, target)}
    ${resourcesHtml(s)}
    <p class="skill-id">ID: <code>${escapeHtml(s.id)}</code></p>
  </details>
</li>`;
}

/* ---------- secciones ---------- */

function renderLevels(lv) {
  $("levelRule").textContent = lv.rule;
  $("levelCards").innerHTML = lv.definitions.map((d) =>
    `<div class="level-card"><span class="eyebrow">${escapeHtml(d.name)}</span><p>${escapeHtml(d.summary)}</p></div>`).join("");
  $("matrix").innerHTML = table(["Aspecto", "Junior", "Intermedio", "Senior"],
    lv.matrix.map(([area, ...cols]) => [`<b>${escapeHtml(area)}</b>`, ...cols.map(escapeHtml)]));
  $("signals").innerHTML = list(lv.signals);
}

function renderLevelMode() {
  const target = TARGET_VALUE[ui.target];
  $("domainStack").innerHTML = data.domains.map((d) => {
    const skills = ui.onlyMissing ? d.skills.filter((s) => (myLevels[s.id] || 0) < target) : d.skills;
    const rows = skills.length
      ? `<ul class="skills">${skills.map(skillRow).join("")}</ul>`
      : `<p class="note">Ya cumples todo este dominio a nivel ${LEVELS[target].name.toLowerCase()}. 🎉</p>`;
    return `
<details class="acc" data-acc="d-${d.id}"${ui.open["d-" + d.id] ? " open" : ""}>
  <summary>
    <div class="sum-main"><span class="eyebrow">${d.skills.length} habilidades</span><h3>${escapeHtml(d.name)}</h3></div>
    <div class="sum-side"><span class="count" data-count="${d.id}"></span><span class="chev" aria-hidden="true"></span></div>
    <div class="bar sum-bar"><i data-bar="${d.id}"></i></div>
  </summary>
  <div class="acc-body">
    <p class="goal">${escapeHtml(d.description)}</p>
    ${rows}
  </div>
</details>`;
  }).join("");
}

function renderMatrixMode() {
  const filter = $("domainFilter").value;
  const skills = data.domains.filter((d) => !filter || d.id === filter).flatMap((d) => d.skills);
  const cell = (u, c) => skills.filter((s) => s.usefulness === u && s.complexity === c);
  const label = { "alta-baja": "Empieza por aquí", "alta-media": "Siguiente paso", "alta-alta": "Inversión grande",
                  "baja-alta": "Después" };
  let html = `<div class="g-corner"></div>` + RATING.map((c) => `<div class="g-head">Complejidad ${c}</div>`).join("");
  for (const u of ["alta", "media", "baja"]) {
    html += `<div class="g-side">Utilidad ${u}</div>`;
    for (const c of RATING) {
      const items = cell(u, c);
      const tag = label[`${u}-${c}`] ? `<span class="g-tag">${label[`${u}-${c}`]}</span>` : "";
      html += `<div class="g-cell u-${u} c-${c}">${tag}<div class="g-chips">${items.map((s) =>
        `<button type="button" class="skill-chip lvl-${myLevels[s.id] || 0}" data-detail="${s.id}">${escapeHtml(s.name)}</button>`).join("") ||
        '<span class="note">—</span>'}</div></div>`;
    }
  }
  $("grid9").innerHTML = html;
}

function renderDetail(id) {
  const box = $("skillDetail");
  const hit = skillsById[id];
  if (!hit) { box.hidden = true; return; }
  const { skill: s, domain: d } = hit;
  box.hidden = false;
  box.innerHTML = `
  <div class="skill-top">
    <div class="skill-name"><span class="eyebrow">${escapeHtml(d.name)}</span><h3>${escapeHtml(s.name)}</h3><div class="pills">${ratingPills(s)}</div></div>
    ${levelPicker(s, "mx")}
  </div>
  <p>${escapeHtml(s.what)}</p>
  ${levelsTable(s, LEVELS[Math.min((myLevels[s.id] || 0) + 1, 3)].key)}
  ${resourcesHtml(s)}
  <p class="skill-id">ID: <code>${escapeHtml(s.id)}</code> · resaltado: el siguiente nivel que te toca</p>`;
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

/* ---------- avance ---------- */

function updateProgress() {
  const target = TARGET_VALUE[ui.target];
  const all = data.domains.flatMap((d) => d.skills);
  const counts = [0, 0, 0, 0];
  all.forEach((s) => counts[myLevels[s.id] || 0]++);

  for (const d of data.domains) {
    const ok = d.skills.filter((s) => (myLevels[s.id] || 0) >= target).length;
    const c = document.querySelector(`[data-count="${d.id}"]`);
    if (c) c.textContent = `${ok}/${d.skills.length}`;
    const b = document.querySelector(`[data-bar="${d.id}"]`);
    if (b) b.style.width = (ok / d.skills.length) * 100 + "%";
    document.querySelector(`[data-acc="d-${d.id}"]`)?.classList.toggle("done", ok === d.skills.length);
  }

  const atLeast = (v) => all.filter((s) => (myLevels[s.id] || 0) >= v).length;
  const seg = (n, cls, name) => n ? `<i class="${cls}" style="flex:${n}" title="${name}: ${n}"></i>` : "";
  $("summary").innerHTML = `
    <div class="global-top"><span class="eyebrow">Tu mapa</span><span class="big">${all.length - counts[0]}<small> de ${all.length} marcadas</small></span></div>
    <div class="dist">${seg(counts[3], "s3", "Senior")}${seg(counts[2], "s2", "Intermedio")}${seg(counts[1], "s1", "Junior")}${seg(counts[0], "s0", "Aún no")}</div>
    <div class="stats">
      <span><i class="dot s3"></i>Senior <b>${counts[3]}</b></span>
      <span><i class="dot s2"></i>Intermedio <b>${counts[2]}</b></span>
      <span><i class="dot s1"></i>Junior <b>${counts[1]}</b></span>
      <span><i class="dot s0"></i>Aún no <b>${counts[0]}</b></span>
    </div>
    <p class="note">Para nivel intermedio te faltan <b>${all.length - atLeast(2)}</b> habilidades; para senior, <b>${all.length - atLeast(3)}</b>.</p>`;
}

/* ---------- modos ---------- */

function applyMode() {
  document.querySelectorAll(".mode").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === ui.mode)));
  $("levelMode").hidden = ui.mode !== "level";
  $("matrixMode").hidden = ui.mode !== "matrix";
  document.querySelectorAll("[data-target]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.target === ui.target)));
  $("onlyMissing").checked = ui.onlyMissing;
  if (ui.mode === "level") renderLevelMode(); else renderMatrixMode();
  updateProgress();
}

/* ---------- eventos ---------- */

function bindEvents() {
  document.addEventListener("change", (e) => {
    const t = e.target;
    if (t.dataset.skill) {
      const v = Number(t.value);
      if (v) myLevels[t.dataset.skill] = v; else delete myLevels[t.dataset.skill];
      store(LEVELS_KEY, myLevels);
      // Refleja el cambio en la fila sin redibujar todo (para no cerrar lo que está abierto).
      const row = document.querySelector(`[data-skill-row="${t.dataset.skill}"]`);
      if (row) row.classList.toggle("meets", (v || 0) >= TARGET_VALUE[ui.target]);
      if (ui.mode === "matrix") { renderMatrixMode(); renderDetail(t.dataset.skill); }
      updateProgress();
    } else if (t.id === "onlyMissing") {
      ui.onlyMissing = t.checked; saveUi(); applyMode();
    } else if (t.id === "domainFilter") {
      renderMatrixMode(); $("skillDetail").hidden = true;
    }
  });

  // "toggle" no burbujea; se escucha en fase de captura.
  document.addEventListener("toggle", (e) => {
    const id = e.target.dataset?.acc;
    if (!id) return;
    if (e.target.open) ui.open[id] = 1; else delete ui.open[id];
    saveUi();
  }, true);

  document.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.mode) { ui.mode = b.dataset.mode; saveUi(); applyMode(); }
    else if (b.dataset.target) { ui.target = b.dataset.target; saveUi(); applyMode(); }
    else if (b.dataset.detail) { renderDetail(b.dataset.detail); $("skillDetail").scrollIntoView({ behavior: "smooth", block: "nearest" }); }
    else if (b.dataset.open || b.dataset.close) {
      const open = Boolean(b.dataset.open);
      $(b.dataset.open || b.dataset.close).querySelectorAll("details.acc").forEach((d) => {
        d.open = open;
        if (open) ui.open[d.dataset.acc] = 1; else delete ui.open[d.dataset.acc];
      });
      saveUi();
    }
  });

  setupReset();
}

function setupReset() {
  const box = $("resetBox");
  const idle = () => {
    box.innerHTML = '<button type="button" id="resetBtn">Borrar mis niveles</button>';
    $("resetBtn").onclick = ask;
  };
  const ask = () => {
    box.innerHTML = '<span>¿Borrar el nivel que marcaste en todas las habilidades?</span>' +
      '<button type="button" class="danger" id="resetYes">Sí, borrar</button>' +
      '<button type="button" id="resetNo">Cancelar</button>';
    $("resetYes").onclick = () => { myLevels = {}; store(LEVELS_KEY, myLevels); applyMode(); idle(); };
    $("resetNo").onclick = idle;
  };
  idle();
}

/* ---------- arranque ---------- */

async function getJson(url) {
  // "no-cache" pide al servidor confirmar si el archivo cambió, así siempre ves el contenido más reciente.
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`);
  return res.json();
}

async function loadData() {
  const [index, levels, resources] = await Promise.all(
    ["data/domains.json", "data/levels.json", "data/resources.json"].map(getJson));
  const domains = await Promise.all(index.order.map((id) => getJson(`data/domains/${id}.json`)));
  return { index, levels, resources, domains };
}

function showLoadError(err) {
  $("domainStack").innerHTML = `<p class="load-error">No se pudo cargar el contenido: ${escapeHtml(err.message)}. ` +
    `Si abriste el archivo con doble clic, usa un servidor local (ver README).</p>`;
}

loadData()
  .then((d) => {
    data = d;
    d.domains.forEach((dom) => dom.skills.forEach((s) => (skillsById[s.id] = { skill: s, domain: dom })));
    renderLevels(d.levels);
    renderResources(d.resources);
    $("criteria").innerHTML = `<b>Complejidad:</b> ${escapeHtml(d.index.criteria.complexity)} <b>Utilidad:</b> ${escapeHtml(d.index.criteria.usefulness)}`;
    $("domainFilter").insertAdjacentHTML("beforeend",
      d.domains.map((dom) => `<option value="${dom.id}">${escapeHtml(dom.name)}</option>`).join(""));
    bindEvents();
    applyMode();
  })
  .catch(showLoadError);
