import { projects } from '@/data/projects';

/** Cards of the infinite "selected projects" carousel, shared by the home and the end of every case. */
const carouselLayout: Record<string, { width: number; height: number; label: string; cover?: string; caseCover?: string; vimeoId?: string }> = {
  winona: { width: 430.069, height: 427.462, label: '01_Winona_UX—UI Lead, Visual & Motion Designer', cover: '/02_Projects/01_Winona/01_Winona_Cover.webp' },
  genova: { width: 430.937, height: 570.818, label: '02_Genova_Art Direction+Visual Design' },
  amazon: { width: 427.462, height: 282.368, label: '03_Amazon_UXUI Lead+Art Direction+Visual Design', cover: 'https://vumbnail.com/1215371786.jpg', vimeoId: '1215371786' },
  maxmaher: { width: 430.069, height: 426.593, label: '04_MaxMaher_Art Direction+Visual Design' },
  outliant: { width: 429.582, height: 508.909, label: '05_Outliant_Art Direction+Visual Design+UXUI Lead' },
  lumen: { width: 430.069, height: 257.354, label: '06_Lumen_Art Direction+Visual Design', vimeoId: '1234293739' },
  blend360: { width: 430.937, height: 570.818, label: '07_Blend360_UX—UI Lead, Visual & Motion Designer', cover: '/02_Projects/07_Blend360/01_Blend360_Home.webp', caseCover: '/02_Projects/07_Blend360/01_Blend360_Projects.webp' },
};

export const carouselProjects = projects.flatMap((project) => {
  const layout = carouselLayout[project.slug];
  const carouselCover = layout?.cover ?? project.cover;
  if (!layout || !carouselCover) return [];
  // `caseCover`: the image the end-of-case carousel shows instead of the home one (same as on /projects).
  return [{ ...project, carouselCover, caseCarouselCover: layout.caseCover ?? carouselCover, carouselLayout: layout }];
});

/** Figma length on the 1600×1033 desktop frame, capped by both viewport axes. */
export const desktopLength = (value: number) => `min(${value}px, ${(value / 16).toFixed(6)}vw, ${(value / 10.33).toFixed(6)}svh)`;

export const vimeoBackground = (id: string) => `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&controls=0&quality=1080p&dnt=1`;
