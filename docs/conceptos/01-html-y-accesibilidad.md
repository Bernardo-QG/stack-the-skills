# HTML semántico y accesibilidad

## Qué es

HTML semántico es usar cada etiqueta para lo que significa (`<nav>` para navegación, `<section>` para secciones, `<table>` para datos tabulares) en lugar de llenar todo de `<div>`. El navegador, los lectores de pantalla y los buscadores entienden mejor la página.

## Dónde se usa en el proyecto

### Acordeones con `<details>` y `<summary>`

Todos los acordeones son HTML nativo, sin librerías:

```html
<details class="acc" data-acc="f1">
  <summary>…título, contador y barra…</summary>
  <div class="acc-body">…contenido…</div>
</details>
```

`<details>` ya sabe abrirse y cerrarse con clic, con teclado (Enter o Espacio) y lo anuncia a los lectores de pantalla. Hacer lo mismo con `<div>` y JavaScript obliga a programar todo eso a mano.

### Casillas con `<label for>`

```html
<label for="f1-0"><input type="checkbox" id="f1-0"><span>Tipos de datos…</span></label>
```

El `<label>` conectado al `id` del input hace que todo el texto sea clicable, no solo el cuadrito.

### Otros detalles

- `aria-label` en la navegación y en los campos de la bitácora, que no tienen un texto visible al lado.
- `aria-hidden="true"` en elementos decorativos (los números de las capas, la flecha del acordeón).
- `:focus-visible` en CSS para que al navegar con Tab se vea dónde estás.
- `prefers-reduced-motion` para quitar animaciones a quien lo pidió en su sistema.

## Practica

1. Navega toda la página solo con el teclado (Tab, Shift+Tab, Enter, Espacio). ¿Llegas a todo?
2. Abre las herramientas de desarrollo → Lighthouse → Accesibilidad. Corrige lo que marque.

## Para aprender más

- [MDN: `<details>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/details)
- [MDN: accesibilidad](https://developer.mozilla.org/es/docs/Learn/Accessibility)
