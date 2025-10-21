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
                <a class="nav-link active" href="index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="dashboard.html">Dashboard</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="progress.html">Progress</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="about.html">About</a>
            </li>
            </menu>
        </nav>
        </header>

        <main>App components go here</main>

        <footer class="pink-bg text-white-50">
        <div class="container-fluid">
            <a class="text-reset" href="https://github.com/angelacelestepreece-eng/startup.git">My GitHub</a>
        </div>
        </footer>
        </div>
    </BrowserRouter>
  );
}