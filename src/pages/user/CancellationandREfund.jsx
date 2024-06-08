import React from 'react'
import { Card } from 'react-bootstrap'

const CancellationandREfund = () => {
  return (
   <Card className='p-5'>

<header>
        <h1>Cancellation and Refund Policy</h1>
        <p>Last updated on Jun 3, 2024</p>
    </header>

    <section>
        <p>Easy Mart believes in helping its customers as far as possible and has, therefore, a liberal cancellation policy. Under this policy:</p>
        <ul>
            <li>Cancellations will be considered only if the request is made within 7 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.</li>
            <li>Easy Mart does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of the product delivered is not good.</li>
            <li>In case of receipt of damaged or defective items, please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 days of receipt of the products.</li>
            <li>In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.</li>
            <li>In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.</li>
            <li>In case of any refunds approved by Easy Mart, it’ll take 3-4 days for the refund to be processed to the end customer.</li>
        </ul>
    </section>

    

    <footer>
        <p>If you have any questions or concerns about our Cancellation and Refund Policy, please contact us at <a href="mailto:easy.help.mart@gmail.com">easy.help.mart@gmail.com</a>.</p>
    </footer>
   </Card>
  )
}

export default CancellationandREfund