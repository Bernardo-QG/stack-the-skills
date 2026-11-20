# ADR 0016: Paleta "Evolución"

- **Estado:** Aceptada
- **Fecha:** 2026-11-19

## Contexto

Desde la versión 2.0.0, Stack the Skills es un mapa para subir de junior a senior. La paleta salvia y terracota (ADR 0010) no transmitía esa idea de progreso, y además growth-plan ahora usa tonos verdes, así que convenía distinguir mejor los dos proyectos.

## Decisión

- **Logo:** se mantiene la escalera, pero **cada escalón tiene su color**: azul profundo (`#2B3A8C`), violeta (`#6A3FA0`) y magenta (`#C2367A`), como una especie que evoluciona.
- **Niveles:** los mismos tres colores marcan junior, intermedio y senior en toda la página (selector de nivel, resumen y matriz).
- **Acento:** un magenta oscuro (`#9B2A62`) para el texto sobre fondo claro, con buen contraste; en modo oscuro, un magenta claro (`#F06BAA`).
- **Neutros:** grises con un toque violeta para que combinen.

## Consecuencias

- El logo y los niveles cuentan la misma historia: subir un escalón es cambiar de color.
- Se distingue al instante de growth-plan (verde) cuando las dos pestañas están abiertas.
- Todos los colores siguen centralizados en los bloques `:root` de `styles.css`. La imagen `img/og-image.png` se regenera aparte.

## Alternativas consideradas

- Acero y naranja de seguridad, concreto y amarillo precaución (industriales), constructivista (rojo y negro), cobre y pátina, y revolución eléctrica (azul marino y cian). Se eligió "Evolución" porque es la que mejor representa subir de nivel.
