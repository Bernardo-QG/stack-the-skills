# Stack the Skills

Mi referencia personal para programar mejor en cualquier lenguaje y en cualquier proyecto.

**Ver en vivo:** https://bernardo-qg.github.io/stack-the-skills/

## Qué contiene

- **Fundamentos:** 11 niveles de conceptos universales (lógica, estructuras de datos, bases de datos, web, diseño, seguridad, operación…), cada uno con una explicación corta.
- **Checklist universal:** preguntas para revisar cualquier código antes de darlo por terminado. Se puede copiar como Markdown para usarla en PRs o issues.
- **Estándares:** convenciones de equipos profesionales (Conventional Commits, diseño de APIs, OWASP, testing, migraciones).
- **Plan de práctica:** un proyecto por capas y el temario específico de Java + Spring Boot + Angular.

HTML, CSS y JavaScript sin frameworks ni build. El avance se guarda en el navegador (localStorage).

## Estructura

```
├── index.html            # Estructura de la página
├── css/styles.css        # Estilos y temas claro/oscuro
├── js/app.js             # Carga los datos, dibuja las secciones y guarda el avance
└── data/                 # Todo el contenido editable
    ├── fundamentos.json
    ├── checklist.json
    ├── estandares.json
    ├── roadmap.json
    ├── temario.json
    └── recursos.json
```

## Editar el contenido

Todo el texto está en `data/`. Cada punto es un objeto con `text` y, opcionalmente, `note`:

```json
{ "text": "Inyección SQL y consultas parametrizadas", "note": "Aplica en cualquier lenguaje." }
```

- **Agrega puntos nuevos al final de su lista.** El avance se guarda por posición, así que reordenar o insertar a la mitad recorre las marcas.
- No cambies los `id` de las secciones existentes, por la misma razón.
- Para una sección nueva, usa un `id` que no exista (por ejemplo `f12`).

## Correr localmente

La página carga los JSON con `fetch`, así que abrir `index.html` con doble clic no funciona. Usa un servidor local:

```bash
npx serve .
# o
python -m http.server 8000
```

También sirve la extensión **Live Server** de VS Code.
