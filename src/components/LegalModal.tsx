import { useEffect, useRef } from 'react';
import { CONTACT_MAIL } from '../data/catalog';

interface LegalModalProps {
  open: boolean;
  onClose: () => void;
}

export function LegalModal({ open, onClose }: LegalModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add('lock');
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('lock');
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal"
      id="legal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="l-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeBtnRef}
        className="close"
        id="l-close"
        type="button"
        onClick={onClose}
      >
        Fermer
      </button>
      <div className="modal-box" style={{ maxWidth: '640px' }}>
        <h3
          id="l-title"
          style={{
            font: '800 clamp(1.6rem, 3.4vw, 2.2rem) / 1 var(--display)',
            letterSpacing: '-0.03em',
            margin: '0 0 24px',
          }}
        >
          Mentions légales
        </h3>
        <p style={{ margin: '0 0 14px' }}>
          <strong style={{ color: 'var(--text)' }}>Statut : </strong>
          KOBRAS PRODUCTIONS, association Loi 1901, depuis le 01/01/2026.
        </p>
        <p style={{ margin: '0 0 14px' }}>
          <strong style={{ color: 'var(--text)' }}>SIRET : </strong>
          100 379 619 00016.
        </p>
        <p style={{ margin: 0 }}>
          <strong style={{ color: 'var(--text)' }}>Responsable de publication : </strong>
          Ange DIMONIKAI (@_dyby_rdi).
        </p>
        <p style={{ margin: '14px 0 0' }}>
          <strong style={{ color: 'var(--text)' }}>Données personnelles : </strong>
          les informations saisies dans le formulaire de devis sont transmises par e-mail à
          KOBRAS PRODUCTIONS ({CONTACT_MAIL}), via le service Web3Forms, et servent uniquement à
          répondre à la demande.
        </p>
      </div>
    </div>
  );
}
