# Stack the Skills

![Versión](https://img.shields.io/badge/versión-2.1.0-9B2A62) ![Licencia MIT](https://img.shields.io/badge/licencia-MIT-1C1B2B)

Mapa de habilidades para llegar a **desarrollador senior y bilingüe**: habilidades, herramientas, conceptos y metodologías, con lo que se espera en cada nivel.

**Ver en vivo:** https://bernardo-qg.github.io/stack-the-skills/

## Qué contiene

- **14 dominios y 141 habilidades:** fundamentos de computación, lenguajes, backend, frontend, datos, arquitectura, calidad, DevOps y nube, seguridad, IA aplicada, herramientas, metodologías, habilidades profesionales e inglés.
- **Niveles por habilidad:** qué se espera en junior, intermedio y senior (en inglés, A2, B1 y B2+ del MCER).
- **Dos modos de vista:**
  - **Por nivel:** qué te falta para el siguiente nivel, dominio por dominio.
  - **Por complejidad y utilidad:** una matriz de 3 × 3 para decidir por dónde empezar.
- **Tu nivel en cada habilidad**, guardado en el navegador (localStorage), y un resumen de tu avance.

HTML, CSS y JavaScript sin frameworks ni build.

## Proyectos relacionados

| Repo | Pregunta |
|---|---|
| `engineering-handbook` | ¿Cómo trabajo? Reglas y principios para cualquier proyecto |
| **`stack-the-skills`** | ¿Qué tengo que aprender? |
| `growth-plan` (privado) | ¿Hacia dónde voy? Mi plan personal |

## Estructura

```
├── index.html            # Estructura de la página
├── CHANGELOG.md          # Historial de versiones
├── css/styles.css        # Estilos y temas claro/oscuro
├── js/app.js             # Carga los datos, dibuja el mapa y guarda tu nivel
├── img/                  # Favicon e imagen para vista previa en redes
├── docs/                 # Decisiones (ADRs), conceptos aplicados y guía de contenido
└── data/
    ├── domains.json      # Orden de los dominios y criterios de complejidad y utilidad
    ├── domains/          # Un archivo por dominio con sus habilidades
    ├── levels.json       # Qué significa cada nivel y la comparativa
    └── resources.json    # Recursos generales
```

## Editar el contenido

Cada habilidad es un objeto en `data/domains/<dominio>.json`. La regla más importante: **nunca cambies el `id` de una habilidad existente**, porque tu nivel se guarda con él. Todo lo demás está en la [guía de contenido](docs/guia-de-contenido.md).

## Documentación

En [`docs/`](docs/README.md) está por qué el proyecto es como es ([decisiones](docs/adr/README.md)) y los conceptos aplicados explicados con el código del proyecto, como material de estudio.

## Correr localmente

La página carga los JSON con `fetch`, así que abrir `index.html` con doble clic no funciona. Usa un servidor local:

```bash
npx serve .
# o
python -m http.server 8000
```

También sirve la extensión **Live Server** de VS Code.

## Publicar una versión

El proyecto usa [Versionado Semántico](https://semver.org/lang/es/):

- **PATCH** (`2.0.1`): correcciones de texto o de errores.
- **MINOR** (`2.1.0`): habilidades, dominios o funciones nuevas.
- **MAJOR** (`3.0.0`): cambios que rompen el avance guardado, como cambiar IDs.

Pasos:

1. Mueve lo que está en `[Unreleased]` del `CHANGELOG.md` a una sección nueva con el número y la fecha.
2. Actualiza el número en el footer de `index.html`, en el badge de este README y en el `?v=` de `css/styles.css` y `js/app.js` dentro de `index.html`.
3. Haz commit, crea el tag y súbelo:

```bash
git commit -am "chore: release v2.1.0"
git tag -a v2.1.0 -m "v2.1.0"
git push && git push --tags
```

4. En GitHub, ve a **Releases → Draft a new release**, elige el tag y pega las notas del CHANGELOG.

## Licencia

[MIT](LICENSE) © 2026 Bernardo Quintino Guzman
