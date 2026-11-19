# ADR 0003: Guardar el avance en localStorage

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

Las casillas marcadas, los acordeones abiertos y la bitácora tienen que sobrevivir a recargar la página. No hay servidor ni base de datos.

## Decisión

Guardar todo en `localStorage` con tres llaves: `ruta-java-angular-v1` (casillas), `…-open` (acordeones abiertos) y `…-log` (bitácora). Todas las lecturas y escrituras van dentro de `try/catch`.

## Consecuencias

- Funciona sin servidor, sin cuentas y sin costo.
- El avance vive en **un navegador de un dispositivo**: no se sincroniza entre computadora y celular, y se pierde si se borran los datos del sitio.
- El `try/catch` evita que la página se rompa en modo privado o con el almacenamiento bloqueado.
- La llave conserva el nombre original del proyecto (`ruta-java-angular-v1`) para no perder el avance al renombrarlo a Stack the Skills.

## Alternativas consideradas

- **Base de datos con login (Supabase, Firebase):** sincroniza dispositivos, pero agrega cuentas, costos y seguridad que cuidar.
- **Exportar e importar un archivo JSON:** buena mejora futura para respaldar el avance sin servidor.

## Para aprender más

- [Conceptos: localStorage](../conceptos/04-localstorage.md)
