# Flujo de cambios para Claude Code

Este sitio se publica desde Git: Vercel despliega `main` en producción y cada push a otra rama genera un Preview. Usamos `staging` como rama estable de revisión. La terminal y Claude Code pueden hacer todos los pasos de Git y pull requests con `gh`; no hace falta usar la interfaz de GitHub.

## Preparación, una sola vez

1. El dueño del repositorio invita a la diseñadora con permiso **Write** en GitHub. Ella acepta la invitación y autentica Git y `gh` en su computadora (`gh auth login` y `gh auth status`). No compartir claves ni tokens en el chat.
2. Instalar Node.js 22, pnpm 11 y GitHub CLI. Clonar `git@github.com:luckystoned/itsmicki.git`, entrar en la carpeta del repo y ejecutar:

   ```bash
   pnpm install --frozen-lockfile
   pnpm hooks:install
   pnpm check
   pnpm build
   ```

   El hook local ejecuta los dos controles antes de cada push. GitHub Actions los repite en los pull requests; el hook es una ayuda local, no reemplaza CI.
3. Crear `staging` desde el `main` actual y subirla **una sola vez**, después de incorporar este documento a `main`:

   ```bash
   git switch main
   git pull --ff-only origin main
   git switch -c staging
   git push -u origin staging
   ```

   Si `staging` ya existe, usar `git fetch origin` y `git switch --track origin/staging`.
4. En Vercel, confirmar que este repositorio esté conectado, que **Production Branch** sea `main` y que los pushes a `staging` creen Preview. Vercel entrega una URL propia por despliegue y una URL de rama. Si se desea una dirección fija tipo `staging.itsmicki.com`, agregar el dominio al proyecto de Vercel y asignarlo a la rama `staging` en Preview. Revisar la protección del Preview si se comparte material que todavía no debe ser público. Para este sitio estático no se requieren variables de entorno adicionales.
5. En GitHub, configurar reglas para `main` y `staging`: exigir pull request y el check **validate**, y bloquear pushes directos. El dueño decide si también exige una aprobación ajena a la autora. Las reglas efectivas dependen de la configuración y el plan de GitHub; comprobarlas con un PR de prueba.

## Un cambio pequeño

Crear una rama nueva desde `staging` actualizado:

```bash
git fetch origin
git switch staging
git pull --ff-only origin staging
git switch -c ajuste/nombre-corto
```

Pedirle a Claude Code el cambio concreto. Antes de subirlo, revisar el diff y el sitio en móvil y escritorio:

```bash
pnpm dev
pnpm check
pnpm build
git diff --check
git status
git diff
```

Detener `pnpm dev` con `Ctrl+C`. Versionar solo los archivos del ajuste, sin `dist/`, `node_modules/` ni archivos locales:

```bash
git add <archivos-del-cambio>
git commit -m "fix: descripcion breve"
git push -u origin ajuste/nombre-corto
gh pr create --base staging --head ajuste/nombre-corto --fill
gh pr checks --watch
```

Vercel genera un Preview para la rama y otro despliegue cuando el cambio llega a `staging`. Abrir su URL desde la salida de Vercel o con `gh pr view --web` si se quiere ver el enlace del PR. Revisar las páginas afectadas, móvil y escritorio, imágenes, videos, navegación y foco de teclado. Si algo falla, corregir en la misma rama y repetir el push.

Cuando el PR hacia `staging` esté aprobado y los checks estén verdes:

```bash
gh pr merge --merge --delete-branch
```

Esperar el despliegue actualizado de `staging` y revisar esa URL. El Preview de la rama de trabajo no sustituye esta comprobación, ya que `staging` puede contener otros cambios.

## Publicar en producción

Cuando **todo lo que está en `staging`** esté listo para salir, crear el PR de `staging` hacia `main`:

```bash
gh pr create --base main --head staging --title "Publicar staging" --body "Validado en staging: [resumen de cambios y URL de revisión]"
gh pr checks staging --watch
gh pr merge staging --merge
```

El merge a `main` dispara un **nuevo build de Production** en Vercel con la configuración de producción. Verificar `https://www.itsmicki.com` y las páginas modificadas después de que Vercel marque el despliegue como listo. Mantener la rama `staging` para futuras rondas. Tras publicar, actualizarla con `main` mediante un PR `main` → `staging` si el historial divergió; no forzar pushes.

## Versionado y rollback

Cada publicación en `main` se marca con un tag anotado con versión semántica: `vX.Y.Z+1` para ajustes y correcciones, `vX.Y+1.0` para secciones o casos nuevos, `vX+1.0.0` para rediseños.

```bash
git fetch origin
git tag -a v1.0.1 origin/main -m "v1.0.1: resumen del cambio"
git push origin v1.0.1
```

`v1.0.0` corresponde al sitio publicado antes de adoptar este flujo. Para volver atrás:

- Inmediato: en Vercel, **Instant Rollback** al despliegue de producción anterior.
- Definitivo: revertir el merge en una rama (`git revert -m 1 <commit-del-merge>`), pasar por `staging` y publicar con un tag nuevo. No mover ni reescribir tags existentes.

Si se necesita publicar solo uno de varios ajustes acumulados en `staging`, detener este flujo y preparar un PR separado hacia `main` con únicamente el cambio aprobado.

## Qué pedirle al agente

Ejemplo de encargo: “Leé `CLAUDE.md`, `README.md` y este flujo. Ajustá [detalle] en [página]. Mostrame el diff, corré `pnpm check` y `pnpm build`, y revisá móvil y escritorio. No hagas push, merge ni despliegue hasta que te lo pida.”

Luego, cuando esté revisado: “Creá la rama desde `staging`, prepará el commit, subí la rama y abrí el PR hacia `staging` desde la terminal. Mostrame los checks y la URL de Preview.” Después de aprobar staging: “Abrí el PR de `staging` hacia `main`; cuando los checks pasen y te confirme que está aprobado, hacé el merge.”

## Si algo falla

- Si `gh` pide autenticación: `gh auth login` y `gh auth status`.
- Si el hook o CI falla: ejecutar `pnpm install --frozen-lockfile`, `pnpm check` y `pnpm build`; corregir el error y volver a subir el commit.
- Si no aparece Preview: comprobar la conexión Git y los despliegues del proyecto en Vercel; confirmar que `staging` no sea la Production Branch.
- Si el merge está bloqueado: leer los checks y las reglas de la rama con `gh pr view` y `gh pr checks`; no usar `--admin` ni saltarse controles.
- Si producción falla tras el merge: avisar al dueño y usar los controles de rollback de Vercel o revertir el PR en Git; confirmar qué versión queda activa.
