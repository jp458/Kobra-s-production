import { useEffect, useRef, useState } from 'react';
import {
  BUDGET_OPTIONS,
  CONTACT_MAIL,
  PROJECT_TYPES,
  STEPS,
  WEB3FORMS_KEY,
} from '../data/catalog';
import { buildDevisPayload } from '../utils/navigation';

export interface DevisPrefill {
  project?: string;
  allSteps?: boolean;
  nonce?: number;
}

interface DevisPageProps {
  prefill: DevisPrefill;
}

export function DevisPage({ prefill }: DevisPageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);

  const [nom, setNom] = useState('');
  const [mail, setMail] = useState('');
  const [type, setType] = useState('');
  const [allSteps, setAllSteps] = useState(false);
  const [selectedSteps, setSelectedSteps] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>(BUDGET_OPTIONS[0]);
  const [delai, setDelai] = useState('');
  const [message, setMessage] = useState('');
  const [refUrl, setRefUrl] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMode, setErrorMode] = useState<'none' | 'unconfigured' | 'network'>('none');

  useEffect(() => {
    if (!prefill.project && prefill.allSteps === undefined) return;
    if (prefill.project) {
      setType(prefill.project);
    }
    const useAll = Boolean(prefill.allSteps);
    setAllSteps(useAll);
    setSelectedSteps(useAll ? STEPS.map((s) => s.v) : []);
    setSent(false);
    setErrorMode('none');
  }, [prefill]);

  const toggleStep = (stepName: string) => {
    setSelectedSteps((prev) =>
      prev.includes(stepName)
        ? prev.filter((item) => item !== stepName)
        : [...prev, stepName],
    );
  };

  const handleAllStepsToggle = (checked: boolean) => {
    setAllSteps(checked);
    setSelectedSteps(checked ? STEPS.map((s) => s.v) : []);
  };

  const payload = buildDevisPayload({
    accessKey: WEB3FORMS_KEY,
    nom,
    mail,
    type,
    allSteps,
    selectedSteps,
    budget,
    delai,
    ref: refUrl,
    message,
  });

  const mailtoHref = `mailto:${CONTACT_MAIL}?subject=${encodeURIComponent(
    payload.subject,
  )}&body=${encodeURIComponent(
    `Nom : ${payload.name}\nEmail : ${payload.email}\nType : ${payload['Type de projet']}\nÉtapes : ${payload['Étapes souhaitées']}\nBudget : ${payload['Budget indicatif']}\nDélai : ${payload['Délai souhaité']}\nLien de référence : ${payload['Lien de référence']}\n\nProjet :\n${payload.message}`,
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMode('none');

    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    if (website) {
      setSent(true);
      return;
    }

    if (!WEB3FORMS_KEY) {
      setErrorMode('unconfigured');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as { success?: boolean };
      if (!response.ok || data.success !== true) {
        throw new Error('envoi refusé');
      }
      setSent(true);
      window.requestAnimationFrame(() => {
        sentRef.current?.scrollIntoView({ block: 'center' });
      });
    } catch {
      setErrorMode('network');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setNom('');
    setMail('');
    setType('');
    setAllSteps(false);
    setSelectedSteps([]);
    setBudget(BUDGET_OPTIONS[0]);
    setDelai('');
    setMessage('');
    setRefUrl('');
    setConsent(false);
    setWebsite('');
    setErrorMode('none');
    setSent(false);
  };

  return (
    <div className="page" data-page="devis">
      <header className="phead">
        <div className="wrap">
          <h1>
            <span className="ln">
              <span>Un projet en tête ?</span>
            </span>
          </h1>
          <p>
            Décrivez votre idée et cochez les étapes qu’il vous faut. Vous recevez un devis sur
            mesure.
          </p>
        </div>
      </header>

      <section className="wrap devis">
        <aside>
          <p>Vous préférez écrire directement ?</p>
          <a className="mail" href={`mailto:${CONTACT_MAIL}`}>
            {CONTACT_MAIL}
          </a>
          <p style={{ marginTop: '28px', fontSize: '0.95rem' }}>
            <a
              className="textlink"
              href="https://instagram.com/kobras_productions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram · @kobras_productions
            </a>
          </p>
          <p style={{ marginTop: '14px', fontSize: '0.95rem' }}>
            <a
              className="textlink"
              href="https://youtube.com/@KOBRASPRODUCTIONS"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube · @KOBRASPRODUCTIONS
            </a>
          </p>
        </aside>

        <div>
          {!sent ? (
            <form id="form" ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="two">
                <label className="field">
                  <span>Votre nom</span>
                  <input
                    name="nom"
                    autoComplete="name"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </label>
                <label className="field">
                  <span>Votre adresse mail</span>
                  <input
                    name="mail"
                    type="email"
                    autoComplete="email"
                    required
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                  />
                </label>
              </div>

              <fieldset className="group">
                <legend>Quel type de projet ?</legend>
                <div className="chips" id="types">
                  {PROJECT_TYPES.map((projectType) => (
                    <label className="chip" key={projectType}>
                      <input
                        type="radio"
                        name="type"
                        value={projectType}
                        checked={type === projectType}
                        onChange={() => setType(projectType)}
                      />
                      <span>{projectType}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="group">
                <legend>Quelles étapes vous faut-il ?</legend>
                <div className="chips" id="etapes">
                  {STEPS.map((step) => (
                    <label className="chip" key={step.v}>
                      <input
                        type="checkbox"
                        name="etape"
                        value={step.v}
                        checked={allSteps || selectedSteps.includes(step.v)}
                        disabled={allSteps}
                        onChange={() => toggleStep(step.v)}
                      />
                      <span>{step.v}</span>
                    </label>
                  ))}
                  <label className="chip chip-all">
                    <input
                      type="checkbox"
                      id="etape-all"
                      checked={allSteps}
                      onChange={(e) => handleAllStepsToggle(e.target.checked)}
                    />
                    <span>A à Z (toutes les étapes)</span>
                  </label>
                </div>
              </fieldset>

              <div className="two">
                <label className="field">
                  <span>Budget indicatif</span>
                  <select
                    name="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    {BUDGET_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Délai souhaité</span>
                  <input
                    name="delai"
                    placeholder="Ex. : fin novembre"
                    value={delai}
                    onChange={(e) => setDelai(e.target.value)}
                  />
                </label>
              </div>

              <label className="field">
                <span>Votre projet en quelques lignes</span>
                <textarea
                  name="message"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>

              <label className="field">
                <span>Un lien de référence (facultatif)</span>
                <input
                  name="ref"
                  type="url"
                  placeholder="https://"
                  value={refUrl}
                  onChange={(e) => setRefUrl(e.target.value)}
                />
              </label>

              <label className="consent">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  J’accepte que mes informations servent uniquement à répondre à ma demande.
                </span>
              </label>

              <label className="sr" aria-hidden="true">
                Ne pas remplir
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>

              {errorMode !== 'none' && (
                <p className="form-err" id="form-err" role="alert">
                  {errorMode === 'unconfigured'
                    ? 'L’envoi direct n’est pas encore activé. '
                    : 'Votre demande n’a pas pu être envoyée. Réessayez dans un instant, ou '}
                  <a href={mailtoHref}>envoyer par e-mail à {CONTACT_MAIL}</a>.
                </p>
              )}

              <button
                className="btn btn-solid"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
              </button>
            </form>
          ) : (
            <div className="sent" id="sent" ref={sentRef}>
              <h2>Demande envoyée</h2>
              <p>
                Merci, votre demande est bien partie. On revient vers vous avec un devis.
              </p>
              <button
                className="textlink"
                id="again"
                type="button"
                onClick={handleReset}
              >
                Faire une autre demande
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
