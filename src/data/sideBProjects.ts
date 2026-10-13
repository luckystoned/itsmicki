import { sideBCases } from '@/data/projectCases';

/** Side B projects (Figma 925:1848). `comingSoon` adds the "(Coming soon)" label; a project with an entry in
    `sideBCases` links to /sideb/projects/{slug}. */
export type SideBProject = {
  slug: string;
  title: string;
  label: string;
  comingSoon?: boolean;
  /** Cover on /sideb/projects. */
  gridCover: string;
  /** Muted loop over the cover on /sideb/projects. */
  gridVideo?: string;
};

const coming = ' — (Coming soon) !!!!!^*^';
/** Mkp & Hair's muted 5-second loop (square), on its carousel card (the larger grid card keeps the sharper photo). */
const MKP_LOOP = '/04_SideB/Projects/01_MkpHair/00_MkpHair_Loop.mp4';
/** Missing souls' muted 6-second loop (square): a detail of its lilac flowers swaying, the sky melting from orange into lilac. */
const SOULS_LOOP = '/04_SideB/Projects/04_MissingSouls/00_MissingSouls_Loop.mp4';
/** Nostalgia as Agony's muted 4-second loops: the photo pixel-stretched into vertical streaks, with two clusters
    of tracking boxes where it shows clean and, in hits echoed a moment later, thin slices slipping sideways and dashed
    rows of dead pixels (landscape for the grid, portrait for its carousel card). */
const NOSTALGIA_LOOP = '/04_SideB/Projects/05_Nostalgia/00_Nostalgia_Loop.mp4';
const NOSTALGIA_CARD = '/04_SideB/Projects/05_Nostalgia/00_Nostalgia_Card.mp4';

export const sideBProjects: SideBProject[] = [
  { slug: 'mkp-hair', title: 'Mkp & Hair', label: '01_Mkp & Hair_Art Direction+AI Image Generation', gridCover: '/04_SideB/Projects/01_MkpHair/00_MkpHair_Cover.webp' },
  { slug: 'contained-alienation', title: 'Contained Alienation', label: '02_Contained Alienation_Art Direction+Photography+Mkp & Styling', gridCover: '/04_SideB/Home/02_SideBProjects.webp' },
  { slug: 'general-immersive', title: 'General', label: '03_General_Art Direction+Immersive Interaction Design', gridCover: '/04_SideB/Home/03_SideBProjects.webp', gridVideo: '/04_SideB/Home/03_SideBProjects.mp4' },
  { slug: 'missing-souls', title: 'Missing souls', label: '04_Missing souls_Art Direction+Immersive Design', gridCover: '/04_SideB/Projects/04_MissingSouls/00_MissingSouls_Cover.webp', gridVideo: SOULS_LOOP },
  { slug: 'nostalgia-as-agony', title: 'Nostalgia as Agony', label: `05_Nostalgia as Agony_Concept & Art direction${coming}`, comingSoon: true, gridCover: '/04_SideB/Projects/05_Nostalgia/00_Nostalgia_Cover.webp', gridVideo: NOSTALGIA_LOOP },
];

/** Case page of a Side B project, if it has one. */
export const sideBHref = (slug: string) => (slug in sideBCases ? `/sideb/projects/${slug}` : undefined);

/** Cards of the Side B carousels (home and the end of every Side B case), Figma 922:1494. `width`/`height` are the
    card's Figma size; `project` is the index of the project whose name it shows. */
const carouselCards: Array<{ width: number; height: number; alt: string; video?: boolean | string; project: number }> = [
  { width: 357, height: 355, alt: 'Portrait with moss-green brows, flushed cheeks and spiky tufts tied with pink ribbon.', video: MKP_LOOP, project: 0 },
  { width: 358, height: 474, alt: 'Blurred black-and-white portrait repeated across the frame.', project: 1 },
  { width: 355, height: 234, alt: 'Amber, olive and dark cells drifting under a microscope.', video: true, project: 2 },
  { width: 357, height: 354, alt: 'Lilac flowers on green stems swaying against a coral sky melting into lilac.', video: SOULS_LOOP, project: 3 },
  { width: 358, height: 474, alt: 'A girl in lilac holding a baby against a tiled wall, the photo stretched into vertical streaks, with outlined boxes where it shows clean.', video: NOSTALGIA_CARD, project: 4 },
];

export const sideBCarousel = carouselCards.map((card, index) => {
  const number = String(index + 1).padStart(2, '0');
  const project = sideBProjects[card.project];
  return {
    title: project.title,
    label: project.label,
    src: `/04_SideB/Home/${number}_SideBHome.webp`,
    alt: card.alt,
    // Keeps each card's Figma proportion at the Side A card width.
    width: 430,
    height: (430 * card.height) / card.width,
    imageWidth: card.width * 2,
    imageHeight: card.height * 2,
    // Muted loop over its first frame, like the Side A video cards.
    video: typeof card.video === 'string' ? card.video : card.video ? `/04_SideB/Home/${number}_SideBHome.mp4` : undefined,
    href: project.comingSoon ? undefined : sideBHref(project.slug),
  };
});
