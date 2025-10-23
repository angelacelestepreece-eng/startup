import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('groupgoal-email');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('groupgoal-email', email);
    setStatus(`Logged in as ${email}`);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    localStorage.setItem('groupgoal-email', email);
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
          <Button onClick={handleLogin} className="pink-btn me-2">Login</Button>
          <Button onClick={handleCreate} className="pink-btn">Create</Button>
        </Form>
        {status && <p className="mt-3 text-success">{status}</p>}
      </div>
    </main>
  );
}