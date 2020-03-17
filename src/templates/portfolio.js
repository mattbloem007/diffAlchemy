import React from "react";
import { graphql } from "gatsby";
import Layout from '../components/Layout';
import Img from 'gatsby-image'
import contentParser from 'gatsby-wpgraphql-inline-images';



const pluginOptions = {
  wordPressUrl: 'http://41.185.8.137/~xic02/alchemyofremembrance/',
  uploadsUrl: 'http://41.185.8.137/~xic02/alchemyofremembrance/wp-content/uploads/'
};

export default function({ data }) {

   const { content } = data.wpgraphql.post
  console.log("DATA: ", data)

  let isImage = false;
  if (data.file.childImageSharp) {
    isImage = true;
  }

    return (
      <Layout fullMenu>
        <section id="wrapper">
          <header>
            <div className="inner">
            {isImage? <Img className="image fit" fluid={data.file.childImageSharp.fluid}/> : null}
              <h2>{data.wpgraphql.post.title}</h2>
              <div dangerouslySetInnerHTML={{
                  __html: data.wpgraphql.post.excerpt
              }} />
            </div>
            <div className="wrapper">
              <div className="inner">{contentParser({ content }, pluginOptions)}</div>
            </div>
          </header>



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

        </section>
      </Layout>
    )
  }

export const query = graphql`
query portfolioPosts($id: ID!, $id2: StringQueryOperatorInput) {

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
