const { fetchBlogPaths, fetchCategoryPaths } = require('./fetchSanityPaths');

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://meetpratham.me',
  generateRobotsTxt: true,
  additionalPaths: async (config) => {
    const blogPaths = await fetchBlogPaths();
    const categoryPaths = await fetchCategoryPaths();
    return [...blogPaths, ...categoryPaths];
  },
};
