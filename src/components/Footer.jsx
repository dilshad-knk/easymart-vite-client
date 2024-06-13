
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css'

function Footer() {
  return (
    <footer className="bg-dark text-light py-5">
      <Container>
        <Row>
          <Col md={4}>
            <ul className="list-unstyled">
              <li className='py-1'><Link className='text-white text-decoration-none hover1' to="/" >Home</Link></li>
              <li className='py-1'><Link className='text-white text-decoration-none hover1' to="/about" >About Us</Link></li>
              <li className='py-1'><Link className='text-white text-decoration-none hover1' to="/contact" >Contact Us</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <ul className="list-unstyled">
              <li className='py-1'><Link className='text-white text-decoration-none hover1' to="/PrivacyPolicy">Privacy Policy</Link></li>
              <li className='py-1'><Link className='text-white text-decoration-none hover1' to="/TermsConditions">Terms & Conditions</Link></li>
              <li className='py-1'><Link className='text-white text-decoration-none hover1' to="/ShippingPolicy">Shipping Policy</Link></li>
              <li className='py-1'><Link className='text-white text-decoration-none hover1' to="/CancellationRefundPolicies">Cancellation & Refund Policies</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <ul className="list-inline text-center">
              <li className="list-inline-item"><a href="#"><FaFacebook /></a></li>
              <li className="list-inline-item"><a href="#"><FaTwitter /></a></li>
              <li className="list-inline-item"><a href="#"><FaInstagram /></a></li>
              <li className="list-inline-item"><a href="#"><FaLinkedin /></a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
