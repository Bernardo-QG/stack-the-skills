# ADR 0013: Stack the Skills es solo el mapa de habilidades

- **Estado:** Aceptada
- **Fecha:** 2026-11-19

## Contexto

La página mezclaba tres cosas distintas: estándares de trabajo (checklist, convenciones), lo que hay que aprender (fundamentos, temario, inglés) y un plan personal (fases, bitácora, presupuesto, metas de sueldo). El plan personal además exponía información privada en un sitio público.

## Decisión

Separar en tres proyectos, cada uno con una pregunta:

| Repo | Pregunta | Visibilidad |
|---|---|---|
| `engineering-handbook` | ¿Cómo trabajo? Solo reglas y principios | Público |
| `stack-the-skills` | ¿Qué tengo que aprender? Mapa de habilidades hacia senior y bilingüe | Público, GitHub Pages |
| `growth-plan` | ¿Hacia dónde voy? Fases, bitácora, presupuesto y metas | Privado, Cloudflare Pages con Cloudflare Access |

Stack the Skills queda como un mapa de 14 dominios y 141 habilidades. Cada habilidad describe qué se espera en nivel junior, intermedio y senior, y tiene una calificación de complejidad y de utilidad.

## Consecuencias

- Cada proyecto tiene un propósito claro y no repite contenido de los otros.
- La checklist universal se elimina: el handbook tendrá reglas verificables (con ID y nivel DEBE/DEBERÍA/PUEDE) que la reemplazan.
- El mapa es genérico: le sirve a cualquier desarrollador y podría convertirse en plantilla.
- El plan personal deja de ser público.
- Es un cambio incompatible con el avance de la versión 1.x, por eso la versión pasa a 2.0.0.

## Alternativas consideradas

- **Mantener todo en una sola página:** más simple de publicar, pero mezcla propósitos y expone el plan personal.
- **Plan personal en un repo público sin datos sensibles:** gratis y simple, pero obliga a recortar el plan.
