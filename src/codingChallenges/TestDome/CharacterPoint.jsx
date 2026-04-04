import React, { useState } from 'react'

const CharacterPoint = () => {

    const [points, setPoints] = useState(5);
    const [strength, setStrength] = useState(0);
    const [speed, setSpeed] = useState(0);

    return (
        <div>
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">

                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Character Stats</p>
                    <p className="text-3xl font-medium text-white mb-6">
                        {points}
                        <span className="text-sm text-gray-500 ml-2">points remaining</span>
                    </p>

                    <hr className="border-gray-800 mb-6" />

                    {/* Strength */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-gray-400 text-sm w-16">Strength</span>
                        <button
                          onClick={()=> {
                            setStrength(prev => prev - 1)
                            setPoints(prev => prev + 1)
                          }}
                         className="w-8 h-8 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition text-lg flex items-center justify-center">
                            -
                        </button>
                        <input 
                            step="1"
                            type="number"
                            value={strength}
                            style={{ width: "50px", textAlign: "center" }}
                            className="bg-gray-800 border border-gray-700 text-white rounded-lg py-1 text-sm focus:outline-none"
                            readOnly
                        />
                        <button
                          onClick={()=> {
                            setStrength(prev => prev + 1)
                            setPoints(prev => prev - 1)
                          }}
                         className="w-8 h-8 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition text-lg flex items-center justify-center">
                            +
                        </button>
                    </div>

                    {/* Speed */}
                    <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-sm w-16">Speed</span>
                        <button
                        onClick={()=> {
                            setSpeed(prev => prev - 1)
                            setPoints(prev => prev + 1)
                        }}
                         className="w-8 h-8 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition text-lg flex items-center justify-center">
                            -
                        </button>
                        <input
                            type="number"
                            value={speed}
                            style={{ width: "50px", textAlign: "center" }}
                            className="bg-gray-800 border border-gray-700 text-white rounded-lg py-1 text-sm focus:outline-none"
                            readOnly
                        />
                        <button
                        onClick={()=> {
                            setSpeed(prev => prev + 1)
                            setStrength(prev => prev - 1)
                        }}
                         className="w-8 h-8 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition text-lg flex items-center justify-center">
                            +
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CharacterPoint;
