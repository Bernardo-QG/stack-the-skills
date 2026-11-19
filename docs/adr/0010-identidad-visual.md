# ADR 0010: Logo de escalera y paleta salvia y terracota

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

El proyecto necesitaba un favicon, una imagen para compartir en redes y una identidad que no se viera genérica.

## Decisión

- **Logo:** tres bloques en escalera que suben hacia la derecha, la idea de apilar habilidades para subir de nivel.
- **Paleta:** verde salvia y terracota, poco común en tecnología. El acento de la página usa una terracota más oscura (`#A9542F`) para que el texto tenga buen contraste sobre fondo claro.
- Todos los colores están definidos como variables CSS, con su versión para modo oscuro.

## Consecuencias

- Un solo lugar (el bloque `:root` de `styles.css`) controla los colores de toda la página.
- El favicon SVG cambia de colores en modo oscuro.
- La imagen `img/og-image.png` se generó aparte; si cambia la paleta, hay que regenerarla.

## Alternativas consideradas

- Cuatro formas de logo (escalera, capas 3D, monograma S, código con bloques) y doce paletas. Se descartaron las más comunes en tecnología (azules, verdes "dólar") y las que no se distinguían en 16 px.

## Para aprender más

- [Conceptos: CSS, tokens, temas y layout](../conceptos/02-css.md)
- [Conceptos: Open Graph y favicons](../conceptos/09-open-graph-y-favicons.md)
