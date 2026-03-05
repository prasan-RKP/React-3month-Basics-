// InputBox.jsx
import React from 'react'
import { useState } from "react";

const InputBox = ({label, value, onChange}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-['Courier_New'] font-mono text-[11px] tracking-[3px] uppercase text-[#555]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type something..."
        className="bg-transparent border-none border-b border-[#333] text-[#e0e0e0] font-['Courier_New'] font-mono text-base py-2.5 outline-none transition-colors duration-300 w-full focus:border-[#00ff88]"
        onFocus={(e) => e.target.style.borderBottomColor = "#00ff88"}
        onBlur={(e) => e.target.style.borderBottomColor = "#333"}
      />
    </div>
  );
}

export default InputBox;