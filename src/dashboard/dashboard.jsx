import React from 'react';
import './dashboard.css';
import { Form, Button, ProgressBar } from 'react-bootstrap';

export function Dashboard() {
  return (
    <main className="cream-bg text-dark">
      <h1>GroupGoal Dashboard</h1>
      <div className="add_goal">
        <Form className="goal-form">
          <Form.Label htmlFor="goal-name">New Goal:</Form.Label>
          <Form.Control type="text" id="goal-name" placeholder="Enter New Goal"/>
          <Button type="submit" className="add-goal-btn mt-2">+ Add Goal</Button>
        </Form>
      </div>
      <section className="goal-list">
        <div className="goal-card">
          <h3>Save $500 For Trip</h3>
          <ProgressBar now={40} variant="secondary" />
        </div>

        <div className="goal-card">
          <h3>Finish School Project</h3>
          <ProgressBar now={80} variant="secondary" />
        </div>

        <div className="goal-card">
          <h3>Read Harry Potter</h3>
          <ProgressBar now={10} variant="secondary" />
        </div>

        <div className="goal-card">
          <h3>Financial Report</h3>
          <ProgressBar now={90} variant="secondary" />
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