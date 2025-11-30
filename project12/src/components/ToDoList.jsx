import { useEffect, useState } from "react";
import AddToDo from "./AddToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleDeleteTodo = (deleteId) => {
    const newTodos = todos.filter((todo) => todo.id !== deleteId);
    setTodos(newTodos);
  };

  const toggleTodoCompletion = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div>
      <h2>To Do List</h2>
      <AddToDo todos={todos} setTodos={setTodos} />
      <div>
        {todos.map((todo) => (
          <ToDo
            key={todo.id}
            todo={todo}
            toggleTodoCompletion={toggleTodoCompletion}
            handleDeleteTodo={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoList;