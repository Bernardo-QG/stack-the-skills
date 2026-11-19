# ADR 0008: Evitar que el navegador use archivos viejos

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

Después de una actualización, el navegador mostró el `index.html` nuevo con el `app.js` y los estilos anteriores: las secciones del plan salían vacías. GitHub Pages permite guardar los archivos en caché unos minutos.

## Decisión

- Cargar estilos y script con un parámetro de versión: `css/styles.css?v=1.1.0` y `js/app.js?v=1.1.0`.
- Pedir los JSON con `fetch(url, { cache: "no-cache" })`, que siempre confirma con el servidor si cambiaron.

## Consecuencias

- Al cambiar el `?v=`, el navegador trata el archivo como uno nuevo y lo descarga.
- Hay que acordarse de subir el `?v=` en cada versión; está en los pasos del README.
- Los JSON siempre llegan actualizados, a costa de una consulta extra al servidor, que responde rápido si no hubo cambios.

## Alternativas consideradas

- **Pedir al usuario Ctrl + Shift + R:** no sirve para visitantes que no saben que hay versión nueva.
- **Hash del contenido en el nombre del archivo (`app.3f2a.js`):** lo hacen los bundlers; sin build sería a mano.

## Para aprender más

- [Conceptos: caché y GitHub Pages](../conceptos/08-cache-y-github-pages.md)
