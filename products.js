import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/Layout"
import ProductGrid from '../components/ProductGrid'

const ProductsPage = ({ data }) => (
<Layout>
  <section id="wrapper">
    <header>
      <div className="inner">
        <h2>Products</h2>
        <div className="wrapper">
          <div className="inner">
          <ProductGrid/>
          </div>
        </div>
      </div>
    </header>
  </section>
</Layout>
)
export default ProductsPage
export const query = graphql`

query {
  allWcProducts {
edges {
node {
  id
  name
  categories {
    wordpress_id
  }
  product_variations {
   price
   description
 }
  images {
    localFile {
      childImageSharp {
        fluid(maxWidth: 910) {
          ...GatsbyImageSharpFluid_withWebp_tracedSVG
        }
      }
    }
  }
}
}
}

}
`

// {
//   allShopifyProduct(sort: { fields: [title] }) {
//     edges {
//       node {
//         title
//         shopifyId
//         description
//         handle
//         priceRange {
//           minVariantPrice {
//             amount
//           }
//         }
//       }
//     }
//   }
// }
