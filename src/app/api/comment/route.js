// import { NextResponse } from 'next/server';
// import sanityClient from '@sanity/client';

// const client = sanityClient({
//   projectId: '1igdvz19', // Replace with your Sanity project ID
//   dataset: 'production', // Replace with your Sanity dataset
//   useCdn: true, // `false` if you want to ensure fresh data
//   apiVersion: '2021-03-25', // Use a specific API version
//   token: 'skaQMT0SKPCmWLQnLjjEDzXKwBZrFWikv1glVZK15vZEYdl6MhI7OX6kau8Ul5gmU7jr4mXkUeQqurgUbeXBpv0e5TjU3L3loCIxXR78QonVFDLvjN3t2m3CrqVk8e4kb4HXp2HaJxEXhZqwjr2JehvEaJw3Jg1jkbQU2IGtPiPXXDZxgo8e', // Replace with your Sanity token
// });

// // Define the POST method for this API route
// export async function POST(req) {
//   const { name, email, comment } = await req.json();

//   if (!name || !email || !comment) {
//     return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
//   }

//   try {
//     const newComment = {
//       _type: 'comment',
//       name,
//       email,
//       comment,
//     };

//     await client.create(newComment);
//     return NextResponse.json({ message: 'Comment submitted successfully!' }, { status: 200 });
//   } catch (error) {
//     console.error('Error submitting comment:', error);
//     return NextResponse.json({ message: 'Failed to submit comment. Please try again.' }, { status: 500 });
//   }
// }




// import { NextResponse } from 'next/server';
// import sanityClient from '@sanity/client';

// const client = sanityClient({
//   projectId: '1igdvz19', // Replace with your Sanity project ID
//   dataset: 'production', // Replace with your Sanity dataset
//   useCdn: false, // Set to `false` to ensure fresh data
//   apiVersion: '2021-03-25', // Use a specific API version
//   token: process.env.SANITY_API_TOKEN, // Store token securely in environment variables
// });

// // Define the POST method for this API route
// export async function POST(req) {
//   const { name, email, comment, slug } = await req.json(); // Ensure slug is sent from frontend

//   if (!name || !email || !comment || !slug) {
//     return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
//   }

//   try {
//     // Fetch the post by slug
//     const query = `*[_type == "post" && slug.current == $slug][0]{ _id }`;
//     const post = await client.fetch(query, { slug });

//     if (!post) {
//       return NextResponse.json({ message: 'Post not found.' }, { status: 404 });
//     }

//     const newComment = {
//       _type: 'post',
//       name,
//       email,
//       comment,
//     };

//     // Append the new comment to the comments field of the specific post
//     await client
//       .patch(post._id) // Use the post ID
//       .setIfMissing({ comments: [] }) // Ensure the comments array exists
//       .append('comments', [newComment]) // Append the new comment to the array
//       .commit(); // Commit the mutation

//     return NextResponse.json({ message: 'Comment submitted successfully!' }, { status: 200 });
//   } catch (error) {
//     console.error('Error submitting comment:', error);
//     return NextResponse.json({ message: 'Failed to submit comment. Please try again.' }, { status: 500 });
//   }
// }





// import { NextResponse } from 'next/server';
// import sanityClient from '@sanity/client';

// const client = sanityClient({
//   projectId: '1igdvz19', // Replace with your Sanity project ID
//   dataset: 'production', // Replace with your Sanity dataset
//   useCdn: false, // Set to `false` to ensure fresh data
//   apiVersion: '2021-03-25', // Use a specific API version
//   token: process.env.SANITY_API_TOKEN, // Store token securely in environment variables
// });

// // Define the POST method for this API route
// export async function POST(req) {
//   const { name, email, comment, slug } = await req.json(); // Ensure slug is sent from frontend

//   if (!name || !email || !comment || !slug) {
//     return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
//   }

//   try {
//     // Fetch the post by slug
//     const query = `*[_type == "post" && slug.current == $slug][0]{ _id }`;
//     const post = await client.fetch(query, { slug });

//     if (!post) {
//       return NextResponse.json({ message: 'Post not found.' }, { status: 404 });
//     }

//     const newComment = {
//       _type: 'comment',
//       name,
//       email,
//       comment,
//     };

//     // Append the new comment to the comments field of the specific post
//     await client
//       .patch(post._id) // Use the post ID
//       .setIfMissing({ comments: [] }) // Ensure the comments array exists
//       .append('comments', [newComment]) // Append the new comment to the array
//       .commit(); // Commit the mutation

//     return NextResponse.json({ message: 'Comment submitted successfully!' }, { status: 200 });
//   } catch (error) {
//     console.error('Error submitting comment:', error);
//     return NextResponse.json({ message: 'Failed to submit comment. Please try again.' }, { status: 500 });
//   }
// }






import { NextResponse } from 'next/server';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: '1igdvz19', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your Sanity dataset
  useCdn: false,         // `false` for real-time updates
  apiVersion: '2021-03-25', // Use a specific API version
  token: process.env.SANITY_API_TOKEN, // Ensure token is set in environment variables
});

// Define the POST method for this API route
export async function POST(req) {
  const { name, email, comment, slug } = await req.json(); // Ensure slug is sent from frontend

  if (!name || !email || !comment || !slug) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  try {
    // Fetch the post by slug
    const query = `*[_type == "post" && slug.current == $slug][0]{ _id }`;
    const post = await client.fetch(query, { slug });

    if (!post) {
      return NextResponse.json({ message: 'Post not found.' }, { status: 404 });
    }

    const newComment = {
      _key: Math.random().toString(36).substr(2, 9), // Generate a unique key for each comment
      name,
      email,
      comment,
    };

    // Append the new comment to the `comments` field of the specific post
    await client
      .patch(post._id) // Use the post ID
      .setIfMissing({ comments: [] }) // Ensure the comments array exists
      .append('comments', [newComment]) // Append the new comment to the array
      .commit(); // Commit the mutation

    return NextResponse.json({ message: 'Comment submitted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json({ message: 'Failed to submit comment. Please try again.' }, { status: 500 });
  }
}
