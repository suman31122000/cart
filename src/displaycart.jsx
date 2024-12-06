import { useContext } from "react";
import { CartContext } from "./cart"; 
import PropTypes from 'prop-types';
import { useState,useEffect } from "react";
import axios from "axios";
import { displayRazorpay } from "./payment/payment";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Displaycart({ showModal, toggle }) {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
    if (!showModal) return null; 

    const amount=getCartTotal()*8000;
    const currency="INR";
    const receipt="order_" + new Date().getTime();
    const handleclick=async()=>{
      try {
        const response=await axios.post(`${apiUrl}/payment`,{amount,currency,receipt});
        if(!response){
          console.log("paymentresponse corrupted");
        }
        const orderid=response.data;
        console.log(orderid);

        displayRazorpay(orderid);
      } catch (error) {
        console.log(error,"payment corrupted in cart");        
      }

    }


    // const loadRazorpayScript = () => {
    //     return new Promise((resolve) => {
    //       const script = document.createElement("script");
    //       script.src = "https://checkout.razorpay.com/v1/checkout.js";
    //       script.onload = () => resolve(true);
    //       script.onerror = () => resolve(false);
    //       document.body.appendChild(script);
    //     });
    //   };
    
    //   const displayRazorpay = async () => {
    //     const isScriptLoaded = await loadRazorpayScript();
    
    //     if (!isScriptLoaded) {
    //       alert("Failed to load Razorpay SDK. Please check your internet connection.");
    //       return;
    //     }
    
    //     // Payment details
    //     const options = {
    //       key: "rzp_test_g1WoE26YoVmq5o", // Replace with your Razorpay Test Key
    //       amount: `${getCartTotal()*8000}`, // Amount in paise (e.g., 50000 paise = ₹500)
    //       currency: "INR",
    //       name: `${data.user}`,
    //       description: "Purchase Description",
    //       image: "/your-logo.png", // Add your logo URL or path
    //       handler: (response) => {
    //         alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
    //         console.log(response);
    //       },
    //       prefill: {
    //         name: `${data.user}`, // Customer name
    //         email: `${data.email}`, // Customer email
    //         contact: `${data.phonenumber}`, // Customer phone
    //       },
    //       theme: {
    //         color: "#3399cc", // Customize the theme color
    //       },
    //     };
    
    //     const rzp = new window.Razorpay(options);
    //     rzp.on("payment.failed", (response) => {
    //       alert("Payment failed. Please try again.");
    //       console.error(response);
    //     });
    
    //     rzp.open();
    //   };

  //     const [data, setData] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`/api/user`, {
  //         headers: {
  //           "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
  //         }
  //       });
  //       setData(response.data);  
  //     } catch (err) {
  //       throw err;
  //     }
  //   };

  //   fetchData();  
  // }, []);  

  // console.log(data);
  // const user = {
  //   name: `${data.user}`,
  //   image: `${data.profileimage}`,
  //   email: `${data.email}`,
  //   address: `${data.address}`,
  //   walletBalance: '$150.00',
  //   orderHistory: [
  //     { id: 1, item: 'Product A', price: '$50.00', date: '2024-11-01' },
  //     { id: 2, item: 'Product B', price: '$100.00', date: '2024-11-05' },
  //   ],
  // };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-8 rounded-md w-full max-w-md mx-auto relative">
                    <button onClick={toggle} className="absolute top-2 right-2 text-black text-lg font-bold">X</button>
                    <h1 className="font-bold text-2xl uppercase text-center">Cart</h1>
                    <div className="flex flex-col gap-4 mt-4">
                        {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                                <div className="flex justify-between items-center" key={item.id}>
                                    <div className="flex gap-4">
                                        <img src={item.thumbnail} alt={item.title} className="w-16 h-16" />
                                        <div>
                                            <h2>{item.title}</h2>
                                            <p>${item.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => removeFromCart(item)} className="bg-gray-300 px-2">-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => addToCart(item)} className="bg-gray-300 px-2">+</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h2 className="text-center text-gray-500">Your cart is empty</h2>
                        )}
                    </div>
                    {cartItems.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-bold">Total: ${getCartTotal()}</h3>
                            <div>
                            <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                                Clear Cart
                            </button>
                            <button onClick={handleclick} style={{ padding: "10px 20px", fontSize: "16px" } } className="bg-red-500 text-white px-4 py-2 rounded mt-2 absolute bottom-8 right-7">
        Pay Now
      </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

Displaycart.propTypes = {
    showModal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};
