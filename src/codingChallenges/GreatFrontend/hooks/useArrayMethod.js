import  {useState} from 'react';
export default function useArrayMethod(defaultValue) {
    const [array, setArray] = useState(defaultValue);

   //1) push
   const push = (...args) => {
    const[fruit] = args;
    setArray((arr)=> [...arr, fruit]);
   }

    // 2) update

    const update = (...args) => {
        const [idxNo, fruit] = args;
        let newArr = [...array];
        newArr[idxNo] = fruit;
        setArray(newArr);
    }

    // 3) remove

    const remove = (...args) => {
        const [idx] = args;

        setArray((arr)=> (
            arr.filter((_,index) => index !== idx)
        ))
    }


    // 4) filter
    const filter = (...args) => {
        const [fn] = args;
        setArray(arr => arr.filter(fn));
    }


    // 5) set
    const reSet = (...args) => {
        let [defVal] = args;
        setArray(defVal);
    }


    // 6) Clear
    const clear = () => {
        setArray([]);
    }
 


   return {array, push, update, remove, filter, set:reSet, clear}; 


}