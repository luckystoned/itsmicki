export type CaseMedia = {
  type: 'image' | 'video';
  alt: string;
  src?: string;
  vimeoId?: string;
  ratio: string;
  caption?: string;
};

export type CaseBlock =
  | {
      type: 'media';
      layout: 'single';
      item: CaseMedia;
    }
  | {
      type: 'media';
      layout: 'pair';
      items: [CaseMedia & { width: string; height: string }, CaseMedia & { width: string; height: string }];
      align?: 'start' | 'end';
    }
  | {
      type: 'text';
      title: string;
      variant?: 'columns' | 'wide' | 'lead';
      lead?: string;
      columns?: string[];
      wide?: string;
    };

export type ProjectCase = {
  slug: 'winona' | 'maxmaher' | 'outliant' | 'lumen';
  title: string;
  year: string;
  role: string;
  nutshell: string;
  nutshellColumns?: string[];
  drags: Array<{
    src: string;
    left: string;
    top: string;
    width: string;
    rotation: string;
  }>;
  blocks: CaseBlock[];
  credits: string[];
};

const image = (src: string, alt: string, ratio: string, caption?: string): CaseMedia => ({
  type: 'image', src, alt, ratio, caption,
});

const video = (vimeoId: string, alt: string, ratio: string, caption?: string): CaseMedia => ({
  type: 'video', vimeoId, alt, ratio, caption,
});

const single = (item: CaseMedia): CaseBlock => ({ type: 'media', layout: 'single', item });

const pair = (
  first: CaseMedia,
  firstWidth: string,
  firstHeight: string,
  second: CaseMedia,
  secondWidth: string,
  secondHeight: string,
  align: 'start' | 'end' = 'start',
): CaseBlock => ({
  type: 'media',
  layout: 'pair',
  align,
  items: [
    { ...first, width: firstWidth, height: firstHeight },
    { ...second, width: secondWidth, height: secondHeight },
  ],
});

const text = (
  title: string,
  columns: string[],
  options: { variant?: 'columns' | 'wide' | 'lead'; lead?: string; wide?: string } = {},
): CaseBlock => ({ type: 'text', title, columns, ...options });

