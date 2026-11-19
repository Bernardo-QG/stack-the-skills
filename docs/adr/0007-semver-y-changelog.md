# ADR 0007: Versionado semántico y CHANGELOG

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

El proyecto va a seguir creciendo y conviene saber qué cambió y cuándo, igual que en un proyecto de equipo.

## Decisión

Usar Versionado Semántico (`MAJOR.MINOR.PATCH`), un `CHANGELOG.md` con el formato Keep a Changelog, tags de Git (`v1.0.0`) y GitHub Releases. La versión se muestra en el footer.

## Consecuencias

- Cada versión explica qué se agregó, cambió, corrigió o quitó.
- **MAJOR** queda reservado para cambios que rompen el avance guardado (reordenar puntos, cambiar ids).
- Publicar una versión toca varios lugares: CHANGELOG, footer, badge del README y `?v=` en `index.html` (ver ADR 0008). Los pasos están en el README.

## Alternativas consideradas

- **Sin versiones, solo commits:** suficiente para un proyecto mínimo, pero no deja ver la evolución de un vistazo.

## Para aprender más

- [Conceptos: versionado y releases](../conceptos/07-versionado.md)
