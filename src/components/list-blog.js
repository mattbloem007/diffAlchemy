import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import BlogItems from "./items-blog";

export default function() {
    const query = useStaticQuery(graphql`
        query blogList {


            wpgraphql {
              posts (where: {categoryName: "Blog"}){
                edges{
                  node{
                    excerpt
                    slug
                    date
                    title
                    featuredImage {
                      sourceUrl(size: LARGE)
                      srcSet(size: MEDIUM_LARGE)
                    }
                    elementorData
                  }
                }
              }
            }

            allFile {
              edges {
                node {
                  name
                  parent{
                    id
                  }
                  childImageSharp {
                    fluid (maxWidth: 500){
                      srcSet
                      ...GatsbyImageSharpFluid

                    }
                  }
                }
              }
            }
        }
    `);

    if (query.wpgraphql.posts.edges.length > 0) {
      console.log("QUERY", query.allFile)
        return (
          <section id="four" className="wrapper alt style1">
            <div className="inner">
              <h2 className="major">Blog</h2>
                <BlogItems data={query} />
              </div>
            </section>
        );
    } else {
        return <React.Fragment></React.Fragment>;
    }
}
