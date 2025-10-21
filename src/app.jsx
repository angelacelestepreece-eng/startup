import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { Progress } from './progress/progress';
import { About } from './about/about';

export default function App() {
  return (
    <BrowserRouter>
        <div className="pink-bg text-dark">
        <header>
        <nav>
            <a class="navbar-brand" href="#">GroupGoal</a>
            <menu class="navbar-nav">
            <li class="nav-item">
                <NavLink className='nav-link' to='login'>Login</NavLink>
            </li>
            <li class="nav-item">
                <NavLink className='nav-link' to='dashboard'>Dashboard</NavLink>
            </li>
            <li class="nav-item">
                <NavLink className='nav-link' to='progress'>Progress</NavLink>
            </li>
            <li class="nav-item">
                <NavLink className='nav-link' to='about'>About</NavLink>
            </li>
            </menu>
        </nav>
        </header>

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/play' element={<Play />} />
            <Route path='/scores' element={<Scores />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NotFound />} />
        </Routes>

        <footer class="pink-bg text-white-50">
        <div class="container-fluid">
            <a class="text-reset" href="https://github.com/angelacelestepreece-eng/startup.git">My GitHub</a>
        </div>
        </footer>
        </div>
    </BrowserRouter>
  );

  function NotFound() {
    return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
  }
}