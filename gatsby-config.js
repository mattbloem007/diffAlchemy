let siteMetadata = {
  title: 'Alchemy of Remembrance', // <title>
  manifestName: 'Remembrance',
  manifestShortName: 'Remember', // max 12 characters
  manifestStartUrl: '/',
  manifestBackgroundColor: '#663399',
  manifestThemeColor: '#663399',
  manifestDisplay: 'standalone',
  manifestIcon: 'src/assets/img/Alchemy of Remembrance Logo.png',
  pathPrefix: `/gatsby-starter-solidstate/`, // This path is subpath of your hosting https://domain/portfolio
  heading: 'The Alchemy of Remembrance',
  subHeading: 'Podcaster || Sangoma || Cacao Kuchina || Health & Longevity\n\n Living to create, learn, and explore the truth.  ',
  blogItemsPerPage: 10,
  portfolioItemsPerPage: 10,
  podcastsItemsPerPage: 10,
  // social
  socialLinks: [
    // {
    //   icon: 'fa-twitter',
    //   name: 'Twitter',
    //   url: 'https://twitter.com/onlyanubhav',
    // },
    {
      icon: 'fa-facebook',
      name: 'Facebook',
      url: 'https://www.facebook.com/alchemyremembrance/',
    },
    {
      icon: 'fa-instagram',
      name: 'Instagram',
      url: 'https://www.instagram.com/alchemyofremembrance/'
    },
    {
      icon: 'fa-youtube',
      name: 'Youtube',
      url: 'https://www.youtube.com/channel/UCMuZwqrNoHY6-wRrDVfCKLg/'
    },
    {
      icon: 'fa-envelope-o',
      name: 'Email',
      url: 'mattb007@gmail.com',
    },
  ],
  phone: '083-293-5904',
  address: '',
};
module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                "gatsby-remark-copy-linked-files",
                {
                    resolve: `gatsby-remark-images`,
                    options: {
                        maxWidth: 1280
                    }
                }
            ]
        }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.manifestName,
        short_name: siteMetadata.manifestShortName,
        start_url: siteMetadata.pathPrefix || config.manifestStartUrl,
        background_color: siteMetadata.manifestBackgroundColor,
        theme_color: siteMetadata.manifestThemeColor,
        display: siteMetadata.manifestDisplay,
        icon: siteMetadata.manifestIcon, // This path is relative to the root of the site.
      },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `images`,
            path: `${__dirname}/src/assets/images`
        }
    },
    {
       resolve: `gatsby-source-graphql`,

       options: {
         // This type will contain remote schema Query type
         typeName: `WPGraphQL`,
         // This is field under which it's accessible
         fieldName: `wpgraphql`,
         // Url to query from
         url: `http://41.185.8.137/~xic02/alchemyofremembrance/graphql`,
      //  url: `http://alchemy-of-remembrance.local/graphql`
       },
     },
     {
        resolve: 'gatsby-plugin-mailchimp',
        options: {
            endpoint: 'https://netlify.us4.list-manage.com/subscribe/post?u=4bb341a70f699ab5f28026c9b&amp;id=4899fd0d31', // add your MC list endpoint here; see instructions below
        },
    },
    {
     resolve: "gatsby-wpgraphql-inline-images",
     options: {
       wordPressUrl: 'http://41.185.8.137/~xic02/alchemyofremembrance/',
       uploadsUrl: 'http://41.185.8.137/~xic02/alchemyofremembrance/wp-content/uploads/',
       processPostTypes: ["Post"],
       graphqlTypeName: `WPGraphQL`,
     },
   },
   {
    resolve: `gatsby-source-shopify`,
    options: {
      // The domain name of your Shopify shop.
      shopName: `the-alchemy-of-remembrance`,
      // The storefront access token
      accessToken: `f8d20c76aec4f39847ba2e4ce903143a`,
    },
  },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
  ],
}
