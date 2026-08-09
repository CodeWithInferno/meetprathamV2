// The writing archive, as it would have been built in 1997.
//
// The rest of the site is a white gallery. This page is a table with a ridge
// border, a tiled ground, Times, and a hit counter — because an index of every
// article you have written is the single most Web 1.0 object there is, and
// because a site where every page looks the same is a site with one idea.

import Link from 'next/link';
import createImageUrlBuilder from '@sanity/image-url';
import { client } from '../../../sanity/lib/client';
import HitCounter from './HitCounter';
import '../styles/web1.css';

export const revalidate = 60;

const builder = createImageUrlBuilder({ projectId: '1igdvz19', dataset: 'production' });
const thumb = (src) =>
  builder.image(src).width(176).height(120).fit('crop').auto('format').url();

async function getViews() {
  return client.fetch(`*[_id == "siteStats"][0].pageviews`);
}

async function getPosts() {
  return client.fetch(`*[_type == "post" && defined(slug.current)]
    | order(publishedAt desc){
      _id, title, "slug": slug.current, publishedAt, shortDescription, banner,
      "topics": topics[]->{title, "slug": slug.current}
    }`);
}

export default async function BlogList() {
  const [posts, views] = await Promise.all([getPosts(), getViews()]);
  const newest = posts[0]?.publishedAt;
  const updated = newest
    ? new Date(newest).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main className="web1">
      <div className="w1-shell">
        <h1>Pratham&rsquo;s Writing Page</h1>
        <p className="w1-sub">
          ~ a collection of things that broke, and what I did about them ~
        </p>

        <hr />

        <p className="w1-intro">
          <b>Welcome!</b> You have reached my writing archive. Below you will find all{' '}
          <b>{posts.length}</b> articles I have written, sorted newest first. Click a
          title to read the whole thing. Comments are open at the bottom of every page.
        </p>
        <p className="w1-fine">
          Last updated: {updated} &nbsp;|&nbsp; Best viewed at 1024&times;768 or better
        </p>

        <hr />

        <table className="w1-index" cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>#</th>
              <th>&nbsp;</th>
              <th>DATE</th>
              <th>ARTICLE</th>
              <th>TOPIC</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p, i) => (
              <tr key={p._id}>
                <td className="w1-num">{String(i + 1).padStart(2, '0')}.</td>
                <td>
                  {p.banner && (
                    <Link href={`/blog/${p.slug}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w1-thumb" src={thumb(p.banner)} alt={p.title} />
                    </Link>
                  )}
                </td>
                <td className="w1-date">
                  {p.publishedAt
                    ? new Date(p.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : '--'}
                </td>
                <td>
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>{' '}
                  {i === 0 && <span className="w1-new">NEW!</span>}
                  {p.shortDescription && (
                    <span className="w1-desc">{p.shortDescription}</span>
                  )}
                </td>
                <td className="w1-topic">
                  {(p.topics || []).map((t, n) => (
                    <span key={t.slug}>
                      {n > 0 && ', '}
                      <Link href={`/bloglist/${t.slug}`}>{t.title}</Link>
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <center>
          <p className="w1-fine">You are visitor number</p>
          <p>
            <HitCounter initial={views ?? 0} />
          </p>

          <p className="w1-nav">
            [ <Link href="/">Home</Link> ] [ <Link href="/projects">Projects</Link> ] [{' '}
            <Link href="/workingon">Working On</Link> ] [{' '}
            <a href="mailto:prathambiren2618@gmail.com">Email Me</a> ]
          </p>

          <p>
            <span className="w1-badge">MADE ON A MAC</span>
            <span className="w1-badge">NO COOKIES</span>
            <span className="w1-badge">HAND CODED</span>
            <span className="w1-badge">NEXT.JS 14</span>
          </p>

          <p className="w1-fine">
            &copy; {new Date(newest || Date.now()).getFullYear()} Pratham Patel. This page
            is deliberately out of step with the rest of the site.
          </p>
        </center>
      </div>
    </main>
  );
}
