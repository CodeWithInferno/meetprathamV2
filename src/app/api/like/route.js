import { NextResponse } from 'next/server';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '1igdvz19',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2021-03-25',
  token: process.env.SANITY_API_TOKEN, // Make sure to add your token securely in Vercel
});

export async function POST(req) {
  const { slug } = await req.json();

  if (!slug) {
    return NextResponse.json({ message: 'Slug is required.' }, { status: 400 });
  }

  try {
    // Find the post by slug
    const query = `*[_type == "post" && slug.current == $slug][0]{ _id, likes }`;
    const post = await client.fetch(query, { slug });

    if (!post) {
      return NextResponse.json({ message: 'Post not found.' }, { status: 404 });
    }

    // Increment the like count
    const updatedPost = await client
      .patch(post._id)
      .setIfMissing({ likes: 0 })
      .inc({ likes: 1 })
      .commit();

    return NextResponse.json({ likes: updatedPost.likes }, { status: 200 });
  } catch (error) {
    console.error('Error updating like count:', error);
    return NextResponse.json({ message: 'Failed to update like count.' }, { status: 500 });
  }
}
