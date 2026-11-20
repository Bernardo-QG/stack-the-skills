# Changelog

Todos los cambios importantes de este proyecto se documentan aquí.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y el proyecto usa [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

## [2.0.0] - 2026-11-19

Stack the Skills pasa a ser **solo el mapa de habilidades** para llegar a desarrollador senior y bilingüe (ADR 0013). Es un cambio incompatible: el avance de la versión 1.x no se conserva.

### Added
- Mapa de 14 dominios y 141 habilidades en `data/domains/`, cada una con descripción, niveles junior/intermedio/senior, complejidad, utilidad, recursos y evidencia.
- Selector de "mi nivel" en cada habilidad, guardado por ID (ADR 0014).
- Modo **por nivel**: lo que se espera en junior, intermedio o senior, con filtro "solo lo que me falta".
- Modo **por complejidad y utilidad**: matriz de 3 × 3 para decidir por dónde empezar (ADR 0015).
- Resumen de tu mapa: cuántas habilidades tienes en cada nivel y cuánto te falta para intermedio y senior.
- ADRs 0013, 0014 y 0015.

### Changed
- La comparativa junior/intermedio/senior se movió a `data/levels.json`.
- Recursos en `data/resources.json`, sin la categoría de trabajo remoto.
- Guía de contenido y conceptos actualizados a la nueva estructura.

### Removed
- Plan personal (fases, bitácora, presupuesto, semana tipo, reglas de estudio, plan de inglés, proyecto StockFlow y carrera): se mueve al repo privado `growth-plan`.
- Estándares: se convierten en reglas del `engineering-handbook`.
- Checklist universal: la reemplazan las reglas verificables del handbook.
- Autodiagnóstico de 15 preguntas: lo reemplaza el nivel por habilidad (ADR 0012 reemplazada por 0014).

## [1.1.0] - 2026-11-18

### Added
- Sección "Mi nivel": tabla junior, intermedio y senior, checklist de autodiagnóstico con resultado y señales de que vas pasando a senior.
- Nivel 12 de Fundamentos: IA aplicada.
- Más puntos en Fundamentos: CTEs, diseño de sistemas, Strangler Fig, pruebas de caracterización, CSRF, rendimiento en frontend y git bisect.
- Sección "Oficio": profesionalismo en el día a día y lo que más te hace crecer.
- Grupos "En el trabajo" y "Entrevistas" en las fases.
- Capa del proyecto: función con IA.
- Técnicas de estudio, hábitos de todo el año e inglés técnico.
- Sección "Carrera": especializaciones, certificaciones y comunidad.
- Revisión mensual y columna "Qué apliqué en el trabajo" en la bitácora.
- Libros recomendados y fuentes de tendencias 2026 en Recursos.
- Carpeta `docs/` con 12 decisiones de arquitectura (ADRs), 9 guías de conceptos aplicados y la guía de contenido.

### Removed
- "IA aplicada al desarrollo" del Temario Java/Angular: ahora es el nivel 12 de Fundamentos.

### Fixed
- El navegador ya no usa versiones en caché de los estilos, el script y los datos después de una actualización.

### Changed
- Nuevo logo de escalera y paleta salvia y terracota en la página, el favicon y la imagen para redes.

## [1.0.0] - 2026-11-18

### Added
- Fundamentos: 11 niveles de conceptos universales, cada uno con una explicación corta.
- Checklist universal de revisión de código, copiable como Markdown.
- Estándares profesionales: estilo, commits, PRs, APIs, seguridad, testing, base de datos y documentación.
- Plan de 12 meses: punto de partida, reglas, errores a evitar y cuatro fases con checkpoints.
- Sección de inglés: niveles, rutina diaria, ruta de gramática, etapas, frases útiles y trucos.
- Proyecto de portafolio StockFlow por capas y temario de Java + Angular.
- Semana tipo, bitácora mensual editable y presupuesto.
- Recursos por categoría: programación, inglés y trabajo remoto.
- Acordeones con avance por sección y avance total guardados en el navegador.
- Contenido en archivos JSON dentro de `data/`.
- Favicon, imagen de vista previa para redes y metadatos Open Graph.
- Licencia MIT y `.editorconfig`.

[Unreleased]: https://github.com/Bernardo-QG/stack-the-skills/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/Bernardo-QG/stack-the-skills/releases/tag/v2.0.0
