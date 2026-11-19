# Guía de contenido

Todo el texto de la página vive en `data/`. Esta guía explica qué hay en cada archivo y cómo editarlo sin perder el avance guardado.

## Reglas de oro

1. **Agrega los puntos nuevos al final de su lista.** El avance se guarda por posición (ADR 0004).
2. **No cambies los `id`** de las secciones existentes.
3. Para una sección nueva, usa un `id` que no exista (`f13`, `c10`, `p5`…).
4. En las fases, agrega puntos en el **último grupo** o crea un grupo nuevo al final.
5. Después de editar, abre la página con un servidor local y revisa la consola. Un JSON inválido muestra un aviso en la página.

## Forma de un punto

```json
{ "text": "Texto del punto", "note": "Explicación corta opcional" }
```

## Archivos

| Archivo | Sección | Forma |
|---|---|---|
| `niveles.json` | Mi nivel | `matrix` (filas `[aspecto, junior, intermedio, senior]`), `signals`, `diagnostic` |
| `fundamentos.json` | Fundamentos | lista de `{ id, title, tag, items }` |
| `checklist.json` | Checklist universal | lista de `{ id, title, items }`; estas casillas no se guardan |
| `estandares.json` | Estándares | lista de `{ id, title, items, example? }` |
| `oficio.json` | Oficio | `daily`, `growth`: listas de texto |
| `plan.json` | Mi plan, fases y seguimiento | `goal`, `start`, `phases`, `week`, `review`, `log`, `budget`, `reminder` |
| `reglas.json` | Reglas | `rules`, `avoid`, `habits`, `sustain` |
| `ingles.json` | Inglés | `levels`, `principles`, `subtitles`, `routine`, `grammar`, `stages`, `technical`, `phrases`, `tips` |
| `roadmap.json` | Proyecto StockFlow | lista de `{ id, title, duration, tags, goal, items, done }` |
| `temario.json` | Temario | lista de `{ id, title, priority, items }`; `priority` es `alta` o `media` |
| `carrera.json` | Carrera | `specializations`, `tshape`, `certifications`, `community` |
| `recursos.json` | Recursos | lista de `{ category, items }`; cada recurso es `{ name, description, url? }` |

## Una fase

```json
{
  "id": "p1",
  "title": "Cimientos",
  "months": "Nov 2026 – Ene 2027",
  "english": "A2 sólido",
  "objective": "…",
  "groups": [ { "title": "Inglés", "items": [ … ] } ],
  "checkpoint": [ "60 o más días seguidos de rutina" ]
}
```

## La bitácora

Cada mes de `plan.json → log.months` puede tener `values` (valores iniciales) y `targets` (la meta, que se ve en gris). Lo que escribes se guarda por `mes.columna` (por ejemplo `2027-01.efset`), así que puedes agregar meses o columnas sin perder lo escrito.

## Antes de publicar

- [ ] Los JSON son válidos (la página carga sin aviso de error)
- [ ] Los puntos nuevos están al final de su lista
- [ ] El CHANGELOG tiene el cambio en `[Unreleased]`
