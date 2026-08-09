// What I'm actually working on in public. Three things, not the whole archive.
//
// The numbers come from the GitHub API at render time rather than being typed
// in, so this page cannot quietly go stale the way a hand-written "currently
// building" list always does.

import Image from 'next/image';
import Link from 'next/link';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import ArenaHeader from '../Components/arena/Header';
import ArenaFooter from '../Components/arena/Footer';

// Hourly: fresh enough for a status page, and only three unauthenticated
// GitHub calls an hour so the rate limit is never in play.
export const revalidate = 3600;

const ACTIVE = [
  {
    repo: 'lokus-ai/lokus',
    sanity: 'lokus',
    href: 'https://lokusmd.com',
    line: 'The one I live in. Rust and Tauri, local-first, and the reason I stopped paying for a notes app.',
  },
  {
    repo: 'cleanmcp/tess',
    sanity: 'tess',
    href: 'https://github.com/cleanmcp/tess',
    line: 'Built it because I kept losing track of which agent was stuck on what. Now it runs my whole day.',
  },
  {
    repo: 'CodeWithInferno/iCopy',
    sanity: 'icopy',
    href: 'https://github.com/CodeWithInferno/iCopy',
    line: 'A weekend that turned into a real Mac app. Liquid Glass, ships through a Homebrew tap.',
  },
];

async function gh(path) {
  try {
    const res = await fetch(`https://api.github.com/${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
      next: { revalidate },
    });
    return res.ok ? await res.json() : null;
  } catch {
    return null; // a rate-limited API must not take the page down
  }
}

async function getActive() {
  const docs = await client.fetch(
    `*[_type == "work"]{ title, image, oneLiner }`
  );

  return Promise.all(
    ACTIVE.map(async (item) => {
      const [meta, release] = await Promise.all([
        gh(`repos/${item.repo}`),
        gh(`repos/${item.repo}/releases/latest`),
      ]);
      const doc = docs.find((d) =>
        (d.title || '').toLowerCase().includes(item.sanity)
      );
      return {
        ...item,
        name: item.repo.split('/')[1],
        oneLiner: doc?.oneLiner,
        imageUrl: doc?.image ? urlForImage(doc.image) : null,
        stars: meta?.stargazers_count,
        issues: meta?.open_issues_count,
        language: meta?.language,
        pushed: meta?.pushed_at?.slice(0, 10),
        version: release?.tag_name,
      };
    })
  );
}

export default async function WorkingOn() {
  const active = await getActive();

  return (
    <main className="arena">
      <ArenaHeader current="/workingon" />

      <section className="a-section">
        <p className="a-label">WORKING ON</p>
        <p className="a-lede">
          Three things, in public. Everything else is either finished, abandoned, or
          under an NDA. The numbers below are read from GitHub when this page renders —
          if they look stale, they aren&rsquo;t.
        </p>

        <div className="a-plates">
          {active.map((p) => (
            <article className="a-plate" key={p.repo}>
              {p.imageUrl && (
                <Image
                  src={p.imageUrl}
                  alt={p.name}
                  width={1100}
                  height={733}
                  sizes="(max-width: 760px) 100vw, 500px"
                />
              )}
              <a href={p.href} rel="noopener" target="_blank">
                {p.name}
              </a>
              <p className="a-plate-note">{p.oneLiner}</p>
              <ul className="a-stats">
                {p.version && (
                  <li>
                    <b>{p.version}</b> latest
                  </li>
                )}
                {typeof p.stars === 'number' && (
                  <li>
                    <b>{p.stars.toLocaleString()}</b> stars
                  </li>
                )}
                {typeof p.issues === 'number' && (
                  <li>
                    <b>{p.issues}</b> open
                  </li>
                )}
                {p.pushed && (
                  <li>
                    pushed <b>{p.pushed}</b>
                  </li>
                )}
                {p.language && <li>{p.language}</li>}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="a-section">
        <p className="a-label">AND THE ONE THAT ISN&rsquo;T OPEN</p>
        <p className="a-body">
          <a href="https://tryclean.ai" rel="noopener" target="_blank">
            Clean
          </a>{' '}
          takes most of the week. Relationship-led GTM for B2B SaaS — it started at a
          hackathon and has backers now. The repos are private; the story is{' '}
          <Link href="/">on the front page</Link>.
        </p>
      </section>

      <ArenaFooter note="If something here has gone quiet for a month, assume I got bored and ask me about it." />
    </main>
  );
}
