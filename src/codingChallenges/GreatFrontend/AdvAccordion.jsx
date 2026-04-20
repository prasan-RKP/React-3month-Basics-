import React, { useState, useRef } from "react";


const items = [
    {
        title: "HTML",
        content:
            "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
    },
    {
        title: "CSS",
        content:
            "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
    },
    {
        title: "JavaScript",
        content:
            "JavaScript is one of the core technologies of the Web, alongside HTML and CSS.",
    },
];


const AdvAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const buttonRefs = useRef([]);

    const toggleItem = (index) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    const handleKeyDown = (e, index) => {
        const total = items.length;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                buttonRefs.current[(index + 1) % total].focus();
                break;

            case "ArrowUp":
                e.preventDefault();
                buttonRefs.current[(index - 1 + total) % total].focus();
                break;

            case "Enter":
                e.preventDefault();
                toggleItem(index);
                break;

            default:
                break;
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 space-y-3">
            {items.map((item, index) => {
                const isOpen = activeIndex === index;
                const buttonId = `Advaccordion-button-${index}`;
                const panelId = `Advaccordion-panel-${index}`;

                return (
                    <div
                        key={index}
                        className="border border-gray-300 rounded-2xl shadow-sm overflow-hidden"
                    >
                        {/* Heading */}
                        <h3>
                            <button
                                ref={(el) => (buttonRefs.current[index] = el)}
                                id={buttonId}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() => toggleItem(index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 bg-gray-100 hover:bg-gray-200 focus-visible:outline-none 
                                 focus-visible:ring-2 focus-visible:ring-blue-500 
                                 focus-visible:bg-gray-400"
                            >
                                {item.title}
                                <span
                                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                                        }`}
                                >
                                    ⌄
                                </span>
                            </button>
                        </h3>

                        {/* Panel */}
                        <div
                            id={panelId}
                            role="region"
                            aria-labelledby={buttonId}
                            hidden={!isOpen}
                            className="px-4 py-3 text-gray-700 bg-white"
                        >
                            {item.content}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AdvAccordion;