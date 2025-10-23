import React, {useState, useEffect} from 'react';
import './progress.css';

export function Progress() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const mockMessages = [
      "Peter completed task for 'Book Report'",
      "Lily added 'Save $500 for trip'",
      "Brooke completed task for 'Funding Project'"
    ];

    let index = 0;
    const interval = setInterval(() => {
      setUpdates((prev) => {
        const nextUpdate = mockMessages[index % mockMessages.length];
        index++
        return [nextUpdate, ...prev].slice(0,10);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="cream-bg text-dark">
      <h1>Group Progress Feed</h1>
      <div id="progress-feed">
        <h2>Live Group Activity</h2>
        <p>Updates appear every few seconds</p>
        <ul>
          {updates.map((update, i) => (
            <li key={i}>{update}</li>
          ))}
        </ul>
      </div>

    </main>
  );
}