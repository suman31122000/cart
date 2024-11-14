import { Route,RouterProvider, Routes } from "react-router-dom";
import Displaycart from "./displaycart";
import Register from "./Register";
import Sign from "./sign";
import { CartProvider } from "./cart"

export default function Routing(){
    return(
        <>
        <CartProvider>
        <Routes>
            <Route path="/" element={<Register/>}/>
            <Route path="/sign" element={<Sign/>}/>
            <Route path="/product" element={<Displaycart/>}/>
        </Routes>
        </CartProvider>
        </>
    )
}