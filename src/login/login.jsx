import React from 'react';


export function Login() {
  return (
    <main className="container-fluid cream-bg text-center">
      <div>
        <h1 className="outlined-text">Welcome to GroupGoal</h1>
        <h5 className="outlined-text">Made by Angela Preece</h5>
        <form method="get" action="progress.html">
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input className="form-control" type="text" placeholder="your@email.com" />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">🔒</span>
            <input className="form-control" type="password" placeholder="password" />
          </div>
          <button type="submit" className="pink-btn">Login</button>
          <button type="submit" className="pink-btn">Create</button>
        </form>
      </div>
    </main>
  );
}