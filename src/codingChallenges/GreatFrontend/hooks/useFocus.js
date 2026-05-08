import { useEffect, useRef } from "react"

export const useFocus = () => {
    const elementRef = useRef(null);

    useEffect(()=> {
        elementRef.current.focus();
    }, []);

    return elementRef;
}