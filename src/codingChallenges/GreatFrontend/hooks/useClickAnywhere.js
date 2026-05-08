import { useEffect } from 'react';

export default function useClickAnywhere(handler) {

    useEffect(() => {
          const handleClick = () => {handler()};

          window.addEventListener("click", handleClick);

          return () => window.removeEventListener("click", handleClick);

    }, [handler]);
    
}