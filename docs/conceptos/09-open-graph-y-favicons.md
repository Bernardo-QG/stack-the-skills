# Open Graph y favicons

## Open Graph

Son etiquetas `<meta>` que leen WhatsApp, LinkedIn, Slack o Discord para mostrar la vista previa de un link:

```html
<meta property="og:title" content="Stack the Skills">
<meta property="og:description" content="Mapa de habilidades para llegar a desarrollador senior…">
<meta property="og:image" content="https://bernardo-qg.github.io/stack-the-skills/img/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
```

- La imagen debe ser una **URL absoluta y pública**, y medir 1200 × 630 px.
- Las apps guardan la vista previa en caché. En LinkedIn se fuerza con su Post Inspector.

## Favicons

```html
<link rel="icon" href="img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="img/apple-touch-icon.png">
```

- **SVG:** se ve nítido en cualquier tamaño y puede tener su propio modo oscuro con `@media (prefers-color-scheme: dark)` dentro del archivo.
- **apple-touch-icon** (PNG de 180 × 180): el ícono al guardar la página en la pantalla de inicio del celular.
- Un favicon se ve a 16 × 16 px: por eso el logo es simple, tres bloques sin texto.

## `theme-color`

```html
<meta name="theme-color" content="#F4F5F2" media="(prefers-color-scheme: light)">
```

Colorea la barra del navegador en el celular.

## Practica

1. Pega el link de tu página en WhatsApp y revisa la vista previa.
2. Prueba el link en [opengraph.xyz](https://www.opengraph.xyz).

## Para aprender más

- [Protocolo Open Graph](https://ogp.me/)
