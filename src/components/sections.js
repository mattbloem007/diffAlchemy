import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import SectionItem from "./section-item";

export default function() {
    const query = useStaticQuery(graphql`
      query sectionListAndImages{
          wpgraphql {
            posts (where: {categoryName: "Portfolio"}){
              edges{
                node{
                  excerpt
                  slug
                  date
                  title
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

        return (
            <section id="wrapper">
                <SectionItem data={query} />
            </section>
        );
}
