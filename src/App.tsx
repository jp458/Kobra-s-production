import { useCallback, useEffect, useRef, useState } from 'react';
import { SvgDefs } from './components/SvgDefs';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { LegalModal } from './components/LegalModal';
import { HomePage } from './pages/HomePage';
import { RealisationsPage } from './pages/RealisationsPage';
import { ServicesPage } from './pages/ServicesPage';
import { TarifsPage } from './pages/TarifsPage';
import { UniversPage } from './pages/UniversPage';
import { DevisPage, type DevisPrefill } from './pages/DevisPage';
import {
  PAGE_TITLES,
  type PageRoute,
  type TeaserItem,
  type WorkFilter,
  type WorkItem,
} from './data/catalog';
import { parseRouteFromHash } from './utils/navigation';

export default function App() {
  const [route, setRoute] = useState<PageRoute>(() =>
    parseRouteFromHash(typeof window !== 'undefined' ? window.location.hash : ''),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [workFilter, setWorkFilter] = useState<WorkFilter>('all');
  const [devisPrefill, setDevisPrefill] = useState<DevisPrefill>({});
  const [selectedWork, setSelectedWork] = useState<WorkItem | TeaserItem | null>(null);
  const [legalOpen, setLegalOpen] = useState(false);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((target: PageRoute) => {
    setRoute(target);
    setMenuOpen(false);
    window.scrollTo(0, 0);
    try {
      window.history.replaceState(
        null,
        '',
        `#/${target === 'accueil' ? '' : target}`,
      );
    } catch {
      // ignore history errors inside sandboxed iframes
    }
  }, []);

  const handleOpenCategory = useCallback(
    (target: PageRoute, filter: WorkFilter) => {
      setWorkFilter(filter);
      navigate(target);
    },
    [navigate],
  );

  const handleRequestDevis = useCallback(
    (project: string, allSteps = false) => {
      setDevisPrefill({ project, allSteps, nonce: Date.now() });
      navigate('devis');
    },
    [navigate],
  );

  useEffect(() => {
    document.title = PAGE_TITLES[route];
  }, [route]);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseRouteFromHash(window.location.hash));
      setMenuOpen(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen && !selectedWork && !legalOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, selectedWork, legalOpen]);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      const bar = scrollbarRef.current;
      if (!bar) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0;
      bar.style.width = `${pct}%`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
      }
    };

    window.requestAnimationFrame(updateProgress);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, [route, workFilter]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('in'));
      return;
    }

    const revealVisible = () => {
      const vh = window.innerHeight || 900;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.96) {
          el.classList.add('in');
        }
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    );

    elements.forEach((el) => {
      el.classList.remove('in');
      io.observe(el);
    });

    const raf = window.requestAnimationFrame(revealVisible);
    const fallbackTimer = window.setTimeout(revealVisible, 350);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(fallbackTimer);
      io.disconnect();
    };
  }, [route, workFilter]);

  return (
    <>
      <SvgDefs />
      <div className="scrollbar" id="scrollbar" ref={scrollbarRef} aria-hidden="true" />

      <Navbar
        route={route}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        onNavigate={navigate}
      />

      <main id="main">
        {route === 'accueil' && (
          <HomePage
            onNavigate={navigate}
            onOpenCategory={handleOpenCategory}
            onRequestDevis={handleRequestDevis}
            onSelectWork={setSelectedWork}
          />
        )}
        {route === 'realisations' && (
          <RealisationsPage
            filter={workFilter}
            onFilterChange={setWorkFilter}
            onSelectWork={setSelectedWork}
          />
        )}
        {route === 'services' && <ServicesPage onNavigate={navigate} />}
        {route === 'tarifs' && (
          <TarifsPage
            onNavigate={navigate}
            onRequestDevis={handleRequestDevis}
          />
        )}
        {route === 'univers' && <UniversPage />}
        {route === 'devis' && <DevisPage prefill={devisPrefill} />}
      </main>

      <Footer
        onNavigate={navigate}
        onOpenLegal={() => setLegalOpen(true)}
      />

      <VideoModal
        item={selectedWork}
        onClose={() => setSelectedWork(null)}
      />
      <LegalModal
        open={legalOpen}
        onClose={() => setLegalOpen(false)}
      />
    </>
  );
}
