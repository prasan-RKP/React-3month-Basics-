import React, { useEffect, useState } from "react";




const AddToCart = ({ setcartModal }) => {



  let [cartItems, setCartItems] = useState([]);


  const subtotal = cartItems.reduce((s, p) => s + p.total, 0);
  const shipping = 6.99;
  const discount = 15.0;
  const grandTotal = subtotal + shipping - discount;


  const onAddQuantity = (product) => {

    const updatedCart = cartItems.map((item) => {
      if (item.id === product.id) {
        return {
          ...item, qty: item.qty + 1, total: (item.qty + 1) * item.price
        };
      }
      return item;
    })

    setCartItems(updatedCart);
  }

  const onDecQuantity = (product) => {

    const updatedCart = cartItems.map((item) => {
      if (item.id === product.id && item.qty > 1) {
        return {
          ...item, qty: item.qty - 1, total: (item.qty - 1) * item.price
        };
      }
      return item;
    })
    setCartItems(updatedCart);
  }

  const onDeleteItem = (product) => {
    const updatedCart = cartItems.filter((item)=> item?.id !== product?.id);
    setCartItems(updatedCart);
  }

  useEffect(() => {
    let storedCartItems = JSON.parse(localStorage.getItem("CART")) || [];
    setCartItems(storedCartItems);
  }, [])

  useEffect(() => {
    localStorage.setItem("CART", JSON.stringify(cartItems));
  }, [cartItems])


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4">

      {/* Modal */}
      <div className="bg-black border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl shadow-blue-950/50 flex flex-col max-h-[90vh]">

        {/* ── Header (fixed) ── */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-white/10 bg-gradient-to-r from-blue-600/20 via-blue-900/10 to-transparent shrink-0 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-lg">
              🛒
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-none">
                Your <span className="text-blue-400">Cart</span>
              </h2>
              <p className="text-white/30 text-xs mt-0.5">{cartItems.length} items added</p>
            </div>
          </div>
          <button onClick={() => setcartModal(false)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-red-500 text-white/40 hover:text-white transition-all text-xl leading-none cursor-pointer">
            ×
          </button>
        </div>

        {/* ── Scrollable Product List ── */}
        <div
          className="overflow-y-auto flex-1 divide-y divide-white/[0.06]"
          style={{ scrollbarWidth: "thin", scrollbarColor: "#3b82f6 transparent" }}
        >
          {cartItems.map((p) => (
            <div key={p.id} className="flex gap-4 px-7 py-5 hover:bg-white/[0.02] transition-colors">

              {/* Image */}
              <div className="relative shrink-0">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-20 h-20 rounded-2xl object-cover border border-white/10"
                />
                <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-blue-500/40">
                  {p.qty}
                </span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                {/* Name + stock */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-white font-semibold text-sm leading-snug">{p.name}</p>
                    <p className="text-white/35 text-xs mt-0.5">{p.variant}</p>
                    <p className="text-white/20 text-[10px] mt-0.5 font-mono">SKU: {p.sku}</p>
                  </div>

                </div>

                {/* Price · Qty · Total inline row */}
                <div className="flex items-center gap-3 mt-3">

                  {/* Price */}
                  <div className="flex flex-col">
                    <span className="text-white/25 text-[10px] uppercase tracking-wider">Price</span>
                    <span className="text-white/70 text-sm font-medium">₹{p.price.toFixed(2)}</span>
                  </div>

                  <span className="text-white/10 text-lg">·</span>

                  {/* Qty stepper */}
                  <div className="flex flex-col">
                    <span className="text-white/25 text-[10px] uppercase tracking-wider">Qty</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <button
                        onClick={() => onDecQuantity(p)}
                        className="w-5 h-5 rounded-md bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 text-white/40 hover:text-blue-400 text-xs flex items-center justify-center transition-all">
                        −
                      </button>
                      <span className="text-white text-sm font-semibold w-4 text-center">{p.qty}</span>
                      <button
                        onClick={() => onAddQuantity(p)}
                        className="w-5 h-5 rounded-md bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/30 text-white/40 hover:text-blue-400 text-xs flex items-center justify-center transition-all">
                        +
                      </button>
                    </div>
                  </div>

                  <span className="text-white/10 text-lg">·</span>

                  {/* Total */}
                  <div className="flex flex-col">
                    <span className="text-white/25 text-[10px] uppercase tracking-wider">Total</span>
                    <span className="text-blue-300 text-sm font-bold">₹{p.total.toFixed(2)}</span>
                  </div>

                  {/* Remove */}
                  <button
                  onClick={()=> onDeleteItem(p)}
                   className="ml-auto text-white/30 hover:text-red-400 text-lg leading-none transition-colors">
                    ×
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ── Order Total Summary (fixed bottom) ── */}
        <div className="shrink-0 border-t border-white/10 px-7 py-5 space-y-3 bg-black rounded-b-3xl">

          {/* Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-white/40">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="text-white/70">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/40">
              <span>Shipping</span>
              <span className="text-white/70">₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-blue-400">
              <span className="flex items-center gap-2">
                <span className="text-[10px] bg-blue-500/10 border border-blue-500/25 px-1.5 py-0.5 rounded font-mono">SPRING15</span>
                Discount
              </span>
              <span>−₹{discount.toFixed(2)}</span>
            </div>
          </div>

          {/* Grand total */}
          <div className="flex justify-between items-center pt-2 border-t border-white/[0.08]">
            <span className="text-white font-semibold text-sm">Grand Total</span>
            <span className="text-white font-bold text-2xl">₹{grandTotal.toFixed(2)}</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button className="flex-1 bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-bold py-3 rounded-xl text-sm tracking-wide transition-all duration-200 shadow-lg shadow-blue-500/25">
              Checkout →
            </button>
            <button onClick={()=> setcartModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white font-medium py-3 rounded-xl text-sm transition-all duration-200">
              Keep Shopping
            </button>
          </div>

          {/* Trust */}
          <div className="flex justify-center gap-6 text-white/20 text-[11px] pt-1">
            <span>🔒 Secure</span>
            <span>↩ Free Returns</span>
            <span>🚚 Fast Ship</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddToCart;