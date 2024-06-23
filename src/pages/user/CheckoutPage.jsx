import React, { useEffect, useState } from "react";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import instance from "../../axios/axios";
import { addToCart, clearCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import PaymentGateway from "../../Utils/PaymentGateway";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

const CheckoutPage = () => {
  const location = useLocation();
  const {
    products: initialitems,
    totalPrice,
    userId,
    singleProduct,
  } = location.state || { products: [], totalPrice: 0 };
  const [quantity, setQuantity] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [amountToPay, setAmountToPay] = useState(totalPrice);
  const [items, setItems] = useState(initialitems);
  const [activeKey, setActiveKey] = useState("0");
  const [confirmationStatus, setConfirmationStatus] = useState({
    orderSummary: false,
    shippingAddress: false,
    paymentmode: false,
  });

  const primaryAddress =
    addresses && addresses.find((address) => address.isPrimary === true);

  if (items[0].singleProduct) {
    items[0].quantity = quantity;
  }

  const data = {
    items,
    amountToPay,
    userId,
    primaryAddress,
  };

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("razorpay");
  const [finalConfirmation, setfinalConfirmation] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (items[0] && items[0].singleProduct) {
      setAmountToPay(items[0].productId.price * quantity);
    }
  }, [items, quantity]);

  const handleInputChange = (event) => {
    if (confirmationStatus.orderSummary) return;
    setQuantity(event.target.value);
  };

  const handleInputBlur = () => {
    if (quantity < 1) {
      setQuantity(1);
    }
  };

  const handleAccordionChange = (key) => {
    setActiveKey(key);
  };

  const confirmOrderSummary = () => {
    setConfirmationStatus({ ...confirmationStatus, orderSummary: true });
    setActiveKey("1");
  };

  const confirmShippingAddress = () => {
    setConfirmationStatus({ ...confirmationStatus, shippingAddress: true });
    setActiveKey("2");
  };
  const confirmPaymentMode = () => {
    setConfirmationStatus({ ...confirmationStatus, paymentmode: true });
    setActiveKey("3");
  };

  const handlePaymentSuccess = () => {
    // navigate("/order-confirmation");

    const removeItemFromCart = async (props) => {
      try {
        const response = await instance.patch(
          `user/cart/remove/${userId}`,
          { cartItemId: props },
          { withCredentials: true }
        );
        dispatch(clearCart());
      } catch (error) {
        console.error("Error removing cart items:", error);
      }
    };

    removeItemFromCart();
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const renderSummary = () => (
    <Accordion.Item eventKey="0">
      <Accordion.Header>
        <span className="fw-bold">
          Order Summary
          {confirmationStatus.orderSummary ? (
            <BsCheckCircle className="ms-2 text-success fs-5" />
          ) : (
            <BsXCircle className="ms-2 text-danger fs-5" />
          )}
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <ListGroup className="mb-3">
          {items.length > 0 ? (
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
                        xs={4}
                        className="d-flex align-items-center justify-content-center"
                      >
                        Q :
                        {!item.singleProduct ? (
                          item.quantity
                        ) : (
                          <input
                            type="number"
                            defaultValue={1}
                            value={quantity}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
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
            ))
          ) : (
            <ListGroup.Item>
              <p>Product not available</p>
              <Link to="/">Shop now</Link>
            </ListGroup.Item>
          )}
        </ListGroup>
        <div className="d-flex justify-content-center">
          {!confirmationStatus.orderSummary ? (
            <Button onClick={confirmOrderSummary} className="">
              Confirm
            </Button>
          ) : (
            ""
          )}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );

  const renderShipping = () => (
    <Accordion.Item eventKey="1">
      <Accordion.Header>
        <span className="fw-bold">
          Shipping Address
          {confirmationStatus.shippingAddress ? (
            <BsCheckCircle className="ms-2 text-success fs-5" />
          ) : (
            <BsXCircle className="ms-2 text-danger fs-5" />
          )}
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <AddressInfo addresses={addresses} setAddresses={setAddresses} />
        <div className="d-flex justify-content-center">
          {!confirmationStatus.shippingAddress ? (
            <Button onClick={confirmShippingAddress} className="">
              Confirm
            </Button>
          ) : (
            ""
          )}
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );

  const renderPayment = () => (
    <Accordion.Item eventKey="2">
      <Accordion.Header>
        Payment Mode
        {confirmationStatus.paymentmode ? (
          <BsCheckCircle className="ms-2 text-success fs-5" />
        ) : (
          <BsXCircle className="ms-2 text-danger fs-5" />
        )}
      </Accordion.Header>
      <Accordion.Body>
        <div className="container mt-4">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              id="razorpay"
              name="paymentMethod"
              value="razorpay"
              checked={selectedPaymentMethod === "razorpay"}
              onChange={handlePaymentMethodChange}
            />
            <label className="form-check-label" htmlFor="razorpay">
              Pay Now
            </label>
          </div>

          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="radio"
              id="cod"
              name="paymentMethod"
              value="cod"
              checked={selectedPaymentMethod === "cod"}
              onChange={handlePaymentMethodChange}
            />
            <label className="form-check-label" htmlFor="cod">
              Cash on Delivery
            </label>
          </div>

          <div className="d-flex justify-content-center">
            {!confirmationStatus.paymentmode ? (
              <Button onClick={confirmPaymentMode} className="">
                Confirm
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );

  const renderConfirm = () => (
    <Accordion.Item eventKey="3">
      <Accordion.Header>
        Confirm your Order
        {finalConfirmation ? (
          <BsCheckCircle className="ms-2 text-success fs-5" />
        ) : (
          <BsXCircle className="ms-2 text-danger fs-5" />
        )}
      </Accordion.Header>
      <Accordion.Body>
        <PaymentGateway
          amount={amountToPay}
        onPaymentSuccess={handlePaymentSuccess}
          confirmationStatus={confirmationStatus}
          selectedPaymentMethod={selectedPaymentMethod}
          finalConfirmation={finalConfirmation}
          setfinalConfirmation={setfinalConfirmation}
          data={data}
        />
      </Accordion.Body>
    </Accordion.Item>
  );

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
        <Col md={8} className="shadow my-3 ">
          <h2 className="my-4 fw-bold ps-1 w-100">Checkout</h2>
          <div className="text-end me-1 fw-bold">
            Total price : {amountToPay}
          </div>
          <Accordion
            className="my-4"
            defaultActiveKey="0"
            activeKey={activeKey}
            onSelect={handleAccordionChange}
          >
            {renderSummary()}
            {renderShipping()}
            {renderPayment()}
            {renderConfirm()}
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
