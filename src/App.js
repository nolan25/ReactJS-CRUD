import React, { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState(null);

  const ajouterTodo = () => {
    if (todoInput.trim() === "") return;
    const newTodo = { id: Date.now(), text: todoInput };
    setTodos([...todos, newTodo]);
    setTodoInput("");
  };

  const modifierTodo = () => {
    if (editInput.trim() === "" || editId === null) return;
    const updatedTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, text: editInput } : todo
    );
    setTodos(updatedTodos);
    setEditInput("");
    setEditId(null);
  };

  const supprimerTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleTodoInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleEditClick = (todoId, currentText) => {
    setEditId(todoId);
    setEditInput(currentText);
  };

  return (
    <div>
      <h1 className="bg-red-400">Liste des Todos</h1>

      {todos.map((todo) => (
        <div key={todo.id}>
          <h2>{todo.text}</h2>
          <button onClick={() => handleEditClick(todo.id, todo.text)}>
            Modifier
          </button>
          <button onClick={() => supprimerTodo(todo.id)}>Supprimer</button>
        </div>
      ))}

      <div>
        <input
          type="text"
          value={todoInput}
          onChange={handleTodoInputChange}
          placeholder="Ajoutez un nouveau todo"
        />
        <button onClick={ajouterTodo}>Ajouter un Todo</button>
      </div>

      {editId !== null && (
        <div>
          <input
            type="text"
            value={editInput}
            onChange={handleEditInputChange}
            placeholder="Modifier ce todo"
          />
          <button onClick={modifierTodo}>Modifier</button>
        </div>
      )}
    </div>
  );
}

export default Todo;
