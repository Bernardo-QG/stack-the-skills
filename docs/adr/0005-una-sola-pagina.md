# ADR 0005: Fusionar los planes en una sola página

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

El plan de inglés y el plan para trabajo remoto llegaron como documentos Markdown. Primero se publicaron como páginas aparte, convertidas con la librería `marked`. Repetían contenido con la página principal: semana tipo, recursos, reglas y checkpoints.

## Decisión

Fusionar todo en `index.html`. El contenido repetido se unificó en una sola versión, y lo nuevo se acomodó en la sección que le corresponde (por ejemplo, el "proyecto espejo" del plan USD es el proyecto StockFlow).

## Consecuencias

- Una sola fuente de verdad: no hay dos semanas tipo ni dos listas de recursos que se contradigan.
- Las fases se conectan con el resto de la página (Fundamentos, Proyecto, Temario).
- Se eliminó la dependencia de `marked` y las páginas `plan-ingles.html` y `plan-usd.html`.
- La página es larga; se compensa con acordeones cerrados por defecto y la barra de navegación.

## Alternativas consideradas

- **Páginas Markdown separadas:** fáciles de editar, pero duplicaban contenido y se veían distintas al resto.
