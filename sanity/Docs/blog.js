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
          slugify: input => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
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
          hotspot: true, // enable hotspot for the image
        },
        fields: [
          {
            name: 'alt',
            title: 'Alternative Text',
            type: 'string',
            options: {
              isHighlighted: true, // make this field prominent in the editor
            },
          },
        ],
      },
      {
        name: 'body',
        title: 'Body',
        type: 'array',
        of: [
          {
            type: 'block',
          },
          {
            type: 'image',
            fields: [
              {
                name: 'alt',
                title: 'Alternative Text',
                type: 'string',
                options: {
                  isHighlighted: true, // make this field prominent in the editor
                },
              },
            ],
            options: {
              hotspot: true, // enable hotspot for the image
            },
          },
        ],
      },
    ],
    preview: {
      select: {
        title: 'title',
      },
    },
  }
   
  export default post;