export const projectCases: Record<ProjectCase['slug'], ProjectCase> = {
  winona: {
    slug: 'winona',
    title: 'Winona',
    year: '2023',
    role: 'UX—UI Lead, Visual<br>& Motion Designer',
    nutshell: `Winona is a women's wellness center that provides support and care via educational resources and hormone replacement therapy. At <a href="https://outliant.com/" target="_blank" rel="noreferrer">Outliant</a>, we developed a purpose-built venture by implementing branding, strategy, and design.`,
    drags: [
      { src: '/02_Projects/01_Winona/01_Winona_Drag.webp', left: '79.2588vw', top: '0', width: '24.5894vw', rotation: '0deg' },
      { src: '/02_Projects/01_Winona/02_Winona_Drag.webp', left: '56.3vw', top: '10.5625vw', width: '24.6656vw', rotation: '0deg' },
    ],
    blocks: [
      single(video('1215371662', 'Winona website motion reel', '1556 / 870')),
      single(image('/02_Projects/01_Winona/02_Winona.webp', 'Winona campaign artwork displayed across a large outdoor wall.', '1556 / 870')),
      pair(
        video('1215371665', 'Winona digital experience in motion', '54.6737 / 63.01'), '54.6737vw', '63.01vw',
        video('1215371664', 'Winona product interaction in motion', '40.4862 / 40.2406'), '40.4862vw', '40.2406vw',
      ),
      text('(synopsis)', [
        `After collaborating closely with the marketing team to gain a deeper understanding of the brand, its pain points, and strengths, we embarked on the rebranding project alongside Julia Franceschini, who led the brand's art direction. We held several meetings with Winona's Director of Design and Director of Marketing, where we worked together to define the new brand strategy,`,
        `vision, mission, and how to translate these into visual elements. This collaborative approach ensured that I had the necessary knowledge and understanding to reflect these elements in the new website. I led the art direction for the website, assisting the UX/UI designers in implementing the chosen concept across the extensive scalability of the site's numerous pages.`,
      ]),
      pair(
        video('1215371663', 'Winona UGC ambassador campaign', '40.5 / 29.7806', 'UGC Campaign_Ambassors'), '40.5vw', '29.7806vw',
        image('/02_Projects/01_Winona/03_Winona.webp', 'Winona Essential Defense bottle on satin.', '54.6737 / 51.9794'), '54.6737vw', '51.9794vw',
      ),
      pair(
        image('/02_Projects/01_Winona/04_Winona.webp', 'Winona Vaginal Estrogen Cream on a soft chair.', '40.4769 / 51.9794'), '40.4769vw', '51.9794vw',
        video('1215371675', 'Winona campaign art direction in motion', '54.6737 / 51.9794'), '54.6737vw', '51.9794vw',
      ),
      single(video('1215371679', 'Winona website experience reel', '1556 / 870')),
      text('(conclusion)', [], {
        variant: 'wide',
        wide: `The successful rebranding of Winona's website was a direct result of our close collaboration with their team. By working together, we created a cohesive and engaging online presence that accurately reflects Winona's mission and values, enhancing the user experience and solidifying their digital footprint.`,
      }),
      single(video('1215371680', 'Winona final brand motion reel', '1556 / 870')),
      pair(
        video('1215371690', 'Winona mobile interface in motion', '40.74 / 51.9794'), '40.74vw', '51.9794vw',
        image('/02_Projects/01_Winona/09_Winona.webp', 'Winona website displayed on a tablet in a woven chair.', '54.6737 / 51.9794'), '54.6737vw', '51.9794vw',
      ),
    ],
    credits: ['Art Direction / <a href="https://www.behance.net/juliafranc2cc2" target="_blank" rel="noreferrer">Julia Franceschini</a>'],
  },

  maxmaher: {
    slug: 'maxmaher',
    title: 'MaxMaher',
    year: '2023',
    role: 'Art Director &<br>Visual Designer',
    nutshell: `Max Maher is a digital entrepreneur with over 1.1K views on YouTube, who uses his channel to document his business and ideas. He sought assistance in developing a cohesive and dynamic rebrand for his communication platforms, where he presents economics in an engaging and intuitive way.`,
    drags: [
      { src: '/02_Projects/04_MaxMaher/01_MaxMaher_Drag.webp', left: '76.5vw', top: '-1.5vw', width: '24.5vw', rotation: '-7deg' },
      { src: '/02_Projects/04_MaxMaher/02_MaxMaher_Drag.webp', left: '58vw', top: '11vw', width: '22vw', rotation: '6deg' },
    ],
    blocks: [
      single(video('1215371826', 'Max Maher animated brand reel', '1556 / 386')),
      single(image('/02_Projects/04_MaxMaher/01_MaxMaher.webp', 'Max Maher brand guideline overview.', '1556 / 870')),
      single(image('/02_Projects/04_MaxMaher/02_MaxMaher.webp', 'Max Maher typography system featuring Supply Mono, Mondwest and Neue Montreal.', '1556 / 870')),
      text('(synopsis)', [
        `I led the art direction and digital design for Max Maher’s rebrand, working with Visual Designer Julia Franceschini to turn his personal context and subject matter into a flexible visual system. The project needed to reconcile two very different worlds: the optimism and sensory character of life in Puerto Rico, and the precision associated with economics, business, and technology.`,
        `Rather than adopting the predictable codes of financial media, we developed a warmer and more expressive identity. Vibrant Caribbean colors brought energy and approachability, while structured typography, digital references, and bitmap-based details grounded the system in Max’s analytical and technological universe.`,
      ]),
      pair(
        image('/02_Projects/04_MaxMaher/03_MaxMaher.webp', 'Pixel icon pack for Max Maher.', '40.5 / 29.78'), '40.5vw', '29.78vw',
        video('1215371825', 'Max Maher vertical brand animation', '55.26 / 65.17'), '55.26vw', '65.17vw',
      ),
      text('(the challenge)', [], {
        variant: 'wide',
        wide: `The brand needed to work at the speed of an active content platform. It had to remain recognizable across video, social media, thumbnails, editorial graphics, and future commercial applications, while giving Max’s internal team clear rules they could use independently. The challenge was therefore not only to define a look, but to create a repeatable production language.`,
      }),
      pair(
        image('/02_Projects/04_MaxMaher/04_MaxMaher.webp', 'Embroidered Max Maher caps.', '51.36 / 51.98'), '51.36vw', '51.98vw',
        image('/02_Projects/04_MaxMaher/6b_MaxMaher.webp', 'Max Maher campaign graphics held in a hand.', '44.08 / 51.98'), '44.08vw', '51.98vw',
      ),
      single(video('1215375694', 'Max Maher pixel transition animation', '1556 / 891')),
      single(image('/02_Projects/04_MaxMaher/07_MaxMaher.webp', 'Max Maher branded tote bag photographed in the street.', '1556 / 1358')),
      text('(visual direction)', [
        `The selected direction combines tropical warmth with a distinctly digital structure. A vivid Caribbean palette differentiates the brand from the conservative blues, greens, and dark interfaces common in financial communication. Consistent image treatments create continuity across varied source material, while custom iconography translates recurring economic and technology concepts into a more immediate visual vocabulary.`,
        `A grotesque sans serif provides clarity and efficiency across digital formats. In contrast, bitmap typography acts as a sharper secondary voice: a reference to screens, data, and early digital culture that gives the identity a more memorable technological edge. The tension between both typefaces reflects the larger concept—human energy organized through systems and information.`,
      ]),
      single(image('/02_Projects/04_MaxMaher/08_MaxMaher.webp', 'A set of Max Maher social story templates.', '1556 / 870')),
      single(image('/02_Projects/04_MaxMaher/09_MaxMaher.webp', 'A collection of Max Maher social posts.', '1556 / 870')),
      text('(digital experience)', [
        `The project concluded with a comprehensive brand manual documenting image treatments step by step, along with the use of typography, color, iconography, and motion.`,
        `The guide transformed the art direction into a practical toolkit that Max’s design team could apply and extend without losing consistency.`,
      ], {
        variant: 'lead',
        lead: `Because the identity lived primarily through content, motion was treated as part of the system rather than a final embellishment. I developed storyboards and guiding animations to establish how compositions, icons, images, and information should behave over time. These principles created a more consistent rhythm across future videos and communication pieces.`,
      }),
      single(image('/02_Projects/04_MaxMaher/10_MaxMaher.webp', 'Max Maher website displayed on a laptop.', '1556 / 870')),
      pair(
        image('/02_Projects/04_MaxMaher/11_MaxMaher.webp', 'Max Maher campaign card mounted on a wire panel.', '40.74 / 51.98'), '40.74vw', '51.98vw',
        image('/02_Projects/04_MaxMaher/12_MaxMaher.webp', 'Max Maher website displayed on a phone.', '54.67 / 51.98'), '54.67vw', '51.98vw',
      ),
      text('(conclusion)', [
        `The result balances approachability with expertise and personality with structure. By connecting Caribbean optimism with the language of economics and technology,`,
        `the system gave Max a distinctive space within financial media—one that could evolve across formats without becoming generic or losing its point of view.`,
      ], {
        variant: 'lead',
        lead: `Completed in one month, the rebrand established a coherent identity across Max Maher’s expanding communication ecosystem. The work went beyond creating a recognizable aesthetic: it defined a visual logic for turning dense subjects into accessible content and gave his team the foundations needed to produce new material with greater speed and independence.`,
      }),
    ],
    credits: ['Visual Designer / <a href="https://www.behance.net/juliafranc2cc2" target="_blank" rel="noreferrer">Julia Franceschini</a>'],
  },

  outliant: {
    slug: 'outliant',
    title: 'Outliant',
    year: '2024',
    role: 'Art Director, Brand<br>Strategist & UX/UI<br>Design Lead',
    nutshell: `Outliant is a fully remote digital agency that brings together strategy, design, technology, and growth. As the company evolved, a fundamental problem became increasingly visible: it had never clearly defined who it was, how it should position itself, or which part of the market it wanted to own.`,
    drags: [
      { src: '/02_Projects/05_Outliant/01_OTL_Drag.webp', left: '78vw', top: '-1vw', width: '23vw', rotation: '10deg' },
      { src: '/02_Projects/05_Outliant/02_OTL_Drag.webp', left: '56vw', top: '10vw', width: '25vw', rotation: '-8deg' },
    ],
    blocks: [
      single(video('1215371885', 'Outliant hero brand reel', '1556 / 665')),
      pair(
        image('/02_Projects/05_Outliant/01_OTL.webp', 'A person applying an Outliant Role Creative sticker.', '40.49 / 54.69'), '40.49vw', '54.69vw',
        video('1215371884', 'Outliant brand system in motion', '54.69 / 54.69'), '54.69vw', '54.69vw',
      ),
      pair(
        video('1215371883', 'Outliant campaign animation', '55.97 / 51.98'), '55.97vw', '51.98vw',
        image('/02_Projects/05_Outliant/02_OTL.webp', 'Blue Outliant tote bag.', '39.48 / 51.98'), '39.48vw', '51.98vw',
      ),
      text('(synopsis)', [
        `I independently developed and led Outliant’s rebrand, from research and strategic positioning to the final visual direction. The first priority was to narrow the company’s focus and establish a more coherent definition of the brand. The process examined the gap between how the company described itself, how it appeared across touchpoints, and how it wanted to be perceived. The central challenge was to move away from an undefined, all-encompassing proposition without erasing the brand’s fresh and progressive character.`,
        `Based on those findings, I reframed Outliant’s positioning around a clearer ambition: to become a trusted digital partner for mid-market and enterprise clients. This shift informed a visual system designed to feel mature, concise, and credible while preserving the energy, optimism, and technological fluency at the core of the company. Throughout the project, Skylar, Chief of Officers, and Michelle, Project Managers Lead, provided ongoing stakeholder feedback. The final direction was reviewed and approved by Outliant’s founders during the closing meetings.`,
      ]),
      pair(
        image('/02_Projects/05_Outliant/03_OTL.webp', 'Outliant business card system.', '40.5 / 29.78'), '40.5vw', '29.78vw',
        image('/02_Projects/05_Outliant/04__OTL.webp', 'Outliant campaign billboard.', '54.9 / 51.98'), '54.9vw', '51.98vw',
      ),
      single(image('/02_Projects/05_Outliant/07__OTL.webp', 'Outliant social media and brand book composition.', '1556 / 870')),
      text('(constraints)', [
        `The project was developed within a tight deadline and a limited budget. The founders specifically asked that the logo and core colors should not change dramatically, as both were already established parts of Outliant’s identity. The objective was therefore evolutionary rather than disruptive: to improve the existing assets, resolve inconsistencies, and build a more refined system around recognizable brand equity.`,
        `The budget also ruled out commercial type licensing, so the typographic system was built exclusively with high-quality, freely available fonts. These constraints shaped a focused approach in which each decision needed to deliver clarity, flexibility, and immediate practical value.`,
      ]),
      single(image('/02_Projects/05_Outliant/08__OTL.webp', 'Outliant social story system.', '1556 / 870')),
      single(image('/02_Projects/05_Outliant/09__OTL.webp', 'Outliant social post system.', '1556 / 870')),
      text('(visual direction)', [
        `Following the founders’ direction, the existing logotype was refined rather than replaced. Adjustments to spacing, proportion, and application preserved recognition while improving usability.`,
        `The standalone symbol was reduced in prominence to avoid the compositional limitations identified during the audit. Across the system, the emphasis remained on legibility, modularity, and consistency rather than change for its own sake.`,
      ], {
        variant: 'lead',
        lead: `The selected concept—The Professional & Concise Agency—uses simplicity as a sign of confidence. A restrained palette of dark grey, Outliant’s established electric blue, soft neutrals, and white creates a calmer and more intentional foundation for the work to stand out. The freely available Manrope brings clarity and subtle personality to the primary typography, while Fragment Mono introduces a precise technological accent for highlights and coded details without adding licensing costs.`,
      }),
      single(video('1215371886', 'Outliant website experience', '1556 / 870')),
      text('(digital experience)', [
        `I translated the new positioning and visual direction into a complete website, leading the UX/UI process from structure and interface decisions through final execution. The site became the primary expression of the repositioned brand: a clearer way to explain Outliant’s offer, organize its capabilities, and communicate with a more focused enterprise audience.`,
        `Because Outliant had never worked with a formal design system, I also created its first one from the ground up. I defined reusable foundations, components, patterns, and interaction rules to make the website more consistent and give future digital work a shared, scalable language. Motion principles extended that system into transitions and behaviors, adding rhythm and technological character without compromising clarity.`,
      ]),
      pair(
        image('/02_Projects/05_Outliant/10__OTL.webp', 'Outliant developer department stickers.', '40.74 / 51.98'), '40.74vw', '51.98vw',
        video('1215371895', 'Outliant digital experience in motion', '54.67 / 51.98'), '54.67vw', '51.98vw',
      ),
      text('(conclusion)', [
        `The project resolved more than a visual inconsistency. It gave Outliant a clearer definition of who it was, what it stood for, and how it should position itself in the market. By closing the focus, the brand moved from trying to represent every possible service to presenting a more deliberate and credible proposition for mid-market and enterprise clients.`,
        `That strategic foundation was carried through every layer of the experience: a refined identity that preserved existing recognition, a complete website built around the new positioning, the company’s first design system, and a motion language that made the digital experience feel cohesive. Despite a tight deadline and limited budget, the project established a practical, scalable framework that Outliant could continue using across products, communications, and future growth.`,
      ]),
    ],
    credits: ['Stakeholder & CTO / Skylar Roebuck', 'Stakeholder & PM / Michelle Baun'],
  },

  lumen: {
    slug: 'lumen',
    title: 'Lumen',
    year: '2025',
    role: 'Art Direction, Brand<br>Strategy, Visual<br>Identity',
    nutshell: `Lumen is an audiovisual experience created to give visibility to DJs, visual artists, and experimental creators from different parts of Greater Buenos Aires. The project challenges the idea that high-quality cultural experiences must happen in central, established, or gentrified spaces to be legitimate.`,
    nutshellColumns: [
      `More than an event, Lumen is a platform for encounter: a space where music, moving image, light, sensors, projection, and audience participation come together.`,
      `Technology is approached as an expressive medium—not as a threat or a replacement for human creativity, but as a tool that can expand it when used with intention.`,
    ],
    drags: [
      { src: '/02_Projects/06_Lumen/01_Lumen_Drag.webp', left: '80vw', top: '1vw', width: '20vw', rotation: '7deg' },
      { src: '/02_Projects/06_Lumen/02_Lumen_Drag.webp', left: '59vw', top: '7vw', width: '23vw', rotation: '-10deg' },
    ],
    blocks: [
      single(video('1215371918', 'Lumen audiovisual event highlight reel', '1556 / 570')),
      text('(the context)', [
        `The cultural circuit is often geographically concentrated. Artists who work outside the city center face fewer opportunities to exhibit, connect with new audiences, and become part of the conversations that shape contemporary culture. Distance and unfamiliarity can become invisible barriers: what happens outside the established circuit is too easily perceived as secondary, even when the work is rigorous, innovative, and relevant.`,
        `Lumen emerged from the need to question that imbalance. Its purpose was not to imitate a central cultural model in another location but to create a meaningful experience from the territory itself—one capable of introducing audiences to artists, practices, and places they may not otherwise encounter.`,
      ]),
      single(image('/02_Projects/06_Lumen/01_Lumen.webp', 'Lumen primary and secondary typography system.', '1556 / 870')),
      single(image('/02_Projects/06_Lumen/02_Lumen.webp', 'Large Lumen event poster installed on a concrete wall.', '1556 / 1037')),
      text('(the challenge)', [], {
        variant: 'wide',
        wide: `The project needed to communicate several ideas at once without becoming overly theoretical: decentralization, experimentation, community, nightlife, and the productive relationship between art and technology. It also needed an identity flexible enough to live across a physical event, interactive installations, printed graphics, merchandise, and fast-moving social content. The main creative challenge was to turn a cultural position into an immediate visual and sensory experience. People did not simply need to understand the message; they needed to feel invited into it.`,
      }),
      pair(
        image('/02_Projects/06_Lumen/03_Lumen.webp', 'Lumen posters displayed in a venue window.', '40.5 / 47.55'), '40.5vw', '47.55vw',
        image('/02_Projects/06_Lumen/06_Lumen.webp', 'White Lumen T-shirt over turntables.', '55.26 / 65.17'), '55.26vw', '65.17vw',
      ),
      text('(the concept)', [
        `The name Lumen refers to light as a measurable force, but also as a metaphor for visibility. The concept became the foundation of the brand: to illuminate work, people, and territories that are often left outside the dominant cultural frame.`,
        `Rather than presenting the periphery through lack or comparison, the identity positions it as a site of production, experimentation, and quality in its own right. Lumen does not ask for validation from the center. It creates a new point of attention.`,
      ]),
      single(image('/02_Projects/06_Lumen/07_Lumen.webp', 'Person carrying a Lumen tote bag.', '1556 / 898')),
      text('(design process)', [
        `The system was conceived as a living framework rather than a fixed set of assets. Typography, light, contrast, motion, scale, and graphic repetition could shift across formats while preserving a`,
        `recognizable attitude. This flexibility allowed the brand to support different artists and audiovisual languages without forcing them into a single aesthetic.`,
      ], {
        variant: 'lead',
        lead: `I created the brand from the ground up, defining the visual direction and a system capable of moving between the analog and the digital. The identity was designed to feel luminous, kinetic, and slightly unstable—reflecting a program in which sound, image, bodies, and technology are constantly affecting one another.`,
      }),
      single(image('/02_Projects/06_Lumen/08_Lumen.webp', 'Lumen visual identity layered over a DJ performance.', '1556 / 870')),
      pair(
        image('/02_Projects/06_Lumen/09_Lumen.webp', 'Lumen keychain and printed tag.', '51.36 / 51.98'), '51.36vw', '51.98vw',
        image('/02_Projects/06_Lumen/10_Lumen.webp', 'Black-and-white portrait at a Lumen event.', '44.08 / 51.98'), '44.08vw', '51.98vw',
      ),
      text('(the experience)', [
        `The event combined DJ sets, experimental audiovisual work, and interactive installations. Cameras, sensors, projectors, computers, mapping, and sound-reactive visuals transformed the venue into a sequence of environments. In several pieces, the audience’s movement activated or altered the work, making participation part of the final image rather than an interaction added afterward.`,
        `The experience moved between physical and digital matter: printed surfaces, sculptural elements, screens, projected light, silhouettes, sound, and responsive visuals. This dialogue helped make the project’s position tangible. Technology was not hidden, fetishized, or treated as an enemy; it became another artistic material through which identity, collaboration, and presence could be explored.`,
      ]),
      pair(
        image('/02_Projects/06_Lumen/14_Lumen.webp', 'Lumen mobile event announcement over an audio mixer.', '40.74 / 51.98'), '40.74vw', '51.98vw',
        image('/02_Projects/06_Lumen/15_Lumen.webp', 'Lumen event poster installed on a brick wall.', '54.67 / 51.98'), '54.67vw', '51.98vw',
      ),
      text('(physical & digital touchpoints)', [
        `The printed and merchandise pieces extended Lumen beyond the screen and gave the project a physical memory. Social media, meanwhile, worked as the first point of access: a way to`,
        `introduce the artists, communicate an unfamiliar location, and reduce the distance between the audience and a cultural circuit they may not yet know.`,
      ], {
        variant: 'lead',
        lead: `I translated the identity into printed graphics, event materials, merchandise, and digital communication for social media. Each application had a different practical role—from generating recognition before the event to shaping the atmosphere inside the venue—but all of them belonged to the same visual world.`,
      }),
      single(image('/02_Projects/06_Lumen/16_Lumen.webp', 'Lumen social media screens displayed across mobile devices.', '1556 / 870')),
      single(image('/02_Projects/06_Lumen/17_Lumen.webp', 'A grid of Lumen social media artwork over event equipment.', '1556 / 870')),
      text('(the outcome)', [
        `The strongest result was the coherence between purpose and experience. A brand about visibility used light as both concept and material. A project about decentralization created value from its own territory. And an event about technology treated it as a shared creative language, capable of bringing artists, spaces, and audiences into contact.`,
        `Lumen demonstrated that cultural relevance is not defined by a postcode. Quality, experimentation, and community already exist beyond the established circuit; the work is to create the conditions for them to be seen.`,
      ], {
        variant: 'lead',
        lead: `Lumen became more than a visual identity for an audiovisual event. It created a framework for making overlooked artists and territories visible without reducing them to the label of “emerging” or defining them by their distance from the center. The project connected cultural positioning, technology, and design in one system: the message was present in the communication, but also in the location, the lineup, the installations, and the way the audience participated.`,
      }),
      pair(
        image('/02_Projects/06_Lumen/18_Lumen.webp', 'Lumen visuals shown on a laptop beside event equipment.', '55.66 / 44.83'), '55.66vw', '44.83vw',
        image('/02_Projects/06_Lumen/19_Lumen.webp', 'Lumen ticket designs.', '39.69 / 55.5'), '39.69vw', '55.5vw',
      ),
    ],
    credits: [
      'Project Founders & Leads / Luckystoned & 1nd1a',
      'Spatial Art Direction, Scenography & Production / Guillermina Arbos & Camila Sesler',
      'Photography & Film / Glenda Lazart',
    ],
  },
};
