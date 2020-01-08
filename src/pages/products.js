import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
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
  {
    allShopifyProduct(sort: { fields: [title] }) {
      edges {
        node {
          title
          shopifyId
          description
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
        }
      }
    }
  }
`
