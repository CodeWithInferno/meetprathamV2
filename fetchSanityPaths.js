const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: "1igdvz19",
  dataset: "production",
  useCdn: true,
});

const fetchBlogPaths = async () => {
  const posts = await client.fetch(`
    *[_type == "post" && defined(slug.current)] {
      "slug": slug.current
    }
  `);
  return posts.map((post) => ({
    loc: `/blogs/${post.slug}`,
    changefreq: 'weekly',
    priority: 0.8,
  }));
};

const fetchCategoryPaths = async () => {
  const categories = await client.fetch(`
    *[_type == "category" && defined(slug.current)] {
      "slug": slug.current
    }
  `);
  return categories.map((category) => ({
    loc: `/bloglist/${category.slug}`,
    changefreq: 'daily',
    priority: 0.7,
  }));
};

module.exports = { fetchBlogPaths, fetchCategoryPaths };
