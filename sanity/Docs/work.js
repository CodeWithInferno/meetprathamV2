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
      name: 'featured',
      title: 'Featured on landing page',
      description:
        'Tick to show this under SELECTED WORK on the home page. Leave off and it still appears on /projects.',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'oneLiner',
      title: 'One-liner',
      description:
        'One line on what it does, leading with the most impressive true fact. Shown under the image on the landing page.',
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
      },
    },
  ],
}