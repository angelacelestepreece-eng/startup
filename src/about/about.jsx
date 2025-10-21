import React from 'react';
import './about.css';

export function About() {
  return (
    <main className="container-fluid cream-bg text-center">
      <section id="app-description">
        <h2>Purpose</h2>
        <p>This is where I will describe the purpose of the app.</p>
      </section>

      <section id="app-use">
        <h2>How to use GroupGoal</h2>
        <p>This is where I will describe how users actually use the app.</p>
      </section>

      <div id="picture" class="picture-box"><img width="400px" src="sunset.png" alt="random" /></div>

    </main>
  );
}