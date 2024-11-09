import Products from "./Products"
import { CartProvider } from "./cart"
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
export default function App(){
  return(
    <>
    <ToastContainer/>
    <CartProvider>
    <Products/>
    {/* <Displaycart/> */}
    </CartProvider>
    </>
  )
}