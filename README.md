# Itsmicki — Portfolio

Portfolio editorial de Miki, desarrollado en Astro a partir del diseño original de Figma y de los primeros prototipos HTML. El sitio está preparado para ejecutarse localmente y, cuando se apruebe, desplegarse como sitio estático en Vercel.

## Estado actual

- Home, índice de proyectos, detalle de casos, Deets y Side B implementados.
- Casos publicados: Winona, Max Maher, Outliant y Lumen.
- Genova, Amazon y Blend360 se conservan como próximos casos.
- Los videos se reproducen desde Vimeo; no se versionan archivos de video.
- Las referencias y fuentes HTML originales viven fuera del repositorio, en `../Referencias originales`.
- Las imágenes de producción están optimizadas en WebP, con dimensiones explícitas y carga diferida donde corresponde.

## Tecnología

- Astro y TypeScript.
- CSS nativo y JavaScript del navegador.
- Vimeo Player mediante `iframe`.
- pnpm como gestor de paquetes.

Esta arquitectura mantiene el portfolio rápido, estático y sencillo de mantener. No requiere React, base de datos, CMS ni renderizado del lado del servidor para el alcance actual.

## Desarrollo local

Requisitos recomendados: Node.js 22 o superior y pnpm 11 o superior.

```bash
pnpm install
pnpm dev
```

Astro mostrará en la terminal la URL local, normalmente `http://localhost:4321`.

Antes de entregar un cambio:

```bash
pnpm check
pnpm build
```

El resultado estático se genera en `dist/`. No se debe versionar esa carpeta.

## Estructura

```text
.
├── public/                 # Imágenes, CV y recursos públicos realmente usados
├── src/
│   ├── components/         # Componentes Astro reutilizables
│   ├── data/projects.ts    # Fuente central de contenido de los proyectos
│   ├── layouts/            # Estructura HTML compartida
│   ├── pages/              # Rutas del sitio
│   └── styles/global.css   # Sistema visual y estilos globales
├── .claude/skills/         # Skills disponibles para Claude Code
├── AGENTS.md               # Reglas para agentes compatibles
├── CLAUDE.md               # Contexto y reglas para Claude Code
└── astro.config.mjs
```

## Rutas

- `/`: presentación y selección de trabajos.
- `/projects`: archivo de proyectos.
- `/projects/[slug]`: detalle dinámico de cada caso.
- `/deets`: perfil e información profesional.
- `/sideb`: exploraciones y trabajos paralelos.

## Editar o agregar proyectos

La fuente de verdad es `src/data/projects.ts`. Cada proyecto define su slug, textos, imágenes, créditos y, cuando corresponde, el identificador de Vimeo.

Para agregar un caso:

1. Crear su entrada en `src/data/projects.ts`.
2. Guardar únicamente las imágenes finales necesarias dentro de `public/02_Projects/<Proyecto>/`.
3. Usar rutas públicas que comiencen con `/`.
4. Completar textos alternativos descriptivos.
5. Ejecutar `pnpm check` y `pnpm build`.

La página dinámica `src/pages/projects/[slug].astro` genera las rutas publicadas. Evitar crear una página manual por proyecto salvo que el diseño realmente necesite una excepción.

## Videos de Vimeo

Los videos se integran mediante su `vimeoId`. No descargar ni agregar `.mp4`, `.mov` u otros videos al repositorio. El componente `src/components/VideoPlaceholder.astro` centraliza la presentación y los controles del reproductor.

Perfil de referencia: [Miki en Vimeo](https://vimeo.com/user173432758).

## Imágenes y otros assets

- `public/` debe contener solo recursos utilizados por el sitio.
- Conservar los originales pesados en `../Referencias originales`, fuera del repositorio.
- No comprimir ni reemplazar originales sin conservar una fuente recuperable.
- Para nuevos recursos, priorizar WebP, dimensiones acordes al render y conservar la fuente recuperable fuera del repositorio.
- Revisar la licencia de las tipografías antes del despliegue público.

## Diseño y accesibilidad

La referencia visual principal es el [archivo de Figma](https://www.figma.com/design/z74GFJnb8tcTY6FIRhMtjY/Portfolio?node-id=392-457). La implementación debe preservar la dirección editorial, la jerarquía tipográfica, el uso intencional del espacio y el protagonismo del trabajo visual.

Todo cambio debe comprobarse en móvil y escritorio, mantener navegación por teclado, foco visible, textos alternativos útiles y soporte para `prefers-reduced-motion`. Las mejoras técnicas no deben homogeneizar la personalidad del diseño.

## Agentes y skills

El repositorio incluye configuración para Claude Code y otros agentes:

- `CLAUDE.md` y `AGENTS.md`: límites, arquitectura y comandos de validación.
- `itsmicki-portfolio`: skill propia con el mapa y las decisiones del proyecto.
- `astro`: prácticas específicas del framework.
- `frontend-design`: criterio de implementación visual.
- `web-design-guidelines`: revisión de accesibilidad y calidad web.
- `deploy-to-vercel`: flujo de despliegue para cuando se autorice.

Las skills instaladas están versionadas en `.claude/skills/`; `skills-lock.json` registra la procedencia de las skills externas.

## Despliegue

El proyecto puede desplegarse en Vercel con el preset estático de Astro:

- Build command: `pnpm build`
- Output directory: `dist`
- Install command: `pnpm install`

No conectar ni desplegar el proyecto hasta que la validación local y la aprobación visual estén completas.

## Próximos pasos

1. Implementar SEO técnico: sitemap, robots, canonicals, datos estructurados y metadatos sociales.
2. Comparar visualmente todas las vistas con Figma.
3. Confirmar licencias tipográficas y revisar el copy definitivo.
4. Completar los casos marcados como próximos.
5. Incorporar imagen social/OG y favicon definitivos.
6. Ejecutar una auditoría de accesibilidad y rendimiento.
7. Crear un preview de Vercel para aprobación.
