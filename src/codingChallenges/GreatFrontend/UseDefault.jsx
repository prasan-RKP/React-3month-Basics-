export default function UseDefault() {
  const { value, setValue } = useDefault('', 'Default Value');

  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue('Hello')}>Set Hello</button>
      <button onClick={() => setValue(null)}>Set Null</button>
      <button onClick={() => setValue(undefined)}>Set Undefined</button>
    </div>
  );
}