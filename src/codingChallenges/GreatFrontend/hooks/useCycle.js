import {useState} from 'react';
export default function useCycle(...args) {
    
    const [low, medium, high] = args;
    const [mode, setMode] = useState(low);

    const cycle = () => {
         if(mode === low){
          setMode(medium);
         }
         if(mode === medium){
          setMode(high);
         }
         if(mode === high){
          setMode(low);
         }
    }

    return [mode, cycle];
}