import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './TasksList.css';

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      if (err.response?.status === 401) navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask) return;

    try {
      await API.post('/tasks', { text: newTask });
      setNewTask('');
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      await API.put(`/tasks/${task.id}`, { completed: !task.completed });
      fetchTasks();
    } catch {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (task) => {
    try {
      await API.delete(`/tasks/${task.id}`);
      fetchTasks();
    } catch {
      setError('Failed to delete task');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="tasks-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>My Tasks</h2>
        <button onClick={logout} style={{ cursor: 'pointer' }}>Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task"
        />
        <button type="submit">Add</button>
      </form>

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-row ${task.completed ? 'completed' : ''}`}
          onClick={() => toggleComplete(task)}
        >
          <input type="checkbox" checked={task.completed} readOnly />
          <span className="task-text">{task.title}</span>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
