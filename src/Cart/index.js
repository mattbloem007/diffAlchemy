import React, { useContext } from 'react'

import StoreContext from '../../context/StoreContext'
import LineItem from './LineItem'
import Helmet from 'react-helmet'

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
    <Helmet>
      <script type="text/javascript" src="js/jquery-1.7.2.min.js"></script>
      <script type="text/javascript" src="js/simpleCart.js"></script>
      <script type="text/javascript">
          {simpleCart({
              checkout: {
                  type: "SendForm" ,
                  url: "https://sandbox.payfast.co.za/eng/process" ,
                  // HTTP method for form, "POST"
                  method: "POST" ,
                  // URL to redirect browser to after successful checkout
                  success: "http://yourwebsite.co.za/success.html" ,
                  // URL to redirect browser to after checkout was cancelled by buyer
                  cancel: "http://yourwebsite.co.za/cancel.html" ,
                  extra_data: {
                      currency_code: "ZAR",
                      merchant_id: "10000100",
                      merchant_key: "46f0cd694581a",
                      notify_url: "http://yourwebsite.co.za/notify.html", //this is the ITN or callback URL
                      amount: simpleCart.total, // Total amount = item1 + item2 + item3 etc
                      name_first: "Buyer first name",
                      name_last: "Buyer last name",
                  }
              },
              beforeCheckout: function( data ){
                  data.currency = "ZAR";
                  data.cancel_url = data.cancel_return;
                  data.return_url = data.return;
                  var payfast_description = '''';
                  for (var key in data)
                      if (key.match(/^item_name/))
                          payfast_description += '' ''+data[key];
                  data.item_description = data.item_name = payfast_description;
              }
          });}
      </script>
    </Helmet>
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
