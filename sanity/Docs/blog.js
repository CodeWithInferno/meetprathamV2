// const post = {
//   title: 'Post',
//   name: 'post',
//   type: 'document',
//   fields: [
//     {
//       name: 'title',
//       title: 'Title',
//       type: 'string',
//     },
//     {
//       name: 'description',
//       title: 'Description',
//       type: 'string',
//       validation: Rule => Rule.max(64).warning('A description can be at most 64 characters long'),
//     },
//     {
//       name: 'slug',
//       title: 'Slug',
//       type: 'slug',
//       options: {
//         source: 'title',
//         maxLength: 96,
//         slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
//       },
//     },
//     {
//       name: 'publishedAt',
//       title: 'Published at',
//       type: 'datetime',
//     },
//     {
//       name: 'banner',
//       title: 'Banner',
//       type: 'image',
//       options: {
//         hotspot: true, // enable hotspot for the image
//       },
//       fields: [
//         {
//           name: 'alt',
//           title: 'Alternative Text',
//           type: 'string',
//           options: {
//             isHighlighted: true, // make this field prominent in the editor
//           },
//         },
//       ],
//     },
//     {
//       name: 'body',
//       title: 'Body',
//       type: 'array',
//       of: [
//         {
//           type: 'block',
//         },
//         {
//           type: 'image',
//           fields: [
//             {
//               name: 'alt',
//               title: 'Alternative Text',
//               type: 'string',
//               options: {
//                 isHighlighted: true, // make this field prominent in the editor
//               },
//             },
//           ],
//           options: {
//             hotspot: true, // enable hotspot for the image
//           },
//         },
//       ],
//     },
//     {
//       name: 'likes',
//       title: 'Likes',
//       type: 'number',
//       initialValue: 0,
//     },
//     {
//       name: 'comments',
//       title: 'Comments',
//       type: 'array',
//       of: [{ type: 'comment' }], // Reference the comment type here
//     },
//   ],
//   preview: {
//     select: {
//       title: 'title',
//     },
//   },
// }

// export default post;











const post = {
  title: 'Post',
  name: 'post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
        {
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: Rule => Rule.max(64).warning('A description can be at most 64 characters long'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'banner',
      title: 'Banner',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' }, // Ensure "block" type is imported and defined properly
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'email',
              title: 'Email',
              type: 'string',
            },
            {
              name: 'comment',
              title: 'Comment',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};

export default post;
