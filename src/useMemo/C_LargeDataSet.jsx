import React, { useMemo, useState } from "react";

const randomWords = ["Apple", "Mango", "Banana", "Zebra", "Orange", "Kiwi"];

const items = Array.from({ length: 1200 }, (_, i) => ({
    id: i + 1,
    name: randomWords[i % randomWords.length] + " " + (i + 1),
    status: i % 2 === 0 ? "done" : "not-done",
}));

const C_LargeDataSet = () => {

    // 🔹 State (you will use these)
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("status");
    const [sortOrder, setSortOrder] = useState("default");

    // Way - 1
    // ❌useMemo() -----  Testing filter logic  + sorting without useMemo() -----
    /*
        let filteredItems = items;
    
        if (query) {
            filteredItems = filteredItems.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
        }
    
        if (status !== 'status') {
            filteredItems = filteredItems.filter(
                (item) => item.status === status
            );
        }
    
        if (sortOrder !== "default") {
            if (sortOrder === "asc") {
                filteredItems = [...filteredItems].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            }
    
            if (sortOrder === "desc") {
                filteredItems = [...filteredItems].sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
            }
        }
    
        */
    // 🚀 -> conclusion the UI performance becomes slows down with too much code(🧩 less optimization)


    

    //  // ✅useMemo() -----  Testing filter logic  + sorting without useMemo() -----

    // way- 2

    let filteredItems = useMemo(() => {
        let result = items;
        if (query) {
            result = result.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        if (status !== 'status') {
            result = result.filter(
                (item) => item.status === status
            );
        }

        if (sortOrder !== "default") {
            if (sortOrder === "asc") {
                result = [...items].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
            }

            if (sortOrder === "desc") {
                result = [...items].sort((a, b) =>
                    b.name.localeCompare(a.name)
                );
            }
        }

        return result;
    }, [items, sortOrder, query, status]);







    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="w-full max-w-2xl p-6 rounded-2xl bg-gray-900 shadow-lg space-y-4">

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-200">
                    Filter + Sort (1000+ Items)
                </h2>

                {/* Controls */}
                <div className="flex gap-3 flex-wrap">

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg bg-black border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />

                    {/* Status Filter */}
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                    >
                        <option value="status">Status</option>
                        <option value="done">Done</option>
                        <option value="not-done">Not Done</option>
                    </select>

                    {/* Sort */}
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-2 bg-black border border-gray-700 rounded-lg text-white"
                    >
                        <option value="default">Sort</option>
                        <option value="asc">A → Z</option>
                        <option value="desc">Z → A</option>
                    </select>
                </div>

                {/* List */}
                <ul className="mt-4 space-y-2 max-h-[400px] overflow-y-auto">
                    {filteredItems.map((item) => (
                        <li
                            key={item.id}
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

export default C_LargeDataSet;