import { CONTACT_MAIL, type PageRoute } from '../data/catalog';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenLegal: () => void;
}

export function Footer({ onNavigate, onOpenLegal }: FooterProps) {
  const handleNav = (e: React.MouseEvent, target: PageRoute) => {
    e.preventDefault();
    onNavigate(target);
  };

  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <svg className="logo" viewBox="106 99 7470 3306" role="img" aria-label="Kobra’s Productions">
          <use href="#p-logo" />
        </svg>

        <ul aria-label="Pages">
          <li>
            <a href="#/realisations" onClick={(e) => handleNav(e, 'realisations')}>
              Réalisations
            </a>
          </li>
          <li>
            <a href="#/services" onClick={(e) => handleNav(e, 'services')}>
              Services
            </a>
          </li>
          <li>
            <a href="#/tarifs" onClick={(e) => handleNav(e, 'tarifs')}>
              Tarifs
            </a>
          </li>
          <li>
            <a href="#/univers" onClick={(e) => handleNav(e, 'univers')}>
              Notre univers
            </a>
          </li>
          <li>
            <a href="#/devis" onClick={(e) => handleNav(e, 'devis')}>
              Demander un devis
            </a>
          </li>
        </ul>

        <ul aria-label="Réseaux et mentions">
          <li>
            <a
              href="https://instagram.com/kobras_productions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram · @kobras_productions
            </a>
          </li>
          <li>
            <a
              href="https://youtube.com/@KOBRASPRODUCTIONS"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube · @KOBRASPRODUCTIONS
            </a>
          </li>
          <li>
            <a href={`mailto:${CONTACT_MAIL}`}>{CONTACT_MAIL}</a>
          </li>
          <li>
            <button
              className="textlink"
              id="open-legal"
              type="button"
              style={{ font: 'inherit', color: 'inherit' }}
              onClick={onOpenLegal}
            >
              Mentions légales
            </button>
          </li>
        </ul>

        <p className="fine">© 2026 Kobra’s Productions — Association Loi 1901</p>
      </div>
    </footer>
  );
}
