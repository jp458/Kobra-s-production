import type { CSSProperties } from 'react';
import { STEPS } from '../data/catalog';

interface FilmStepsProps {
  detail?: boolean;
}

export function FilmSteps({ detail = false }: FilmStepsProps) {
  return (
    <div className="film">
      <div className="wrap">
        <div className="film-row">
          {STEPS.map((step, index) => (
            <article
              key={step.v}
              className="step reveal"
              style={{ '--h': step.h } as CSSProperties}
            >
              <div className="step-bg" aria-hidden="true">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  decoding="async"
                />
              </div>
              <div className="step-scrim" aria-hidden="true" />

              <span className="n">Étape {index + 1} sur 4</span>
              <div className="step-body">
                <h3>{step.v}</h3>
                <p>{step.t}</p>
                {detail && (
                  <ul>
                    {step.d.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
