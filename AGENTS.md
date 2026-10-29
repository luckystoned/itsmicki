# Instrucciones para agentes

Este repositorio contiene el portfolio estático Itsmicki. Leer `README.md` y la skill local `.claude/skills/itsmicki-portfolio/SKILL.md` antes de realizar cambios sustanciales.

- Stack: Astro, TypeScript, CSS nativo y JavaScript del navegador.
- Datos de proyectos (listado, metadatos, SEO): `src/data/projects.ts`.
- Contenido de cada página de caso (bloques, imágenes, videos, créditos): `src/data/projectCases.ts`.
- Dimensiones de imágenes: `src/data/imageMetadata.ts`.
- Plantilla de casos: `src/pages/projects/[slug].astro`.
- Video: servido desde el sitio, H.264 sin audio en `public/02_Projects/` (ver "Videos" en `README.md`); Vimeo ya no se usa porque su plan gratuito ignora la calidad pedida.
- Assets: `public/` contiene solo archivos usados; los originales están en `../Referencias originales`.
- Diseño: conservar la dirección editorial definida en Figma y verificar móvil/escritorio.
- Alcance: no sumar frameworks, CMS, SSR o infraestructura sin aprobación.
- Validación obligatoria: `pnpm check` y `pnpm build`.
- No desplegar, publicar ni alterar remotos Git sin pedido explícito.
