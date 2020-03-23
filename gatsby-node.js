const path = require("path");

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  deletePage(page);

  return createPage({
    ...page,

    context: {
      ...page.context
    }
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const template = path.resolve("./src/templates/artistTemplate.js");
  const template2 = path.resolve("./src/templates/albumTemplate.js");
  const res = await graphql(`
    {
      allArtist {
        nodes {
          id
        }
      }
    }
  `);

  res.data.allArtist.nodes.forEach(edge => {
    createPage({
      component: template,
      path: `/${edge.id}`,
      context: {
        slug: edge.id
      }
    });
  });

  res.data.allArtist.nodes.forEach(edge => {
    createPage({
      component: template2,
      path: `/albums${edge.id}`,
      context: {
        slug: edge.id
      }
    });
  });
};
