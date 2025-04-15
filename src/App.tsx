import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTasks, FaSearch } from 'react-icons/fa';

// Interface definition for Todo item
export interface Todo {
  id: number;
  text: string;
  importance: 'normal' | 'medium' | 'high';
  date: string;  // Store date as a formatted string
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]); // State to hold all Todos
  const [search, setSearch] = useState(''); // State for search input

  // Add a new Todo item
  const addTodo = (text: string, importance: 'normal' | 'medium' | 'high') => {
    const date = new Date();
    const createdAt = date.toLocaleString('en-BD', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Dhaka',
    });

    const newTodo: Todo = {
      id: Date.now(), // Unique ID based on timestamp
      text,           // Text content of the task
      importance,     // Importance level of the task
      completed: false,  // Task is initially not completed
      date: createdAt,   // Formatted date string
    };

    setTodos([newTodo, ...todos]); // Add new Todo to the beginning of the list
  };

  // Toggle completion status of a Todo item
  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a Todo item by its ID
  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id)); // Remove Todo by ID
  };

  // Update text and importance of a Todo item
  const updateTodo = (
    id: number,
    updatedText: string,
    updatedImportance: 'normal' | 'medium' | 'high'
  ) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id
          ? { ...todo, text: updatedText, importance: updatedImportance }
          : todo
      )
    );
  };

  // Filter todos based on search input
  const filteredTodos = todos.filter(todo =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* App Bar */}
      <header className="app-bar d-flex justify-content-between align-items-center p-3 border-bottom shadow-sm" style={{ backgroundColor: '#3E3F5B' }}
      >
        <div className="d-flex align-items-center gap-2">
          <FaTasks className="text-info" size={28} />
          <h4 className="m-0 fw-bold text-white">Todo Manager</h4>
        </div>
        <form onSubmit={e => e.preventDefault()} className="d-flex align-items-center gap-2">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-control rounded-pill shadow-sm"
          />
          <button type="submit" className="btn btn-info rounded-circle">
            <FaSearch className="text-dark" size={18} />
          </button>
        </form>
      </header>

      {/* New Task Section */}
      <section className="new-task-section border-bottom p-4 mt-2 bg-light-subtle">
        <TodoForm addTodo={addTodo} />
      </section>

      {/* Task List Section */}
      <section className="todo-list-section p-4">
        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </section>

      {/* Footer */}
      <footer className="text-center py-3 border-top bg-body-tertiary">
        <small className="text-muted">Developed by Washim Akram</small>
      </footer>
    </div>
  );
}

export default App;
