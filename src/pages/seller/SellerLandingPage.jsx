import React, { useEffect } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { FaSmile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import instance from "../../axios/axios";
import { sellerAuthSuccess } from "../../redux/sellerAuthenticate";




function SellerPage() {

  const navigate =useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const checkUser = async () => {
      
      try {
      
        let res = await instance.get('/sellers/verify',{withCredentials: true})

         console.log(res);
        
         
          if(res.data.success){
           dispatch(sellerAuthSuccess(res.data))

          
  
        }
        
        if (res.data.success === false) {
          alert('unautorized')
        }
  
      } catch (error) {
        console.error("Error occurred while checking user:", error);
        console.log(error);
      }
    };
    checkUser();
  }, []);
  const isSellerAuthenticated = useSelector(
    (state) => state.seller.isSellerAuthenticated
  );



  return (
    <Container>
      <Row>
        <Col>
          <h1 className="fw-bold p-3">
            Unlock the potential of your business by joining Easy Mart as a
            Seller <FaSmile className="text-primary" />
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="m-md-5 py-2">
          <Col className="mb-5 text-center">
            {!isSellerAuthenticated ? (
              <>
                <div className="mb-2">An Existing Seller ?</div>
                <div>
                  <NavLink to="/sellers/signin">
                    <Button variant="primary">SignIn</Button>
                  </NavLink>
                </div>
              </>
            ) : (
              <Link to='/sellers/dashboard'>Go to Seller Dashboard</Link>
            )}
          </Col>
          <Col className="my-2 text-center">
            <div className="mb-2">New to Easy Mart Selling ?</div>
            <div>
              <NavLink to="/sellers/signup">
                <Button variant="primary" className="">
                  Create a Seller Account
                </Button>
              </NavLink>
            </div>
          </Col>
        </Col>
        <Col md={6} className="ps-md-5">
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>How to sell</Accordion.Header>
              <Accordion.Body><Link className="text-black">Read full Guidlines</Link></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Support Team</Accordion.Header>
              <Accordion.Body>
                Contact : easymart.seller.support.com
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Real-Time Analytics</Accordion.Header>
              <Accordion.Body></Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Storage&Shipping</Accordion.Header>
              <Accordion.Body>
                Contact : easymart.seller.support.com
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Grow Faster</Accordion.Header>
              <Accordion.Body>
                Contact : easymart.seller.support.com
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default SellerPage;
