import { useEffect, useRef } from 'react';
import type { TeaserItem, WorkItem } from '../data/catalog';

interface VideoModalProps {
  item: WorkItem | TeaserItem | null;
  onClose: () => void;
}

export function VideoModal({ item, onClose }: VideoModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add('lock');
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('lock');
      prevFocus?.focus?.();
    };
  }, [item, onClose]);

  if (!item) return null;

  const role = 'role' in item ? item.role : undefined;

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeBtnRef}
        className="close"
        type="button"
        onClick={onClose}
      >
        Fermer
      </button>

      <div className="modal-box">
        <div
          style={{
            position: 'relative',
            aspectRatio: '16 / 9',
            background: '#000',
            border: '1px solid var(--line-strong)',
          }}
        >
          {item.id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0`}
              title={item.t}
              style={{ width: '100%', height: '100%', border: 0 }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div
              style={{
                height: '100%',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--muted)',
              }}
            >
              Aperçu vidéo indisponible.
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '16px',
            marginTop: '20px',
          }}
        >
          <div>
            <h3
              id="video-modal-title"
              style={{
                margin: 0,
                font: '800 clamp(1.4rem, 3vw, 2rem) / 1.1 var(--display)',
                letterSpacing: '-0.025em',
              }}
            >
              {item.t}
            </h3>
            <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>{item.m}</p>
            {role && (
              <p style={{ margin: '6px 0 0', color: 'var(--dim)', fontSize: '0.9rem' }}>
                {role}
              </p>
            )}
          </div>

          {item.url && (
            <a
              className="textlink"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ouvrir sur YouTube ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
