
import useClickAnywhere from "./hooks/useClickAnywhere";

export default function UseClickAnywhere() {
  const [count, setCount] = useState(0);

  useClickAnywhere(() => {
    setCount((prev) => prev + 1);
  });

  return <p>Click count: {count}</p>;
}
