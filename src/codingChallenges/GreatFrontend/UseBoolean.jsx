import React from 'react'
import useBoolean from './hooks/useBoolean.js'


const UseBoolean = () => {
    const {value, setFalse, setTrue} = useBoolean(false);
    return (
        <div>
            <p>{value ? 'enabled' : 'disabled'}</p>
            <button className='bg-red-300 mr-4' onClick={setTrue}>Enable</button>
            <button className='bg-red-300' onClick={setFalse}>Disable</button>
        </div>
    )
}

export default UseBoolean;
