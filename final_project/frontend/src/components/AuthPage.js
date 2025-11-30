import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './AuthPage.css';

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        await API.post('/auth/register', { username, password });
        alert('Registered successfully! Please login.');
        setIsRegister(false);
        setPassword('');
      } else {
        const res = await API.post('/auth/login', { username, password });
        localStorage.setItem('token', res.data.accessToken); // Save token correctly
        navigate('/tasks'); // Navigate to tasks
      }
    } catch (err) {
      if (isRegister) setError('User already exists');
      else setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-toggle">
          <button onClick={() => { setIsRegister(true); setError(''); }} disabled={isRegister}>Register</button>
          <button onClick={() => { setIsRegister(false); setError(''); }} disabled={!isRegister}>Login</button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isRegister ? 'Register' : 'Login'}</h2>

          {error && <div className="error-message">{error}</div>}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
}
