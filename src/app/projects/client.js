// The project archive. Everything, in the order it was made — the landing page
// only shows what's flagged `featured`, so this is where the rest lives.
//
// Was a client component that fetched on mount behind framer-motion and a
// click sound; none of that survived the theme, and the list is now in the
// HTML where search engines can see it.

import Image from 'next/image';
import Link from 'next/link';
import { client } from '../../../sanity/lib/client';
import { urlForImage } from '../../../sanity/lib/image';
import ArenaHeader from '../Components/arena/Header';
import ArenaFooter from '../Components/arena/Footer';

export const revalidate = 60;

async function getProjects() {
  const rows = await client.fetch(`*[_type == "work"] | order(_createdAt desc){
    _id, title, description, gitLink, image, featured, oneLiner, techStack
  }`);
  return rows.map((p) => ({ ...p, imageUrl: p.image ? urlForImage(p.image) : null }));
}

export default async function ProjectsArchive() {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.featured);

  return (
    <main className="arena">
      <ArenaHeader current="/projects" />

      <section className="a-section">
        <p className="a-label">PROJECT ARCHIVE</p>
        <p className="a-lede">
          Everything, newest first — {projects.length} of them. The {featured.length} on
          the front page are the ones I&rsquo;d show you first; these are the rest of the
          receipts.
        </p>

        <div className="a-plates">
          {projects.map((p) => (
            <article className="a-plate" key={p._id}>
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
              {p.oneLiner && <p className="a-plate-note">{p.oneLiner}</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="a-section">
        <p className="a-label">EVERY REPO</p>
        <ul className="a-rows">
          {projects.map((p) => (
            <li className="a-row" key={`row-${p._id}`}>
              <div className="a-row-main">
                {p.title}
                {p.description && (
                  <span className="a-row-note">{p.description.slice(0, 180)}</span>
                )}
              </div>
              {p.gitLink && (
                <a className="a-row-meta" href={p.gitLink} rel="noopener" target="_blank">
                  source
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <ArenaFooter
        note={
          <>
            Written up as they were built. Some of these are three years old and it
            shows. <Link href="/">Back to the front.</Link>
          </>
        }
      />
    </main>
  );
}
