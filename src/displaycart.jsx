import { useContext } from "react";
import { CartContext } from "./cart"; 
import PropTypes from 'prop-types';

export default function Displaycart({ showModal, toggle }) {
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);

    if (!showModal) return null; // Return null if showModal is false

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                {/* Modal content */}
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
                            <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                                Clear Cart
                            </button>
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
