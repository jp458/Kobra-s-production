import { Hero } from '../components/Hero';
import { StripsSection } from '../components/StripsSection';
import { FilmSteps } from '../components/FilmSteps';
import { PricesList } from '../components/PricesList';
import { WorkCard } from '../components/WorkCard';
import {
  TEASERS,
  type PageRoute,
  type TeaserItem,
  type WorkFilter,
  type WorkItem,
} from '../data/catalog';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenCategory: (route: PageRoute, filter: WorkFilter) => void;
  onRequestDevis: (project: string, allSteps?: boolean) => void;
  onSelectWork: (item: WorkItem | TeaserItem) => void;
}

export function HomePage({
  onNavigate,
  onOpenCategory,
  onRequestDevis,
  onSelectWork,
}: HomePageProps) {
  return (
    <div className="page enter" data-page="accueil">
      <Hero active onNavigate={onNavigate} />

      <section className="sec" aria-labelledby="h-real">
        <div className="wrap sec-head">
          <h2 id="h-real" className="reveal">
            Nos réalisations
          </h2>
          <a
            className="textlink"
            href="#/realisations"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('realisations');
            }}
          >
            Tout voir
          </a>
        </div>
        <StripsSection onOpenCategory={onOpenCategory} />
      </section>

      {TEASERS.length > 0 && (
        <section
          className="sec"
          id="teasers-sec"
          aria-labelledby="h-teas"
          style={{ paddingTop: 0 }}
        >
          <div className="wrap sec-head">
            <h2 id="h-teas" className="reveal">
              Teasers
            </h2>
            <a
              className="textlink"
              href="#/realisations"
              onClick={(e) => {
                e.preventDefault();
                onOpenCategory('realisations', 'teaser');
              }}
            >
              Tout voir
            </a>
          </div>
          <div className="wrap">
            <div className="works three" id="teasers-home">
              {TEASERS.slice(0, 3).map((teaser) => (
                <WorkCard
                  key={teaser.t}
                  item={teaser}
                  isTeaser
                  onSelect={onSelectWork}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section
        className="sec"
        aria-labelledby="h-serv"
        style={{ paddingTop: 0 }}
      >
        <div className="wrap sec-head">
          <h2 id="h-serv" className="reveal">
            Nos services
          </h2>
          <a
            className="textlink"
            href="#/services"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('services');
            }}
          >
            Le détail
          </a>
        </div>
        <FilmSteps />
        <div className="wrap after-film">
          <p>
            Chaque projet suit ces quatre étapes. Choisissez celles dont vous avez besoin.
          </p>
          <a
            className="textlink"
            href="#/tarifs"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('tarifs');
            }}
          >
            Voir les tarifs
          </a>
        </div>
      </section>

      <section
        className="sec"
        aria-labelledby="h-tar"
        style={{ paddingTop: 0 }}
      >
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-tar" className="reveal">
              Nos tarifs
            </h2>
          </div>
          <PricesList compact onRequestDevis={onRequestDevis} />
          <blockquote className="quote">
            <strong>Votre projet. Vos besoins. Votre budget.</strong>
            <span>Choisissez les étapes dont vous avez besoin.</span>
            <a
              className="textlink"
              href="#/devis"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('devis');
              }}
            >
              Demander un devis
            </a>
          </blockquote>
        </div>
      </section>

      <section
        className="sec"
        aria-labelledby="h-uni"
        style={{ paddingTop: 0 }}
      >
        <div className="wrap">
          <div className="sec-head">
            <h2 id="h-uni" className="reveal">
              Notre univers
            </h2>
            <a
              className="textlink"
              href="#/univers"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('univers');
              }}
            >
              Découvrir
            </a>
          </div>
          <p
            style={{
              maxWidth: '60ch',
              fontSize: '1.1rem',
              color: 'var(--muted)',
            }}
          >
            KOBRAS PRODUCTIONS est un univers audiovisuel à la croisée de l’image, du récit et
            de la création — pensé sur mesure pour les artistes, créatifs, marques et projets
            culturels.
          </p>
        </div>
      </section>

      <section className="final" aria-labelledby="h-final">
        <div className="wrap">
          <h2 id="h-final" className="reveal">
            Un projet
            <br />
            en tête ?
          </h2>
          <a
            className="btn btn-solid"
            href="#/devis"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('devis');
            }}
          >
            Demander un devis
          </a>
        </div>
      </section>
    </div>
  );
}
