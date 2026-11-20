# Guía de contenido

Todo el contenido vive en `data/`. Esta guía explica qué hay en cada archivo y cómo editarlo sin perder tu avance.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `domains.json` | El orden en que aparecen los dominios y los criterios de complejidad y utilidad |
| `domains/<id>.json` | Un dominio con sus habilidades (por ejemplo `domains/data.json`) |
| `levels.json` | Qué significa cada nivel, la comparativa junior/intermedio/senior y las señales de senior |
| `resources.json` | Recursos generales por categoría |

## Reglas de oro

1. **Nunca cambies el `id` de una habilidad existente.** Tu nivel se guarda con ese ID (ADR 0014). El nombre visible (`name`) sí se puede cambiar.
2. Los IDs nuevos siguen el formato `<dominio>-<nombre-en-ingles>` en kebab-case, sin números: `backend-rest-api`, `english-interviews`.
3. Puedes reordenar y mover habilidades libremente.
4. Después de editar, abre la página con un servidor local y revisa la consola. Un JSON inválido muestra un aviso en la página.

## Un dominio

```json
{
  "id": "data",
  "name": "Datos",
  "description": "Diseñar, consultar, optimizar y proteger los datos de un sistema.",
  "skills": [ … ]
}
```

Para agregar un dominio nuevo, crea `domains/<id>.json` y agrega su `id` a `order` en `domains.json`.

## Una habilidad

```json
{
  "id": "data-indexes",
  "name": "Índices y planes de ejecución",
  "what": "Qué es y para qué sirve, en una o dos líneas.",
  "complexity": "media",
  "usefulness": "alta",
  "levels": {
    "junior": "Sabe que un índice acelera las búsquedas.",
    "mid": "Crea índices compuestos en el orden correcto y lee un EXPLAIN.",
    "senior": "Diseña la estrategia de índices de un sistema."
  },
  "resources": [ { "name": "Use The Index, Luke", "url": "https://use-the-index-luke.com/es" } ],
  "evidence": [ { "name": "PR: índices en movimientos", "url": "https://github.com/…" } ]
}
```

- `complexity` y `usefulness` aceptan `baja`, `media` o `alta`.
  - **Complejidad:** tiempo y esfuerzo para llegar a nivel intermedio.
  - **Utilidad:** qué tanto se usa en el día a día y qué tanto la piden las vacantes de backend y full stack.
- `levels` describe qué se espera en cada nivel. Escríbelo como algo observable: "crea índices compuestos", no "sabe de índices".
- `url` es opcional en los recursos (un libro puede ir sin link).
- `evidence` es la prueba de que dominas la habilidad: un PR, un repo o una nota. Agrégala cuando subas de nivel.

## En el dominio Inglés

Los niveles junior, intermedio y senior equivalen a A2, B1 y B2+ del Marco Común Europeo (MCER). Empieza cada descripción con el nivel: `"B1: escribe PRs y documentación clara."`

## Antes de publicar

- [ ] Los JSON son válidos (la página carga sin aviso de error)
- [ ] Ningún `id` existente cambió
- [ ] Los IDs nuevos no se repiten
- [ ] El CHANGELOG tiene el cambio en `[Unreleased]`
