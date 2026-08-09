// One topic. A filtered view is a list, not a front page — no lead, no images,
// just the pieces and when they were written.

import Link from 'next/link';
import { client } from '../../../../sanity/lib/client';
import ArenaHeader from '../../Components/arena/Header';
import ArenaFooter from '../../Components/arena/Footer';

export const revalidate = 60;

async function getData(category) {
  const [posts, topic] = await Promise.all([
    client.fetch(
      `*[_type == "post" && $category in topics[]->slug.current && defined(slug.current)]
        | order(publishedAt desc){
          _id, title, "slug": slug.current, publishedAt, shortDescription
        }`,
      { category }
    ),
    client.fetch(`*[_type == "topic" && slug.current == $category][0]{title}`, {
      category,
    }),
  ]);
  return { posts, title: topic?.title || category };
}

export async function generateMetadata({ params }) {
  const { title } = await getData(params.category);
  return {
    title: `${title} | Writing | Pratham Patel`,
    description: `Posts about ${title}.`,
    alternates: {
      canonical: `https://www.meetpratham.me/bloglist/${params.category}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const { posts, title } = await getData(params.category);

  return (
    <main className="arena">
      <ArenaHeader current="/bloglist" />

      <section className="a-section">
        <p className="a-label">{String(title).toUpperCase()}</p>
        <p className="a-lede">
          {posts.length} {posts.length === 1 ? 'piece' : 'pieces'} filed under this.{' '}
          <Link href="/bloglist">Everything else.</Link>
        </p>

        <ul className="a-list">
          {posts.map((p) => (
            <li key={p._id}>
              <span className="a-when">
                {p.publishedAt
                  ? new Date(p.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                    })
                  : ''}
              </span>
              <div className="a-list-main">
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                {p.shortDescription && <span>{p.shortDescription}</span>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <ArenaFooter note={<Link href="/bloglist">All writing →</Link>} />
    </main>
  );
}
