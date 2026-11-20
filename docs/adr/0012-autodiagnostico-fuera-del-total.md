# ADR 0012: El autodiagnóstico no cuenta en el avance total

- **Estado:** Reemplazada por ADR 0014
- **Fecha:** 2026-11-18

> Desde la versión 2.0.0 el autodiagnóstico se reemplazó por el nivel que marcas en cada habilidad.

## Contexto

La sección "Mi nivel" tiene un checklist para ubicarte (junior, intermedio, senior). Si contara en el porcentaje total, alguien con experiencia empezaría con el plan "avanzado" sin haber hecho nada.

## Decisión

El autodiagnóstico guarda sus marcas como las demás casillas, pero se excluye del cálculo del avance total. Muestra su propio resultado según cuántos temas marcaste.

## Consecuencias

- El avance total refleja solo lo que haces del plan.
- El autodiagnóstico se puede repetir cada pocos meses para medir el crecimiento.

## Alternativas consideradas

- **Contarlo en el total:** más simple, pero mezcla "dónde estoy" con "cuánto avancé".
