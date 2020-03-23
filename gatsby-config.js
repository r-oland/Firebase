require("dotenv").config();
const path = require("path");

module.exports = {
  siteMetadata: {
    title: `New project`,
    description: `undefined`,
    author: `Roland Branten`
    //siteUrl: ``,
  },
  plugins: [
    // `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify`,
    {
      resolve: "gatsby-firesource",
      options: {
        credential: {
          type: process.env.FIREBASE_TYPE,
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: process.env.FIREBASE_AUTH_URI,
          token_uri: process.env.FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url:
            process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
          client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
        },
        types: [
          {
            type: "Artist",
            collection: "artists",
            map: doc => ({
              name: doc.name,
              favoriteAlbum___NODE: doc.favoriteAlbum.id,
              stillActive: doc.stillActive,
              genre: doc.genre,
              picture: doc.picture
            })
          },
          {
            type: "Album",
            collection: "albums",
            map: doc => ({
              name: doc.name,
              picture: doc.picture,
              release: doc.release,
              artist___NODE: doc.a.id
            })
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "Artist",
        imagePath: "picture"
      }
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "Album",
        imagePath: "picture"
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`
      }
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        assets: path.join(__dirname, "src/assets"),
        mixins: path.join(__dirname, "src/style/Mixins")
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `new`,
        short_name: `new`,
        start_url: `/`,
        background_color: `#fbf4ea`,
        theme_color: `#fbf4ea`,
        display: `standalone`,
        icon: `icon/icon.png`
      }
    },
    `gatsby-plugin-offline`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /\.inline\.svg$/
        }
      }
    }
  ]
};
