import React, { useEffect, useState } from 'react';

const DigitalClock = () => {
  const [timer, setTimer] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, [timer]);

  const hour = timer.getHours();
  const minutes = String(timer.getMinutes()).padStart(2, "0");
  const seconds = String(timer.getSeconds()).padStart(2, "0");

  return (
    <div className='min-h-screen flex justify-center items-center bg-black'>
      <div className='flex justify-center items-center h-12.5 w-37.5 bg-red-600 p-5 rounded-lg'>
        <p className='text-3xl text-white'>{hour}:{minutes}:{seconds}</p>
      </div>
    </div>
  );
};

export default DigitalClock;
