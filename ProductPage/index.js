import React from 'react'
import { graphql } from 'gatsby'

import ProductForm from '../../components/ProductForm'
import Layout from "../../components/Layout";

import {
  Img,
  Container,
  TwoColumnGrid,
  GridLeft,
  GridRight,
} from '../../utils/styles'
import {
  ProductTitle,
  ProductDescription
} from './styles'

const ProductPage = ({ data }) => {
  const product = data.wcProducts
  return (
    <>
      <Layout>
        <TwoColumnGrid>
          <GridLeft>
            {product.images.map(image => (
              <Img
                fluid={image.localFile.childImageSharp.fluid}
                key={image.id}
                alt={product.name}
              />
            ))}
          </GridLeft>
          <GridRight>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductDescription
              dangerouslySetInnerHTML={{ __html: product.product_variations.description }}
            />
            <ProductForm product={product} />
          </GridRight>
        </TwoColumnGrid>
      </Layout>
    </>
  )
}
//
// shopifyProduct(handle: { eq: $handle }) {
//   id
//   title
//   handle
//   productType
//   description
//   descriptionHtml
//   shopifyId
//   options {
//     id
//     name
//     values
//   }
//   variants {
//     id
//     title
//     price
//     availableForSale
//     shopifyId
//     selectedOptions {
//       name
//       value
//     }
//   }
//   priceRange {
//     minVariantPrice {
//       amount
//       currencyCode
//     }
//     maxVariantPrice {
//       amount
//       currencyCode
//     }
//   }
//   images {
//     originalSrc
//     id
//     localFile {
//       childImageSharp {
//         fluid(maxWidth: 910) {
//           ...GatsbyImageSharpFluid_withWebp_tracedSVG
//         }
//       }
//     }
//   }
// }

export const query = graphql`
  query($name: String!) {
    wcProducts(name: {eq: $name}) {
     name
     price
     product_variations {
      price
      description
    }
     images {
       originalSrc
       id
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
`

export default ProductPage
