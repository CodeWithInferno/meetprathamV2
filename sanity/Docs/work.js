export default {
  name: 'work',
  title: 'Work',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gitLink',
      title: 'Git Link',
      type: 'url',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}