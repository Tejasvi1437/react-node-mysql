import React, { useState } from 'react';
import API from '../api/axios';

export default function TaskForm({ onAdded }) {
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/tasks', { title, description });
      setTitle(''); setDescription('');
      onAdded(res.data);
    } catch (err) { alert(err.response?.data?.message || err.message); }
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
