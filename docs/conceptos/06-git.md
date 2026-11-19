# Git: finales de línea, commits y autenticación

## Finales de línea: LF y CRLF

Cada sistema termina las líneas de texto distinto:

| Sistema | Carácter |
|---|---|
| Linux y macOS | `LF` (`\n`) |
| Windows | `CRLF` (`\r\n`) |

Git en Windows convierte a CRLF por defecto. De ahí venía la advertencia:

```
warning: in the working copy of 'README.md', LF will be replaced by CRLF…
```

La solución del proyecto (ADR 0006) es `.gitattributes`:

```
* text=auto eol=lf
```

y para aplicarlo a archivos que ya estaban agregados:

```bash
git add --renormalize .
```

`.editorconfig` complementa: hace que el editor guarde en LF desde el inicio.

**Lo que aprendimos en el camino:** crear el archivo desde CMD o PowerShell con `echo "* text=auto eol=lf"` guarda las comillas como texto, y Git responde `"* is not a valid attribute name`. En Git Bash se usa `printf '* text=auto eol=lf\n' > .gitattributes`.

## Conventional Commits

```
feat: add Stack the Skills page with fundamentals, checklist and standards
fix(auth): …
refactor: split page into html, css, js and json data files
chore: release v1.0.0
style: new stair logo with sage and terracotta palette
```

El prefijo dice qué tipo de cambio es. Facilita leer el historial y generar el CHANGELOG.

## Corregir el último commit

```bash
git commit --amend -m "mensaje nuevo"
```

Solo es seguro **antes de hacer push**. Después, reescribe historial público y obliga a `git push --force`.

## Autenticación con GitHub

GitHub no acepta tu contraseña para Git desde 2021. El error era:

```
remote: Invalid username or token. Password authentication is not supported for Git operations.
```

Opciones:
- **Git Credential Manager** (`git config --global credential.helper manager`): inicia sesión en el navegador y guarda el acceso.
- **Token personal** (fine-grained) con permiso de *Contents: Read and write* solo sobre el repo necesario.

## Practica

1. `git ls-files --eol`: revisa que la columna `i/` diga `i/lf` en todos los archivos.
2. `git log --oneline`: ¿tus mensajes siguen Conventional Commits?

## Para aprender más

- [Pro Git, en español](https://git-scm.com/book/es/v2)
- [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/)
- [GitHub: gitattributes y finales de línea](https://docs.github.com/es/get-started/getting-started-with-git/configuring-git-to-handle-line-endings)
