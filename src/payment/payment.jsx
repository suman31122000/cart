import { useState,useEffect } from "react";
import axios from "axios";
const key = import.meta.env.RAZORPAY_KEY_ID;
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };
    
      const displayRazorpay = async (order,user) => {
    
        const isScriptLoaded = await loadRazorpayScript();
    
        if (!isScriptLoaded) {
          alert("Failed to load Razorpay SDK. Please check your internet connection.");
          return;
        }
    
        // Payment details
        const options = {
          key: key, // Replace with your Razorpay Test Key
          amount: order.amount, // Amount in paise (e.g., 50000 paise = ₹500)
          currency: "INR",
          name: `${user.name}`,
          description: "Purchase Description",
          order_id: order.id,
          image: "/your-logo.png", // Add your logo URL or path
          handler: (response) => {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            console.log(response);
          },
          prefill: {
            name: `${user.name}`, // Customer name
            email: `${user.email}`, // Customer email
            contact: `${user.phone}`, // Customer phone
          },
          theme: {
            color: "#3399cc", // Customize the theme color
          },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
          alert("Payment failed. Please try again.");
          console.error(response);
        });
    
        rzp.open();
      };

      export {displayRazorpay};