import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PodcastItems from "../components/items-podcast";


class PodcastList extends React.Component {
    render() {
        const query = this.props.datas;
        console.log("QUERY2", query)
        if (query.wpgraphql.posts.edges.length > 0) {
            return (
                <section id="four" className="wrapper alt style1">
                  <div className="inner">
                    <h2 className="major">Podcast</h2>
                    <section className="features">
                      <PodcastItems data={query}/>
                    </section>
                  </div>
                </section>
            );
        } else {
            return <React.Fragment></React.Fragment>;
        }
    }
}

export default function({ data, pageContext }) {
    return (
        <Layout>
            <PodcastList datas={data} pathContext={pageContext} />
        </Layout>
    );
}

export const query = graphql`
    query podcastListPage($limit: Int!) {
        wpgraphql {
          posts(where: {categoryName: "Podcast", orderby: {field: DATE, order: DESC}}, first: $limit) {
            edges {
              node {
                excerpt
                slug
                date
                title
                featuredImage {
                  sourceUrl
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
`;
