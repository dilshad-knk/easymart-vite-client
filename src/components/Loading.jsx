import React from "react";
import { Placeholder, Container, Row, Col, Button } from "react-bootstrap";

function Loading() {
  return (
    <Container  fluid>
      <Row>
        <Col className="mb-2">
          <Placeholder animation="glow">
            <Placeholder xs={12} style={{ height: "80px" }} />
          </Placeholder>
        </Col>
      </Row>

      <Row>
        <Col className="mb-2">
          <Placeholder  animation="glow">
            <Placeholder xs={12} style={{ height: "400px" }} />
          </Placeholder>
        </Col>
      </Row>

      <Row>
        {[...Array(8)].map((_, index) => (
          <Col key={index} xs={6} md={3}  className="grid g-4">
            <Placeholder animation="glow">
              <Placeholder xs={12} style={{ height: "200px" }} />
            </Placeholder>
          </Col>
        ))}
      </Row>

      <Row>
        <Col className="mt-3">
        <Placeholder  animation="glow">
            <Placeholder xs={12} style={{ height: "100px" }} />
          </Placeholder>
        </Col>
      </Row>
    </Container>
  );
}

export default Loading;
