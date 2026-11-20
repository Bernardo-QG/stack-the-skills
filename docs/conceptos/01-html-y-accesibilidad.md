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

### Selector de nivel con `radio` y `<label for>`

```html
<div class="picker" role="radiogroup" aria-label="Mi nivel en Índices y planes de ejecución">
  <input type="radio" id="lv-data-indexes-2" name="lv-data-indexes" value="2">
  <label for="lv-data-indexes-2" title="Intermedio">Int</label>
  …
</div>
```

Son radios nativos escondidos con CSS: el `<label>` conectado al `id` es lo que se ve y se toca. Al compartir el mismo `name`, solo uno puede estar marcado, y se pueden recorrer con las flechas del teclado sin programar nada.

### Botones que dicen su estado

Los botones de modo y de nivel objetivo usan `aria-pressed="true"` o `"false"`, así un lector de pantalla anuncia cuál está activo.

### Otros detalles

- `aria-label` en la navegación y en cada selector de nivel, que no tiene un texto visible que lo describa.
- `aria-hidden="true"` en elementos decorativos (los números de las capas, la flecha del acordeón).
- `:focus-visible` en CSS para que al navegar con Tab se vea dónde estás.
- `prefers-reduced-motion` para quitar animaciones a quien lo pidió en su sistema.

## Practica

1. Navega toda la página solo con el teclado (Tab, Shift+Tab, Enter, Espacio). ¿Llegas a todo?
2. Abre las herramientas de desarrollo → Lighthouse → Accesibilidad. Corrige lo que marque.

## Para aprender más

- [MDN: `<details>`](https://developer.mozilla.org/es/docs/Web/HTML/Element/details)
- [MDN: accesibilidad](https://developer.mozilla.org/es/docs/Learn/Accessibility)
