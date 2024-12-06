import Products from "./Products"
import { CartProvider } from "./cart"
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Register from "./Register"
import Sign from "./sign";
import Routing from "./router";
export default function App(){
  return(
    <>
    <ToastContainer/>
    <CartProvider>
    <Routing/>
    </CartProvider>
    </>
  )
}