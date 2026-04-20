import React, { useRef, useState } from 'react';

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

const AdvPractice = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const buttonRefs = useRef([]);

    const onToggle = (idx) => {
         setActiveIndex((prev) => prev === idx ? null : idx);
    }

    const onHandleKeyDown = (e, index) => {

        let length = items.length;
        switch(e.key) {
            case 'ArrowDown' :
                e.preventDefault();
                buttonRefs.current[(index + 1) % length].focus();
                break;

             case 'ArrowUp' :
                e.preventDefault();
                buttonRefs.current[(index - 1 + length) % length].focus();
                break; 
                
                case 'Enter' :
                case ' ':
                    e.preventDefault();
                    onToggle(index);
                    break;
    
             default :
                break;   
        }
    }



  return (
    <div className="max-w-xl mx-auto mt-10 space-y-3">
      {items.map((item, index) => {
        const isOpen = index === activeIndex;
       // console.log(isOpen);
        return (
          <div
            key={index}
            className="border border-gray-300 rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Heading */}
            <h3>
              <button
                ref={(el)=> buttonRefs.current[index] = el}
                id={`accordion-button-${index}`}
                aria-expanded={isOpen}
                onClick={()=> onToggle(index)}
                onKeyDown={(e) => onHandleKeyDown(e, index)}
                aria-controls={`accordion-panel-${index}`}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 
                bg-gray-100 hover:bg-gray-200 
                focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-blue-500 
                focus-visible:bg-gray-400 
                transition-all duration-200"
              >
                {item.title}
                <span className="transition-transform duration-200">⌄</span>
              </button>
            </h3>

            {/* Panel */}
            <div
              id={`accordion-panel-${index}`}
              role="region"
              aria-labelledby={`accordion-button-${index}`}
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

export default AdvPractice;