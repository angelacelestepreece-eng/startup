import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Form, Button, ProgressBar } from 'react-bootstrap';

function getMockGoalSuggestion() {
  return{ goal: 'Read Pride and Prejudice' };
}

function loadGoals() {
  const stored = localStorage.getItem('goals');
  return stored ? JSON.parse(stored) : [];
}

function saveGoals(goals) {
  localStorage.setItem('goals', JSON.stringify(goals));
}

localStorage.setItem('userName','Tom');
const userName = localStorage.getItem('userName');

export function Dashboard() {
  const [goals, setGoals] = useState(loadGoals());
  const [newGoal, setNewGoal] = useState('');
  const [suggestion] = useState(getMockGoalSuggestion());

useEffect(() => {saveGoals(goals);}, [goals]);

useEffect(() => {
  const interval = setInterval(() => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        Math.random() < 0.3
        ? { ...goal, progress: Math.min(goal.progress + 5, 100)}
        : goal
      )
    );
  }, 3000);
  return () => clearInterval(interval);
}, []);

const handleAddGoal = async (e) => {
  e.preventDefault();
  if (!newGoal.trim()) return;

  const response = await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(`${userName} added new goal '${newGoal}'`),
  });

  if (response.ok) {
    setGoals([...goals, { name: newGoal, progress: 0 }]);
    setNewGoal('');
  }
};

const handleProgressUpdate = async (index) => {
  const goal = goals[index];
  const response = await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(`${userName} updated progress on '${goal.name}'`),
  });

  if (response.ok) {
    setGoals(prevGoals =>
      prevGoals.map((g, i) =>
        i === index ? { ...g, progress: Math.min(g.progress + 10, 100) } : g
      )
    );
  }
};


  return (
    <main className="cream-bg text-dark">
      <h1>GroupGoal Dashboard</h1>
      <p>Welcome, {userName}!</p>
      <div className="add_goal">
        <Form className="goal-form" onSubmit={handleAddGoal}>
          <Form.Label htmlFor="goal-name">New Goal:</Form.Label>
          <Form.Control type="text" id="goal-name" placeholder="Enter New Goal" value={newGoal} onChange={(e) => setNewGoal(e.target.value)}/>
          <Button type="submit" className="add-goal-btn mt-2">+ Add Goal</Button>
        </Form>
      </div>
      <section className="goal-list">
        {goals.map((goal, index) => (
          <div className="goal-card" key={index}>
            <h3>{goal.name}</h3>
            <ProgressBar now={goal.progress} variant="secondary" />
            <Button
              className="add-goal-btn mt-2"
              onClick={() => handleProgressUpdate(index)}>
              + Update Progress
            </Button>
          </div>
        ))}
      </section>

       <section id="goal-inspo">
        <h2>Goal Inspiration</h2>
          <p>This will show suggested goals from a third-party</p>
          <ul>
            <li>{suggestion.goal}</li>
          </ul>
       </section>
    </main>
  );
}