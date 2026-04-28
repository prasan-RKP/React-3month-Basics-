import { useEffect, useState } from "react";

export default function useCountDown (initialVal, delay) {

    const [val, setVal] = useState(initialVal);

    useEffect(()=> {
        let timer;
        timer = setInterval(()=> {
           setVal((prev) => prev > 0 ? prev - 1: prev);
        }, delay);

        return () => clearInterval(timer);
    }, []);

    return val;
}