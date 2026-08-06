# Itsmicki: instrucciones para Claude Code

Antes de modificar el proyecto, leer `README.md` y usar la skill `itsmicki-portfolio`.

## Reglas del proyecto

- Mantener Astro, TypeScript, CSS nativo y salida estática.
- No agregar React, Tailwind, CMS, base de datos o SSR sin una decisión explícita.
- Tratar `src/data/projects.ts` como fuente de verdad para los casos.
- Mantener los videos en Vimeo; no incorporar archivos de video al repositorio.
- Guardar en `public/` solamente assets utilizados en producción.
- No modificar `../Referencias originales`: es archivo de consulta fuera del repositorio.
- Respetar la dirección visual del Figma, el responsive, el foco visible y `prefers-reduced-motion`.
- No iniciar servidores persistentes, desplegar ni hacer operaciones Git remotas salvo pedido explícito.
- Antes de entregar código, ejecutar `pnpm check` y `pnpm build`.

## Skills recomendadas

Usar `astro` para cambios de arquitectura, `frontend-design` para implementación visual, `web-design-guidelines` para auditorías y `deploy-to-vercel` únicamente cuando se solicite publicar.
