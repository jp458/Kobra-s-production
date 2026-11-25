import { useEffect, useRef, useState } from 'react';
import type { PageRoute } from '../data/catalog';
import { formatTimecode } from '../utils/navigation';

interface HeroProps {
  active: boolean;
  onNavigate: (route: PageRoute) => void;
}

const VB = { x: 106, y: 99, w: 2222, h: 3306 };

export function Hero({ active, onNavigate }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cobraRef = useRef<SVGSVGElement>(null);
  const beamRef = useRef<SVGRadialGradientElement>(null);
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !active) return;

    const t0 = performance.now();
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setTimecode(formatTimecode(performance.now() - t0));
    }, 40);

    return () => window.clearInterval(timer);
  }, [active]);

  useEffect(() => {
    const hero = heroRef.current;
    const glow = glowRef.current;
    const cobra = cobraRef.current;
    const beam = beamRef.current;
    if (!hero || !glow || !cobra || !beam) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    let idleRaf: number | null = null;
    let resumeTimer: number | null = null;

    const applyLight = (px: number, py: number) => {
      const hr = hero.getBoundingClientRect();
      const cr = cobra.getBoundingClientRect();
      if (!cr.width || !cr.height) return;
      glow.style.setProperty('--mx', `${px - hr.left}px`);
      glow.style.setProperty('--my', `${py - hr.top}px`);
      const vx = VB.x + ((px - cr.left) / cr.width) * VB.w;
      const vy = VB.y + ((py - cr.top) / cr.height) * VB.h;
      beam.setAttribute('cx', String(vx));
      beam.setAttribute('cy', String(vy));
    };

    const restLight = () => {
      const cr = cobra.getBoundingClientRect();
      if (!cr.width) return;
      applyLight(cr.left + cr.width * 0.45, cr.top + cr.height * 0.22);
    };

    const tickIdle = (t: number) => {
      if (!active) {
        idleRaf = null;
        return;
      }
      const cr = cobra.getBoundingClientRect();
      if (cr.width) {
        const dx = Math.sin(t / 4000) * cr.width * 0.05;
        const dy = Math.cos(t / 5200) * cr.height * 0.04;
        applyLight(cr.left + cr.width * 0.45 + dx, cr.top + cr.height * 0.22 + dy);
      }
      idleRaf = window.requestAnimationFrame(tickIdle);
    };

    const startIdle = () => {
      if (!reduce && active && idleRaf === null) {
        idleRaf = window.requestAnimationFrame(tickIdle);
      }
    };

    const pauseIdle = (resumeAfterMs: number) => {
      if (idleRaf !== null) {
        window.cancelAnimationFrame(idleRaf);
        idleRaf = null;
      }
      if (resumeTimer !== null) {
        window.clearTimeout(resumeTimer);
        resumeTimer = null;
      }
      if (resumeAfterMs > 0) {
        resumeTimer = window.setTimeout(startIdle, resumeAfterMs);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      pauseIdle(1800);
      applyLight(e.clientX, e.clientY);
    };

    const onPointerLeave = () => {
      pauseIdle(0);
      startIdle();
    };

    restLight();
    startIdle();

    if (!reduce) {
      hero.addEventListener('pointermove', onPointerMove);
      hero.addEventListener('pointerleave', onPointerLeave);
    }
    window.addEventListener('resize', restLight);

    return () => {
      pauseIdle(0);
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', restLight);
    };
  }, [active]);

  return (
    <section className="hero" id="hero" ref={heroRef} aria-label="Présentation">
      <div className="hero-glow" id="glow" ref={glowRef} />
      <svg
        className="cobra"
        id="cobra"
        ref={cobraRef}
        viewBox="106 99 2222 3306"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <radialGradient
            id="beam"
            ref={beamRef}
            gradientUnits="userSpaceOnUse"
            cx="900"
            cy="900"
            r="2300"
          >
            <stop offset="0" style={{ stopColor: 'var(--accent)' }} />
            <stop
              offset=".22"
              style={{ stopColor: 'color-mix(in srgb, var(--accent) 55%, #1a1a1e)' }}
            />
            <stop offset=".62" stopColor="#17171b" />
            <stop offset="1" stopColor="#0d0d0f" />
          </radialGradient>
        </defs>
        <use href="#p-icon" fill="url(#beam)" />
      </svg>

      <div className="tc" aria-hidden="true">
        <i />
        <span id="tc">{timecode}</span>
      </div>

      <div className="wrap hero-in">
        <h1>
          <span className="ln">
            <span>Donnez du</span>
          </span>
          <span className="ln">
            <span>venin à</span>
          </span>
          <span className="ln">
            <span>vos idées.</span>
          </span>
        </h1>
        <p className="hero-sub">De l’idée à l’image.</p>
        <div className="cta-row">
          <a
            className="btn btn-solid"
            href="#/realisations"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('realisations');
            }}
          >
            Voir nos réalisations
          </a>
          <a
            className="btn"
            href="#/devis"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('devis');
            }}
          >
            Demander un devis
          </a>
        </div>
      </div>
    </section>
  );
}
