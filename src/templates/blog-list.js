import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import BlogItems from "../components/items-blog";

class BlogList extends React.Component {
    render() {
        const query = this.props.datas;
        console.log("QUERY2", query)
        if (query.wpgraphql.posts.edges.length > 0) {
            return (
                <section id="four" className="wrapper alt style1">
                  <div className="inner">
                    <h2 className="major">Blog</h2>
                    <section className="features">
                      <BlogItems data={query}/>
                    </section>
                  </div>
                </section>
            );
        } else {
            return <React.Fragment></React.Fragment>;
        }
    }
}

export default function({ data, pathContext }) {
    return (
        <Layout>
            <BlogList datas={data} pathContext={pathContext} />
        </Layout>
    );
}

export const query = graphql`
    query blogListPage($limit: Int!) {
        wpgraphql {
          posts(where: {categoryName: "Blog", orderby: {field: DATE, order: DESC}}, first: $limit) {
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
