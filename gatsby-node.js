const { createFilePath, createRemoteFileNode } = require(`gatsby-source-filesystem`);
const path = require(`path`);
const crypto = require('crypto')

// require library
const ypi = require('youtube-playlist-info')
// read my API key
const YT_KEY = 'AIzaSyBAmO9nEY9Z3mJ8gi5_obOZwOgXxiT8dMQ'
// hardcode ID of my playlist for now
const LWyP = 'PL_SSIvQejT9h_f2oS3pwo_pV9LYgaUuLp'

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;



    return graphql(`
        {
            limitPost: site {
                siteMetadata {
                    blogItemsPerPage
                    portfolioItemsPerPage
                    podcastsItemsPerPage
                }
            }

            wpgraphql {
            posts {
              edges {
                node {
                  id
                  slug
                  featuredImage{
                    sourceUrl
                  }
                  categories {
                    edges {
                      node {
                        name
                      }
                    }
                  }

                }
              }
            }

            pages {
              edges {
                node {
                  id
                  slug
                }
              }
            }

            products {
              edges {
                node {
                  id
                  slug
                }
              }
            }
          }





        }




    `).then(result => {
      // allShopifyProduct {
      // edges {
      //   node {
      //     handle
      //   }
      // }
      // }
//       allWcProducts {
//   edges {
//     node {
//       id
//     }
//   }
// }
        const blogPosts = result.data.wpgraphql.posts.edges;
        const allPages = result.data.wpgraphql.pages.edges;
        console.log(blogPosts)

        const blogPostsPerPage =
            result.data.limitPost.siteMetadata.blogItemsPerPage;
        const numBlogPages = Math.ceil(blogPosts.length / blogPostsPerPage);

        Array.from({ length: numBlogPages }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/blog` : `/blog/${i + 1}`,
                component: path.resolve("./src/templates/blog-list.js"),
                context: {
                    limit: blogPostsPerPage,
                    skip: i * blogPostsPerPage,
                    numPages: numBlogPages,
                    currentPage: i + 1
                }
            });
        });

        const PortfolioItemsPerPage =
            result.data.limitPost.siteMetadata.portfolioItemsPerPage;
        const numPortfolioItems = Math.ceil(
            blogPosts.length / PortfolioItemsPerPage
        );

        Array.from({ length: numPortfolioItems }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/portfolio` : `/portfolio/${i + 1}`,
                component: path.resolve("./src/templates/portfolio-list.js"),
                context: {
                    limit: blogPostsPerPage,
                    skip: i * blogPostsPerPage,
                    numPages: numPortfolioItems,
                    currentPage: i + 1
                }
            });
        });

        const PodcastsItemsPerPage =
            result.data.limitPost.siteMetadata.podcastsItemsPerPage;
        const numPodcastItems = Math.ceil(
            blogPosts.length / PodcastsItemsPerPage
        );

        Array.from({ length: numPodcastItems }).forEach((_, i) => {
            createPage({
                path: i === 0 ? `/podcast` : `/podcast/${i + 1}`,
                component: path.resolve("./src/templates/podcast-list.js"),
                context: {
                    limit: blogPostsPerPage,
                    skip: i * blogPostsPerPage,
                    numPages: numPortfolioItems,
                    currentPage: i + 1
                }
            });
        });


        blogPosts.forEach(({ node }) => {
            createPage({
                path: node.slug,
                component: path.resolve("./src/templates/blog.js"),
                context: {
                    id: node.id,
                    slug: node.slug,
                    featuredImage: node.featuredImage,
                    id2:  {"eq": "SitePage /" + node.slug},
                    id3: "SitePage /" + node.slug
                }
            });
        });

        blogPosts.forEach(({ node }) => {
            let template =
                node.categories.edges[0].node.name === undefined
                    ? "portfolio"
                    : (node.categories.edges[0].node.name).toLowerCase();
                    console.log("NODE1: ", template)

            createPage({
                path: node.slug,
                component: path.resolve("./src/templates/" + template + ".js"),
                context: {
                    id: node.id,
                    slug: node.slug,
                    featuredImage: node.featuredImage,
                    id2:  {"eq": "SitePage /" + node.slug},
                    id3: "SitePage /" + node.slug
                }
            });
        });

        allPages.forEach(({ node }) => {
            createPage({
                path: node.slug,
                component: path.resolve("./src/templates/blog.js"),
                context: {
                    id: node.id,
                    slug: node.slug
                }
            });
        });

    //     result.data.allShopifyProduct.edges.forEach(({ node }) => {
    //   createPage({
    //     path: `/product/${node.handle}/`,
    //     component: path.resolve(`./src/templates/ProductPage/index.js`),
    //     context: {
    //       // Data passed to context is available
    //       // in page queries as GraphQL variables.
    //       handle: node.handle,
    //     },
    //   })
    // })

    // result.data.allWcProducts.edges.forEach(({ node }) => {
    //   createPage({
    //     path: `/product/${node.id}/`,
    //     component: path.resolve(`./src/templates/ProductPage/index.js`),
    //         context: {
    //           // Data passed to context is available
    //           // in page queries as GraphQL variables.
    //           name: node.id
    //         },
    //   })
    // })

    });
};

exports.onCreateNode = async ({ node, getNode, actions, store, cache, createNodeId, _auth, }) => {
    const { createNodeField, createNode } = actions;
    let fileNode

    if (node.internal.type === `SitePage`) {
     if (node.context != undefined) {

       if (node.context.featuredImage) {
         console.log("NODE: ", node.context.featuredImage.sourceUrl)

         try {
           fileNode = await createRemoteFileNode({
             url: node.context.featuredImage.sourceUrl,
             parentNodeId: node.id,
             store,
             cache,
             createNode,
             createNodeId,
             auth: _auth,
           })
         } catch (e) {
           console.log(e)
         }
       }
      }
    }
    if (fileNode) {
      node.localFile___NODE = fileNode.id
    }
};


exports.sourceNodes = async ({ actions, getNode, hasNodeChanged, }) => {
    const { createNode } = actions;

    const makeNode = node => {
    node.internal.contentDigest = crypto
      .createHash('md5')
      .update(JSON.stringify(node))
      .digest('hex')

    createNode(node)
  }

  const items = await ypi(YT_KEY, LWyP)

  let ytNode = {
    id: 'youtube',
    children: ['ytPlaylists'],
    parent: null,
    internal: {
      type: 'youtube',
    },
  }

  let playlistsNode = {
    id: 'ytPlaylists',
    parent: 'youtube',
    children: ['lwypPlaylist'],
    internal: {
      type: 'ytPlaylists',
    },
  }

  let lwypNode = {
    id: 'lwypPlaylist',
    parent: 'ytPlaylists',
    children: [],
    internal: {
      type: 'ytPlaylist',
    },
  }

  lwypNode.children = items.map(
    ({ title, description, resourceId, thumbnails, position }) => {
      const id = `${resourceId.videoId}`
      makeNode({
        id,
        title,
        description,
        thumbnails,
        position,
        resourceId,
        internal: {
          type: 'ytVideo',
        },
        parent: 'lwypPlaylist',
        children: [],
      })
      return id
    }
  )

  makeNode(lwypNode)
  makeNode(playlistsNode)
  makeNode(ytNode)

  // makeNode(lwypNode)

  return
}
