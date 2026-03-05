// LiftUp.jsx
import { useState } from "react";
import InputBox from "./InputBox";

const LiftUp = () => {
    const [text, setText] = useState("");

    return (
        <div className="min-h-screen bg-black flex items-center justify-center font-['Courier_New'] font-mono">
            <div className="w-[420px] p-12 border border-[#1a1a1a] rounded-[2px] relative">

                {/* Corner accents */}
                {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((pos) => (
                    <div
                        key={pos}
                        className={`absolute w-3 h-3 
                            ${pos === "topLeft" ? "top-[-1px] left-[-1px] border-t-2 border-l-2 border-[#00ff88]" : ""}
                            ${pos === "topRight" ? "top-[-1px] right-[-1px] border-t-2 border-r-2 border-[#00ff88]" : ""}
                            ${pos === "bottomLeft" ? "bottom-[-1px] left-[-1px] border-b-2 border-l-2 border-[#00ff88]" : ""}
                            ${pos === "bottomRight" ? "bottom-[-1px] right-[-1px] border-b-2 border-r-2 border-[#00ff88]" : ""}
                        `}
                    />
                ))}

                {/* Title */}
                <div className="mb-10">
                    <p className="text-[#00ff88] text-[10px] tracking-[4px] m-0 mb-2">
                        REACT PATTERN
                    </p>
                    <h1 className="text-white text-[22px] m-0 font-normal tracking-[2px]">
                        STATE LIFT UP
                    </h1>
                </div>

                {/* Inputs */}
                <div className="flex flex-col gap-9">
                    <InputBox label="Input Box 01" value={text} onChange={setText} />
                    <InputBox label="Input Box 02" value={text} onChange={setText} />
                </div>
                {/* Shared state display */}
                <div className="mt-10 p-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-[2px]">
                    <p className="text-[#555] text-[10px] tracking-[3px] m-0 mb-2">
                        SHARED STATE ↑
                    </p>
                    <p className={`
                        text-[14px] m-0 min-h-[20px] transition-colors duration-300
                        ${text ? "text-[#00ff88]" : "text-[#2a2a2a]"}
                    `}>
                        {text || "[ empty ]"}
                    </p>
                </div>

                {/* Footer note */}
                <p className="mt-6 text-[#333] text-[10px] tracking-[1px] text-center m-6 mt-6">
                    both inputs share the same <span className="text-[#555]">text</span> state from LiftUp
                </p>
            </div>
        </div>
    );
};

export default LiftUp;