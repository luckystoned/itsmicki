/** Side B projects (Figma 925:1848). They have no case pages yet; `comingSoon` adds the "(Coming soon)" label. */
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

export const sideBProjects: SideBProject[] = [
  { slug: 'general-mkp-hair', title: 'General', label: '01_General_Mkp & Hair Art Direction', gridCover: '/04_SideB/Home/01_SideBProjects.webp' },
  { slug: 'ok-computer', title: 'OK Computer', label: '02_OK Computer_Art Direction+Photography+Mkp & Styling', gridCover: '/04_SideB/Home/02_SideBProjects.webp' },
  { slug: 'general-immersive', title: 'General', label: '03_General_Art Direction+Immersive Interaction Design', gridCover: '/04_SideB/Home/03_SideBProjects.webp', gridVideo: '/04_SideB/Home/03_SideBProjects.mp4' },
  { slug: 'monday-0803am', title: 'Monday, 08.03am', label: `04_Monday, 08.03am_Art Direction+Photography+Styling${coming}`, comingSoon: true, gridCover: '/04_SideB/Home/04_SideBProjects.webp' },
  { slug: 'nostalgia-as-agony', title: 'Nostalgia as Agony', label: `05_Nostalgia as Agony_Concept & Art direction${coming}`, comingSoon: true, gridCover: '/04_SideB/Home/05_SideBProjects.webp' },
];
