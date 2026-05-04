import React, { useCallback } from 'react'

const Child = ({ onClick }) => {
    return <button>Click me</button>
}

const WithUseCallBack = () => {
    const [count, setCount] = useState(0);

    const handleClick =  useCallback(() => {
        console.log("'Click me' clicked");
    }, []);
    return (
        <div>
            <h2>Count: ${count}</h2>
            <button onClick={() => setCount(prev => prev + 1)}>Inc</button>
            <Child onClick={handleClick} />
        </div>
    )
}

export default WithUseCallBack;
