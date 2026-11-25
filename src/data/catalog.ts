export type PageRoute =
  | 'accueil'
  | 'realisations'
  | 'services'
  | 'tarifs'
  | 'univers'
  | 'devis';

export type WorkCategory = 'clip' | 'court' | 'demo' | 'teaser';
export type WorkFilter = 'all' | WorkCategory;

export interface StepItem {
  v: string;
  h: number;
  t: string;
  d: string[];
  image: string;
  imageAlt: string;
}

export interface PriceFormat {
  n: string;
  sub?: string;
  p: string;
  all?: boolean;
  d: string;
}

export interface PriceItem {
  n: string;
  p?: string;
  compact?: string;
  d?: string | string[];
  formats?: PriceFormat[];
  soon?: boolean;
}

export interface StripItem {
  k: Exclude<WorkCategory, 'teaser'>;
  t: string;
  s: string;
  h: number;
}

export interface WorkItem {
  k: Exclude<WorkCategory, 'teaser'>;
  t: string;
  m: string;
  h: number;
  role?: string;
  url: string | null;
  id: string | null;
}

export interface TeaserItem {
  t: string;
  m: string;
  when?: string;
  h: number;
  url: string | null;
  id: string | null;
}

export const CONTACT_MAIL = 'kobrasprod@gmail.com';
export const WEB3FORMS_KEY = '';

export const PAGE_TITLES: Record<PageRoute, string> = {
  accueil: 'Kobra’s Productions',
  realisations: 'Nos réalisations — Kobra’s Productions',
  services: 'Nos services — Kobra’s Productions',
  tarifs: 'Nos tarifs — Kobra’s Productions',
  univers: 'Notre univers — Kobra’s Productions',
  devis: 'Demander un devis — Kobra’s Productions',
};

export const EMPTY_MESSAGES: Partial<Record<WorkFilter, string>> = {
  demo: 'Les bandes démo arrivent bientôt : les montages sont en cours.',
  teaser: 'Les premiers teasers arrivent bientôt.',
};

export const STEPS: StepItem[] = [
  {
    v: 'Écrire',
    h: 265,
    t: 'Une idée, un scénario, une note d’intention. Tout commence par le texte.',
    d: ['Scénario', 'Note d’intention', 'Traitement'],
    image: '/assets/aistudio/ecrire_6235f30c.jpg',
    imageAlt: 'Main écrivant un scénario au stylo dans un carnet, en noir et blanc',
  },
  {
    v: 'Concevoir',
    h: 200,
    t: 'Direction artistique, storyboard, plan de tournage.',
    d: ['Direction artistique', 'Storyboard', 'Plan de tournage'],
    image: '/assets/aistudio/concevoir_fa45b81b.jpg',
    imageAlt: 'Poste de conception multi-écrans et moniteurs de contrôle, en noir et blanc',
  },
  {
    v: 'Tourner',
    h: 20,
    t: 'Image, lumière et son, sur le plateau ou en extérieur.',
    d: ['Équipe et matériel', 'Lumière', 'Prise de son'],
    image: '/assets/aistudio/tourner_fdd9418b.jpg',
    imageAlt: 'Plateau de tournage équipé de projecteurs et structures lumière, en noir et blanc',
  },
  {
    v: 'Monter',
    h: 340,
    t: 'Montage, étalonnage et livraison dans les bons formats.',
    d: ['Montage', 'Étalonnage', 'Livraison multi-formats'],
    image: '/assets/aistudio/monter_01fdbc3b.jpg',
    imageAlt: 'Timeline de montage vidéo et rushs dans un logiciel de post-production, en noir et blanc',
  },
];

