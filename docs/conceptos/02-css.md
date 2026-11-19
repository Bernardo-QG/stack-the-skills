# CSS: tokens, temas claro/oscuro y layout

## Variables CSS como tokens de diseño

Todos los colores y fuentes están definidos una sola vez en `:root`:

```css
:root{
  --bg:#F4F5F2; --ink:#1E2A23; --accent:#A9542F; …
  --f-display:"Bricolage Grotesque", "Segoe UI", system-ui, sans-serif;
}
body{ background:var(--bg); color:var(--ink) }
```

Los componentes nunca usan un color directo, siempre `var(--algo)`. Cambiar la paleta completa es editar un bloque (ver ADR 0010).

## Modo oscuro

```css
@media (prefers-color-scheme: dark){
  :root:not([data-theme="light"]){ --bg:#121714; --ink:#E6EBE7; …; color-scheme:dark }
}
```

- `prefers-color-scheme` lee la preferencia del sistema operativo.
- Solo se **redefinen las variables**; los componentes no cambian.
- `color-scheme: dark` hace que las casillas y barras de scroll nativas también se vean oscuras.

## Layout con Grid y Flexbox

- **Grid** para estructuras en dos dimensiones o listas de tarjetas: `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))` acomoda tantas columnas como quepan y pasa a una sola en celular, sin media queries.
- **Flexbox** para filas que se envuelven: la barra de herramientas, las etiquetas.
- **`gap`** en lugar de márgenes entre elementos hermanos.

## El bug de `minmax(0, 1fr)`

En celular la página se desbordaba hacia un lado. La causa: una columna `1fr` en Grid **no puede ser más angosta que su contenido**, y una palabra larga como `debeRechazarSalida_cuandoStockInsuficiente` empujaba todo.

```css
/* antes */  .layer{ grid-template-columns:56px 1fr }
/* después */.layer{ grid-template-columns:56px minmax(0,1fr) }
.checks span{ overflow-wrap:anywhere }
```

`minmax(0, 1fr)` permite que la columna se encoja hasta 0, y `overflow-wrap: anywhere` deja que la palabra larga se parta. Es uno de los bugs de CSS más comunes.

## Practica

1. Cambia `--accent` y observa qué partes de la página cambian.
2. Quita un `minmax(0,1fr)`, abre la página a 400 px de ancho y busca el desbordamiento.

## Para aprender más

- [MDN: variables CSS](https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties)
- [CSS-Tricks: guía de Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
