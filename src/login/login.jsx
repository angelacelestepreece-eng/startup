import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';


export function Login() {
  return (
    <main className="container-fluid cream-bg text-center">
      <div>
        <h1 className="outlined-text">Welcome to GroupGoal</h1>
        <h5 className="outlined-text">Made by Angela Preece</h5>
        <Form method="get" action="progress.html">
          <InputGroup className="input-group mb-3">
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control type="text" placeholder="your@email.com" />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>🔒</InputGroup.Text>
            <Form.Control type="password" placeholder="password" />
          </InputGroup>
          <Button type="submit" className="pink-btn me-2">Login</Button>
          <Button type="submit" className="pink-btn">Create</Button>
        </Form>
      </div>
    </main>
  );
}