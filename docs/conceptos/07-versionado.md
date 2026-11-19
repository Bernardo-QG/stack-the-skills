# Versionado semántico, CHANGELOG y releases

## Versionado semántico (SemVer)

`MAJOR.MINOR.PATCH`, por ejemplo `1.4.2`:

| Sube | Cuándo | En este proyecto |
|---|---|---|
| PATCH | Correcciones que no agregan nada | Un typo, un bug de estilos |
| MINOR | Funciones o contenido nuevo, compatible | Una sección nueva, puntos nuevos al final |
| MAJOR | Cambios incompatibles | Reordenar puntos o cambiar ids (rompe el avance guardado) |

Al subir uno, los de la derecha vuelven a 0: de `1.4.2` a `1.5.0`.

## CHANGELOG

`CHANGELOG.md` sigue el formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/):

- Una sección `[Unreleased]` donde se anota lo que se va haciendo.
- Al publicar, eso pasa a una sección con número y fecha.
- Categorías: **Added**, **Changed**, **Fixed**, **Removed**, **Deprecated**, **Security**.

Se escribe para personas: qué cambió para quien usa el proyecto, no la lista de commits.

## Tags y releases

```bash
git tag -a v1.1.0 -m "v1.1.0"   # tag anotado: guarda autor, fecha y mensaje
git push --tags
```

En GitHub, un **Release** se crea a partir de un tag y muestra las notas de esa versión.

## Practica

1. Publica la v1.1.0 siguiendo los pasos del README.
2. Compara dos versiones en GitHub: `https://github.com/Bernardo-QG/stack-the-skills/compare/v1.0.0...v1.1.0`.

## Para aprender más

- [semver.org en español](https://semver.org/lang/es/)
- [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
