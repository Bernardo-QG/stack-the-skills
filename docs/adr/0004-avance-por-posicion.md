# ADR 0004: Identificar cada casilla por su posición en la lista

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

Cada casilla necesita una llave estable para guardar si está marcada.

## Decisión

La llave es `<id de sección>-<posición>`, por ejemplo `f1-0` para el primer punto del nivel 1. En las fases, la posición cuenta a través de todos los grupos.

## Consecuencias

- Llaves cortas y fáciles de leer.
- **Regla de edición:** los puntos nuevos se agregan al final de su lista (o en un grupo nuevo al final). Insertar a la mitad o reordenar recorre las marcas guardadas.
- Cambiar el texto de un punto no pierde su marca.
- Quitar una sección entera pierde sus marcas, como pasó al mover "IA aplicada" del Temario a Fundamentos (ver CHANGELOG).

## Alternativas consideradas

- **Llave por hash del texto:** permite reordenar, pero corregir un typo desmarca el punto. Se usó en las páginas Markdown que luego se quitaron (ADR 0005).
- **Un `id` escrito a mano en cada punto:** el más robusto, pero agrega trabajo y ruido a cada JSON. Se puede adoptar si el contenido empieza a reordenarse seguido.
