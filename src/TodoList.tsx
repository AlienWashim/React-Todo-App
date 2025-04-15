import { useState } from 'react';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';

interface Todo {
  id: number;
  text: string;
  importance: 'normal' | 'medium' | 'high';
  date: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, updatedText: string, updatedImportance: 'high' | 'normal' | 'medium') => void;
}

const TodoList = ({ todos, deleteTodo, toggleTodo, updateTodo }: Props) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [editImportance, setEditImportance] = useState<'normal' | 'medium' | 'high'>('normal');

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditImportance(todo.importance);
  };

  const handleUpdate = () => {
    if (editingId !== null) {
      updateTodo(editingId, editText, editImportance);
      setEditingId(null);
    }
  };

  const getImportanceColor = (importance: 'normal' | 'medium' | 'high') => {
    switch (importance) {
      case 'high': return 'rgba(255, 0, 0, 0.2)'; // light red
      case 'medium': return 'rgba(255, 165, 0, 0.2)'; // light orange
      case 'normal': return 'rgba(128, 128, 128, 0.2)'; // light gray
      default: return 'white';
    }
  };

  return (
    <div className="todo-list d-flex flex-column gap-3">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={`todo-item fade-in p-3 rounded shadow-sm position-relative`}
          style={{
            background: `linear-gradient(145deg, ${getImportanceColor(todo.importance)}, #ffffff)`,
            boxShadow: 'inset 0 0 5px rgba(255,255,255,0.5), 0 4px 6px rgba(0,0,0,0.1)',
            border: '1px solid #ddd'
          }}
        >
          <div className="d-flex justify-content-between align-items-start flex-wrap">
            <div className="d-flex flex-column align-items-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`todo-${todo.id}`}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  {todo.text}
                </label>
              </div>
              <small className="text-primary mt-1 ms-4 text-opacity-50">{todo.date}</small>
            </div>

            <div>
              {editingId === todo.id ? (
                <div className="edit-panel p-2 bg-white shadow rounded">
                  <input
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="form-control mb-2"
                  />
                  <div className="mb-2">
                    <label className="me-2">
                      <input
                        type="radio"
                        checked={editImportance === 'normal'}
                        onChange={() => setEditImportance('normal')}
                      />{' '}
                      <span style={{ color: 'gray' }}>Normal</span>
                    </label>
                    <label className="me-2">
                      <input
                        type="radio"
                        checked={editImportance === 'medium'}
                        onChange={() => setEditImportance('medium')}
                      />{' '}
                      <span style={{ color: 'orange' }}>Medium</span>
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={editImportance === 'high'}
                        onChange={() => setEditImportance('high')}
                      />{' '}
                      <span style={{ color: 'rgba(31, 125, 63, 0.8)' }}>High</span>
                    </label>
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <Button type="button" className="btn btn-success" onClick={handleUpdate}>Save</Button>
                    <Button type="button" className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <OverlayTrigger
                  trigger="click"
                  rootClose
                  placement="left"
                  overlay={
                    <Popover>
                      <div className="d-flex flex-column gap-2 p-2">
                        <button type="button" className="btn btn-outline-primary" onClick={() => handleEdit(todo)}>Edit</button>
                        <button type="button" className="btn btn-outline-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                      </div>
                    </Popover>
                  }
                >
                  <Button type="button" className="btn btn-info">Action</Button>
                </OverlayTrigger>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
