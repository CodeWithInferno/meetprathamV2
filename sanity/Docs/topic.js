const topic = {
    title: 'Topic',
    name: 'topic',
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
        type: 'text',
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
        name: 'icon',
        title: 'Icon/Image',
        type: 'image',
        options: { hotspot: true },
      },
    ],
  };
  
  export default topic;
  