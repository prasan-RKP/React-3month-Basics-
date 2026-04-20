/**
 * @param number initialValue
 * @return Object
 */
import {useState, useCallback} from 'react';
export default function useCounter(initialValue = 0) {
 const [count, setCount] = useState(initialValue);

 const increment = useCallback(()=> {
    setCount(prev => prev + 1);
 }, [count]);

 const decrement = useCallback(()=> {
   setCount(prev => prev - 1);
 }, [count]);

 const reset = useCallback(()=> {
    setCount(initialValue);
 }, [count]);

 return {count, increment, decrement, reset, setCount};
}