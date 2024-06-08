import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import instance from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { showFailureAlert, showSuccessAlert } from "../Utils/toastifyAlert";
import { CiEdit } from "react-icons/ci";
import "./MoreDetails.css";
import SignInUp, { LoginModal } from "../components/user/SignInUp";
import { addToCart } from "../redux/cartSlice";

export default function MoreDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState([]);

  // const location = useLocation();
  // const { product } = location.state;
  const user = useSelector((state) => state.user);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const userId = user.user.id;
const navigate = useNavigate()
  const handleToggleModal = () => {
    setModalShow(!modalShow);
  };

  const handleAddToCart = async (productId) => {
    try {
      if (!user.isUserAuthenticated) {
        handleToggleModal();
        return;
      }

      const res = await instance.post(
        `user/cart/add/${userId}`,
        { productId },
        { withCredentials: true }
      );

      if (res.data.success) {
        showSuccessAlert(res.data.message);
        fetchCart();
      }
    } catch (error) {}
  };

  const fetchCart = async () => {
    try {
      const response = await instance.get(`user/cart/fetch/${userId}`, {
        withCredentials: true,
      });
      dispatch(addToCart(response.data));
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance.get(`user/product/${productId}`);

      if (response.data.success) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleCheckout = () => {
    
    const products = [ { productId: product,singleProduct: true }];
  
    navigate('/checkout', { state: { products, userId } });


};


  return (
    <Container fluid>
      {product && (
        <Row>
          <Col
            md={4}
            key={product._id}
            className="py-3 d-flex flex-column img-buy-cart-col "
          >
            <Col className="p-3 card shadow">
              <Card.Img
                variant="top"
                key={product.image}
                src={import.meta.env.VITE_SERVER_URL + product.image}
                className="img-fluid mw-100 custom-card-img1"
              />
            </Col>
            <Col className="flex-grow-1 border my-2 py-3 d-flex justify-content-center align-items-center">
              <div className="pe-5">
               
                 
                  <Button className="px-3" onClick={handleCheckout}>Buy</Button>
              
              </div>
              <div className="ps-5">
                <Button onClick={() => handleAddToCart(product._id)}>
                  Add to Cart
                </Button>
                {modalShow && (
                  <LoginModal
                    modalShow={modalShow}
                    handleToggleModal={handleToggleModal}
                  />
                )}
              </div>
            </Col>
          </Col>
          <Col md={8} className="py-3">
            <Card className="shadow">
              <Card.Body>
                <Card.Title className="fw-bold">
                  <h1>{product.name}</h1>
                </Card.Title>
                <Card.Text>{product.price}</Card.Text>
                <Card.Title>Description</Card.Title>
                <Card.Text>
                  {product.description && (
                    <ul>
                      {product.description
                        .split(/\n|\r\n|\r/g)
                        .map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                    </ul>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
