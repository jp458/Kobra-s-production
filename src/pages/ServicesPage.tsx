import { FilmSteps } from '../components/FilmSteps';
import type { PageRoute } from '../data/catalog';

interface ServicesPageProps {
  onNavigate: (route: PageRoute) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="page" data-page="services">
      <header className="phead">
        <div className="wrap">
          <h1>
            <span className="ln">
              <span>Écrire, concevoir, tourner, monter.</span>
            </span>
          </h1>
          <p>
            De l’idée à l’image, en quatre étapes. Vous prenez tout, ou seulement ce dont vous
            avez besoin.
          </p>
        </div>
      </header>

      <section style={{ paddingBottom: 'clamp(64px, 9vw, 140px)' }}>
        <FilmSteps detail />
        <div className="wrap after-film">
          <p>
            Un scénario à écrire sans le tourner ? Une idée à porter jusqu’au film final ?
            Composez votre projet.
          </p>
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
