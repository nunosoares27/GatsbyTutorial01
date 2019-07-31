/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `🚀 Blazing Fast Fake Store`,
    description: `We offer the best PC related products. Lorem ipsum lorem scelerisque facilisis senectus non fermentum, consectetur aenean lacus mollis lorem torquent, lacus faucibus torquent accumsan posuere aenean. sapien platea vehicula vitae etiam eros, nisl primis nostra at convallis per, mi malesuada in maecenas. condimentum consectetur pharetra proin morbi accumsan tellus nunc, sapien arcu a sodales elit elementum, ultrices pellentesque vel cursus tempus massa.`,
    features: [
      {
        id: `1`,
        name: `Free delivery worldwide`,
        description: `Amazing products, ready to ship to everyplace in the world.`,
      },
      {
        id: `2`,
        name: `24h support`,
        description: `If you get stuck, we offer 24h support.`,
      },
    ],
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
  ],
}
