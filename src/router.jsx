import { BrowserRouter, Route,RouterProvider, Routes } from "react-router-dom";
import Displaycart from "./displaycart";
import Register from "./Register";
import Sign from "./sign";
import { CartProvider } from "./cart"
import Products from "./Products";
import Register1 from "./Register1";

export default function Routing(){
    return(
        <>
        <CartProvider>
            <BrowserRouter>
        <Routes>
            <Route path="/" element={<Register1/>}/>
            <Route path="/sign" element={<Sign/>}/>
            <Route path="/product" element={<Products/>}/>
        </Routes>
        </BrowserRouter>
        </CartProvider>
        </>
    )
}