# localStorage

## Qué es

Un almacén de texto clave-valor que el navegador guarda **por sitio** y que sobrevive al cerrar la pestaña. Tiene un límite de unos 5 MB por sitio.

## Cómo se usa en el proyecto

```js
function load(key) {
  try { return JSON.parse(localStorage.getItem(key) || "{}") || {}; }
  catch (e) { return {}; }
}
function store(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (e) { /* sin almacenamiento */ }
}
```

- `localStorage` solo guarda texto: los objetos se convierten con `JSON.stringify` y se leen con `JSON.parse`.
- **Siempre con `try/catch`:** en modo privado, con el almacenamiento lleno o bloqueado, `localStorage` puede lanzar error. Sin el `try`, la página entera dejaría de funcionar.

Las casillas se guardan como un objeto con solo las marcadas:

```json
{ "f1-0": 1, "f1-3": 1, "p1-2": 1 }
```

## Limitaciones

- Vive en **un navegador de un dispositivo**: no se comparte entre la computadora y el celular.
- Es **por origen**: `localhost:3000` y `bernardo-qg.github.io` tienen almacenes distintos.
- Se pierde si borras los datos del sitio.
- No es seguro para datos sensibles: cualquier script de la página puede leerlo.

## Practica

1. Herramientas de desarrollo → Application → Local Storage: observa cómo cambian los valores al marcar casillas.
2. Agrega un botón que descargue tu avance como archivo `.json` y otro que lo cargue. Es la mejora sugerida en el ADR 0003.

## Para aprender más

- [MDN: localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
