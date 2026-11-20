# ADR 0003: Guardar el avance en localStorage

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

Lo que marcas en la página tiene que sobrevivir a recargar la página. No hay servidor ni base de datos.

## Decisión

Guardar todo en `localStorage`. Desde la versión 2.0.0 hay dos llaves: `sts-skill-levels-v2` (tu nivel en cada habilidad) y `sts-ui-v2` (modo de vista, nivel objetivo y acordeones abiertos). Todas las lecturas y escrituras van dentro de `try/catch`.

## Consecuencias

- Funciona sin servidor, sin cuentas y sin costo.
- El avance vive en **un navegador de un dispositivo**: no se sincroniza entre computadora y celular, y se pierde si se borran los datos del sitio.
- El `try/catch` evita que la página se rompa en modo privado o con el almacenamiento bloqueado.
- En la versión 1.x la llave era `ruta-java-angular-v1`. La 2.0.0 usa llaves nuevas porque la forma de guardar cambió por completo (ADR 0014).

## Alternativas consideradas

- **Base de datos con login (Supabase, Firebase):** sincroniza dispositivos, pero agrega cuentas, costos y seguridad que cuidar.
- **Exportar e importar un archivo JSON:** buena mejora futura para respaldar el avance sin servidor.

## Para aprender más

- [Conceptos: localStorage](../conceptos/04-localstorage.md)
