import { BrowserRouter, Route,RouterProvider, Routes } from "react-router-dom";
import Displaycart from "./displaycart";
import Register from "./Register";
import Sign from "./sign";
import { CartProvider } from "./cart"
import Products from "./Products";
import PrivateRoute from "./protected/protected";
import ProfilePage from "./profile";

export default function Routing(){
    return(
        <>
        <CartProvider>
            <BrowserRouter>
        <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<Sign/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/profile" element={<PrivateRoute><ProfilePage/></PrivateRoute>}/>
        </Routes>
        </BrowserRouter>
        </CartProvider>
        </>
    )
}