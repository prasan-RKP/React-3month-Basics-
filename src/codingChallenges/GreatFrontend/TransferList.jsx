import React, { useState } from 'react';

const TransferList = () => {
    const [selected, setSelected] = useState([]);
    
    const [left, setLeft] = useState(["HTML", "JavaScript", "CSS", "TypeScript"]);
    const [right, setRight] = useState(["React", "Angular", "Vue", "Svelte"]);

    const selectedInLeft = selected.filter((item) => left.includes(item));
    const selectedInRight = selected.filter((item) => right.includes(item));

    const disableLeft = selectedInRight.length === 0;
    const disableRight = selectedInLeft.length === 0;

    // CHANGED: Added disabled states for << and >> (move-all) buttons.
    // Previously they had no guard — clicking << when right was empty caused no-op but showed no feedback.
    const disableAllLeft = right.length === 0;
    const disableAllRight = left.length === 0;

    const handleChange = (item) => {
        setSelected((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item]
        );
    };

    // CHANGED: doubleLeft / doubleRight now operate on flat arrays instead of nested objects.
    const doubleLeft = () => {
        setLeft((prev) => [...prev, ...right]);
        setRight([]);
        setSelected([]);
    };

    const doubleRight = () => {
        setRight((prev) => [...prev, ...left]);
        setLeft([]);
        setSelected([]);
    };

    const onLeft = () => {
        setLeft((prev) => [...prev, ...selectedInRight]);
        setRight((prev) => prev.filter((item) => !selectedInRight.includes(item)));
        setSelected((prev) => prev.filter((item) => !selectedInRight.includes(item)));
    };

    const onRight = () => {
        setRight((prev) => [...prev, ...selectedInLeft]);
        setLeft((prev) => prev.filter((item) => !selectedInLeft.includes(item)));
        setSelected((prev) => prev.filter((item) => !selectedInLeft.includes(item)));
    };

    return (
        // CHANGED: Added justify-center and items-start to properly center the layout.
        // Previously w-[65%] with no centering left the component left-aligned.
        <div className="min-h-screen bg-black text-white p-4 flex justify-center items-start">
            <div className="flex items-center gap-4 justify-center">

                {/* Left list — CHANGED: removed Object.entries wrapper, now maps flat array directly */}
                <div className="border-2 w-[250px] min-h-[160px] p-2">
                    <p className="text-xs text-gray-400 mb-2">Languages</p>
                    {left.map((item) => (
                        <label key={item} className="block cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selected.includes(item)}
                                onChange={() => handleChange(item)}
                                className="mr-2"
                            />
                            {item}
                        </label>
                    ))}
                </div>

                {/* Buttons — CHANGED: all four buttons now have consistent sizing (w-9 h-8).
                    Previously << and >> had no px-2 padding, making them narrower than < and >. */}
                <div className="flex flex-col gap-2.5">
                    {/* CHANGED: disabled prop + visual style added to << button */}
                    <button
                        onClick={doubleLeft}
                        disabled={disableAllLeft}
                        className={`w-9 h-8 flex items-center justify-center text-black font-bold
                            ${disableAllLeft ? "bg-gray-500 cursor-not-allowed" : "bg-gray-300"}`}
                    >
                        {"<<"}
                    </button>

                    <button
                        onClick={onLeft}
                        disabled={disableLeft}
                        className={`w-9 h-8 flex items-center justify-center text-black font-bold
                            ${disableLeft ? "bg-gray-500 cursor-not-allowed" : "bg-gray-300"}`}
                    >
                        {"<"}
                    </button>

                    <button
                        onClick={onRight}
                        disabled={disableRight}
                        className={`w-9 h-8 flex items-center justify-center text-black font-bold
                            ${disableRight ? "bg-gray-500 cursor-not-allowed" : "bg-gray-300"}`}
                    >
                        {">"}
                    </button>

                    {/* CHANGED: disabled prop + visual style added to >> button */}
                    <button
                        onClick={doubleRight}
                        disabled={disableAllRight}
                        className={`w-9 h-8 flex items-center justify-center text-black font-bold
                            ${disableAllRight ? "bg-gray-500 cursor-not-allowed" : "bg-gray-300"}`}
                    >
                        {">>"}
                    </button>
                </div>

                {/* Right list — CHANGED: removed Object.entries wrapper, now maps flat array directly */}
                <div className="border-2 w-[250px] min-h-[160px] p-2">
                    <p className="text-xs text-gray-400 mb-2">Frameworks</p>
                    {right.map((item) => (
                        <label key={item} className="block cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selected.includes(item)}
                                onChange={() => handleChange(item)}
                                className="mr-2"
                            />
                            {item}
                        </label>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TransferList;