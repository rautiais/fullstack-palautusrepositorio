import { useRef } from "react";
import { useAnecdoteActions } from "../store";

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions();
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote(inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input ref={inputRef} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
