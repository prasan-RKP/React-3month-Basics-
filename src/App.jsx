import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [num, setNewNum] = useState(0)

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-6 bg-white p-8 rounded-xl shadow-lg">

          <button
            onClick={() => setNewNum((prev) => prev + 1)}
            className="px-8 cursor-pointer py-4 text-2xl font-bold rounded-lg bg-amber-400 hover:bg-amber-500 transition">
            +
          </button>

          <p className="text-4xl font-semibold">{num}</p>

          <button
            onClick={() => setNewNum((prev) => prev > 0 ? setNewNum(prev - 1) : 0)}
            className="px-8 py-4 cursor-pointer text-2xl font-bold rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
            -
          </button>

        </div>
      </div>
    </>
  )
}

export default App;
