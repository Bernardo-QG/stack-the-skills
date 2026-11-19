# ADR 0001: Página estática con HTML, CSS y JavaScript, sin frameworks ni build

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

El proyecto es una página personal de consulta: mostrar contenido, marcar casillas y guardar avance. Se publica en GitHub Pages, que sirve archivos estáticos sin servidor propio.

## Decisión

Usar HTML, CSS y JavaScript sin frameworks, sin bundlers y sin paso de compilación. Lo que está en el repo es exactamente lo que se publica.

## Consecuencias

- Cualquier editor basta para cambiarlo; no hay `npm install` ni dependencias que actualicen o se rompan.
- Carga rápida: solo se descargan los archivos de la página.
- Sirve para practicar la base de la web (DOM, eventos, `fetch`) sin que un framework la esconda.
- Si el proyecto creciera mucho (varias páginas interactivas, estado complejo), habría que reconsiderar un framework.

## Alternativas consideradas

- **Angular o React:** es el stack del día a día, pero agrega build, dependencias y complejidad sin beneficio para una página de consulta.
- **Generador de sitios estáticos (Jekyll, Astro):** útil para blogs con muchas páginas; aquí sería otra herramienta que aprender y mantener.

## Para aprender más

- [Conceptos: JavaScript, datos y eventos](../conceptos/03-javascript-datos-y-eventos.md)
