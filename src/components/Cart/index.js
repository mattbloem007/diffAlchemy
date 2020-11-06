import React, { useContext } from 'react'

import StoreContext from '../../context/StoreContext'
import LineItem from './LineItem'

const Cart = () => {
  const { store: {checkout} } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const line_items = checkout.lineItems.map(line_item => {
    return <LineItem key={line_item.id.toString()} line_item={line_item} />
  })

  return (
    <div>
      {line_items}
      <h4>Subtotal</h4>
      <p>R {checkout.subtotalPrice}</p>
      <br />
      <h4>Taxes</h4>
      <p>R {checkout.totalTax}</p>
      <br />
      <h4>Total</h4>
      <p>R {checkout.totalPrice}</p>
      <br />
      <button onClick={handleCheckout}>Check out</button>
    </div>
  )
}

export default Cart
