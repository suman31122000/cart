import { useState, useEffect, useContext } from "react";
import { CartContext } from "./cart";  
import Displaycart from "./displaycart";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Products() {
  const notify=()=> toast("item is added!");
  const [showModal, setShowModal] = useState(false);  // Fixed typo here
  const toggle = () => {
    setShowModal(!showModal);
  };

  const [product, setProduct] = useState([]);
  const { cartItems, addToCart } = useContext(CartContext);  

  async function getdata() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    setProduct(data.products);
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="flex flex-col justify-center bg-gray-100">
     <div className="flex justify-center relative items-center mb-4 mt-6">
                        <h1 className="font-bold text-2xl uppercase text-center">SHOP</h1>
                        <button 
                            onClick={toggle} 
                            className="absolute right-0 text-white text-lg  mr-5 bg-gray-700 h-8 w-16 rounded"
                        >
                            Cart ({cartItems.length})
                        </button>
                    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-10 py-10">
        {product.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg px-10 py-10">
            <img src={item.thumbnail} alt={item.title} />
            <div className="flex flex-col">
              <h1 className="flex justify-center text-lg uppercase font-bold">{item.title}</h1>
              <p className="flex justify-center mt-2 text-gray-600 text-sm">{item.description.slice(0, 40)}...</p>
              <p className="text-center">${item.price}</p>
            </div>
            <div className="flex justify-center">
              <button
               onClick={() => {
                addToCart(item);
                notify();
            }}
                className="hover:bg-blue-600 h-8 w-32 rounded-md bg-gray-950 text-cyan-50"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <Displaycart showModal={showModal} toggle={toggle} />
    </div>
  );
}
