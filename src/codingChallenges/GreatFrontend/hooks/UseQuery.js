
// Implement a useQuery hook that manages a promise resolution which can be used to fetch data.

import { useEffect, useState } from "react";

export default function useQuery(fn, deps=[]){
    
    const [state, setState] = useState({status: "loading",});

    useEffect(()=> {
        let isMounted = true;

        fn()
           .then((data)=> {
            if(isMounted){
                setState({status: "success", data});
            }
           })

         .catch((error) => {
            if(isMounted) {
                setState({status: "error", error});
            }
         })  

         return ()=> {
            isMounted = false;
         }

    }, deps);

    return state;
}