import React, { useState, useEffect } from 'react';
import './App.css';
import Todo from './component/Todo'; 
import { addtodo, getalltodo, updatetodo, deleteToDo } from './utils/HandleApi'; // Adjust path if necessary

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getalltodo(setTodos);
  }, []);

  const handleUpdateClick = () => {
    if (text.trim() === "") {
      console.error("Todo text cannot be empty");
      return;
    }

    if (text.startsWith("Update: ")) {
      const id = text.split(" ")[1];
      updatetodo(id, text.replace("Update: " + id + " ", ""), setTodos, setText);
    } else {
      addtodo(text, setText, setTodos);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>To Do List</h1>
        <div className="top">
          <input 
            type="text" 
            placeholder="Add the Todos"
            value={text} 
            onChange={(e) => setText(e.target.value)}
          />
          <div className="add" onClick={handleUpdateClick}>
            Add
          </div>
        </div>
        <div className="list">
          {todos.map((item) => (
            <Todo 
              key={item._id} 
              text={item.text}
              updateMode={() => {
                setText(`Update: ${item._id} ${item.text}`);
              }}
              deleteToDo={() => deleteToDo(item._id, setTodos)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;