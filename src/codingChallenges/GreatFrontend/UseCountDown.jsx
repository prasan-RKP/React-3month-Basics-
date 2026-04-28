import React from 'react'
import useCountDown from './hooks/useCountDown'

const UseCountDown = () => {

    const count = useCountDown(10, 1000);

    return (
        <div className='min-h-screen flex justify-center items-center bg-black'>
            <div className='flex justify-center items-center h-[50px] w-[150px] bg-red-600 p-5 rounded-lg'>
                <p className='text-3xl text-white'>{count}</p>
            </div>
        </div>
    )
}

export default UseCountDown
