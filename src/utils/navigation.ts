import {
  PAGE_TITLES,
  type PageRoute,
  type TeaserItem,
  type WorkCategory,
  type WorkFilter,
  type WorkItem,
} from '../data/catalog';

export function getYoutubeThumbUrl(id: string | null | undefined): string | null {
  if (!id || !id.trim()) return null;
  return `https://i.ytimg.com/vi/${id.trim()}/hqdefault.jpg`;
}

export function getStripWorks(
  category: Exclude<WorkCategory, 'teaser'>,
  works: WorkItem[],
): WorkItem[] {
  return works.filter((w) => w.k === category && Boolean(w.id));
}

export function filterEntries(
  works: WorkItem[],
  teasers: TeaserItem[],
  filter: WorkFilter,
): { works: WorkItem[]; teasers: TeaserItem[]; totalCount: number } {
  const visibleWorks =
    filter === 'all' ? works : works.filter((w) => w.k === filter);
  const visibleTeasers =
    filter === 'all' || filter === 'teaser' ? teasers : [];
  return {
    works: visibleWorks,
    teasers: visibleTeasers,
    totalCount: visibleWorks.length + visibleTeasers.length,
  };
}

export function parseRouteFromHash(hash: string): PageRoute {
  const cleaned = hash.replace(/^#\/?/, '') as PageRoute;
  return cleaned in PAGE_TITLES ? cleaned : 'accueil';
}

export function formatTimecode(ms: number): string {
  const safeMs = Math.max(0, ms);
  const f = Math.floor(safeMs / 40) % 25;
  const s = Math.floor(safeMs / 1000) % 60;
  const m = Math.floor(safeMs / 60000) % 60;
  const h = Math.floor(safeMs / 3600000);
  return [h, m, s, f].map((n) => String(n).padStart(2, '0')).join(':');
}

export interface DevisFormInput {
  accessKey: string;
  nom: string;
  mail: string;
  type: string;
  allSteps: boolean;
  selectedSteps: string[];
  budget: string;
  delai: string;
  ref: string;
  message: string;
}

export function buildDevisPayload(input: DevisFormInput) {
  const type = input.type.trim() || 'Non précisé';
  const etapes = input.allSteps
    ? 'A à Z (toutes les étapes)'
    : input.selectedSteps.length > 0
      ? input.selectedSteps.join(', ')
      : 'Non précisé';

  return {
    access_key: input.accessKey,
    subject: `Demande de devis — ${type}`,
    from_name: 'Site Kobra’s Productions',
    name: input.nom.trim(),
    email: input.mail.trim(),
    'Type de projet': type,
    'Étapes souhaitées': etapes,
    'Budget indicatif': input.budget,
    'Délai souhaité': input.delai.trim() || 'Non précisé',
    'Lien de référence': input.ref.trim() || 'Aucun',
    message: input.message.trim(),
  };
}
