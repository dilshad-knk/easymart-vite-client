import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const OrderConfirmation = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8} className="shadow my-3">
          <h2 className="my-4 fw-bold ps-1 text-success">Order Confirmation</h2>
          <p>Thank you for your purchase! Your order has been successfully placed.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmation;
