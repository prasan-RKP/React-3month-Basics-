import React from 'react'

const LeftSide = ({prod}) => {

    console.log()
    
    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 bg-gray-900">

                <img
                    className="w-full sm:w-40 h-40 object-cover rounded"
                    src={prod?.img}
                    alt=""
                />

                <div className="flex-1 flex flex-col justify-between">

                    <div>
                        <h2 className="text-lg font-semibold">{prod?.category}</h2>
                        <p className="text-gray-400 text-sm">
                           {prod?.desc}
                        </p>
                        <p className="mt-2 text-green-400 font-bold">₹ {prod?.price}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">

                        {/* Quantity */}
                        <div className="flex items-center gap-3">
                            <button className="px-3 py-1 bg-gray-700 rounded">-</button>
                            <span>{prod?.qty}</span>
                            <button className="px-3 py-1 bg-gray-700 rounded">+</button>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button className="px-4 py-1 bg-red-500 rounded">
                                Delete
                            </button>
                            <button className="px-4 py-1 bg-blue-500 rounded">
                                Save for later
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSide;
