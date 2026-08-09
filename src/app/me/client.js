// /me — the arrival record.
//
// The fact that actually explains him is that he moved countries alone at
// seventeen, so this page is the paperwork that move would have produced:
// typed fields, ticked boxes, entry stamps for every place that let him in,
// and a machine-readable strip at the bottom.
//
// The form number and headings are invented. This is a personal artifact in
// the shape of a document, not a copy of any real government form.

import Link from 'next/link';
import '../styles/arrival.css';

const FIELDS = [
  ['Surname', 'Patel'],
  ['Given names', 'Pratham'],
  ['Nationality', 'Indian'],
  ['Year of birth', '2007'],
  ['Place of departure', 'Gujarat, IN'],
  ['Port of entry', 'Erie, PA'],
  ['Age at entry', 'Seventeen'],
  ['Accompanied by', 'No one'],
];

const DECLARED = [
  ['2020', 'One WhatsApp clone. Twenty users, mostly family.'],
  ['2023', 'One AI email client, built at sixteen.'],
  ['2025', 'Three papers. One of them in a Springer volume.'],
  ['2026', 'One markdown editor, 767 stars. One company, with backers.'],
];

const STAMPS = [
  ['Hack Harvard', 'Cambridge, MA', 'Admitted'],
  ['NexHacks', 'Met him again', 'Admitted'],
  ['BSidesROC', 'Rochester, NY', 'First place'],
  ['Microsoft', 'Future Tech Conf', 'Presented'],
  ['UC Berkeley', 'AI Hackathon', 'Admitted'],
  ['Gannon', 'Erie, PA', 'Resident'],
];

export default function ArrivalRecord() {
  return (
    <main className="arrival">
      <article className="ar-doc">
        <div className="ar-admitted" aria-hidden="true">
          <b>ADMITTED</b>
          <span>AUG 7 &nbsp;·&nbsp; ALONE</span>
        </div>

        <header className="ar-head">
          <div>
            <h1>Record of Arrival</h1>
            <p className="ar-sub">Declaration of intent &nbsp;·&nbsp; one person</p>
          </div>
          <div className="ar-serial">
            FORM PP&ndash;2007
            <br />
            NO. 000001
            <br />
            STATUS: OPEN
          </div>
        </header>

        <section className="ar-sec">
          <h2>Particulars</h2>
          <dl className="ar-fields">
            {FIELDS.map(([k, v]) => (
              <div className="ar-field" key={k}>
                <dt>{k}</dt>
                <i className="ar-dots" />
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="ar-sec">
          <h2>Purpose of visit</h2>
          <ul className="ar-boxes">
            <li>
              <span className="ar-box">✕</span> Study
            </li>
            <li>
              <span className="ar-box">✕</span> Build
            </li>
            <li>
              <span className="ar-box">✕</span> Stay
            </li>
            <li className="ar-off">
              <span className="ar-box" /> Return
            </li>
          </ul>
        </section>

        <section className="ar-sec">
          <h2>Goods declared</h2>
          <ul className="ar-decl">
            {DECLARED.map(([yr, what]) => (
              <li key={yr}>
                <span className="ar-yr">{yr}</span>
                <span>{what}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ar-sec">
          <h2>Nothing to declare</h2>
          <ul className="ar-decl">
            <li>
              <span className="ar-yr">—</span>
              <span>
                <span className="ar-struck">Founder.</span>{' '}
                <span className="ar-struck">Researcher.</span>{' '}
                <span className="ar-struck">Prodigy.</span> &nbsp;Costumes. Surrendered at
                the border.
              </span>
            </li>
          </ul>
        </section>

        <section className="ar-sec">
          <h2>Entry stamps</h2>
          <ul className="ar-stamps">
            {STAMPS.map(([place, where, verdict]) => (
              <li key={place}>
                <div className="ar-stamp">
                  <b>{place}</b>
                  <span>{where}</span>
                  <span>{verdict}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="ar-sec">
          <h2>Officer&rsquo;s note</h2>
          <p style={{ margin: 0 }}>
            Missed the entrance exam for his first-choice university by roughly one
            percentile. Left anyway. Subject states he was not a prodigy, only ordinary
            and in chaos, and trying regardless. Admission ongoing.
          </p>
        </section>

        <p className="ar-mrz">
          P&lt;INDPATEL&lt;&lt;PRATHAM&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;
          <br />
          STILLBECOMING&lt;&lt;2007IND&lt;&lt;ERIE&lt;PA&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;3:42
        </p>

        <div className="ar-foot">
          <span>Not an official document. Every entry is true.</span>
          <span>
            <Link href="/">Collection</Link> &nbsp;·&nbsp;{' '}
            <Link href="/projects">Works</Link> &nbsp;·&nbsp;{' '}
            <Link href="/bloglist">Writing</Link> &nbsp;·&nbsp;{' '}
            <a href="mailto:prathambiren2618@gmail.com">Contact</a>
          </span>
        </div>
      </article>
    </main>
  );
}
