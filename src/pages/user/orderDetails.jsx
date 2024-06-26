import React, { useState, useEffect } from "react";
import instance from "../../axios/axios";
import { Container, Row, Col, Card } from "react-bootstrap";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await instance.get("/user/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Order fetch error:", error);
      }
    };

    fetchOrders();
  }, []);
  

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Order Details</h2>
          {orders.length > 0 ? (
            orders.map((order) => (
              <Card key={order._id} className="mb-3 shadow">
                <Card.Body>
                  <Card.Title>Order ID: {order._id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Status: {order.status}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Total Price:</strong> ₹{order.amount}
                    <br />
                    <strong>Payment Method:</strong> {order.paymentMethod}
                    <br />
                    <strong>Delivery Address:</strong> {order.address.street},{" "}
                    {order.address.city}, {order.address.state},{" "}
                    {order.address.pincode}
                    <br />
                    <strong>Products:</strong>
                    <ul className="list-unstyled ps-2">
                      {order.products.map((product) => (
                        <li key={product.productId._id} className="p-1 border">
                          <Col xs={2}>
                            <img
                              src={
                                import.meta.env.VITE_SERVER_URL +
                                product.productId.image
                              }
                              className="img-fluid mw-100 custom-cart-img"
                              alt="img"
                            />
                          </Col>
                         <Col> {product.productId.name} - ({product.quantity} item){" "}</Col>
                         <p> <strong>₹Price:</strong>{product.productId.price}</p>
                         
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetails;
