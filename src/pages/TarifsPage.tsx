import { PricesList } from '../components/PricesList';
import type { PageRoute } from '../data/catalog';

interface TarifsPageProps {
  onNavigate: (route: PageRoute) => void;
  onRequestDevis: (project: string, allSteps?: boolean) => void;
}

export function TarifsPage({ onNavigate, onRequestDevis }: TarifsPageProps) {
  return (
    <div className="page" data-page="tarifs">
      <header className="phead">
        <div className="wrap">
          <h1>
            <span className="ln">
              <span>Nos tarifs</span>
            </span>
          </h1>
          <p>
            Une base par prestation. Le prix final dépend des étapes que vous choisissez. Chaque
            projet étant unique, le tarif définitif est établi sur devis, en fonction de sa
            complexité, de ses besoins artistiques, techniques et humains.
          </p>
        </div>
      </header>

      <section
        className="wrap"
        style={{ paddingBottom: 'clamp(64px, 9vw, 140px)' }}
      >
        <PricesList onRequestDevis={onRequestDevis} />
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
      </section>
    </div>
  );
}
