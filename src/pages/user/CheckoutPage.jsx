import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import AddressInfo from "../../components/user/AddressInfo";
import { useLocation } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import instance from "../../axios/axios";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const CheckoutPage = () => {
  const location = useLocation();
  const {
    products: initialitems,
    totalPrice: initialTotalPrice,
    userId,
  } = location.state || { products: [], totalPrice: 0 };
  const [quantity, setQuantity] = useState(1);

  const [items, setItems] = useState(initialitems);
  const dispatch = useDispatch();

  console.log(items);

  const handleInputChange = (event) => {
    setQuantity(event.target.value);
  };
  //   const removeItemFromCart = async (props) => {
  //     try {
  //         const response = await instance.patch(`user/cart/remove/${userId}`,{cartItemId : props} ,{ withCredentials: true });
  //         const updatedCartItems = cartItems.filter(item => item._id !== props);
  //         setItems(updatedCartItems);
  //         dispatch(addToCart(response.data));
  //         calculateTotalPrice(updatedCartItems);

  //     } catch (error) {
  //         console.error('Error removing cart items:', error);
  //     }
  // };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8} className="shadow my-3">
          <h2 className="my-4 fw-bold ps-1">Checkout</h2>
          <Accordion className="my-4" defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span className="fw-bold">Order Summary</span>
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup className="mb-3">
                  {items &&
                    items.map((item, index) => (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col
                            xs={1}
                            className="d-flex flex-column align-items-center justify-content-center"
                          >
                            {index + 1}
                          </Col>
                          {item.productId ? (
                            <>
                              <Col xs={2}>
                                <img
                                  src={
                                    import.meta.env.VITE_SERVER_URL +
                                    item.productId.image
                                  }
                                  className="img-fluid mw-100 custom-cart-img"
                                  alt="img"
                                />
                              </Col>
                              <Col xs={4} className=" title-wrapper-cart">
                                {item.productId.name}
                              </Col>
                              <Col xs={1} className="d-flex align-items-center">
                                Price: ₹{item.productId.price}
                              </Col>
                              <Col
                                xs={2}
                                className="d-flex align-items-center justify-content-center"
                              >
                                Quantity :  
                                {item.quantity ? (
                                 item.quantity
                                ) : (
                                  <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleInputChange}
                                    className="w-25"
                                  />
                                )}
                              </Col>
                              {/* <Col xs={2} className="d-flex flex-column align-items-end justify-content-center">
                                            <RiDeleteBinLine  onClick={() => removeItemFromCart(item._id)}/>
                                           
                                        </Col> */}
                            </>
                          ) : (
                            <>
                              <Col>Product not available</Col>
                            </>
                          )}
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span className="fw-bold">Shipping Address</span>
              </Accordion.Header>
              <Accordion.Body>
                <AddressInfo />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span className="fw-bold">Payment Mode</span>
              </Accordion.Header>
              <Accordion.Body>
                Contact : easymart.seller.support.com
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <span className="fw-bold">Confirmation</span>
              </Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
