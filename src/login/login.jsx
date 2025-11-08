import React, {useState, useEffect} from 'react';
import {AuthState} from './authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';


export function Login({userName, authState, onAuthChange}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('username');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });

    if (response.ok) {
      const data = await response.json();
      onAuthChange(data.email, AuthState.Authenticated);
      setStatus('Logged in as ${data.email}');
    } else {
      setStatus('Login failed');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/auth/create', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });

    if (response.ok) {
      const data = await response.json();
      onAuthChange(data.email, AuthState.Authenticated);
      setStatus('Account created for ${data.email}');
    } else {
      setStatus('Account creation failed');
    }
  }
 

  return (
    <main className="container-fluid cream-bg text-center">
      <div>
        <h1 className="outlined-text">Welcome to GroupGoal</h1>
        <h5 className="outlined-text">Made by Angela Preece</h5>
        <Form>
          <InputGroup className="input-group mb-3">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control type="text" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>🔒</InputGroup.Text>
            <Form.Control type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </InputGroup>
          {authState === AuthState.Unauthenticated && (
            <>
              <Button onClick={handleLogin} className="pink-btn me-2">Login</Button>
              <Button onClick={handleCreate} className="pink-btn">Create</Button>
            </>
          )}
        </Form>
        {status && <p className="mt-3 text-success">{status}</p>}
        {authState === AuthState.Authenticated && (
          <Button 
            variant="secondary" 
            className="mt-3" 
            onClick={async () => {
              await fetch('/api/auth/logout', {method: 'DELETE'});
              onAuthChange('', AuthState.Unauthenticated);
            }}  
          >  
            Logout
          </Button>
        )}
      </div>
    </main>
  );
}