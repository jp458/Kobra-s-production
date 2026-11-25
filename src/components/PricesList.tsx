import { PRICES, type PriceItem } from '../data/catalog';

interface PricesListProps {
  compact?: boolean;
  onRequestDevis: (project: string, allSteps?: boolean) => void;
}

function renderDescriptions(d?: string | string[]) {
  if (!d) return null;
  const list = Array.isArray(d) ? d : [d];
  return list.map((text) => (
    <p className="p-desc" key={text}>
      {text}
    </p>
  ));
}

export function PricesList({ compact = false, onRequestDevis }: PricesListProps) {
  const renderPriceRow = (price: PriceItem) => {
    if (price.soon) {
      return (
        <div className="price soon reveal" key={price.n}>
          <div className="p-main">
            <h3>{price.n}</h3>
          </div>
          <div className="amt">À venir…</div>
          <span />
        </div>
      );
    }

    if (compact) {
      return (
        <div className="price reveal" key={price.n}>
          <div className="p-main">
            <h3>{price.n}</h3>
          </div>
          <div className="amt">{price.compact || price.p}</div>
          <a
            className="textlink"
            href="#/devis"
            onClick={(e) => {
              e.preventDefault();
              onRequestDevis(price.n);
            }}
          >
            Demander ce devis
          </a>
        </div>
      );
    }

    if (price.formats) {
      return (
        <div className="price has-formats reveal" key={price.n}>
          <div className="p-main">
            <h3>{price.n}</h3>
            {renderDescriptions(price.d)}
          </div>
          <ul className="formats">
            {price.formats.map((format) => (
              <li key={format.n}>
                <div className="p-main">
                  <h4>
                    {format.n}
                    {format.sub && <span>{format.sub}</span>}
                  </h4>
                  {renderDescriptions(format.d)}
                </div>
                <div className="amt">
                  <small className="tarif-label">Tarif indicatif</small>
                  {format.p}
                </div>
                <a
                  className="textlink"
                  href="#/devis"
                  onClick={(e) => {
                    e.preventDefault();
                    onRequestDevis(price.n, Boolean(format.all));
                  }}
                >
                  Demander ce devis
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return (
      <div className="price reveal" key={price.n}>
        <div className="p-main">
          <h3>{price.n}</h3>
          {renderDescriptions(price.d)}
        </div>
        <div className="amt">{price.p}</div>
        <a
          className="textlink"
          href="#/devis"
          onClick={(e) => {
            e.preventDefault();
            onRequestDevis(price.n);
          }}
        >
          Demander ce devis
        </a>
      </div>
    );
  };

  return <div className="prices">{PRICES.map(renderPriceRow)}</div>;
}
