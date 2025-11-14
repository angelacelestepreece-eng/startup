import React, {useState, useEffect} from 'react';
import {AuthState} from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Progress } from './progress/progress';
import { About } from './about/about';

function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  const handleAuthChange = (email, state) => {
    setUserName(email);
    setAuthState(state);

    if (state === AuthState.Authenticated) {
      localStorage.setItem('userName', email);
    } else {
      localStorage.removeItem('userName');
    }
  }

  return (
    <BrowserRouter>
      <div className="pink-bg text-dark">
        <header>
          <nav className="navbar fixed-top navbar-dark pink-bg">
            <div className="navbar-brand">GroupGoal</div>
            <menu className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Login</NavLink>
              </li>

              {authState === AuthState.Authenticated && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="dashboard">Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="progress">Progress</NavLink>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink className="nav-link" to="about">About</NavLink>
              </li>
            </menu>
          </nav>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={handleAuthChange}
              />
            }
          />
          <Route path="/about" element={<About />} />
          {authState === AuthState.Authenticated && (
            <>
              <Route path="/dashboard" element={<Dashboard userName={userName} />} />
              <Route path="/progress" element={<Progress userName={userName} />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="pink-bg text-white-50">
          <div className="container-fluid">
            <span className="text-reset">Angela Preece</span>
            <a
              className="text-reset"
              href="https://github.com/angelacelestepreece-eng/startup.git"
            >
              My GitHub
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );

  function NotFound() {
    return (
      <main className="container-fluid bg-secondary text-center">
        404: Return to sender. Address unknown.
      </main>
    );
  }
}

export default App;