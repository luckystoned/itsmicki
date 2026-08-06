type MediaBase = {
  alt: string;
  ratio?: 'wide' | 'portrait' | 'square';
};

export type MediaItem =
  | (MediaBase & { type: 'image'; src: string })
  | (MediaBase & { type: 'video'; vimeoId?: string });

export type Project = {
  slug: string;
  number: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  synopsis: string;
  conclusion?: string;
  cover?: string;
  accent: string;
  comingSoon?: boolean;
  media: MediaItem[];
};

export const projects: Project[] = [
  {
    slug: 'winona', number: '01', title: 'Winona', year: '2023',
    role: 'UX—UI Lead, Visual & Motion Designer', accent: '#ecb2c5',
    cover: '/02_Projects/01_Winona/01_Winona_Portada.webp',
    summary: "Winona is a women’s wellness center that provides support and care via educational resources and hormone replacement therapy.",
    synopsis: "After collaborating closely with the marketing team to understand the brand, its pain points and strengths, we embarked on a complete rebranding project. I led the art direction for the website and helped the UX/UI team scale the chosen concept across its many pages.",
    conclusion: "A collaborative process created a cohesive and engaging online presence that reflects Winona’s mission while improving the experience across the full product.",
    media: [
      { type: 'image', src: '/02_Projects/01_Winona/02_Winona.webp', alt: 'Winona digital experience', ratio: 'wide' },
      { type: 'video', vimeoId: '1215371662', alt: 'Winona motion study 01' },
      { type: 'video', vimeoId: '1215371665', alt: 'Winona motion study 02' },
      { type: 'video', vimeoId: '1215371664', alt: 'Winona motion study 03' },
      { type: 'image', src: '/02_Projects/01_Winona/03_Winona.webp', alt: 'Winona campaign composition', ratio: 'portrait' },
      { type: 'image', src: '/02_Projects/01_Winona/04_Winona.webp', alt: 'Winona brand details', ratio: 'portrait' },
      { type: 'video', vimeoId: '1215371663', alt: 'Winona motion study 04' },
      { type: 'video', vimeoId: '1215371675', alt: 'Winona motion study 05' },
      { type: 'video', vimeoId: '1215371679', alt: 'Winona motion study 06' },
      { type: 'video', vimeoId: '1215371680', alt: 'Winona motion study 07' },
      { type: 'video', vimeoId: '1215371690', alt: 'Winona motion study 08' },
      { type: 'image', src: '/02_Projects/01_Winona/09_Winona.webp', alt: 'Winona final composition', ratio: 'wide' },
    ],
  },
  {
    slug: 'genova', number: '02', title: 'Genova', year: '2025',
    role: 'Art Direction + Visual Design', accent: '#b7d5ff', comingSoon: true,
    cover: '/02_Projects/02_Genova/01_Genova_Portada.webp',
    summary: 'A visual identity and art direction project currently being prepared for publication.',
    synopsis: 'Full case study coming soon.', media: [],
  },
  {
    slug: 'amazon', number: '03', title: 'Amazon', year: '2024',
    role: 'UX/UI Lead + Art Direction + Visual Design', accent: '#f0c54b', comingSoon: true,
    summary: 'A product and visual design project currently being prepared for publication.',
    synopsis: 'Full case study coming soon.', media: [{ type: 'video', vimeoId: '1215371786', alt: 'Amazon project cover' }],
  },
  {
    slug: 'maxmaher', number: '04', title: 'Max Maher', year: '2023',
    role: 'Art Direction + Visual Design', accent: '#9fb0ff',
    cover: '/02_Projects/04_MaxMaher/01_MaxMaher_Portada.webp',
    summary: 'A bold content system designed to turn financial education into a recognizable, fast-moving visual world.',
    synopsis: 'The system brings together strong typography, energetic graphics and flexible templates to create consistency across a high-volume content ecosystem.',
    media: [
      { type: 'image', src: '/02_Projects/04_MaxMaher/01_MaxMaher.webp', alt: 'Max Maher visual system', ratio: 'wide' },
      { type: 'video', vimeoId: '1215371826', alt: 'Max Maher motion reel 01' },
      { type: 'video', vimeoId: '1215371825', alt: 'Max Maher motion reel 02' },
      { type: 'video', vimeoId: '1215375694', alt: 'Max Maher motion reel 03' },
      { type: 'image', src: '/02_Projects/04_MaxMaher/04_MaxMaher.webp', alt: 'Max Maher graphic detail', ratio: 'portrait' },
      { type: 'image', src: '/02_Projects/04_MaxMaher/10_MaxMaher.webp', alt: 'Max Maher campaign', ratio: 'wide' },
    ],
  },
  {
    slug: 'outliant', number: '05', title: 'Outliant', year: '2024',
    role: 'Art Director, Brand Strategist & UX/UI Design Lead', accent: '#ddff55',
    cover: '/02_Projects/05_Outliant/01_Outliant_Portada.webp',
    summary: 'Outliant is a remote digital agency bringing together strategy, design, technology and growth.',
    synopsis: 'As the company evolved, a central challenge emerged: defining a clear identity, positioning and territory. The work turned that strategic foundation into a scalable visual and digital system.',
    media: [
      { type: 'image', src: '/02_Projects/05_Outliant/01_OTL.webp', alt: 'Outliant brand system', ratio: 'portrait' },
      { type: 'video', vimeoId: '1215371885', alt: 'Outliant motion identity 01' },
      { type: 'video', vimeoId: '1215371884', alt: 'Outliant motion identity 02' },
      { type: 'video', vimeoId: '1215371883', alt: 'Outliant motion identity 03' },
      { type: 'video', vimeoId: '1215371886', alt: 'Outliant motion identity 04' },
      { type: 'video', vimeoId: '1215371895', alt: 'Outliant motion identity 05' },
      { type: 'image', src: '/02_Projects/05_Outliant/03_OTL.webp', alt: 'Outliant digital detail', ratio: 'portrait' },
      { type: 'image', src: '/02_Projects/05_Outliant/07__OTL.webp', alt: 'Outliant web experience', ratio: 'wide' },
    ],
  },
  {
    slug: 'lumen', number: '06', title: 'Lumen', year: '2022',
    role: 'Art Direction + Visual Design', accent: '#f6a66d',
    cover: '/02_Projects/06_Lumen/01_Lumen_Portada.webp',
    summary: 'An art and technology experience shaped through tactile digital storytelling, playful systems and expressive interaction.',
    synopsis: 'Lumen explores the meeting point between physical sensation and screen-based experiences through a flexible visual language built for discovery.',
    media: [
      { type: 'image', src: '/02_Projects/06_Lumen/02_Lumen.webp', alt: 'Lumen experience overview', ratio: 'wide' },
      { type: 'video', vimeoId: '1215371918', alt: 'Lumen interactive motion' },
      { type: 'image', src: '/02_Projects/06_Lumen/06_Lumen.webp', alt: 'Lumen visual detail', ratio: 'portrait' },
      { type: 'image', src: '/02_Projects/06_Lumen/17_Lumen.webp', alt: 'Lumen final experience', ratio: 'wide' },
    ],
  },
  {
    slug: 'blend360', number: '07', title: 'Blend360', year: '2024',
    role: 'UX—UI Lead, Visual & Motion Designer', accent: '#d8c5ff', comingSoon: true,
    cover: '/02_Projects/07_Blend360/01_Blend360_Portada.webp',
    summary: 'A digital and motion design case study currently being prepared for publication.',
    synopsis: 'Full case study coming soon.', media: [],
  },
];

export const publishedProjects = projects.filter((project) => !project.comingSoon);
