import React, { useCallback, useMemo, useState } from 'react'

const items = [
        { name: "Apple", status: "done" },
        { name: "Avocado", status: "not-done" },
        { name: "Banana", status: "done" },
        { name: "Blueberry", status: "not-done" },
        { name: "Cherry", status: "done" },
    ];

const B_PreventRecalc = () => {

    const [count, setCount] = useState(0);
    const [query, setQuery] = useState('');

    const inc = useCallback(() => setCount(prev => prev + 1), [count]);

    const filterItems = useMemo(() => {
        console.log("Filtering running...");

        return items.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, items]);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="w-full max-w-md p-6 rounded-2xl bg-gray-900 shadow-lg space-y-4">

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-200">
                    Filter + Counter
                </h2>

                {/* Counter Button */}
                <button
                    onClick={inc}
                    className="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
                    Count: {count}
                </button>

                {/* Status Select */}
                <select className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600">
                    <option value="">Status</option>
                    <option value="done">Done</option>
                    <option value="not-done">Not Done</option>
                </select>

                {/* Search Input */}
                <input
                   onChange={(e)=> setQuery(e.target.value)}
                   value={query}
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />

                {/* List */}
                <ul className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                    {filterItems.map((item, index) => (
                        <li
                            key={index}
                            className="flex justify-between px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
                        >
                            <span>{item.name}</span>
                            <span className="text-sm text-gray-400">
                                {item.status}
                            </span>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default B_PreventRecalc;
