import React, { useEffect } from 'react'
import Modal from './Modal.jsx';

const ViewModal = ({ isOpen, setIsOpen }) => {


    return (

        <>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
                <h2 className='mb-8 text-2xl'> ----- Form Values ----- </h2>
                <form className='flex flex-col gap-4 '>

                    <input type="text" placeholder='add title' className='bg-gray-300 h-[40px] rounded-md text-black pl-4' />
                    <input type="text" placeholder='add description' className='bg-gray-300 h-[40px] rounded-md text-black pl-4' />

                    <button className='py-3 mt-3 bg-blue-600 rounded-xl'>Submit</button>
                    <button onClick={() => setIsOpen(false)} className='py-3 mt-3 bg-red-600 rounded-xl'>Close</button>
                </form>
            </Modal>
        </>
    )
}

export default ViewModal;
