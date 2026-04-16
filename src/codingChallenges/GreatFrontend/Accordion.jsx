import React, { useState } from 'react'

const Accordion = () => {
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

  const [openIndex, setOpenIndex] = useState([]);



  const handleToggle = (idx) => {
    if (idx === undefined) return;
    console.log("calling", idx);
    setOpenIndex((prev) => {
      if (prev.includes(idx)) {
        return prev.filter((i) => i !== idx);
      }
      else {
        return [...prev, idx];
      }
    });
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border rounded-md">

          {/* Header */}
          <button onClick={() => handleToggle(index)} className="w-full flex justify-between items-center p-3 bg-gray-100">
            <span>{item.title}</span>

            {/* Icon */}
            <span className="text-lg">
              {openIndex.includes(index) ? "▲" : "▼"}
            </span>
          </button>

          {/* Content */}
          {openIndex.includes(index) && (
            <div className="p-3 border-t">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
