import { useRef, useState } from "react";

const tabsData = [
    { id: "tab-1", label: "HTML", content: "HTML Content" },
    { id: "tab-2", label: "CSS", content: "CSS Content" },
    { id: "tab-3", label: "JS", content: "JavaScript Content" },
];


export default function Plum() {
    const [activeIndex, setActiveIndex] = useState(0);
    const tabRefs = useRef([]);


    const handleKeyDown = (e, idx) => {
        let newIdx = idx;
        if (e.key === 'ArrowRight') {
            newIdx = (idx + 1) % tabsData.length;
        }

        if(e.key === 'ArrowLeft'){
            newIdx = (idx - 1 + tabsData.length) % tabsData.length;
        }

        if (newIdx !== idx) {
            e.preventDefault();
            setActiveIndex(newIdx);
            tabRefs.current[newIdx]?.focus();
        }

    }

    console.log(activeIndex);
    return (
        <div className="w-full max-w-md mx-auto mt-10">

            {/* Tabs */}
            <div className="flex gap-2 border-b">
                {tabsData.map((tab, index) => (
                    <button
                        ref={(el) => (tabRefs.current[index] = el)}
                        key={tab.id}
                        onClick={() => setActiveIndex(index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className={`px-4 py-2 rounded-t-md ${activeIndex === index
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-4 border">
                {tabsData[activeIndex].content}
            </div>
        </div>
    );
}