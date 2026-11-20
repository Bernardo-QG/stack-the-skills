# Seguridad: escapar HTML para evitar XSS

## Qué es XSS

*Cross-Site Scripting*: cuando un texto que no controlas se inserta como HTML y el navegador lo ejecuta. Si un dato contuviera `<img src=x onerror="robarDatos()">` y se metiera con `innerHTML`, ese código correría. Está en el OWASP Top 10, dentro de la categoría de inyección.

## Cómo se previene en el proyecto

Todo texto que viene de los JSON pasa por `escapeHtml` antes de insertarse:

```js
const escapeHtml = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
```

Así `<script>` se muestra como texto y no se ejecuta.

Cuando no hace falta HTML, se usa `textContent`, que nunca interpreta etiquetas:

```js
$("levelRule").textContent = lv.rule;
```

## ¿Por qué cuidarlo si el contenido es mío?

Porque es el hábito correcto. En el trabajo, los datos vienen de usuarios, de bases de datos o de otras APIs. Si escapas siempre, no tienes que pensar de dónde viene cada texto.

Es la misma idea que las **consultas parametrizadas** en SQL: nunca concatenar datos externos dentro de código.

## Practica

1. Pon `<b>hola</b>` como texto de un punto en un JSON. ¿Se ve en negritas o como texto?
2. Busca en `app.js` todos los `innerHTML` y verifica que cada dato externo pase por `escapeHtml`.

## Para aprender más

- [OWASP: Cross Site Scripting](https://owasp.org/www-community/attacks/xss/)
- [OWASP Top 10](https://owasp.org/Top10/)
