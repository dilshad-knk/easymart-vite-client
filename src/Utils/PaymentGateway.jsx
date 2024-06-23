import React, { useState } from "react";
import instance from "../axios/axios";
import { showFailureAlert, showSuccessAlert } from "./toastifyAlert";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaymentGateway = ({amount,onPaymentSuccess,selectedPaymentMethod,confirmationStatus,setfinalConfirmation,finalConfirmation,data}) => {
  const [isProcessing, setIsProcessing] = useState(false);


  const handlePayment = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      if (selectedPaymentMethod === "razorpay") {
        const result = await instance.post("/razorpay/create-order", {
          amount,
        });

        if (!result || !result.data) {
          alert("Server error. Are you online?");
          setIsProcessing(false);
          return;
        }

        console.log(result);

        const options = {
          key: import.meta.env.VITE_KEY_ID,
          amount: result.data.order.amount,
          currency: "INR",
          name: "Easy Mart",
          description: "Test Transaction",
          order_id: result.data.id,
          handler: async function (response) {
           try {
            const Confirmation = await instance.post('/razorpay/payment-success', { data : data, paymentId : response.razorpay_payment_id});

             showSuccessAlert(
               `Order Successfull: ${response.razorpay_payment_id}`
             );
             setIsProcessing(false);
             onPaymentSuccess()

             setfinalConfirmation(true)
            
             

           } catch (error) {
            console.error('Error confirming order:', error);
           }
          
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function () {
                setIsProcessing(false)
               
            //   window.location.replace("//put your redirect URL");
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else if (selectedPaymentMethod === "cod") {
       try {
         const Confirmation = await instance.post('/razorpay/create-cod-order', { data : data});
 
         showSuccessAlert(
           `Order Successfull`
         );
         setIsProcessing(false);
         onPaymentSuccess()
         setfinalConfirmation(true)
       } catch (error) {
        showFailureAlert('Order Failed')
       }
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setIsProcessing(false);
      showFailureAlert(
        "An error occurred while processing the payment. Please try again."
      );
    }
  };

  return (
    <div className="container mt-4">
      {!finalConfirmation?
      <button
        className="btn btn-primary mt-3"
        onClick={handlePayment}
        disabled={isProcessing || !confirmationStatus.orderSummary || !confirmationStatus.shippingAddress || !confirmationStatus.paymentmode
        }
      >
        {isProcessing ? "Processing..." : "Place your Order"}
      </button> : 
      <Container>
      <Row className="justify-content-md-center">
        <Col md={8} className="shadow my-3">
          <h2 className="my-4 fw-bold ps-1 text-success">Order Confirmation</h2>
          <p>Thank you for your purchase! Your order has been successfully placed.</p>
          <p> <Link to='/profile'>See your Orders</Link></p>
          <p> <Link to='/'>Shop more</Link></p>
        </Col>
      </Row>
    </Container>}
    </div>
  );
};

export default PaymentGateway;
