// components/TodoForm.tsx
import { useState } from 'react';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';


interface Props {
  addTodo: (task: string, importance: 'normal' | 'medium' | 'high') => void;
}

const TodoForm = ({ addTodo }: Props) => {
  const [task, setTask] = useState('');
  const [importance, setImportance] = useState<'normal' | 'medium' | 'high'>('normal');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task, importance);
      setTask('');
      setImportance('normal');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="todo-form d-flex flex-column gap-3">
  <Form.Control
    type="text"
    placeholder="Add a new task..."
    value={task}
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
    className="shadow-sm"
    style={{ height: '50px'}}
  />
  <div className="d-flex align-items-center gap-3">
    <Form.Check
      type="radio"
      id="importance-normal"
      label={<span style={{ color: 'gray' }}>Normal</span>}
      name="importance"
      value="normal"
      checked={importance === 'normal'}
      onChange={() => setImportance('normal')}
    />
    <Form.Check
      type="radio"
      id="importance-medium"
      label={<span style={{ color: 'orange' }}>Medium</span>}
      name="importance"
      value="medium"
      checked={importance === 'medium'}
      onChange={() => setImportance('medium')}
    />
    <Form.Check
      type="radio"
      id="importance-high"
      label={<span style={{ color: 'red' }}>High</span>}
      name="importance"
      value="high"
      checked={importance === 'high'}
      onChange={() => setImportance('high')}
    />
    <Button type="submit" className="btn btn-primary shadow">Add Task</Button>
  </div>
</Form>

  );
};

export default TodoForm;
