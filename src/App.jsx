import "./App.css";
import TodoForm from "./components/forms/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
    <div  style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#FAF9F6"
        }}>
    <h1>TODO LIST</h1>
      <TodoForm/>
      <TodoList/>
    </div>
    </>
  );
}

export default App;
