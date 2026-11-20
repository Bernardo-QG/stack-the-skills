# ADR 0015: Dos modos de vista: por nivel y por complejidad y utilidad

- **Estado:** Aceptada
- **Fecha:** 2026-11-19

## Contexto

Con 141 habilidades, una lista plana abruma. Hacen falta dos respuestas distintas: qué me falta para el siguiente nivel y por dónde empiezo.

## Decisión

- **Por nivel:** eliges junior, intermedio o senior y ves, dominio por dominio, lo que se espera en ese nivel y cuánto cumples. Se puede filtrar para ver solo lo que falta.
- **Por complejidad y utilidad:** una matriz de 3 × 3. Arriba a la izquierda, lo de utilidad alta y complejidad baja: por ahí se empieza.
- Criterios: **complejidad** es el tiempo y esfuerzo para llegar a nivel intermedio; **utilidad** es qué tanto se usa en el día a día y qué tanto la piden las vacantes de backend y full stack.

## Consecuencias

- Cada habilidad lleva dos calificaciones (`complexity`, `usefulness`) con valores `baja`, `media` o `alta`.
- Muchas habilidades quedaron con utilidad alta, porque el mapa es justamente de lo que necesita un senior. Si la matriz deja de ayudar a decidir, se puede recalibrar con un criterio más estricto.

## Alternativas consideradas

- **Una sola prioridad (alta, media, baja):** más simple, pero mezcla lo difícil con lo útil.
- **Matriz de 4 cuadrantes:** obliga a forzar cada calificación a alta o baja.
