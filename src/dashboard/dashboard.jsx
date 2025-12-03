import React, { useState, useEffect } from 'react';
import './dashboard.css';
import { Form, Button, ProgressBar } from 'react-bootstrap';

function getMockGoalSuggestion() {
  return { goal: 'Read Pride and Prejudice' };
}

function loadGoals() {
  const stored = localStorage.getItem('goals');
  return stored ? JSON.parse(stored) : [];
}

function saveGoals(goals) {
  localStorage.setItem('goals', JSON.stringify(goals));
}

export function Dashboard({ userName }) {
  const [goals, setGoals] = useState(loadGoals());
  const [newGoal, setNewGoal] = useState('');
  const [suggestion] = useState(getMockGoalSuggestion());
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  useEffect(() => {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const ws = new WebSocket(`${protocol}://${window.location.hostname}:${window.location.port}/ws`);

    ws.onopen = () => console.log('WebSocket connected');
    ws.onclose = () => console.log('WebSocket disconnected');
    ws.onmessage = (msg) => {
      try {
        const event = JSON.parse(msg.data);
        if (event.type === 'goalAdded') {
          setGoals((prev) => [...prev, event.value.goal]);
        } else if (event.type === 'goalUpdated') {
          setGoals((prev) =>
            prev.map((g, i) =>
              i === event.value.index ? { ...g, progress: event.value.progress } : g
            )
          );
        } else if (event.type === 'goalDeleted') {
          setGoals((prev) => prev.filter((_, i) => i !== event.value.index));
        }
      } catch (err) {
        console.error('Invalid WebSocket message', err);
      }
    };

    setSocket(ws);
    return () => ws.close();
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    if (!newGoal.trim()) return;

    const response = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg: `${userName} added new goal '${newGoal}'` }),
    });

    if (response.ok) {
      const goalObj = { name: newGoal, progress: 0 };
      setGoals([...goals, goalObj]);
      setNewGoal('');

      socket?.send(JSON.stringify({ type: 'goalAdded', from: userName, value: { goal: goalObj } }));
    }
  };

  const handleProgressUpdate = async (index) => {
    const goal = goals[index];
    const response = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg: `${userName} updated progress on '${goal.name}'` }),
    });

    if (response.ok) {
      const newProgress = Math.min(goal.progress + 10, 100);
      setGoals((prevGoals) =>
        prevGoals.map((g, i) => (i === index ? { ...g, progress: newProgress } : g))
      );

      socket?.send(JSON.stringify({ type: 'goalUpdated', from: userName, value: { index, progress: newProgress } }));
    }
  };

  const handleDeleteGoal = async (index) => {
    const goal = goals[index];
    const response = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg: `${userName} deleted goal '${goal.name}'` }),
    });
    if (response.ok) {
      setGoals((prevGoals) => prevGoals.filter((_, i) => i !== index));
      socket?.send(JSON.stringify({ type: 'goalDeleted', from: userName, value: { index } }));
    }
  };

  return (
    <main className="cream-bg text-dark">
      <h1>GroupGoal Dashboard</h1>
      <p>Welcome, {userName}!</p>
      <div className="add_goal">
        <Form className="goal-form" onSubmit={handleAddGoal}>
          <Form.Label htmlFor="goal-name">New Goal:</Form.Label>
          <Form.Control
            type="text"
            id="goal-name"
            placeholder="Enter New Goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <Button type="submit" className="add-goal-btn mt-2">+ Add Goal</Button>
        </Form>
      </div>

      <section className="goal-list">
        {goals.map((goal, index) => (
          <div className="goal-card" key={index}>
            <h3>{goal.name}</h3>
            <ProgressBar now={goal.progress} variant="secondary" />
            <Button
              className="add-goal-btn mt-2 me-2"
              onClick={() => handleProgressUpdate(index)}
            >
              + Update Progress
            </Button>
            <Button
              variant="danger"
              className="mt-2"
              onClick={() => handleDeleteGoal(index)}
            >
              🗑 Delete Goal
            </Button>
          </div>
        ))}
      </section>
    </main>
  );
}
