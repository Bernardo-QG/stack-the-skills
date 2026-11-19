# ADR 0002: Separar el contenido del código en archivos JSON

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

La primera versión era un solo `index.html` con estilos, lógica y todo el texto juntos. Agregar o corregir un punto obligaba a buscar dentro del código.

## Decisión

Dividir el proyecto en `index.html` (estructura), `css/styles.css` (estilos), `js/app.js` (lógica) y `data/*.json` (contenido). El script carga los JSON con `fetch` y dibuja las secciones.

## Consecuencias

- Editar contenido es editar datos, sin tocar código.
- Cada archivo tiene una sola responsabilidad (separación de responsabilidades).
- `fetch` no funciona al abrir el archivo con doble clic (`file://`): para probar en local hace falta un servidor (`npx serve .` o Live Server).
- Un error de sintaxis en un JSON (una coma de más) rompe la carga de la página; la página muestra un mensaje en lugar de quedarse en blanco.

## Alternativas consideradas

- **Contenido dentro de `app.js` como objetos de JavaScript:** funciona con doble clic, pero mezcla datos y lógica.
- **Markdown:** más cómodo para texto largo, pero necesita una librería para convertirlo y es menos preciso para estructuras como fases con grupos (ver ADR 0005).

## Para aprender más

- [Guía de contenido](../guia-de-contenido.md)
