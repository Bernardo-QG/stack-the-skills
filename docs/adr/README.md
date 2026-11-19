# Decisiones de arquitectura (ADRs)

Un ADR (*Architecture Decision Record*) documenta una decisión técnica: el contexto, lo que se decidió, sus consecuencias y las alternativas que se descartaron. Sirve para que tú, o alguien más, entienda **por qué** el proyecto es como es, no solo **qué** hace.

Los ADR no se borran: si una decisión cambia, se escribe uno nuevo y el anterior pasa a estado "Reemplazada por ADR XXXX".

| # | Decisión |
|---|---|
| 0001 | [Página estática con HTML, CSS y JavaScript, sin frameworks ni build](0001-pagina-estatica-sin-frameworks.md) |
| 0002 | [Separar el contenido del código en archivos JSON](0002-contenido-en-json.md) |
| 0003 | [Guardar el avance en localStorage](0003-avance-en-localstorage.md) |
| 0004 | [Identificar cada casilla por su posición en la lista](0004-avance-por-posicion.md) |
| 0005 | [Fusionar los planes en una sola página](0005-una-sola-pagina.md) |
| 0006 | [Normalizar los finales de línea a LF](0006-finales-de-linea-lf.md) |
| 0007 | [Versionado semántico y CHANGELOG](0007-semver-y-changelog.md) |
| 0008 | [Evitar que el navegador use archivos viejos](0008-evitar-cache-viejo.md) |
| 0009 | [Licencia MIT](0009-licencia-mit.md) |
| 0010 | [Logo de escalera y paleta salvia y terracota](0010-identidad-visual.md) |
| 0011 | [No publicar datos internos del trabajo](0011-contenido-publico-anonimo.md) |
| 0012 | [El autodiagnóstico no cuenta en el avance total](0012-autodiagnostico-fuera-del-total.md) |

## Plantilla para una decisión nueva

Copia [`plantilla.md`](plantilla.md), ponle el siguiente número y agrégala a la tabla.
