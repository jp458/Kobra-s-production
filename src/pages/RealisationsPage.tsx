import { WorkCard } from '../components/WorkCard';
import {
  EMPTY_MESSAGES,
  TEASERS,
  WORKS,
  type TeaserItem,
  type WorkFilter,
  type WorkItem,
} from '../data/catalog';
import { filterEntries } from '../utils/navigation';

interface RealisationsPageProps {
  filter: WorkFilter;
  onFilterChange: (filter: WorkFilter) => void;
  onSelectWork: (item: WorkItem | TeaserItem) => void;
}

const FILTER_OPTIONS: { key: WorkFilter; label: string }[] = [
  { key: 'all', label: 'Tout' },
  { key: 'clip', label: 'Clips musicaux' },
  { key: 'court', label: 'Courts-métrages' },
  { key: 'demo', label: 'Bandes démo' },
  { key: 'teaser', label: 'Teasers' },
];

export function RealisationsPage({
  filter,
  onFilterChange,
  onSelectWork,
}: RealisationsPageProps) {
  const { works, teasers, totalCount } = filterEntries(WORKS, TEASERS, filter);
  const emptyMessage = EMPTY_MESSAGES[filter] || '';

  return (
    <div className="page" data-page="realisations">
      <header className="phead">
        <div className="wrap">
          <h1>
            <span className="ln">
              <span>Nos réalisations</span>
            </span>
          </h1>
          <p>
            Clips musicaux, courts-métrages, bandes démo et teasers promotionnels. Ouvrez un
            projet pour le visionner.
          </p>
        </div>
      </header>

      <section
        className="wrap"
        style={{ paddingBottom: 'clamp(64px, 9vw, 140px)' }}
      >
        <div className="filters" role="group" aria-label="Filtrer par type">
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              data-filter={option.key}
              aria-pressed={filter === option.key}
              onClick={() => onFilterChange(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="works" id="works">
          {works.map((work) => (
            <WorkCard
              key={work.t}
              item={work}
              onSelect={onSelectWork}
            />
          ))}
          {teasers.map((teaser) => (
            <WorkCard
              key={teaser.t}
              item={teaser}
              isTeaser
              onSelect={onSelectWork}
            />
          ))}
          {totalCount === 0 && emptyMessage && (
            <p className="note demo-empty">{emptyMessage}</p>
          )}
        </div>

        <p className="note">
          Les cadres avec lien s’ouvrent directement dans le lecteur vidéo ou sur YouTube. Les
          bandes démo et les teasers suivront dès que les montages seront prêts.
        </p>
      </section>
    </div>
  );
}
