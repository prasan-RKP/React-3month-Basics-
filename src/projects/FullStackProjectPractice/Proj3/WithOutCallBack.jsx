import React, { useState } from 'react'

const Child = ({onClick}) => {
    return <button onClick={onClick}>Click Me</button>
}

const WithOutCallBack = () => {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        console.log("'Click me' Clicked")
    }
  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={()=> setCount(prev => prev +1)}>Inc</button>
      <Child onClick={handleClick} />
    </div>
  )
}

export default WithOutCallBack;
