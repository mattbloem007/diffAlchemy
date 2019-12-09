import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SectionItem from "../components/section-item";

class Section extends React.Component {
    render() {
        const query = this.props.datas;
        console.log("DAATA: ", query)
        if (query.wpgraphql.posts.edges.length > 0) {
            return (
                  <SectionItem data={query} />
            );
        } else {
            return <React.Fragment></React.Fragment>;
        }
    }
}

export default function({ data, pathContext }) {
    return (
        <Layout>
            <Section datas={data} pathContext={pathContext} />
        </Layout>
    );
}

export const query = graphql`
query portfolioListPage($limit: Int!) {
    wpgraphql {
      posts(where: {categoryName: "Portfolio", orderby: {field: DATE, order: DESC}}, first: $limit) {
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
