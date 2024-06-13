import instance from "../axios/axios";




export default async function displayRazorpay() {
  try {
    // let res = await instance.('/razorpay/order',{amount : 450})

    console.log(data);
  
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      currency: data.currency,
      amount: data.amount,
      name: "Learn Code Online",
      description: "Wallet Transaction",
      image: "http://localhost:1337/logo.png",
      order_id: data.id,
      handler: function (response) {
        alert("PAYMENT ID ::" + response.razorpay_payment_id);
        alert("ORDER ID :: " + response.razorpay_order_id);
      },
      prefill: {
        name: "Anirudh Jwala",
        email: "anirudh@gmail.com",
        contact: "9999999999",
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.log(error);
  }
 
}
