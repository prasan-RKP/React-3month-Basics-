
import { useState } from 'react';

export default function useMap(initialValue) {

    const [map, setMap] = useState(new Map(initialValue));


    // add / update value
    const set = (key, val) => {
        const updatedMap = new Map(map); // clonned it.
        updatedMap.set(key, val);
        setMap(updatedMap);
    }


    // remove key
    const remove = (key) => {
         const updatedMap = new Map(map);
         updatedMap.delete(key);
         setMap(updatedMap);
    }

    //reset map 

    const reset = () => {
        setMap(new Map(initialValue));
    }


    return {
        map,
        set,
        remove,
        reset
    }
    
}