import { useState } from "react";
import usePrevious from "./hooks/usePrevious";

const  UsePrevious = () =>  {

  const [count, setCount] = useState(0);

  const previousCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {previousCount}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default UsePrevious;