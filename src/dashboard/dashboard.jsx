import React from 'react';
import './dashboard.css';

export function Dashboard() {
  return (
    <main className="cream-bg text-dark">
      <h1>GroupGoal Dashboard</h1>
      <div class="add_goal">
        <form class="goal-form">
          <label for="goal-name">New Goal:</label>
          <input type="text" id="goal-name" placeholder="Enter New Goal"/>
          <button type="submit" class="add-goal-btn">+ Add Goal</button>
        </form>
      </div>
      <section class="goal-list">
        <div class="goal-card">
          <h3>Save $500 For Trip</h3>
          <progress value="40" max="100"></progress>
        </div>

        <div class="goal-card">
          <h3>Finish School Project</h3>
          <progress value="80" max="100"></progress>
        </div>

        <div class="goal-card">
          <h3>Read Harry Potter</h3>
          <progress value="10" max="100"></progress>
        </div>

        <div class="goal-card">
          <h3>Financial Report</h3>
          <progress value="90" max="100"></progress>
        </div>
      </section>

       <section id="goal-inspo">
        <h2>Goal Inspiration</h2>
          <p>This will show suggested goals from a third-party</p>
          <ul>
            <li>Save $300</li>
            <li>Finish Pride and Prejudice for book club</li>
          </ul>
       </section>
    </main>
  );
}