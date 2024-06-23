import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col, ListGroup } from 'react-bootstrap';
import instance, { Interceptor } from '../../axios/axios';
import { useSelector,useDispatch } from 'react-redux';
import '../../components/style.css';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { RiDeleteBinLine } from 'react-icons/ri';
import { addToCart } from '../../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
    const [totalPrice, setTotalPrice] = useState(0);
    const userId = useSelector(state => state.user.user.id);
    const cartItems = useSelector(state => state.cart.cart);
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        fetchCart();
    }, [userId]);


 const fetchCart = async () => {
        try {
            const response = await instance.get(`user/cart/fetch/${userId}`, { withCredentials: true });
            dispatch(addToCart(response.data));
            calculateTotalPrice(response.data);
            
        } catch (error) {
            console.error('Error fetching cart items:', error);
            
        }
    };

    const removeItemFromCart = async (props) => {
        try {
            const response = await instance.patch(`user/cart/remove/${userId}`,{cartItemId : props} ,{ withCredentials: true });
        
            fetchCart();
        } catch (error) {
            console.error('Error removing cart items:', error);
        }
    };

    const increaseCart = async (props) => {
        try {
            const response = await instance.patch(`user/cart/up/${userId}`,{cartItemId : props}, { withCredentials: true });
            fetchCart();
        } catch (error) {
            console.error('Error adding cart items:', error);
        }
    };

    const decreaseCart = async (props) => {
        try {
            const response = await instance.patch(`user/cart/down/${userId}`, {cartItemId : props},{ withCredentials: true });
            fetchCart();
        } catch (error) {
            console.error('Error decreaing the qauntity of cart items:', error);
        }
    };

    
   
 
    

   


    const calculateTotalPrice = (items) => {
        let total = 0;
        items.forEach(item => {
            if (item.productId ) {
                total += item.productId.price  * item.quantity;

            }
        });
        setTotalPrice(total);
    };


    const handleCheckout = () => {
        

        const products = cartItems
     

    
        navigate('/checkout', { state: { products, userId ,totalPrice} });
    

    };
    
    

    return (
        <Container >
            <Interceptor/>
            <Row>
                <Col md={10}>
                    <h2>Cart</h2>
                    <ListGroup className='mb-3'>
                        {cartItems&&cartItems.map((item ,index) => (
                            <ListGroup.Item  key={item.id}>
                                <Row>
                                <Col xs={1} className="d-flex flex-column align-items-center justify-content-center">{index + 1}</Col> 
                                {item.productId ? (
                                    <>  
                                        <Col xs={2}><img  
                                                src={import.meta.env.VITE_SERVER_URL + item.productId.image}
                                            className="img-fluid mw-100 custom-cart-img" alt="img" /></Col>
                                        <Col xs={4}  className=" title-wrapper-cart">{item.productId.name}</Col>
                                        <Col xs={2} className="d-flex flex-column align-items-center justify-content-center" >
                                                 <div className="d-flex align-items-center justify-content-center mb-4 ">
                                                        <CiCirclePlus onMouseDown={(e) => { e.preventDefault(); increaseCart(item._id); }} className='me-2 fs-3' />
                                                        <CiCircleMinus onMouseDown={(e) => { e.preventDefault(); decreaseCart(item._id); }} className='fs-3' />

                                                </div>  
                                            Quantity: {item.quantity}</Col>
                                        <Col xs={1} className="d-flex align-items-center">Price: ₹{item.productId.price}</Col>
                                        <Col xs={2} className="d-flex flex-column align-items-center justify-content-center">
                                            <RiDeleteBinLine  onClick={() => removeItemFromCart(item._id)}/>
                                           
                                        </Col>

                                    </>
                                ) : (
                                    <>
                                    <Col>Product not available</Col>
                                    <Col xs={2} className="d-flex flex-column align-items-center justify-content-center">
                                        <Button variant="danger" onClick={() => removeItemFromCart(item._id)}>Remove</Button>
                                     </Col>
                                    </>
                                )}
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col className='my-5 border p-3 h-25 sticky'>
                    <h3>Total Price: </h3><h4> ₹ {totalPrice}</h4>
                     <div className="d-flex align-items-center justify-content-center ">
                     <Button variant="primary" disabled={totalPrice == 0}  className="d-flex align-items-center mt-5 justify-content-center " size="lg" block onClick={handleCheckout}>Check out</Button>

                    </div>                   

                </Col>
            </Row>

            
        </Container>
    );
}

export default Cart;
