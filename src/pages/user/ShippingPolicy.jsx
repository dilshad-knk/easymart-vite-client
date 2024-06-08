import React from 'react'
import { Card } from 'react-bootstrap'

const ShippingPolicy = () => {
  return (
    <Card className='p-5'>
         <header>
        <h1>Shipping and Delivery Policy</h1>
        <p>Last updated on Jun 3, 2024</p>
    </header>

    <section>
        <p>For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only. Orders are shipped within or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms. Easy Mart is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within rom the date of the order and payment or as per the delivery date agreed at the time of order confirmation. Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.</p>
        <p>For any issues in utilizing our services, you may contact our helpdesk at <a href="tel:9843014221">9843014221</a> or email us at <a href="mailto:easy.help.mart@gmail.com">easy.help.mart@gmail.com</a>.</p>
    </section>

  

    <footer>
        <p>If you have any questions or concerns about our Shipping and Delivery Policy, please contact us at <a href="mailto:easy.help.mart@gmail.com">easy.help.mart@gmail.com</a>.</p>
    </footer>
    </Card>
  )
}

export default ShippingPolicy