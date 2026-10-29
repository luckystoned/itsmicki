# Itsmicki — Portfolio

Portfolio editorial de Miki, desarrollado en Astro a partir del diseño original de Figma y de los primeros prototipos HTML. El sitio está preparado para ejecutarse localmente y, cuando se apruebe, desplegarse como sitio estático en Vercel.

## Estado actual

- Home, índice de proyectos, detalle de casos, Deets y Side B implementados.
- Casos publicados: Winona, Max Maher, Outliant y Lumen.
- Genova, Amazon y Blend360 se conservan como próximos casos.
- Videos: todos los videos se sirven desde el sitio, en `public/02_Projects/`, H.264 sin audio: portadas del carrusel (`*_Loop.mp4`, que el efecto de hover lee cuadro a cuadro), videos de casos agregados con `video()` (versión de escritorio hasta 2560px, `_Mobile.mp4` hasta 1280px y su primer cuadro en `.webp`) y clips cortos con `clip()`. Vimeo ya no se usa: su plan gratuito ignora la calidad pedida y entregaba 360p.
- Las referencias y fuentes HTML originales viven fuera del repositorio, en `../Referencias originales`.
- Las imágenes de producción están optimizadas en WebP, con dimensiones explícitas y carga diferida donde corresponde.

## Tecnología

- Astro y TypeScript.
- CSS nativo y JavaScript del navegador.
- Videos H.264 servidos desde el sitio con `<video>`.
- pnpm como gestor de paquetes.

Esta arquitectura mantiene el portfolio rápido, estático y sencillo de mantener. No requiere React, base de datos, CMS ni renderizado del lado del servidor para el alcance actual.

Única excepción, decidida para *Missing souls* (Side B): la función `api/souls.ts` de Vercel guarda en Vercel Blob los animales que suben los visitantes, compartidos por todos hasta que el espacio se llena (42). La foto se procesa en el navegador: se recorta alrededor del animal, se vuelve a dibujar (sin ubicación ni datos de cámara) y se rechaza si hay personas; esa foto se guarda para el listado de quiénes están, junto con una descripción del animal (gato o perro, tamaño, colores, manchas, nombre y dueño) con la que se dibuja. Requiere conectar un Blob store al proyecto en Vercel (crea la variable `BLOB_READ_WRITE_TOKEN`). Sin esa función (por ejemplo con `pnpm dev`), el frame guarda los animales en el navegador de cada visitante.

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
│   ├── data/
│   │   ├── projects.ts       # Listado, metadatos y SEO de cada proyecto
│   │   ├── projectCases.ts   # Contenido de cada página de caso
│   │   └── imageMetadata.ts  # Ancho y alto de cada imagen usada
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
- `/sideb`: home de Side B, el mismo home en colores invertidos (`src/components/HomeStage.astro`), con los nombres de sus proyectos (todavía sin página de caso).
- `/sideb/deets`: fashion, música y fotografía analógica de Side B, en oscuro.
- `/sideb/projects`: grilla de proyectos de Side B (`src/data/sideBProjects.ts`), con el mismo marco que `/projects` (`src/components/ProjectsStage.astro`) en colores invertidos.

## Editar o agregar proyectos

El contenido se reparte en dos archivos:

- `src/data/projects.ts`: un registro por proyecto con slug, número, título, año, rol, resumen, portada y estado (`comingSoon`). Alimenta el listado y los metadatos SEO.
- `src/data/projectCases.ts`: el contenido de cada página de caso publicada: textos, bloques de imágenes, videos (`video()` y `clip()`), carruseles, imágenes arrastrables y créditos.

`src/data/imageMetadata.ts` registra el ancho y alto de cada imagen; los componentes lo usan para evitar saltos de layout.

Para agregar un caso:

1. Crear su entrada en `src/data/projects.ts` (sin `comingSoon` si se publica).
2. Agregar su contenido en `src/data/projectCases.ts` y sumar el slug al tipo `ProjectCase['slug']`.
3. Registrar las dimensiones de cada imagen nueva en `src/data/imageMetadata.ts`.
4. Revisar las tarjetas de `src/components/ProjectCaseFooter.astro` y la home, que tienen su propia lista de portadas.
5. Agregar los ajustes visuales propios del caso en `src/components/ProjectCase.astro` (selectores `[data-case='<slug>']`).
6. Guardar únicamente las imágenes finales necesarias dentro de `public/02_Projects/<Proyecto>/`.
7. Usar rutas públicas que comiencen con `/`.
8. Completar textos alternativos descriptivos.
9. Ejecutar `pnpm check` y `pnpm build`.

