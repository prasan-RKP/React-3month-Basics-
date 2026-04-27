import React, { useEffect, useState } from 'react'

const TrafficLight = () => {

  const [light, setLight] = useState('green');

  useEffect(() => {
    let timer;
    if (light === "green") {
      timer = setTimeout(() => setLight("yellow"), 4000);
    }

    if (light === "yellow") {
      timer = setTimeout(() => setLight("red"), 3000);
    }

    if (light === "red") {
      timer = setTimeout(() => setLight("green"), 1500);
    }

    return () => {
      clearInterval(timer);
    }
  }, [light])

  return (
    <div className='min-h-screen bg-black flex justify-center items-center'>
      <div className='bg-gray-900 h-[180px] w-[70px] rounded-xl flex items-center justify-center flex-col gap-4'>
        <div className={`${light === "red" ? "bg-red-500": "bg-gray-400"} w-10 h-10 rounded-full `}></div>
        <div className={`${light === "yellow" ? "bg-yellow-500": "bg-gray-400"} w-10 h-10 rounded-full `}></div>
        <div className={`${light === "green" ? "bg-green-500": "bg-gray-400"} w-10 h-10 rounded-full `}></div>
      </div>
    </div>
  )
}

export default TrafficLight;
