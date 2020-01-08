import React from 'react'

import Cart from '../components/Cart'
import Layout from "../components/layout"

const CartPage = () => (
  <Layout>
    <section id="wrapper">
      <header>
        <div className="inner">
        <h1>Cart</h1>
        <div className="wrapper">
          <div className="inner">
          <Cart />
          </div>
        </div>
      </div>
    </header>
  </section>

  </Layout>
)

export default CartPage
