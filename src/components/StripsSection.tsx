import type { CSSProperties } from 'react';
import { STRIPS, WORKS, type PageRoute, type WorkFilter } from '../data/catalog';
import { getStripWorks, getYoutubeThumbUrl } from '../utils/navigation';

interface StripsSectionProps {
  onOpenCategory: (route: PageRoute, filter: WorkFilter) => void;
}

export function StripsSection({ onOpenCategory }: StripsSectionProps) {
  return (
    <div className="strips" id="strips">
      {STRIPS.map((strip) => {
        const items = getStripWorks(strip.k, WORKS);

        return (
          <a
            key={strip.k}
            className="strip reveal"
            href="#/realisations"
            onClick={(e) => {
              e.preventDefault();
              onOpenCategory('realisations', strip.k);
            }}
          >
            <div className="frame" style={{ '--h': strip.h } as CSSProperties}>
              {items.length > 0 && (
                <>
                  <div
                    className="strip-gallery"
                    style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
                    aria-hidden="true"
                  >
                    {items.map((work) => {
                      const thumbUrl = getYoutubeThumbUrl(work.id);
                      if (!thumbUrl) return null;
                      return (
                        <div className="strip-gallery-cell" key={work.id}>
                          <img src={thumbUrl} alt="" loading="lazy" decoding="async" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="strip-scrim" aria-hidden="true" />
                </>
              )}
            </div>

            <div className="wrap in">
              <div>
                <h3>{strip.t}</h3>
                <p>{strip.s}</p>
                {items.length > 0 && (
                  <p className="strip-meta">{items.map((w) => w.t).join(' · ')}</p>
                )}
              </div>

              <div className="strip-right">
                {items.length > 0 ? (
                  <div className="strip-thumbs" aria-hidden="true">
                    {items.map((work) => {
                      const thumbUrl = getYoutubeThumbUrl(work.id);
                      if (!thumbUrl) return null;
                      return (
                        <div className="strip-thumb" key={work.id}>
                          <div className="strip-thumb-media">
                            <img src={thumbUrl} alt="" loading="lazy" decoding="async" />
                          </div>
                          <span className="strip-thumb-cap">{work.t}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span className="strip-soon-note">En cours de montage</span>
                )}
                <span className="go" aria-hidden="true">
                  ↗
                </span>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