La página dinámica `src/pages/projects/[slug].astro` genera las rutas publicadas. Evitar crear una página manual por proyecto salvo que el diseño realmente necesite una excepción.

## Videos

Los videos de los casos se declaran en `src/data/projectCases.ts` con `video(base, alt, ratio)`: `base` es la ruta sin extensión de tres archivos, `<base>.mp4` (lado largo hasta 2560px, CRF 18), `<base>_Mobile.mp4` (hasta 1280px, CRF 22, para pantallas de hasta 760px) y `<base>.webp` (primer cuadro, se ve hasta que el video arranca y con movimiento reducido). `src/components/ProjectCase.astro` los renderiza con `<video>` y `object-fit: cover`; `src/scripts/playVisibleVideos.ts` los carga y reproduce solo mientras están en pantalla.

Exportar con `ffmpeg -an -c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart`, desde el original de mayor calidad. Originales de referencia: [Miki en Vimeo](https://vimeo.com/user173432758).

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
- `docs/flujo-de-publicacion.md`: guía para trabajar con Claude Code, revisar staging y publicar desde la terminal.
- `itsmicki-portfolio`: skill propia con el mapa y las decisiones del proyecto.
- `astro`: prácticas específicas del framework.
- `frontend-design`: criterio de implementación visual.
- `web-design-guidelines`: revisión de accesibilidad y calidad web.
- `deploy-to-vercel`: flujo de despliegue para cuando se autorice.

Las skills instaladas están versionadas en `.claude/skills/`; `skills-lock.json` registra la procedencia de las skills externas.

## Despliegue

El proyecto se despliega en Vercel con el preset estático de Astro:

- Build command: `pnpm build`
- Output directory: `dist`
- Install command: `pnpm install`

La rama `main` corresponde a Production. La rama `staging` corresponde a Preview una vez creada y configurada. La guía de [publicación](docs/flujo-de-publicacion.md) incluye preparación de accesos, controles y comandos de PR/merge.

## SEO e indexación

El dominio canónico configurado es `https://www.itsmicki.com`; Vercel redirige `itsmicki.com` a esa dirección con un 308. El build genera automáticamente `sitemap-index.xml` y `sitemap-0.xml`; `robots.txt` referencia ese índice. Todas las páginas incluyen canonical autorreferencial, descripción, directivas de robots, Open Graph, Twitter Cards y datos estructurados Schema.org. `llms.txt` y `llms-full.txt` ofrecen una descripción curada para asistentes y herramientas compatibles con esa propuesta.

Después del despliegue:

1. Verificar el dominio `itsmicki.com` en Google Search Console, preferentemente mediante un registro DNS (cubre la versión con y sin `www`).
2. Enviar `https://www.itsmicki.com/sitemap-index.xml` desde la sección Sitemaps.
3. Inspeccionar la portada y solicitar indexación cuando el dominio responda públicamente.
4. Confirmar que `itsmicki.com` siga redirigiendo de forma permanente a `https://www.itsmicki.com`. Si en Vercel se invierte la redirección, actualizar `site` en `astro.config.mjs`, `SITE_URL` en `src/data/seo.ts`, `robots.txt` y los `llms*.txt`.

`llms.txt` es complementario: no reemplaza `robots.txt`, el sitemap ni el contenido HTML indexable.

## Próximos pasos

1. Comparar visualmente todas las vistas con Figma.
2. Confirmar licencias tipográficas y revisar el copy definitivo.
3. Completar los casos marcados como próximos.
4. Reemplazar el favicon provisional si la diseñadora entrega uno definitivo.
5. Ejecutar una auditoría de accesibilidad y rendimiento.
6. Crear un preview de Vercel para aprobación.
7. Verificar el dominio y enviar el sitemap en Google Search Console.
