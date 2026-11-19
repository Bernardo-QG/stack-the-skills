# Stack the Skills

Mi referencia personal para programar mejor en cualquier lenguaje y en cualquier proyecto.

**Ver en vivo:** https://bernardo-qg.github.io/stack-the-skills/

## Qué contiene

- **Fundamentos:** 11 niveles de conceptos universales (lógica, estructuras de datos, bases de datos, web, diseño, seguridad, operación…), cada uno con una explicación corta.
- **Checklist universal:** preguntas para revisar cualquier código antes de darlo por terminado. Se puede copiar como Markdown para usarla en PRs o issues.
- **Estándares:** convenciones de equipos profesionales (Conventional Commits, diseño de APIs, OWASP, testing, migraciones).
- **Plan de práctica:** un proyecto por capas y el temario específico de Java + Spring Boot + Angular.
- **Plan de inglés** (`plan-ingles.html`): rutina, ruta de gramática, etapas y recursos.
- **Plan USD** (`plan-usd.html`): plan de 12 meses para conseguir trabajo remoto pagado en dólares.

HTML, CSS y JavaScript sin frameworks ni build. El avance se guarda en el navegador (localStorage).

## Estructura

```
├── index.html            # Página principal: fundamentos, checklist y estándares
├── plan-ingles.html      # Plan de inglés (se dibuja desde data/plan-ingles.md)
├── plan-usd.html         # Plan USD (se dibuja desde data/plan-usd.md)
├── css/styles.css        # Estilos y temas claro/oscuro
├── js/
│   ├── app.js            # Lógica de la página principal
│   ├── markdown-page.js  # Convierte un .md en página con acordeones y casillas
│   └── vendor/marked.min.js  # Librería Markdown (marked 12.0.2, MIT)
└── data/                 # Todo el contenido editable
    ├── plan-ingles.md
    ├── plan-usd.md
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

## Editar los planes

Los planes son Markdown normal en `data/plan-ingles.md` y `data/plan-usd.md`:

- Cada `## Título` se convierte en un acordeón.
- Cada `- [ ] tarea` se vuelve una casilla que guarda su estado.
- Las casillas se identifican por su texto: puedes reordenarlas sin perder el avance, pero si cambias el texto de una, vuelve a aparecer sin marcar.

Para agregar otro plan, copia `plan-usd.html`, cambia `data-src` y `data-key`, y agrega el link en la barra de navegación de cada página.

## Correr localmente

La página carga los JSON con `fetch`, así que abrir `index.html` con doble clic no funciona. Usa un servidor local:

```bash
npx serve .
# o
python -m http.server 8000
```

También sirve la extensión **Live Server** de VS Code.
