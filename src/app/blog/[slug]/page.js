import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import BlogActions from './components/BlogActions';
import CodeBlock from './components/CodeBlock';
import ArenaHeader from '../../Components/arena/Header';
import ArenaFooter from '../../Components/arena/Footer';

const client = createClient({
  projectId: '1igdvz19',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-07-08',
});
const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);

export const revalidate = 60;

async function getData(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "currentSlug": slug.current,
    title,
    shortDescription,
    publishedAt,
    banner{..., "alt": alt, "caption": caption},
    "likesCount": coalesce(likes, 0),
    comments,
    body[]{
      ...,
      _type == "image" => { "url": asset->url, "alt": asset->altText, "caption": caption },
      _type == "code" => { code, language }
    }
  }`;
  return client.fetch(query, { slug });
}

// Every post was written under the old design, where the article opened with
// its own lead image. There's a banner above the text now, so that leading
// image is a second hero — drop it, along with any empty blocks before it, and
// keep every image that appears once the writing has actually started.
function withoutLeadImage(body = []) {
  let i = 0;
  let dropped = false;
  while (i < body.length) {
    const b = body[i];
    const isEmpty =
      b._type === 'block' && !(b.children || []).some((c) => (c.text || '').trim());
    if (b._type === 'image' && !dropped) {
      dropped = true;
      i += 1;
    } else if (isEmpty) {
      i += 1;
    } else {
      break;
    }
  }
  return dropped ? body.slice(i) : body;
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const data = await getData(slug);
  if (!data) return { title: 'Post Not Found' };

  const ogImageUrl = data.banner
    ? urlFor(data.banner).width(1200).height(630).fit('crop').url()
    : `https://www.meetpratham.me/api/og?slug=${slug}`;
  const description =
    data.shortDescription || `Read "${data.title}" on Pratham Patel's blog.`;

  return {
    title: data.title,
    description,
    alternates: { canonical: `https://www.meetpratham.me/blog/${slug}` },
    openGraph: {
      title: data.title,
      description,
      url: `https://www.meetpratham.me/blog/${slug}`,
      type: 'article',
      publishedTime: new Date(data.publishedAt).toISOString(),
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: data.title }],
    },
    twitter: { card: 'summary_large_image', title: data.title, description, images: [ogImageUrl] },
  };
}

// Plain elements, styled by .a-prose. The old set painted links onto yellow
// chips and boxed every image in a 2px border, neither of which this theme has.
const ptComponents = {
  types: {
    image: ({ value }) => (
      <figure>
        <Image
          src={urlFor(value).width(1400).url()}
          alt={value.alt || ''}
          width={1400}
          height={900}
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    code: ({ value }) => <CodeBlock language={value.language}>{value.code}</CodeBlock>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    code: ({ children }) => <code>{children}</code>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
};

export default async function BlogArticle({ params }) {
  const { slug } = params;
  const data = await getData(slug);

  if (!data) {
    return (
      <main className="arena">
        <ArenaHeader />
        <p className="a-lede">
          No post at that address. <Link href="/bloglist">Try the archive.</Link>
        </p>
        <ArenaFooter />
      </main>
    );
  }

  const date = new Date(data.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="arena">
      <ArenaHeader />

      <article>
        <h1 className="a-post-title">
          <Link href={`/blog/${slug}`}>{data.title}</Link>
        </h1>
        <p className="a-post-date">{date}</p>

        {data.banner && (
          <figure className="a-hero">
            <Image
              src={urlFor(data.banner).width(2000).url()}
              alt={data.banner.alt || data.title}
              width={2000}
              height={1125}
              sizes="(max-width: 1120px) 100vw, 1060px"
              priority
            />
            {data.banner.caption && <figcaption>{data.banner.caption}</figcaption>}
          </figure>
        )}

        <div className="a-prose">
          <PortableText value={withoutLeadImage(data.body)} components={ptComponents} />
        </div>
      </article>

      <section className="a-section" style={{ marginTop: '80px' }}>
        <BlogActions
          slug={data.currentSlug}
          initialLikes={data.likesCount}
          initialComments={data.comments || []}
        />
      </section>

      <ArenaFooter note={<Link href="/bloglist">All writing →</Link>} />
    </main>
  );
}
