import useMap from "./hooks/useMap";

const  UseMap = ()  => {
  const { map, set, remove, reset } = useMap([
    ['name', 'Ankit'],
    ['role', 'Frontend Developer'],
  ]);

  return (
    <div>
      <p>Name: {map.get('name')}</p>
      <p>Role: {map.get('role')}</p>

      <button onClick={() => set('role', 'Full Stack Developer')}>
        Update Role
      </button>

      <button onClick={() => remove('name')}>
        Remove Name
      </button>

      <button onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default UseMap;