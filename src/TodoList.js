import React, {useState} from "react";

function TodoApp(){
    const[todos, setTodos] = useState([]);
    const[task, setTask] = useState("");
    
    //Add to do
    const addTodo = () => {
        if (task.trim() === "") 
            return;
        setTodos([...todos, {text:task, completed:false}]);
        setTask('');
    };

    //Delete to do
    const deleteTodo = (index) => {
        const newTodos = todos.filter ((_, i) => i !== index);
        setTodos(newTodos);
    };

    //tuggle complete 
    const tuggleTodo = (index) => {
        const newTodos = todos.map ((todo,i) => 
        i === index ? {...todo, completed: ! todo.completed}: todo
    );

    setTodos (newTodos);
    };

    return (
        <div style={styles.container}>
            <h2>📑Todo List</h2>
            <div>
                <input 
                type="text" 
                value={task} 
                onChange={(e) => setTask(e.target.value)} 
                placeholder="enter task"
                style={styles.input}/>
                <button onClick={addTodo} style={styles.button}> 
                    Add
                </button>
                
            </div>
        <ul style={styles.list}>
            {todos.map((todo, index) => (
                <li key={index} 
                style={styles.listItem}>
                    <span onClick={() => tuggleTodo(index)} 
                        style={{
                            textDecoration: todo.completed? "line-through": "none", 
                            cursor: "pointer",
                        }}>
                            {todo.text}
                    </span>
                    <button onClick={() => deleteTodo(index)}
                    style={styles.deleteBtn}
                    >
                        ❌

                    </button>
                </li>
            ))}

        </ul>
        </div>
    );
}

export default TodoApp;
const styles = {
    container: {
        width: "300px",
        margin: "50px auto",
        textAlign: "center",
        fontFamily: "arial",
        backgroundColor: "#ab0ce5",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },

    input: {
        padding: "8px",
        width: "70%",
    },

    button: {
        padding: "8px",
        marginLeft: "5px",
    },

    list: {
        listStyle: "none",
        padding: "0",
    },

    listItem: {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px",
        borderBottom: "1px solid #ccc",
    },

    deleteBtn: {
        backgroundColor: "Red",
        color: "white",
        border: "none",
        cursor: "pointer",
    },

};