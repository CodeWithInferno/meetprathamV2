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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      validation: Rule => Rule.max(160).warning('A description can be at most 160 characters long'),
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
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Code', value: 'code'}
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' }
            ],
        
          }
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }
          ]
        },
        {
          type: 'object',
          name: 'code',
          title: 'Code Block',
          fields: [
            {
              name: 'code',
              title: 'Code',
              type: 'text',
              options: {
                language: 'javascript'
              }
            },
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: [
                  { title: 'JavaScript', value: 'javascript' },
                  { title: 'TypeScript', value: 'typescript' },
                  { title: 'Python', value: 'python' },
                  { title: 'HTML', value: 'html' },
                  { title: 'CSS', value: 'css' },
                  { title: 'React JSX', value: 'jsx' },
                  { title: 'JSON', value: 'json' },
                  { title: 'Bash', value: 'bash' },
                  { title: 'SQL', value: 'sql' },
                  { title: 'PHP', value: 'php' },
                  { title: 'Java', value: 'java' },
                  { title: 'C++', value: 'cpp' },
                  { title: 'Go', value: 'go' },
                  { title: 'Rust', value: 'rust' },
                  { title: 'Plain Text', value: 'text' }
                ]
              },
              initialValue: 'javascript'
            }
          ],
          preview: {
            select: {
              language: 'language',
              code: 'code'
            },
            prepare({ language, code }) {
              return {
                title: `Code Block (${language})`,
                subtitle: code ? code.substring(0, 50) + '...' : 'Empty code block'
              }
            }
          }
        }
      ]
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
    // Add topics as a reference to the topic schema
    {
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};

export default post;
