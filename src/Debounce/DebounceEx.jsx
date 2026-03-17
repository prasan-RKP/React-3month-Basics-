import React, { useMemo } from 'react'

const DebounceEx = () => {


    const myDebounceFunc = (func, wait) => {
        let timeId;
        return (e) => {
            clearTimeout(timeId);
            timeId = setTimeout(() => func(e), wait);
        }
    };


    const onChangeInput = (e) => {
        console.log(e.target.value);
    }

    let debouncedFunc = useMemo(() => myDebounceFunc(onChangeInput, 1000), []);
    // Every-Time the component re-render it call again.

    return (
        <div className="bg-black min-h-screen flex flex-col items-center  p-6">
            <h1 className="text-center text-gray-50 mb-6 text-3xl font-bold tracking-wide">
                Debounce Concept (PT-1)
            </h1>

            <input
                onChange={debouncedFunc}
                type="text"
                placeholder="Add text..."
                className="w-80 px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            />
        </div>

    )
}

export default DebounceEx;
