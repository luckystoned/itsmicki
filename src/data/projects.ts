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
};

export const projects: Project[] = [
  {
    slug: 'winona', number: '01', title: 'Winona', year: '2023',
    role: 'UX—UI Lead, Visual & Motion Designer', accent: '#ecb2c5',
    cover: '/02_Projects/01_Winona/01_Winona_Cover.webp',
    summary: "Winona is a women’s wellness center that provides support and care via educational resources and hormone replacement therapy.",
    synopsis: "After collaborating closely with the marketing team to understand the brand, its pain points and strengths, we embarked on a complete rebranding project. I led the art direction for the website and helped the UX/UI team scale the chosen concept across its many pages.",
    conclusion: "A collaborative process created a cohesive and engaging online presence that reflects Winona’s mission while improving the experience across the full product.",
  },
  {
    slug: 'genova', number: '02', title: 'Genova', year: '2025',
    role: 'Art Direction + Visual Design', accent: '#b7d5ff', comingSoon: true,
    cover: '/02_Projects/02_Genova/01_Genova_Portada.webp',
    summary: 'A visual identity and art direction project currently being prepared for publication.',
    synopsis: 'Full case study coming soon.',
  },
  {
    slug: 'amazon', number: '03', title: 'Amazon', year: '2024',
    role: 'UX/UI Lead + Art Direction + Visual Design', accent: '#f0c54b', comingSoon: true,
    cover: '/02_Projects/03_Amazon/01_Amazon_Portada.jpg',
    summary: 'A product and visual design project currently being prepared for publication.',
    synopsis: 'Full case study coming soon.',
  },
  {
    slug: 'maxmaher', number: '04', title: 'Max Maher', year: '2023',
    role: 'Art Director & Visual Designer', accent: '#9fb0ff',
    cover: '/02_Projects/04_MaxMaher/01_MaxMaher_Portada.webp',
    summary: 'A bold content system designed to turn financial education into a recognizable, fast-moving visual world.',
    synopsis: 'The system brings together strong typography, energetic graphics and flexible templates to create consistency across a high-volume content ecosystem.',
  },
  {
    slug: 'outliant', number: '05', title: 'Outliant', year: '2024',
    role: 'Art Director, Brand Strategist & UX/UI Design Lead', accent: '#ddff55',
    cover: '/02_Projects/05_Outliant/01_Outliant_Cover.webp',
    summary: 'Outliant is a remote digital agency bringing together strategy, design, technology and growth.',
    synopsis: 'As the company evolved, a central challenge emerged: defining a clear identity, positioning and territory. The work turned that strategic foundation into a scalable visual and digital system.',
  },
  {
    slug: 'lumen', number: '06', title: 'Lumen', year: '2025',
    role: 'Art Direction, Brand Strategy, Visual Identity', accent: '#f6a66d',
    cover: '/02_Projects/06_Lumen/01_Lumen_Cover.webp',
    summary: 'An art and technology experience shaped through tactile digital storytelling, playful systems and expressive interaction.',
    synopsis: 'Lumen explores the meeting point between physical sensation and screen-based experiences through a flexible visual language built for discovery.',
  },
  {
    slug: 'blend360', number: '07', title: 'Blend360', year: '2024',
    role: 'UX—UI Lead, Visual & Motion Designer', accent: '#d8c5ff', comingSoon: true,
    cover: '/02_Projects/07_Blend360/01_Blend360_Cover.webp',
    summary: 'A digital and motion design case study currently being prepared for publication.',
    synopsis: 'Full case study coming soon.',
  },
  {
    slug: 'textures-body', number: '08', title: 'Textures & Body', year: '',
    role: 'Art Direction+AI Image Generation', accent: '#e9d6b4', comingSoon: true,
    cover: '/02_Projects/08_TexturesBody/01_TexturesBody_Cover.webp',
    summary: 'An AI image generation project currently being prepared for publication.',
    synopsis: 'Full case study coming soon.',
  },
];

export const publishedProjects = projects.filter((project) => !project.comingSoon);
