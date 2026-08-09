// Landing page in the "faux-default HTML" style — brutalist/Are.na lineage.
// Server component: no interactivity, so nothing ships to the client.

import Image from 'next/image';
import Link from 'next/link';
import s from './arena.module.css';
import ArenaHeader from '../arena/Header';
import ArenaFooter from '../arena/Footer';

function stamp(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

// Dated beats, pulled from the posts. No adjectives — the numbers carry it.
const JOURNEY = [
  { when: 'at 17', what: 'Landed in America on August 7. Alone.' },
  {
    when: '',
    what: 'Hack Harvard. Met Tejas. Ran into him again at NexHacks. Started a company out of it.',
  },
  {
    when: 'Jun 2026',
    what: 'Watched an agent burn $47 and 13,000 tokens finding one function I could have pointed at in ten seconds. The current way isn’t slow. It’s profitable — for whoever sells the tokens.',
  },
  {
    when: 'Jun 2026',
    what: 'Shipped Clean MCP. Local embeddings, semantic search, one query, nothing leaves your machine. 47 stars.',
  },
  { when: 'Jul 2026', what: 'First Clean dinner. The room was unfair.' },
  { when: 'Aug 2026', what: 'Backers. Still shipping.' },
];


// Tick `featured` on a work document in Studio and it shows up here. With
// nothing ticked, fall back to the first six so the section is never empty.
function selectWork(all) {
  const flagged = all.filter((p) => p.featured);
  return flagged.length ? flagged : all.slice(0, 6);
}

// Publications, as listed on codewithinferno.github.io.
const PAPERS = [
  {
    title: 'Synergistic Self-Correction for Enhanced LLM Reasoning',
    venue: 'Preprint, with Prof. Abhishek Jindal (DA-IICT)',
    year: '2024',
    result: '60% relative gain on GSM8K.',
    links: [
      { label: 'paper', href: 'https://codewithinferno.github.io/Self-Correcting-LLM-Research/' },
      { label: 'code', href: 'https://github.com/codewithinferno/Self-Correcting-LLM-Research' },
    ],
  },
  {
    title: 'Machine Learning-based Android Malware Detection',
    venue: 'Intelligent Computing, SAI 2024 — LNNS vol. 507, Springer Cham',
    year: '2024',
    result: '97% accuracy across 100,000+ APKs.',
    links: [
      {
        label: 'springer',
        href: 'https://link.springer.com/chapter/10.1007/978-3-032-07992-3_26',
      },
      { label: 'code', href: 'https://github.com/codewithinferno/MaliciousAPK' },
    ],
  },
  {
    title: 'A Hybrid AI/ML Approach for Anomaly Detection in IoT Networks',
    venue: 'Manuscript in preparation, with Prof. Jizhou Tong',
    year: '2025',
    result: '99.47% accuracy, 99.69% attack F1.',
    links: [
      {
        label: 'code',
        href: 'https://github.com/CodeWithInferno/A-Hybrid-AI-Machine-Learning-Approach-for-Real-Time-Anomaly-Detection-in-IoT-Networks',
      },
    ],
  },
];

export default function ArenaLanding({
  projects = [],
  blogPosts = [],
  education,
  leadershipAndAwards = [],
  technicalSkills = [],
  socialLinks = {},
}) {
  return (
    <main className="arena">
      <ArenaHeader current="/" />

      {/* Short lines, one idea each, story before lesson. Everything below is
          evidence for this; this is the only part that is the person. */}
      <section className={s.opening}>
        <p>
          I&rsquo;m 19. I came to the US alone at 17, after missing my dream Indian
          university by about one percentile on the JEE.
        </p>
        <p>
          Before that it was Minecraft. I wanted to know how a server let me play with
          someone on the other side of the world. That question turned into everything
          else.
        </p>
        <p>
          At 13 I built Panchayat, a WhatsApp clone. 20 users, mostly friends and family.
          Tiny outcome, enormous feeling. I&rsquo;ve been chasing that feeling since.
        </p>
        <p>
          At 16 I built an AI email client that shipped features before Superhuman did.
        </p>
        <p>Not because I was a prodigy. Because I was ordinary, in chaos, trying anyway.</p>
      </section>

      {/* One large plate left, two stacked right, riding higher. */}
      <div className={s.cluster}>
        <Image
          className={s.mbWide}
          src="/moodboard/mirror-slab.jpg"
          alt="Two mirrored monoliths on a salt flat, the nearer reflecting the farther"
          width={1800}
          height={1207}
          priority
        />
        <div className={s.clusterCol}>
          <Image
            className={s.mbStack}
            src="/moodboard/lichtenberg.jpg"
            alt="A Lichtenberg figure branching through a block of acrylic"
            width={1450}
            height={1800}
            priority
          />
          <Image
            className={s.mbStack}
            src="/moodboard/moth-eyespot.jpg"
            alt="Macro of a moth wing eyespot mimicking a predator's eye"
            width={1800}
            height={1800}
          />
        </div>
      </div>

      <section className={s.section}>
        <a
          className={s.sectionLink}
          href="https://tryclean.ai"
          rel="noopener"
          target="_blank"
        >
          CLEAN
        </a>

        <div className={s.glyphs} aria-hidden="true">
          <span>🤑</span>
          <span>🤑</span>
          <span>🤑</span>
        </div>

        <p className={s.body}>
          Relationship-led GTM for B2B SaaS. It indexes what a company already knows,
          maps the warm paths into an account, profiles buyers against real ICP signals,
          and runs low-volume outreach that starts actual revenue conversations. It
          started at a hackathon. It has backers now.
        </p>
        <p className={s.body}>
          Most people say &ldquo;that&rsquo;s a cool idea,&rdquo; then move on. A few sit
          at 3:42 AM and try to build it. That&rsquo;s the whole gap. Not intelligence,
          not resources, not experience.
        </p>

        <ul className={s.timeline}>
          {JOURNEY.map((row) => (
            <li key={row.what}>
              <span className={s.when}>{row.when}</span>
              <span>{row.what}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={s.section}>
        <Link className={s.sectionLink} href="/workingon">
          LOKUS
        </Link>
        <p className={s.body}>
          Open-source markdown editor. Rust and Tauri, local-first, 10K+ downloads. Wiki
          links with content-aware autocomplete, LaTeX that renders as you type, themes
          you can rewrite at runtime. I live in it, which is the only reason it&rsquo;s
          any good.
        </p>
      </section>

      {projects.length > 0 && (
        <section className={s.section}>
          <p className={s.label}>SELECTED WORK</p>
            <div className={s.work}>
            {selectWork(projects).map((p) => {
              return (
                <article className={s.workItem} key={p._id}>
                  {p.imageUrl && (
                    <Image
                      src={p.imageUrl}
                      alt={p.title || 'Project'}
                      width={1100}
                      height={733}
                      sizes="(max-width: 760px) 100vw, 500px"
                    />
                  )}
                  {p.gitLink ? (
                    <a href={p.gitLink} rel="noopener" target="_blank">
                      {p.title}
                    </a>
                  ) : (
                    <span>{p.title}</span>
                  )}
                  {p.oneLiner && <p className={s.workDesc}>{p.oneLiner}</p>}
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section className={s.section}>
        <a
          className={s.sectionLink}
          href="https://codewithinferno.github.io/Self-Correcting-LLM-Research/"
          rel="noopener"
          target="_blank"
        >
          AND I TEACH MODELS TO DISAGREE WITH THEMSELVES
        </a>
        <p className={s.body}>
          A model&rsquo;s first answer is usually its most confident one, which is not the
          same as its best one. S2C splits the work in three — a Generator that answers, a
          Critic that attacks the answer, and a Synthesizer that rewrites it using the
          attack. With PPO and RAG grounding it lands a 60% relative improvement on GSM8K.
        </p>

        <figure className={`${s.plate} ${s.plateCrop}`}>
          <Image
            src="/figures/s2c-architecture.jpg"
            alt="S2C framework: Generator to Critic to Synthesizer, with a critique feedback loop back into the Generator"
            width={1600}
            height={1061}
            sizes="(max-width: 760px) 100vw, 1060px"
          />
          <figcaption>
            The critique goes back into the Generator. That loop is the whole idea.
          </figcaption>
        </figure>
      </section>

      <section className={s.section}>
        <p className={s.label}>PAPERS</p>
        <ul className={s.rows}>
          {PAPERS.map((p) => (
            <li className={s.row} key={p.title}>
              <div className={s.rowMain}>
                {p.title}
                <span className={s.rowNote}>
                  {p.venue}. {p.result}{' '}
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} rel="noopener" target="_blank">
                      {l.label}
                    </a>
                  ))}
                </span>
              </div>
              <span className={s.rowMeta}>{p.year}</span>
            </li>
          ))}
        </ul>
      </section>

      {blogPosts.length > 0 && (
        <section className={s.section}>
          <p className={s.label}>WRITING</p>
          <ul className={s.rows}>
            {blogPosts.map((post) => (
              <li className={s.row} key={post._id}>
                <div className={s.rowMain}>
                  <Link href={`/blog/${post.slug?.current ?? ''}`}>{post.title}</Link>
                  {post.shortDescription && (
                    <span className={s.rowNote}>{post.shortDescription}</span>
                  )}
                </div>
                <span className={s.rowMeta}>{stamp(post.publishedAt)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {leadershipAndAwards.length > 0 && (
        <section className={s.section}>
          <p className={s.label}>ELSEWHERE</p>
          <ul className={s.rows}>
            {leadershipAndAwards.map((a) => (
              <li className={s.row} key={a.title}>
                <div className={s.rowMain}>
                  {a.title}
                  <span className={s.rowNote}>{a.description}</span>
                </div>
                <span className={s.rowMeta}>{a.date}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {technicalSkills.length > 0 && (
        <section className={s.section}>
          <p className={s.label}>STACK</p>
          <div className={s.skills}>
            {technicalSkills.map((cat) => (
              <div className={s.skillRow} key={cat.category}>
                <span className={s.skillCat}>{cat.category}</span>
                <span>{cat.skills.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <ArenaFooter
        note={`${education.degree}, ${education.university}. ${education.date}. Still becoming.`}
        credit="(plates generated, not photographed; figures from the papers)"
      />
    </main>
  );
}
