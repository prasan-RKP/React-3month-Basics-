import React, { useMemo, useState } from 'react'

const LiveSearchAPI = ({ results = [] }) => {

    const items = [
        'Apple', 'Avocado', 'Banana', 'Blueberry', 'Cherry',
        'Coconut', 'Dragonfruit', 'Elderberry', 'Fig', 'Grape',
        'Guava', 'Kiwi', 'Lemon', 'Lime', 'Lychee',
        'Mango', 'Melon', 'Orange', 'Papaya', 'Peach',
        'Pear', 'Pineapple', 'Plum', 'Pomegranate', 'Raspberry',
        'Strawberry', 'Tangerine', 'Watermelon',
    ]

    let [showDropdown, setShowDropdown] = useState(false);
    let [query, setQuery] = useState('');
    let [input, setInput] = useState('');


    const debounceFn = (fn, wait) => {
        let timeId;
        return (...args) => {
            clearTimeout(timeId);
            timeId = setTimeout(() => fn(...args), wait);
        }
    }

    const onChangeInput = (e) => {
        let val = e.target.value;
        setInput(val);
        debouncedAPI(val);
    }


    const debouncedAPI = useMemo(() => debounceFn((val) => setQuery(val), 700), []);


    console.log("Input val ->",input, query ? `Query val -> ${query}` : 'No Query Value');



    return (
        <div
            className="min-h-screen flex flex-col items-center px-4"
            style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0f0f0f 100%)' }}
        >
            {/* Title */}
            <div className="mb-10 mt-8 text-center">
                <h1
                    className="text-5xl font-black tracking-tight text-white mb-2"
                    style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.03em' }}
                >
                    Search
                </h1>
                <p className="text-zinc-500 text-sm tracking-widest uppercase">
                    Find anything, instantly
                </p>
            </div>

            {/* Search Container */}
            <div className="w-full max-w-md relative">
                {/* Input */}
                <div
                    className={`relative flex items-center transition-all duration-300 ${showDropdown ? 'rounded-t-2xl' : 'rounded-2xl'
                        }`}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1.5px solid rgba(255,255,255,0.1)',
                    }}
                >
                    {/* Search Icon */}
                    <svg
                        className="absolute left-4 w-5 h-5 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
                    </svg>

                    <input
                        type="text"
                        value={input}
                        onChange={onChangeInput}
                        placeholder="Type to search..."
                        className="w-full bg-transparent text-white placeholder-zinc-500 text-base py-4 pl-12 pr-10 outline-none"
                        style={{ fontFamily: "'Georgia', serif" }}
                    />

                    {/* Clear Button */}
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            className="absolute right-4 text-zinc-500 hover:text-white"
                        >
                            ✕
                        </button>
                    )}
                </div>

                {/* Dropdown */}
                {showDropdown && (
                    <div
                        className="absolute w-full rounded-b-2xl overflow-hidden z-10"
                        style={{
                            background: 'rgba(18,18,28,0.98)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderTop: 'none',
                        }}
                    >
                        {results.length > 0 ? (
                            <ul className="max-h-64 overflow-y-auto">
                                {results.map((item, i) => (
                                    <li
                                        key={i}
                                        className="px-4 py-3 cursor-pointer text-zinc-300 hover:text-white hover:bg-white/5"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="py-6 text-center text-zinc-500">
                                No results
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default LiveSearchAPI