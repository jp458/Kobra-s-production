import { useEffect } from 'react';
import type { PageRoute } from '../data/catalog';

interface NavbarProps {
  route: PageRoute;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onNavigate: (route: PageRoute) => void;
}

const NAV_ITEMS: { route: PageRoute; label: string }[] = [
  { route: 'realisations', label: 'Réalisations' },
  { route: 'services', label: 'Services' },
  { route: 'tarifs', label: 'Tarifs' },
  { route: 'univers', label: 'Notre univers' },
];

export function Navbar({
  route,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onNavigate,
}: NavbarProps) {
  useEffect(() => {
    document.body.classList.toggle('lock', menuOpen);
    return () => {
      document.body.classList.remove('lock');
    };
  }, [menuOpen]);

  const handleLinkClick = (e: React.MouseEvent, target: PageRoute) => {
    e.preventDefault();
    onCloseMenu();
    onNavigate(target);
  };

  return (
    <header className={`nav${menuOpen ? ' open' : ''}`} id="nav">
      <div className="wrap nav-in">
        <a
          className="brand"
          href="#/"
          aria-label="Kobra’s Productions, accueil"
          onClick={(e) => handleLinkClick(e, 'accueil')}
        >
          <svg className="logo" viewBox="106 99 7470 3306" role="img" aria-hidden="true">
            <use href="#p-logo" />
          </svg>
        </a>

        <nav className="links" id="links" aria-label="Navigation principale">
          <a
            className="only-mobile"
            href="#/"
            onClick={(e) => handleLinkClick(e, 'accueil')}
          >
            Accueil
          </a>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.route}
              href={`#/${item.route}`}
              aria-current={route === item.route ? 'page' : undefined}
              onClick={(e) => handleLinkClick(e, item.route)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="only-mobile"
            href="#/devis"
            onClick={(e) => handleLinkClick(e, 'devis')}
          >
            Demander un devis
          </a>
        </nav>

        <a
          className="btn btn-sm"
          href="#/devis"
          onClick={(e) => handleLinkClick(e, 'devis')}
        >
          Demander un devis
        </a>

        <button
          className="burger"
          id="burger"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="links"
          onClick={onToggleMenu}
        >
          {menuOpen ? 'Fermer' : 'Menu'}
        </button>
      </div>
    </header>
  );
}
