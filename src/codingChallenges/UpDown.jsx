import { useState } from "react";

export default function UpDown() {
    const [items, setItems] = useState([
        { id: 1, label: "Design System Foundations", btnVal: "down" },
        { id: 2, label: "Component Architecture", btnVal: "upDown" },
        { id: 3, label: "Deployment Pipeline", btnVal: "up" },
    ]);

    const handleMove = (direction, item) => {
        // solution here

        const newItems = [...items];

        /*

        if (direction === "down") {
            let firstIndex = newItems.findIndex(it => it.id === item.id);
            let secondIndex = firstIndex + 1;
            [newItems[firstIndex].label, newItems[secondIndex].label] = [newItems[secondIndex].label, newItems[firstIndex].label];
        }

        if (direction === "up") {
            let firstIndex = newItems.findIndex(it => it.id === item.id);
            let secondIndex = firstIndex - 1;
            [newItems[firstIndex].label, newItems[secondIndex].label] = [newItems[secondIndex].label, newItems[firstIndex].label];
        }

        */

        if (direction === "down") {
            let firstItem = items.find(it => it.id === item.id);
            let secondItem = items.find(it => it.id === Number(item.id) + 1);

            [firstItem.label, secondItem.label] = [secondItem.label, firstItem.label];
        }

        if (direction === "up") {
            let firstItem = items.find(it => it.id === item.id);
            let secondItem = items.find(it => it.id === Number(item.id) - 1);

            [firstItem.label, secondItem.label] = [secondItem.label, firstItem.label];
        }



        setItems(newItems); // tell React to re-render        

    };

    //console.log(items)

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center font-mono">
            <div className="w-full max-w-md px-6">

                {/* Header */}
                <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-6 pl-1">
                    Priority Queue
                </p>

                {/* List */}
                <div className="flex flex-col gap-[2px]">
                    {items.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between px-5 py-4 bg-zinc-900 border transition-all duration-200
                ${item.btnVal === "upDown"
                                    ? "border-amber-500/40 hover:border-amber-500"
                                    : "border-zinc-800 hover:border-zinc-600"
                                }`}
                        >
                            {/* Label */}
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] text-zinc-600 w-4 select-none">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className={`text-sm tracking-wide ${item.btnVal === "upDown" ? "text-zinc-100 font-medium" : "text-zinc-200"}`}>
                                    {item.label}
                                </span>
                            </div>

                            {/* Buttons driven by btnVal */}
                            <div className="flex flex-col gap-[3px]">
                                {(item.btnVal === "up" || item.btnVal === "upDown") && (
                                    <button
                                        onClick={() => handleMove("up", item)}
                                        className="w-7 h-7 flex items-center justify-center rounded bg-zinc-800 hover:bg-amber-500 transition-all duration-150 active:scale-95 text-sm leading-none"
                                    >
                                        ⬆️
                                    </button>
                                )}
                                {(item.btnVal === "down" || item.btnVal === "upDown") && (
                                    <button
                                        onClick={() => handleMove("down", item)}
                                        className="w-7 h-7 flex items-center justify-center rounded bg-zinc-800 hover:bg-amber-500 transition-all duration-150 active:scale-95 text-sm leading-none"
                                    >
                                        ⬇️
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer hint */}
                <p className="text-[10px] text-zinc-700 mt-5 pl-1 tracking-widest uppercase">
                    {items.length} items · drag to reorder
                </p>
            </div>
        </div>
    );
}