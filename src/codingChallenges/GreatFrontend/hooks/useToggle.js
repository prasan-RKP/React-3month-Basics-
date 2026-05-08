import { useState } from "react";

export default function useToggle (initialVal = false) {

    let [val, setVal] = useState(initialVal);

    const toggle = () => setVal((prev) => !prev);

    return [val, toggle];
}