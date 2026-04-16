import { useState, useRef } from "react";

const tabsData = [
  { id: "tab-1", label: "HTML", content: "HTML Content" },
  { id: "tab-2", label: "CSS", content: "CSS Content" },
  { id: "tab-3", label: "JS", content: "JavaScript Content" },
];

export default function TabTwo() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Store refs for focus management
  const tabRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    let newIndex = index;

    if (e.key === "ArrowRight") {
      newIndex = (index + 1) % tabsData.length;
    }

    if (e.key === "ArrowLeft") {
      newIndex = (index - 1 + tabsData.length) % tabsData.length;
    }

    // 👉 Hint: Why do we prevent default here?
    if (newIndex !== index) {
      e.preventDefault();
      setActiveIndex(newIndex);

      // 👉 Focus next tab
      tabRefs.current[newIndex]?.focus();
    }
  };

  console.log(tabRefs);

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      
      {/* TAB LIST */}
      <div
        role="tablist"
        aria-label="Sample Tabs"
        className="flex gap-2 border-b"
      >
        {tabsData.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            id={tab.id}
            // aria-selected={activeIndex === index}
            // aria-controls={`panel-${index}`}
           // tabIndex={activeIndex === index ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`px-4 mb-4 py-2 rounded-t-md ${
              activeIndex === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB PANEL */}
      {tabsData.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`panel-${index}`}          
          aria-labelledby={tab.id}
          hidden={activeIndex !== index}
          className="p-4 border"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}