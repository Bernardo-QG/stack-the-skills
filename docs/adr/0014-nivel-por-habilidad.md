# ADR 0014: Marcar el nivel de cada habilidad, guardado por su ID

- **Estado:** Aceptada
- **Fecha:** 2026-11-19

## Contexto

En la versión 1.x se marcaban casillas sueltas y el avance se guardaba por posición (ADR 0004): reordenar o insertar puntos recorría las marcas. Además, una casilla no dice qué tan bien dominas algo.

## Decisión

- Cada habilidad tiene un ID descriptivo y estable: dominio + nombre en inglés y kebab-case, sin números (`data-indexes`, `security-owasp-top-10`).
- En cada habilidad eliges tu nivel: aún no, junior, intermedio o senior (valores 0 a 3).
- Se guarda en `localStorage` como `{ "data-indexes": 2 }` bajo la llave `sts-skill-levels-v2`.

## Consecuencias

- Puedes reordenar, mover y agregar habilidades sin perder tu avance.
- **No se debe cambiar el `id`** de una habilidad existente; el nombre visible sí se puede cambiar.
- La página puede calcular cuánto te falta para cada nivel, por dominio y en total.
- El autodiagnóstico de 15 preguntas (ADR 0012) ya no hace falta: el mapa completo es el autodiagnóstico.

## Alternativas consideradas

- **Mantener casillas por posición:** ya mostró sus límites.
- **IDs con número (`05-04-data-indexes`):** se descartaron porque el número no aporta al leerlo y obliga a mantener una numeración.
