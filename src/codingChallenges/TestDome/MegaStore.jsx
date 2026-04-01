import React, { useRef, useState } from 'react'
import { toast } from "sonner";



function throttle (fn, delay) {
    let lastTime = 0;

    return function(...args) {
        let now = Date.now();
        if(now - lastTime >= delay){
            fn.apply(this, args);
            lastTime = now;
        }
    }
}


const MegaStore = () => {

    /*
     // ---------- Question Info ------

     1) dis type -> standard,  weight -> any,  discount -> 6%
     2) dis type -> seasonal,  weight -> any,  discount -> 12%
     3) dis type -> weight,  weight <= 10,  discount -> 6%
      3) dis type -> weight,  weight > 10,  discount -> 18%

      Ex -> dis type -> weight, weight = 12, price = 100
      Ans -> discounted price is -> 82
        let discountPrice = 18/100 * price -> 
        let orgDisPrice = price - disountPrice
        
    */

    const [discountType, setDiscountType] = useState("standard");
    const [weight, setWeight] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const throttleRef = useRef(null);

    //let val = 18/100 * 123;


    const calDiscount = (e) => {
        console.log('called');
        e.preventDefault();

        let myDiscountPrice = 0;
        if (weight === 0 && totalPrice === 0) {
            toast.error('Please add your groceries !!');
            return;
        }

        if (discountType === "standard") {
            let discount = 0.06 * totalPrice;
            let disPrice = totalPrice - discount;
            myDiscountPrice = disPrice;
        }

        if (discountType === "seasonal") {
            let discount = 0.12 * totalPrice;
            let disPrice = totalPrice - discount;
            myDiscountPrice = disPrice;
        }

        if (discountType === "weight") {
            if (weight <= 10) {
                let discount = 0.06 * totalPrice;
                let disPrice = totalPrice - discount;
                myDiscountPrice = disPrice;
            }

            if (weight > 10) {
                let discount = 0.18 * totalPrice;
                let disPrice = totalPrice - discount;
                myDiscountPrice = disPrice;
            }

        }
        console.log("dis", myDiscountPrice);
        setDiscountedPrice(myDiscountPrice);
    }

    if(!throttleRef.current){
        throttleRef.current = throttle(calDiscount, 1200);
    }



    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="bg-gray-900 text-gray-200 p-8 rounded-2xl shadow-lg w-full max-w-md">

                <h2 className="text-xl font-semibold mb-6 text-center text-white">
                    Price Calculator
                </h2>

                <form onSubmit={(e)=> throttleRef.current(e)}>
                    <div className="flex flex-col gap-4">


                        <div>
                            <label htmlFor="type" className="block mb-1 text-sm text-gray-400">
                                Select Type:
                            </label>
                            <select
                                onChange={(e) => setDiscountType(e.target.value)}
                                id="type"
                                name="type"
                                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            >
                                <option value="standard">Standard</option>
                                <option value="seasonal">Seasonal</option>
                                <option value="weight">Weight</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="weight" className="block mb-1 text-sm text-gray-400">
                                Weight (kg):
                            </label>
                            <input
                                onChange={(e) => setWeight(e.target.value)}
                                type="number"
                                id="weight"
                                name="weight"
                                step="0"
                                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                        </div>

                        <div>
                            <label htmlFor="totalPrice" className="block mb-1 text-sm text-gray-400">
                                Total Price ($):
                            </label>
                            <input
                                onChange={(e) => setTotalPrice(e.target.value)}
                                type="number"
                                id="totalPrice"
                                name="totalPrice"
                                step="0"
                                className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            />
                        </div>

                        <button className="mt-4 bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-300 hover:cursor-pointer transition">
                            Calculate
                        </button>




                        {/*  */}

                        <div className="mt-4 text-center text-lg">
                            Discounted Price:{" -> "}
                            <span id="discountedPrice" className="text-white font-semibold">
                                {discountedPrice}
                            </span>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    )
}

export default MegaStore
