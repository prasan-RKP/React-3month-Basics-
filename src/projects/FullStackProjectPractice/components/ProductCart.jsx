import React, { useEffect, useState } from "react";
import LeftSide from "./LeftSide";

const PLATFORM_FEE = 3;
const  shipping = 20;
  
const ProductCart = () => {
  

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(()=> {
       let stores = JSON.parse(localStorage.getItem('ADD_CART')) || [];
       setCartProducts(stores);
  }, [])

  let total = cartProducts.reduce((acc, curr) => {
  return acc + curr.price;
}, 0);

let subTotal = total + shipping + PLATFORM_FEE

  return (
    <div className="bg-black text-white min-h-screen p-4">
      
      {/* Container */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* LEFT - Cart Items */}
        <div className="flex-1 space-y-4">
          
          {/* Cart Item */}
          {cartProducts.length === 0 && (
            <div className="w-full h-[200px] max-w-sm border rounded shadow-lg bg-blue-500 text-white p-4 flex flex-col justify-center items-center">
                            <p className="font-bold text-lg">No Products Found ❌</p>
                            <p className="text-sm text-red-200 mt-2">Try again..</p>
                        </div>
          )}

          {cartProducts.map((prod, idx) => 
             <LeftSide  key={idx} prod={prod}/>
          )}
          
          

          {/* You can map multiple items here */}
          
        </div>

        {/* RIGHT - Summary */}
        <div className="w-full lg:w-[300px] border rounded-lg p-4 bg-gray-900 h-fit">
          
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹{PLATFORM_FEE}</span>
            </div>
          </div>

          <hr className="my-4 border-gray-700" />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{subTotal.toFixed(2)}</span>
          </div>

          <button className="w-full mt-4 bg-green-500 py-2 rounded font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;