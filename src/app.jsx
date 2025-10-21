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
            <a className="navbar-brand" href="#">GroupGoal</a>
            <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className='nav-link' to='login'>Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className='nav-link' to='dashboard'>Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className='nav-link' to='progress'>Progress</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className='nav-link' to='about'>About</NavLink>
            </li>
            </ul>
        </nav>
        </header>

        <Routes>
            <Route path='/' element={<Login />} exact />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/progress' element={<Progress />} />
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