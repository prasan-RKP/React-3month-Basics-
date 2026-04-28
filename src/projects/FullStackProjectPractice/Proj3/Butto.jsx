import React, { useState } from 'react'
import ViewModal from './ViewModal';

const Butto = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='min-h-screen bg-black flex justify-center items-center'>
        <button onClick={()=> setIsOpen(true)} className='px-5 py-2 bg-gray-800 text-gray-300 rounded-md hover:cursor-pointer'>Open Modal</button>
        {isOpen && (
            <ViewModal isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
    </div>
  )
}

export default Butto
