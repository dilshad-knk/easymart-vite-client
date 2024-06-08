import React from 'react'
import { Card, CardBody, CardTitle } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <Card className='m-3 p-4 shadow mx-4'>
        <CardTitle className='fw-bold'>Contact Us:</CardTitle>
        <CardBody>
        
        <p>Got a question or need assistance? We're here to help! You can reach out to us via email at  <a href="mailto:easy.help.mart@gmail.com">easy.help.mart@gmail.com</a> or through our online contact form. Our customer support team is available to assist you with any queries you may have, whether it's about product availability, order tracking, or general inquiries. Connect with us on social media to stay updated on the latest deals, promotions, and company news.</p>
        </CardBody>
    </Card>
  )
}

export default Contact