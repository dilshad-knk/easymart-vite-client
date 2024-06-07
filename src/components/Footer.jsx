// Footer.js
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
          <Col md={3}>
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li><Link to="/" >Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about" >About Us</Link></li>
              <li><Link to="/contact" >Contact Us</Link></li>
            </ul>

          </Col>
          <Col md={3}>
            <h3>Categories</h3>
            <ul className="list-unstyled">
              <li><Link to="/category/electronics">Electronics</Link></li>
              <li><Link to="/category/clothing">Clothing</Link></li>
            </ul>
          </Col>
          <Col md={3}>
            <h3>Contact Us</h3>
            <p>123 Easy St, City, Country</p>
            <p>Email: info@easymart.com</p>
            <p>Phone: +1234567890</p>
          </Col>
          <Col md={3}>
            <h3>Follow Us</h3>
            <ul className="list-inline">
              <li className="list-inline-item" ><a href="#"><FaFacebook /></a></li>
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
