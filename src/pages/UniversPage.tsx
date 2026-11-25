import type { CSSProperties } from 'react';

export function UniversPage() {
  return (
    <div className="page" data-page="univers">
      <header className="phead">
        <div className="wrap">
          <h1>
            <span className="ln">
              <span>Notre univers</span>
            </span>
          </h1>
        </div>
      </header>

      <section
        className="wrap"
        style={{ paddingBottom: 'clamp(64px, 9vw, 140px)' }}
      >
        <div className="univers">
          <div>
            <p style={{ margin: '0 0 26px', fontSize: '1.08rem' }}>
              <strong
                style={{
                  display: 'block',
                  font: '700 1rem var(--display)',
                  letterSpacing: '.02em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                }}
              >
                Notre univers
              </strong>
              KOBRAS PRODUCTIONS est un univers audiovisuel à la croisée de l’image, du récit et
              de la création. Nous accompagnons artistes, créatifs, marques, entrepreneurs et
              projets culturels dans la création de contenus pensés sur mesure, avec une
              attention particulière portée au storytelling et à l’identité visuelle.
            </p>

            <p style={{ margin: '0 0 26px', fontSize: '1.08rem' }}>
              <strong
                style={{
                  display: 'block',
                  font: '700 1rem var(--display)',
                  letterSpacing: '.02em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                }}
              >
                Notre vision
              </strong>
              Avant de créer une image, nous cherchons à comprendre le besoin, le public et
              l’objectif du projet : visibilité, lancement, communication, notoriété ou expression
              artistique. Nous transformons ensuite cette intention en une proposition visuelle et
              narrative cohérente, singulière et mémorable.
            </p>

            <p style={{ margin: '0 0 30px', fontSize: '1.08rem' }}>
              <strong
                style={{
                  display: 'block',
                  font: '700 1rem var(--display)',
                  letterSpacing: '.02em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  marginBottom: '10px',
                }}
              >
                Notre façon de travailler
              </strong>
              Nous privilégions une approche humaine, créative et sur mesure. L’objectif n’est pas
              simplement de produire du contenu, mais de créer un univers qui donne du sens au
              projet, attire l’attention et laisse une empreinte.
            </p>

            <blockquote className="quote" style={{ margin: 0 }}>
              <strong>« Votre projet mérite une histoire qui reste. »</strong>
              <span>
                Votre projet manque d’impact visuel ou narratif ? KOBRAS Productions construit
                votre identité et crée les supports qui lui donnent vie. Résultat : un contenu qui
                attire, raconte et reste en mémoire.
              </span>
            </blockquote>
          </div>

          <div className="vis" aria-hidden="true">
            <div
              className="frame"
              style={{ '--h': 265, position: 'absolute', inset: 0 } as CSSProperties}
            />
            <svg viewBox="106 99 2222 3306">
              <use href="#p-icon" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}
