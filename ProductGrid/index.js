import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'

import StoreContext from '../../context/StoreContext'
import {
  Grid,
  Product,
  Title,
  PriceTag
} from './styles'
import { Img } from '../../utils/styles'

const ProductGrid = () => {
  const { store: {checkout} } = useContext(StoreContext)
  const { allWcProducts } = useStaticQuery(
    graphql`
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
  )

  // allShopifyProduct(
  //   sort: {
  //     fields: [createdAt]
  //     order: DESC
  //   }
  // ) {
  //   edges {
  //     node {
  //       id
  //       title
  //       handle
  //       createdAt
  //       images {
  //         id
  //         originalSrc
  //         localFile {
  //           childImageSharp {
  //             fluid(maxWidth: 910) {
  //               ...GatsbyImageSharpFluid_withWebp_tracedSVG
  //             }
  //           }
  //         }
  //       }
  //       variants {
  //         price
  //       }
  //     }
  //   }
  // }

  const getPrice = price => Intl.NumberFormat(undefined, {
    currency: checkout.currencyCode ? checkout.currencyCode : 'ZAR',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : 0))

  return (
    <Grid>
      {allWcProducts.edges
        ? allWcProducts.edges.map(({ node: { id, name, images: [firstImage], product_variations: [firstProductVariations] } }) => (
          <Product key={id} >
            <Link to={`/product/${name}/`}>
              {firstImage && firstImage.localFile &&
                (<Img
                  fluid={firstImage.localFile.childImageSharp.fluid}
                  alt={name}
                />)}
            </Link>
            <Title>{name}</Title>
            <PriceTag>{getPrice(firstProductVariations.price)}</PriceTag>
          </Product>
        ))
        : <p>No Products found!</p>}
    </Grid>
  )
}

export default ProductGrid
