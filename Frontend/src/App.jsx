import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [authMode, setAuthMode] = useState('login');
  const [authForm, setAuthForm] = useState({username:'', password:''});
  const [authError, setAuthError] = useState(null);

  const handleAuthSubmit = async (e)=>{
    e.preventDefault();
    setAuthError(null);
    const endpoint = authMode==='login' ? 'login' : 'signup';
    try{
      const res = await fetch(`http://localhost:5000/auth/${endpoint}`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(authForm)});
      const data = await res.json();
      if(res.ok && authMode==='login'){ localStorage.setItem('token', data.token); setIsLoggedIn(true); }
      else if(authMode==='signup'){ alert('Signup successful! Please login.'); setAuthMode('login'); }
      else{ setAuthError(data.error||'Authentication failed'); }
    }catch{ setAuthError('Authentication failed'); }
  };

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return isLoggedIn ? <Dashboard handleLogout={handleLogout} /> : <AuthForm authMode={authMode} setAuthMode={setAuthMode} authForm={authForm} setAuthForm={setAuthForm} handleAuthSubmit={handleAuthSubmit} authError={authError} />;
}
