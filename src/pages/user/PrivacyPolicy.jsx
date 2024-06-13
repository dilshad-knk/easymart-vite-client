import React from 'react'
import { Card } from 'react-bootstrap'

const PrivacyPolicy = () => {
  return (
    <Card className='p-5 shadow my-2'>
    
       <div>
       <header>
        <h1>Privacy Policy</h1>
        <p>Effective Date: [8th June 2024]</p>
    </header>

    <section>
        <h2>Welcome to Easy Mart</h2>
        <p>Your privacy is important to us, and we are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website or interact with us through other means.</p>
    </section>

    <section>
        <h2>Information We Collect</h2>
        <ol>
            <li><strong>Personal Information:</strong> This may include your name, email address, shipping address, billing information, phone number, and other similar data when you create an account, place an order, or communicate with us.</li>
            <li><strong>Non-Personal Information:</strong> We may also collect non-personal information such as your IP address, browser type, device information, and website usage data through cookies and other tracking technologies.</li>
        </ol>
    </section>

    <section>
        <h2>How We Use Your Information</h2>
        <p>We may use the information we collect for various purposes, including:</p>
        <ul>
            <li>Processing and fulfilling your orders</li>
            <li>Providing customer support and responding to inquiries</li>
            <li>Personalizing your shopping experience</li>
            <li>Sending promotional emails and newsletters (with your consent)</li>
            <li>Analyzing website traffic and improving our services</li>
            <li>Preventing fraud and enhancing security</li>
        </ul>
    </section>
       </div>
    </Card>
  )
}

export default PrivacyPolicy