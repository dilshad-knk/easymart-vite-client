import React, { useEffect } from 'react'
import Home from './Home'
import displayRazorpay from "../Utils/PaymentGateway";


const App = () => {

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });


  return (
    <div>

    <Home/>
    
    {/* <button onClick={displayRazorpay}>pay </button> */}
      
    </div>
  )
}

export default App