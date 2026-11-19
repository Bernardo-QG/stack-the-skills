# Stack the Skills

![Versión](https://img.shields.io/badge/versión-1.0.0-B4441C) ![Licencia MIT](https://img.shields.io/badge/licencia-MIT-16202C)

Mi referencia personal para programar mejor en cualquier lenguaje y en cualquier proyecto.

**Ver en vivo:** https://bernardo-qg.github.io/stack-the-skills/

## Qué contiene

**Referencia (primer plano)**
- **Mi nivel:** tabla junior, intermedio y senior y checklist de autodiagnóstico.
- **Fundamentos:** 12 niveles de conceptos universales, cada uno con una explicación corta.
- **Checklist universal:** preguntas para revisar cualquier código. Se copia como Markdown para PRs o issues.
- **Estándares:** convenciones de equipos profesionales (Conventional Commits, diseño de APIs, OWASP, testing, migraciones).
- **Oficio:** profesionalismo en el día a día y lo que más te hace crecer.

**Plan de 12 meses (segundo plano)**
- **Punto de partida, reglas y errores a evitar.**
- **Fases:** cuatro fases de noviembre 2026 a octubre 2027 que juntan inglés, portafolio, perfil y postulaciones.
- **Inglés:** niveles, rutina diaria, ruta de gramática, etapas, frases útiles y trucos.
- **Proyecto StockFlow:** proyecto de portafolio por capas con Java + Spring Boot + Angular.
- **Temario:** lo que se pregunta en entrevistas de Java y Angular.
- **Carrera:** especializaciones, certificaciones y comunidad.
- **Semana tipo, bitácora mensual editable y presupuesto.**
- **Recursos:** programación, inglés y trabajo remoto.

HTML, CSS y JavaScript sin frameworks ni build. El avance y la bitácora se guardan en el navegador (localStorage).

## Estructura

```
├── index.html          # Estructura de la página
├── CHANGELOG.md        # Historial de versiones
├── img/                # Favicon e imagen para vista previa en redes
├── css/styles.css      # Estilos y temas claro/oscuro
├── js/app.js           # Carga los datos, dibuja las secciones y guarda el avance
└── data/               # Todo el contenido editable
    ├── niveles.json      # Tabla junior/intermedio/senior y autodiagnóstico
    ├── fundamentos.json
    ├── checklist.json
    ├── estandares.json
    ├── oficio.json       # Profesionalismo y crecimiento
    ├── carrera.json      # Especializaciones, certificaciones y comunidad
    ├── plan.json         # Meta, fases, semana, bitácora y presupuesto
    ├── reglas.json       # Reglas y errores a evitar
    ├── ingles.json       # Niveles, rutina, gramática, etapas, frases y trucos
    ├── roadmap.json      # Proyecto StockFlow
    ├── temario.json
    └── recursos.json     # Por categoría: programación, inglés y trabajo remoto
```

## Editar el contenido

Todo el texto está en `data/`. Cada punto es un objeto con `text` y, opcionalmente, `note`:

```json
{ "text": "Inyección SQL y consultas parametrizadas", "note": "Aplica en cualquier lenguaje." }
```

- **Agrega puntos nuevos al final de su lista.** El avance se guarda por posición, así que reordenar o insertar a la mitad recorre las marcas.
- No cambies los `id` de las secciones existentes, por la misma razón.
- Para una sección nueva, usa un `id` que no exista (por ejemplo `f12`).
- En las fases, los puntos se cuentan a través de todos sus grupos: agrega los nuevos en el último grupo.
- La bitácora se guarda por mes y columna (`2027-01.efset`), así que puedes agregar meses sin perder lo escrito.

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

- **PATCH** (`1.0.1`): correcciones de texto o de errores.
- **MINOR** (`1.1.0`): contenido o funciones nuevas.
- **MAJOR** (`2.0.0`): cambios que rompen el avance guardado, como reordenar puntos o cambiar ids.

Pasos:

1. Mueve lo que está en `[Unreleased]` del `CHANGELOG.md` a una sección nueva con el número y la fecha.
2. Actualiza el número en el footer de `index.html`, en el badge de este README y en el `?v=` de `css/styles.css` y `js/app.js` dentro de `index.html`. Ese `?v=` obliga al navegador a descargar los archivos nuevos en vez de usar los que tiene en caché.
3. Haz commit, crea el tag y súbelo:

```bash
git commit -am "chore: release v1.1.0"
git tag -a v1.1.0 -m "v1.1.0"
git push && git push --tags
```

4. En GitHub, ve a **Releases → Draft a new release**, elige el tag y pega las notas del CHANGELOG.

## Licencia

[MIT](LICENSE) © 2026 Bernardo Quintino Guzman
