
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
    
      const displayRazorpay = async (order) => {
        const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/`, {
          headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
          }
        });
        setData(response.data);  
      } catch (err) {
        throw err;
      }
    };

    fetchData();  
  }, []); 
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
          name: `${data.user}`,
          description: "Purchase Description",
          order_id: order.id,
          image: "/your-logo.png", // Add your logo URL or path
          handler: (response) => {
            alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            console.log(response);
          },
          prefill: {
            name: `${data.user}`, // Customer name
            email: `${data.email}`, // Customer email
            contact: `${data.phonenumber}`, // Customer phone
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