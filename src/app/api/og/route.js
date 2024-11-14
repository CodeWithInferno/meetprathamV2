import { ImageResponse } from 'next/og';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const runtime = 'edge';

const client = createClient({
  projectId: '1igdvz19',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01', // Specify API version for Sanity
});

const builder =imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source).width(1200).height(630).url();
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    console.error('Missing slug parameter');
    return new Response('Missing slug', { status: 400 });
  }

  const query = `
    *[_type == "post" && slug.current == $slug] {
      title,
      "banner": banner.asset,
      publishedAt,
    }[0]
  `;
  const data = await client.fetch(query, { slug });

  if (!data) {
    console.error('Blog post not found for slug:', slug);
    return new Response('Blog post not found', { status: 404 });
  }

  const { title, banner, publishedAt } = data;
  const bannerUrl = banner ? urlFor(banner) : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '1200px',
          height: '630px',
          backgroundColor: '#0e1a2b',
          color: '#ffffff',
          padding: '40px',
          fontFamily: 'Inter, Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
        }}
      >
        {bannerUrl && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${bannerUrl})`,
              backgroundSize: 'contain', // Contain to prevent cropping
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              filter: 'brightness(0.8)', // Subtle brightness for clarity
              zIndex: -2,
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)', // Dark overlay for contrast
            zIndex: -1,
          }}
        ></div>

        <h1 style={{ fontSize: '50px', fontWeight: 'bold', textAlign: 'center', marginBottom: '15px', color: '#e0f2fe', lineHeight: '1.2' }}>
          {title}
        </h1>

        <p style={{ fontSize: '18px', color: '#cbd5e1', marginTop: '15px', textAlign: 'center', opacity: '0.85' }}>
          Published on: {new Date(publishedAt).toLocaleDateString()}
        </p>

        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '4px',
              backgroundColor: '#38bdf8',
              opacity: '0.9',
            }}
          ></div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}










