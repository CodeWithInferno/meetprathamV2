// A real counter for the Web 1.0 writing page. There is exactly one of these
// documents, with _id "siteStats", incremented by /api/hit.
export default {
  name: 'siteStats',
  title: 'Site Stats',
  type: 'document',
  fields: [
    {
      name: 'pageviews',
      title: 'Writing page views',
      description: 'Incremented once per browser session. Edit only to correct it.',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: { subtitle: 'pageviews' },
    prepare: ({ subtitle }) => ({ title: 'Site Stats', subtitle: `${subtitle ?? 0} views` }),
  },
}
