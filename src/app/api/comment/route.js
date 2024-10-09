import { NextResponse } from 'next/server';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '1igdvz19', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your Sanity dataset
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2021-03-25', // Use a specific API version
  token: 'skaQMT0SKPCmWLQnLjjEDzXKwBZrFWikv1glVZK15vZEYdl6MhI7OX6kau8Ul5gmU7jr4mXkUeQqurgUbeXBpv0e5TjU3L3loCIxXR78QonVFDLvjN3t2m3CrqVk8e4kb4HXp2HaJxEXhZqwjr2JehvEaJw3Jg1jkbQU2IGtPiPXXDZxgo8e', // Replace with your Sanity token
});

// Define the POST method for this API route
export async function POST(req) {
  const { name, email, comment } = await req.json();

  if (!name || !email || !comment) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  try {
    const newComment = {
      _type: 'comment',
      name,
      email,
      comment,
    };

    await client.create(newComment);
    return NextResponse.json({ message: 'Comment submitted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json({ message: 'Failed to submit comment. Please try again.' }, { status: 500 });
  }
}
