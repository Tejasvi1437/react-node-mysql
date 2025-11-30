import { useState } from "react";
import "./AddToDo.css";

function AddToDo({ todos, setTodos }) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (!inputValue) {
      alert("Please enter a valid task!");
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      task: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="row-add-task">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default AddToDo;