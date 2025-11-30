import "./ToDo.css";

function ToDo({ todo, toggleTodoCompletion, handleDeleteTodo }) {
  const { completed, task, id } = todo;

  return (
    <div className={`task-row ${completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodoCompletion(id)}
      />
      <div className="task-text" onClick={() => toggleTodoCompletion(id)}>
        {task}
      </div>
      <button className="delete-btn" onClick={() => handleDeleteTodo(id)}>
        x
      </button>
    </div>
  );
}

export default ToDo;