# Itsmicki: instrucciones para Claude Code

Antes de modificar el proyecto, leer `README.md` y usar la skill `itsmicki-portfolio`.
Para preparar un push o publicación, leer también `docs/flujo-de-publicacion.md`.

## Reglas del proyecto

- Mantener Astro, TypeScript, CSS nativo y salida estática.
- No agregar React, Tailwind, CMS, base de datos o SSR sin una decisión explícita.
- Fuentes de contenido: `src/data/projects.ts` (listado, metadatos y SEO de cada proyecto) y `src/data/projectCases.ts` (contenido de cada página de caso: bloques, imágenes, videos de Vimeo y créditos).
- Mantener los videos en Vimeo; no incorporar archivos de video al repositorio.
- Guardar en `public/` solamente assets utilizados en producción.
- No modificar `../Referencias originales`: es archivo de consulta fuera del repositorio.
- Respetar la dirección visual del Figma, el responsive, el foco visible y `prefers-reduced-motion`.
- Iniciar servidores locales, desplegar y hacer operaciones Git remotas solo cuando el encargo lo pida; seguir el flujo de publicación y respetar los checks y protecciones de ramas.
- Antes de entregar código, ejecutar `pnpm check` y `pnpm build`.

## Skills recomendadas

Usar `astro` para cambios de arquitectura, `frontend-design` para implementación visual, `web-design-guidelines` para auditorías y `deploy-to-vercel` únicamente cuando se solicite publicar.
