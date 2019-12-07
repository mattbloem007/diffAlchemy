import React from "react";
import { graphql } from "gatsby";
import Layout from '../components/Layout';



export default function({ data }) {
    return (
      <Layout fullMenu>
        <section id="wrapper">
          <header>
            <div className="inner">
              <h2>{data.wpgraphql.post.title}</h2>
              <p>{data.wpgraphql.post.excerpt}</p>
            </div>
          </header>

          <div className="wrapper">
            <div className="inner" dangerouslySetInnerHTML={{
                __html: data.wpgraphql.post.content
            }}>

              {/**<section className="features">
                <article>
                  <a href="/#" className="image">
                    <img src={pic4} alt="" />
                  </a>
                  <h3 className="major">Sed feugiat lorem</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id
                    nulla dignissim dapibus ultrices.
                  </p>
                  <a href="/#" className="special">
                    Learn more
                  </a>
                </article>
                <article>
                  <a href="/#" className="image">
                    <img src={pic5} alt="" />
                  </a>
                  <h3 className="major">Nisl placerat</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing vehicula id
                    nulla dignissim dapibus ultrices.
                  </p>
                  <a href="/#" className="special">
                    Learn more
                  </a>
                </article>
              </section>*/}
            </div>
          </div>
        </section>
      </Layout>
    )
  }

export const query = graphql`
query GET_POSTS($id: ID!, $id2: StringQueryOperatorInput) {

wpgraphql {
post(id: $id) {
  id
  postId
  title
  date
  uri
  excerpt
  content
  featuredImage {
    sourceUrl
    title
  }
  elementorData
}
}

file(parent: {id: $id2}) {
    name
    childImageSharp {
      fluid (maxWidth: 500){
        srcSet
        ...GatsbyImageSharpFluid

      }
    }
  }
}
`;
