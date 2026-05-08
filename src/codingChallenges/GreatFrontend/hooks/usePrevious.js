import { useRef, useEffect } from "react";

export default function usePrevious (value) {

    // store previous value
    const ref = useRef();

    useEffect(()=> {
         // update ref after render
       ref.current = value;
    }, [value]);

    return ref.current;
}