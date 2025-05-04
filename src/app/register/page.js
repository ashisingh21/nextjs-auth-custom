'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (res.ok) router.push('/login');
    else alert('Register failed');
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
