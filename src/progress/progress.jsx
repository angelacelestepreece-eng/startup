import React, { useState, useEffect } from 'react';
import './progress.css';
import { GoalNotifier, GoalEvent } from './goalNotifier';

export function Progress() {
  const [serverUpdates, setServerUpdates] = useState([]);

  useEffect(() => {
    const loadServerUpdates = () => {
      fetch('/api/progress')
        .then(res => res.json())
        .then(data => {
          const formatted = data.map(item => item.msg);
          setServerUpdates(formatted);
        })
        .catch(err => console.error(err));
    };

    loadServerUpdates();
    const serverInterval = setInterval(loadServerUpdates, 5000);

    const handleGoalEvent = (event) => {
      let msg = '';
      if (event.type === GoalEvent.Added) {
        msg = `${event.from} added "${event.value.goal.name}"`;
      } else if (event.type === GoalEvent.Updated) {
        msg = `${event.from} updated progress on "${event.value.index}"`;
      } else if (event.type === GoalEvent.Deleted) {
        msg = `${event.from} deleted a goal`;
      } else if (event.type === GoalEvent.System) {
        msg = event.value.msg;
      }
      if (msg) {
        setServerUpdates(prev => [msg, ...prev]);
      }
    };
    GoalNotifier.addHandler(handleGoalEvent);

    return () => {
      clearInterval(serverInterval);
      GoalNotifier.removeHandler(handleGoalEvent);
    };
  }, []);

  const latestTen = serverUpdates.slice(0, 10);

  return (
    <main className="cream-bg text-dark">
      <h1>Group Progress Feed</h1>
      <div id="progress-feed">
        <h2>Live Group Activity</h2>
        <p>Updates appear automatically</p>
        <ul>
          {latestTen.map((update, i) => (
            <li key={i}>{update}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