export const PRICES: PriceItem[] = [
  {
    n: 'Bande démo',
    p: '100 € – 450 €',
    d: 'Création d’un support audiovisuel destiné à présenter et valoriser l’identité, l’univers et les activités d’un artiste, d’une structure ou d’une entité. Durée indicative : 1 à 3 min.',
  },
  {
    n: 'Reel / Contenu court',
    p: '100 € – 350 €',
    d: 'Création de contenus audiovisuels courts destinés à dynamiser la communication digitale, promouvoir un projet, un événement ou une activité et favoriser l’engagement sur les plateformes numériques. Durée indicative : 15 à 90 secondes.',
  },
  {
    n: 'Court-métrage / Film court',
    compact: '3 formats · 300 € – 2 500 €',
    d: [
      'Durée entre 1 et 6 minutes.',
      'Toute demande portant sur un film d’une durée supérieure fera l’objet d’une tarification adaptée, établie en fonction de la complexité du projet, du temps de production et des moyens nécessaires.',
    ],
    formats: [
      {
        n: 'Création de A à Z',
        sub: 'De l’idée au film final',
        p: '800 à 2 500 €',
        all: true,
        d: 'Pour les artistes, associations ou structures qui souhaitent donner vie à une idée, une histoire ou un projet audiovisuel, sans nécessairement avoir déjà écrit ou préparé leur scénario.',
      },
      {
        n: 'Réalisation à partir de votre scénario',
        p: '700 à 1 500 €',
        d: 'Vous avez déjà écrit votre scénario et souhaitez le concrétiser en film ? KOBRAS Productions vous accompagne dans sa réalisation audiovisuelle, de la préparation du tournage à la finalisation du film.',
      },
      {
        n: 'Conception et écriture de scénario',
        p: '300 à 800 €',
        d: 'Vous avez une idée, une histoire ou un univers à raconter, mais vous souhaitez être accompagné dans sa construction et son écriture ? KOBRAS Productions vous accompagne dans le développement de votre idée et la rédaction de votre scénario.',
      },
    ],
  },
  { n: 'Clip musical', soon: true },
];

export const STRIPS: StripItem[] = [
  { k: 'clip', t: 'Clips musicaux', s: 'Donner une image à un son.', h: 265 },
  { k: 'court', t: 'Courts-métrages', s: 'Raconter en quelques minutes.', h: 20 },
  { k: 'demo', t: 'Bandes démo', s: 'Se montrer sous son meilleur jour.', h: 200 },
];

export const WORKS: WorkItem[] = [
  {
    k: 'clip',
    t: '« 25 Ans »',
    m: 'Clip musical cinématographique · KA BERRA · Mars 2026',
    h: 265,
    role: 'Production de A à Z — écriture scénario, tournage, cadrage, montage.',
    url: 'https://youtu.be/COoIdcqK0W4?si=lf2ZofH8GnsrWGDF',
    id: 'COoIdcqK0W4',
  },
  {
    k: 'clip',
    t: '« Délires d’une Mélomane »',
    m: 'Clip musical cinématographique · KA BERRA · Septembre 2025',
    h: 340,
    role: 'Co-écriture scénario et production financière.',
    url: 'https://youtu.be/8KNjYSYqMPA?si=kO0F5cL50C-inbxY',
    id: '8KNjYSYqMPA',
  },
  {
    k: 'court',
    t: '« Hypersensibilité »',
    m: 'Court-métrage',
    h: 20,
    role: 'Production de A à Z — écriture scénario, tournage, cadrage, montage.',
    url: 'https://youtu.be/EmnK2zwiFjc?si=bE6bV2cE2kif-7-s',
    id: 'EmnK2zwiFjc',
  },
  {
    k: 'court',
    t: '« I AM »',
    m: 'Court-métrage',
    h: 150,
    role: 'Production de A à Z — écriture scénario, tournage, cadrage, montage.',
    url: 'https://youtu.be/5sUIpbPgv5M?si=SzDUcV2doapvWPv4',
    id: '5sUIpbPgv5M',
  },
];

export const TEASERS: TeaserItem[] = [];

export const PROJECT_TYPES = [
  'Bande démo',
  'Reel / Contenu court',
  'Court-métrage / Film court',
  'Clip musical (à venir)',
  'Autres',
] as const;

export const BUDGET_OPTIONS = [
  'Je ne sais pas encore',
  'Moins de 1 000 €',
  '1 000 à 3 000 €',
  '3 000 à 10 000 €',
  'Plus de 10 000 €',
] as const;
