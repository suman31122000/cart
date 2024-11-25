import { useState, useEffect, useContext } from "react";
import { CartContext } from "./cart";  
import Displaycart from "./displaycart";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profilebutton from "./utils/profilebutton";
import { useNavigate } from "react-router-dom";
import ItemPage from "./ItemPage";

export default function Products() {
  const navigate = useNavigate();
  const notify = () => toast("Item is added!");
  const [showModal, setShowModal] = useState(false);  
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

  const handleSort = (e) => {
    const sortedProducts = [...product];
    if (e.target.value === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setProduct(sortedProducts); 
  };

  const handlclick = (item) => {
    const selectedProduct = {
      thumbnail: item.thumbnail,
      title: item.title,
      price: item.price,
    };
    navigate('/item',{state:selectedProduct});
  }

  return (
    <div className="flex flex-col justify-center bg-gray-100">
      <div className="flex justify-between items-center mb-4 mt-6 ml-10 mr-10">
        <h1 className="font-bold text-2xl uppercase text-center">SHOP</h1>
        <div className="flex items-center space-x-4">
          <Profilebutton />
          <button 
            onClick={toggle} 
            className="flex justify-center items-center p-2.5 gap-4 bg-gray-100 outline outline-3 outline-gray-900 outline-offset-[-3px] rounded-md border-none cursor-pointer transition duration-400 hover:bg-gray-900 hover:text-gray-100"
          >
            Cart ({cartItems.length})
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <label htmlFor="sort" className="mr-2">Sort by Price:</label>
        <select id="sort" onChange={handleSort} className=" border rounded-md">
        <option value="lowToHigh">Default</option>
          <option value="lowToHigh">Low To High</option>
          <option value="highToLow">High To Low</option>
        </select>
      </div>
                    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-10 py-10">
        {product.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg px-10 py-10" onClick={()=>handlclick(item)}>
            <img src={item.thumbnail} alt={item.title} />
            <div className="flex flex-col" >
              <h1 className="flex justify-center text-lg uppercase font-bold">{item.title}</h1>
              <p className="flex justify-center mt-2 text-gray-600 text-sm">{item.description.slice(0, 40)}...</p>
              <p className="text-center">${item.price}</p>
            </div>
            <div className="flex justify-center">
              <button
               onClick={(event) => {
                event.stopPropagation();
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
      <ToastContainer
        position="top-center"
        autoClose={3000}     
        hideProgressBar={false}
        newestOnTop={true}
        closeButton={false}
        rtl={false}
      />
    </div>
  );
}
