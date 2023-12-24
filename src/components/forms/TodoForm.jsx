import { useState } from "react";
import { useDispatch } from 'react-redux'
import { addTodo } from '../../features/todo/todoSlice'

function TodoForm() {
  const dispatch = useDispatch()

  const [todo, setTodo] = useState({info: "",});
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(todo.info !== ''){
      setError(false)
      dispatch(addTodo(todo))
    }else{
      setError(true)
    }
    setTodo({info: ""})
  };

  const handleChange = (e) => {
        setTodo({[e.target.name]: e.target.value});
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="info"
        placeholder="Write a todo"
        value={todo.info}
        onChange={handleChange}
      />
      <br />
      <br />
      <button type="submit">Add Item</button>
      {error && <p className="bg-red">Write something to add</p>}
    </form>
  );
}

export default TodoForm;
