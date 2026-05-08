import { useFocus } from "./hooks/useFocus";

export default function UseRef() {

  const inputRef = useFocus();

  return (
    <div>
      <input ref={inputRef} placeholder="Enter name" />
    </div>
  );
}