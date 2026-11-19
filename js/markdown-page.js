/*
 * Stack the Skills — páginas de plan escritas en Markdown.
 *
 * Cada página tiene <article id="doc" data-src="data/archivo.md" data-key="nombre">.
 * Este script:
 *   1. Carga el .md y lo convierte a HTML con marked (js/vendor/marked.min.js).
 *   2. Convierte cada sección "## Título" en un acordeón.
 *   3. Vuelve interactivas las casillas "- [ ]" y guarda su estado en localStorage.
 *
 * Las casillas se identifican por su TEXTO, no por su posición: puedes reordenar
 * o insertar puntos sin perder tu avance. Si cambias el texto de un punto,
 * esa casilla vuelve a aparecer sin marcar.
 */

(function () {
  const doc = document.getElementById("doc");
  if (!doc) return;

  const src = doc.dataset.src;
  const pageKey = "sts-plan-" + doc.dataset.key;
  const OPEN_KEY = pageKey + "-open";

  const load = (k) => { try { return JSON.parse(localStorage.getItem(k) || "{}") || {}; } catch (e) { return {}; } };
  const store = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } };

  let checks = load(pageKey);
  let openState = load(OPEN_KEY);

  // Hash corto y estable a partir del texto de cada punto.
  function hash(text) {
    let h = 5381;
    for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  /* ---------- transformaciones ---------- */

  function wrapTables(root) {
    root.querySelectorAll("table").forEach((table) => {
      const box = document.createElement("div");
      box.className = "tablebox";
      table.replaceWith(box);
      box.appendChild(table);
    });
  }

  function enableTasks(root) {
    root.querySelectorAll('li > input[type="checkbox"]').forEach((input) => {
      const li = input.parentElement;
      const key = hash(li.textContent.trim().replace(/\s+/g, " "));
      input.disabled = false;
      input.dataset.task = key;
      input.checked = Boolean(checks[key]);
      input.id = "t-" + key;

      const label = document.createElement("label");
      label.htmlFor = input.id;
      const text = document.createElement("span");
      while (input.nextSibling) text.appendChild(input.nextSibling);
      label.append(input, text);
      li.textContent = "";
      li.appendChild(label);
      li.classList.add("task");
      li.parentElement.classList.add("task-list");
    });
  }

  // Agrupa cada "## Título" y lo que le sigue en un <details>.
  function buildAccordions(root) {
    const nodes = Array.from(root.children);
    let current = null;
    let index = 0;

    nodes.forEach((node) => {
      if (node.tagName === "HR") { node.remove(); return; }
      if (node.tagName === "H2") {
        const id = "sec-" + index++;
        current = document.createElement("details");
        current.className = "acc";
        current.dataset.acc = id;
        if (openState[id]) current.open = true;

        const summary = document.createElement("summary");
        summary.innerHTML =
          `<div class="sum-main"><h3></h3></div>` +
          `<div class="sum-side"><span class="count" data-count="${id}"></span><span class="chev" aria-hidden="true"></span></div>` +
          `<div class="bar sum-bar"><i data-bar="${id}"></i></div>`;
        summary.querySelector("h3").textContent = node.textContent;

        const body = document.createElement("div");
        body.className = "acc-body md-body";
        current.append(summary, body);
        node.replaceWith(current);
        return;
      }
      if (current) current.querySelector(".acc-body").appendChild(node);
    });

    // Secciones sin casillas no muestran contador ni barra.
    root.querySelectorAll("details.acc").forEach((d) => {
      if (!d.querySelector("input[data-task]")) {
        d.querySelector(".count").remove();
        d.querySelector(".sum-bar").remove();
      }
    });
  }

  /* ---------- avance ---------- */

  function updateProgress() {
    let total = 0, done = 0;
    doc.querySelectorAll("details.acc").forEach((d) => {
      const boxes = d.querySelectorAll("input[data-task]");
      if (!boxes.length) return;
      const checked = d.querySelectorAll("input[data-task]:checked").length;
      total += boxes.length; done += checked;
      const id = d.dataset.acc;
      d.querySelector(`[data-count="${id}"]`).textContent = `${checked}/${boxes.length}`;
      d.querySelector(`[data-bar="${id}"]`).style.width = (checked / boxes.length) * 100 + "%";
      d.classList.toggle("done", checked === boxes.length);
    });
    const pct = total ? Math.round((done / total) * 100) : 0;
    document.getElementById("gPct").textContent = pct + "%";
    document.getElementById("gBar").style.width = pct + "%";
    document.getElementById("gStats").textContent = `${done} de ${total} tareas completadas`;
  }

  /* ---------- eventos ---------- */

  function bindEvents() {
    doc.addEventListener("change", (e) => {
      const key = e.target.dataset.task;
      if (!key) return;
      if (e.target.checked) checks[key] = 1; else delete checks[key];
      store(pageKey, checks);
      updateProgress();
    });

    doc.addEventListener("toggle", (e) => {
      const id = e.target.dataset?.acc;
      if (!id) return;
      if (e.target.open) openState[id] = 1; else delete openState[id];
      store(OPEN_KEY, openState);
    }, true);

    document.querySelectorAll("[data-all]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const open = btn.dataset.all === "open";
        doc.querySelectorAll("details.acc").forEach((d) => {
          d.open = open;
          if (open) openState[d.dataset.acc] = 1; else delete openState[d.dataset.acc];
        });
        store(OPEN_KEY, openState);
      });
    });
  }

  /* ---------- arranque ---------- */

  fetch(src)
    .then((res) => {
      if (!res.ok) throw new Error(`No se pudo cargar ${src} (${res.status})`);
      return res.text();
    })
    .then((markdown) => {
      doc.innerHTML = marked.parse(markdown, { gfm: true });
      const h1 = doc.querySelector("h1");
      if (h1) document.title = h1.textContent.replace(/^[^\p{L}\p{N}]+/u, "").trim() + " · Stack the Skills";
      wrapTables(doc);
      enableTasks(doc);
      buildAccordions(doc);
      bindEvents();
      updateProgress();
    })
    .catch((err) => {
      doc.innerHTML = `<p class="load-error">${err.message}. Si abriste el archivo con doble clic, usa un servidor local (ver README).</p>`;
    });
})();
