import { useSharedState } from "../store";

const Counter = () => {
  const [state, setState] = useSharedState();
  const increment = () => {
    setState((prev) => ({ ...prev, currentTracks: prev.currentTracks + 1 }));
  };
  return (
    <div>
      {state.currentTracks}
      <button onClick={increment}>+1</button>

      {Math.random()}
    </div>
  );
};

export default Counter;
