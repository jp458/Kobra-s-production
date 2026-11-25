import { useState, type CSSProperties } from 'react';
import type { TeaserItem, WorkItem } from '../data/catalog';
import { getYoutubeThumbUrl } from '../utils/navigation';

interface WorkCardProps {
  item: WorkItem | TeaserItem;
  isTeaser?: boolean;
  onSelect: (item: WorkItem | TeaserItem) => void;
}

export function WorkCard({ item, isTeaser = false, onSelect }: WorkCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const thumbUrl = !imgFailed ? getYoutubeThumbUrl(item.id) : null;
  const hasMedia = Boolean(item.id || item.url);
  const role = 'role' in item ? item.role : undefined;
  const when = 'when' in item ? item.when : undefined;

  const content = (
    <>
      <div className="frame" style={{ '--h': item.h } as CSSProperties}>
        {thumbUrl && (
          <img
            className="thumb"
            src={thumbUrl}
            alt={`Miniature : ${item.t}`}
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        )}
        {isTeaser && <span className="badge">{when || 'Bientôt'}</span>}
        <span className="ph">
          {isTeaser
            ? item.url
              ? 'Voir le teaser'
              : 'Teaser à venir'
            : item.url
              ? 'Voir sur YouTube'
              : 'Lien à venir'}
        </span>
        <span className="play" aria-hidden="true" />
      </div>
      <h3>{item.t}</h3>
      <p>{item.m}</p>
      {role && <p className="role">{role}</p>}
    </>
  );

  if (!hasMedia) {
    return (
      <div className="work reveal" aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      className="work reveal"
      onClick={() => onSelect(item)}
      aria-label={`Lire ${item.t}`}
    >
      {content}
    </button>
  );
}
