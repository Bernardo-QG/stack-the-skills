# JavaScript: cargar datos y manejar eventos

## `fetch` y `async/await`

`js/app.js` carga los doce JSON **en paralelo**:

```js
async function loadData() {
  const entries = await Promise.all(Object.entries(DATA_FILES).map(async ([key, url]) => {
    const res = await fetch(url, { cache: "no-cache" });
    if (!res.ok) throw new Error(`No se pudo cargar ${url} (${res.status})`);
    return [key, await res.json()];
  }));
  return Object.fromEntries(entries);
}
```

- `fetch` devuelve una promesa con la respuesta HTTP.
- `res.ok` es `false` para códigos 4xx y 5xx: **`fetch` no lanza error por un 404**, hay que revisarlo a mano.
- `Promise.all` espera todas las promesas a la vez. Si una falla, falla todo, y se muestra un mensaje en la página.
- `Object.fromEntries` convierte `[["plan", {...}], …]` en `{ plan: {...}, … }`.

### Por qué no funciona con doble clic

Abrir `index.html` como archivo usa la ruta `file://`. Por seguridad, los navegadores bloquean `fetch` a archivos locales, así que hace falta un servidor local (`npx serve .`). Ver ADR 0002.

## Delegación de eventos

En lugar de poner un listener en cada una de las cientos de casillas, hay **uno solo** en el documento:

```js
document.addEventListener("change", (e) => {
  const t = e.target;
  if (t.dataset.k) { /* guardar la casilla */ }
});
```

Los eventos "burbujean": el `change` de una casilla sube hasta `document`, donde se atiende. Funciona también con elementos creados después.

### La excepción: `toggle`

El evento `toggle` de `<details>` **no burbujea**. Para escucharlo desde el documento se usa la fase de captura, que va de arriba hacia abajo:

```js
document.addEventListener("toggle", (e) => { … }, true); // true = captura
```

## Atributos `data-*`

`data-k="f1-0"`, `data-acc="f1"`, `data-copy="s3"`: guardan información en el HTML que el script lee con `elemento.dataset.k`. Conectan la vista con la lógica sin depender de clases de CSS.

## Practica

1. Renombra un JSON y abre la consola: ¿qué mensaje aparece y dónde?
2. Cambia `Promise.all` por `Promise.allSettled` para que, si un archivo falla, las demás secciones sí se muestren.

## Para aprender más

- [MDN: usar Fetch](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- [javascript.info: delegación de eventos](https://es.javascript.info/event-delegation)
