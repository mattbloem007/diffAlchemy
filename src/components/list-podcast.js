import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PodcastItems from "./items-podcast";

export default function() {
    const query = useStaticQuery(graphql`
        query podcastList {


            wpgraphql {
              posts (where: {categoryName: "Podcast"}){
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
              <h2 className="major">Podcast</h2>
                <PodcastItems data={query} />
              </div>
            </section>
        );
    } else {
        return <React.Fragment></React.Fragment>;
    }
}
