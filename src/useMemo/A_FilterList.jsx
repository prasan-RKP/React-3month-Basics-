import React, { useMemo, useState } from "react";

const A_FilterList = () => {
    const items = [
        { name: "Apple", status: 'done' },
        { name: "Avocado", status: 'not-done' },
        { name: "Banana", status: 'done'},
        { name: "Blueberry", status: 'not-done'},
        { name: "Cherry", status: 'done' },
        { name: "Coconut", status: 'not-done' },
        { name: "Dragonfruit", status: 'done' },
    ];
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState("status");


    let searchItem = query.trim().toLowerCase();
    const filterItems = useMemo(() => {
        if(searchItem) {
            return items?.filter((item)=> item.name?.toLowerCase().includes(searchItem));
        }

        if(status !== 'status'){
            return items.filter((item) => item.status === status?.trim().toLowerCase());
        }

        return items;
    }, [query, items, status]);

    console.log('component-rendered');

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="w-full max-w-md p-6 rounded-2xl bg-gray-900 shadow-lg">

                {/* Title */}
                <h2 className="text-xl font-semibold mb-4 text-gray-200">
                    Search Fruits
                </h2>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600 mb-4"
                >
                    <option value="status">
                        Status
                    </option>
                    <option value="done">Done</option>
                    <option value="not-done">Not Done</option>
                </select>

                {/* Input */}
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />


                {/* Static List */}
                <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                    {filterItems.map((item, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition cursor-pointer"
                        >
                            {item?.name}
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default A_FilterList;