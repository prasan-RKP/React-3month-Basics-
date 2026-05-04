import { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedvalue] = useState(value);

  useEffect(() => {
    let timer;

    timer = setTimeout(() => {
      setDebouncedvalue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
