import { useSelector, useDispatch } from "react-redux";
import { deleteTodo, toggleComplete, updateTodo } from "../features/todo/todoSlice";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { GiCrossMark } from "react-icons/gi";

function TodoList() {
  const dispatch = useDispatch();
  const initialStateTodo = useSelector((state) => state.todo);

  return (
    <div>
      
      {
        initialStateTodo.length > 0 ?
        <table style={{border: "1px solid black"}}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Info</th>
            <th>Is Completed</th>
          </tr>
        </thead>
        <tbody>
          {initialStateTodo.map((item) => (
            <tr key={item.id}>
              {/* <td>{item.id}</td> */}
              <td>{item.info}</td>
              <td>{item.isCompleted ? <div>Yes<IoMdCheckmarkCircle /></div> : <div>No <GiCrossMark /></div>}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(updateTodo(item.id));
                  }}
                >
                  update
                </button>
                <button
                  onClick={() => {
                    dispatch(toggleComplete(item.id));
                  }}
                >
                  make as complete
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch(deleteTodo(item.id));
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      :
      <h5>Please add your first todo</h5>
      }
  
    </div>
  );
}

export default TodoList;
