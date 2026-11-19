# Caché del navegador y GitHub Pages

## GitHub Pages

Sirve archivos estáticos directo desde un repo. Hay dos tipos:

| Tipo | Repo | URL |
|---|---|---|
| De usuario | `Bernardo-QG.github.io` (solo uno por cuenta) | `bernardo-qg.github.io/` |
| De proyecto | cualquier otro repo | `bernardo-qg.github.io/nombre-del-repo/` |

Por eso este proyecto convive con tu portafolio sin pisarlo. Se activa en **Settings → Pages**, eligiendo rama y carpeta.

## Caché HTTP

Para cargar más rápido, el navegador guarda copias de los archivos. El servidor indica cuánto tiempo con encabezados como `Cache-Control: max-age=600` (10 minutos), que es lo que suele mandar GitHub Pages.

**El problema que tuvimos** (ADR 0008): el `index.html` era nuevo, pero el navegador seguía usando el `app.js` viejo. Resultado: secciones vacías.

## Las dos soluciones aplicadas

**1. Parámetro de versión en la URL**

```html
<link rel="stylesheet" href="css/styles.css?v=1.1.0">
<script src="js/app.js?v=1.1.0" defer></script>
```

Para el navegador, `app.js?v=1.1.0` y `app.js?v=1.0.1` son archivos distintos. Al cambiar el número, descarga el nuevo.

**2. `no-cache` en `fetch`**

```js
fetch(url, { cache: "no-cache" })
```

`no-cache` **no** significa "no guardar". Significa "antes de usar la copia, pregunta al servidor si cambió". Si no cambió, el servidor responde `304 Not Modified` sin reenviar el archivo.

## Practica

1. Herramientas de desarrollo → Network: recarga y observa qué archivos vienen de caché y cuáles responden `304`.
2. Marca "Disable cache" en Network y compara.

## Para aprender más

- [MDN: caché HTTP](https://developer.mozilla.org/es/docs/Web/HTTP/Caching)
- [GitHub Pages](https://docs.github.com/es/pages)
