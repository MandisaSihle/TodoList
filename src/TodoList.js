import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  // Edit states
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  // Add todo
  const addTodo = () => {
    if (task.trim() === "") return;

    setTodos([...todos, { text: task, completed: false }]);
    setTask("");
  };

  // Delete todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Toggle complete
  const tuggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(newTodos);
  };

  // Start editing
  const startEdit = (index) => {
    setEditIndex(index);
    setEditTask(todos[index].text);
  };

  // Save edit
  const saveEdit = () => {
    if (editTask.trim() === "") return;

    const newTodos = todos.map((todo, i) =>
      i === editIndex ? { ...todo, text: editTask } : todo
    );

    setTodos(newTodos);
    setEditIndex(null);
    setEditTask("");
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditIndex(null);
    setEditTask("");
  };

  return (
    <div style={styles.container}>
      <h2>📑 Todo List</h2>

      <div>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
          style={styles.input}
        />

        <button onClick={addTodo} style={styles.button}>
          Add Task
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.listItem}>
            {editIndex === index ? (
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                style={styles.editInput}
              />
            ) : (
              <span
                onClick={() => tuggleTodo(index)}
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {todo.text}
              </span>
            )}

            <div style={styles.actions}>
              {editIndex === index ? (
                <>
                  <button onClick={saveEdit} style={styles.button}>
                    Save
                  </button>
                  <button onClick={cancelEdit} style={styles.cancelBtn}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => startEdit(index)}
                    style={styles.editBtn}
                  >
                    Edit Task
                  </button>

                  <button
                    onClick={() => deleteTodo(index)}
                    style={styles.deleteBtn}
                  >
                    Delete Task
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;

const styles = {
  container: {
    width: "350px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial",
    backgroundColor: "#f4f4f4",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  input: {
    padding: "8px",
    width: "65%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  editInput: {
    padding: "6px",
    width: "60%",
  },

  button: {
    padding: "8px",
    marginLeft: "5px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },

  list: {
    listStyle: "none",
    padding: "0",
    marginTop: "15px",
  },

  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    borderBottom: "1px solid #ccc",
  },

  actions: {
    display: "flex",
    gap: "5px",
  },

  deleteBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  editBtn: {
    backgroundColor: "orange",
    color: "white",
    border: "none",
    padding: "6px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  cancelBtn: {
    backgroundColor: "gray",
    color: "white",
    border: "none",
    padding: "6px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};