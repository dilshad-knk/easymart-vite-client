import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Accordion,
} from "react-bootstrap";
import AddressInfo from "../../components/user/AddressInfo";

const CheckoutPage = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8} className="shadow my-3">
          <h2 className="my-4 fw-bold ps-1">Checkout</h2>
          <Accordion className="my-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="fw-bold">Billing Address</span>
              </Accordion.Header>
              <Accordion.Body>
               
                <AddressInfo />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className="fw-bold">Payment Mode</span>
              </Accordion.Header>
              <Accordion.Body>
                Contact : easymart.seller.support.com
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header><span className="fw-bold">Confirmation</span></Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
