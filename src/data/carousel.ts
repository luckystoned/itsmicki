import { projects } from '@/data/projects';

/** Cards of the infinite "selected projects" carousel, shared by the home and the end of every case. */
const carouselLayout: Record<string, { width: number; height: number; label: string; cover?: string; caseCover?: string; video?: string }> = {
  genova: { width: 430.937, height: 570.818, label: '01_Genova_Art Direction+Visual Design' },
  winona: { width: 430.069, height: 427.462, label: '02_Winona_UX—UI Lead, Visual & Motion Designer', cover: '/02_Projects/01_Winona/01_Winona_Cover.webp' },
  amazon: { width: 427.462, height: 282.368, label: '03_Amazon_UXUI Lead+Art Direction+Visual Design', cover: '/02_Projects/03_Amazon/01_Amazon_Video.webp', video: '/02_Projects/03_Amazon/01_Amazon_Loop.mp4' },
  maxmaher: { width: 430.069, height: 426.593, label: '04_MaxMaher_Art Direction+Visual Design' },
  lumen: { width: 430.069, height: 257.354, label: '05_Lumen_Art Direction+Visual Design', video: '/02_Projects/06_Lumen/01_Lumen_Loop.mp4' },
  outliant: { width: 429.582, height: 508.909, label: '06_Outliant_Art Direction+Visual Design+UXUI Lead' },
  blend360: { width: 430.937, height: 570.818, label: '07_Blend360_UX—UI Lead, Visual & Motion Designer', cover: '/02_Projects/07_Blend360/01_Blend360_Cover.webp' },
  'textures-body': { width: 430.069, height: 315.29, label: '08_Textures & Body_Art Direction+AI Image Generation', video: '/02_Projects/08_TexturesBody/01_TexturesBody_Loop.mp4' },
};

export const carouselProjects = projects.flatMap((project) => {
  const layout = carouselLayout[project.slug];
  const carouselCover = layout?.cover ?? project.cover;
  if (!layout || !carouselCover) return [];
  // `caseCover`: the image the end-of-case carousel shows instead of the home one (same as on /projects).
  return [{ ...project, carouselCover, caseCarouselCover: layout.caseCover ?? carouselCover, carouselLayout: layout }];
});

/** Carousel card width from its Figma length on the 1600×1033 desktop frame, capped by both viewport axes. The pixel cap
    is 80% of the Figma size, so on large screens the photos look as they did with the browser zoomed out to 80%. */
export const cardLength = (value: number) => `min(${(value * .8).toFixed(3)}px, ${(value / 16).toFixed(6)}vw, ${(value / 10.33).toFixed(6)}svh)`;
