import React from 'react'
import { Card, CardBody, CardTitle } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <Card className='m-3 p-4 shadow mx-4'>
        <CardTitle className='fw-bold'>Contact Us:</CardTitle>
        <CardBody>
        
        <p>For any issues in utilizing our services, you may contact our helpdesk at <a href="tel:9843014221">9843014221</a> or email us at <a href="mailto:easy.help.mart@gmail.com">easy.help.mart@gmail.com</a>.</p>
        </CardBody>
    </Card>
  )
}

export default Contact