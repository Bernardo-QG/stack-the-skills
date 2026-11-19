# ADR 0006: Normalizar los finales de línea a LF

- **Estado:** Aceptada
- **Fecha:** 2026-11-18

## Contexto

Git en Windows convierte por defecto los finales de línea a CRLF (`core.autocrlf=true`). Al hacer `git add` aparecían advertencias de LF y CRLF, y los archivos podían cambiar según quién los editara.

## Decisión

Agregar `.gitattributes` con `* text=auto eol=lf` y `.editorconfig` con `end_of_line = lf`, UTF-8 e indentación de 2 espacios.

## Consecuencias

- El repo guarda todo en LF sin importar el sistema operativo o la configuración global de Git.
- La regla viaja con el proyecto; no hace falta cambiar la configuración global, que podría afectar proyectos del trabajo que sí necesitan CRLF.
- Los editores que soportan EditorConfig (VS Code con extensión, IntelliJ) aplican las mismas reglas al guardar.

## Alternativas consideradas

- **`git config --global core.autocrlf input`:** funciona, pero afecta a todos los repos de la computadora.

## Para aprender más

- [Conceptos: Git, finales de línea y commits](../conceptos/06-git.md)
