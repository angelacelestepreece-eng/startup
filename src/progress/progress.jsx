import React, { useState, useEffect } from 'react';
import './progress.css';

export function Progress() {
  const [serverUpdates, setServerUpdates] = useState([]);
  const [mockUpdates, setMockUpdates] = useState([]);

  useEffect(() => {
    const loadServerUpdates = () => {
      fetch('/api/progress')
        .then(res => res.json())
        .then(data => {
          const formatted = data.map(item => item.msg).reverse();
          setServerUpdates(formatted);
        })
        .catch(err => console.error(err));
    };

    loadServerUpdates();
    const serverInterval = setInterval(loadServerUpdates, 5000);

    const mockMessages = [
      "Peter completed task for 'Book Report'",
      "Lily added 'Save $500 for trip'",
      "Brook completed task for 'Funding Project'",
    ];
    let index = 0;
    const mockInterval = setInterval(() => {
      const nextUpdate = mockMessages[index % mockMessages.length];
      index++;
      setMockUpdates(prev => [nextUpdate, ...prev].slice(0, 5)); // keep 5 mocks
    }, 3000);

    return () => {
      clearInterval(serverInterval);
      clearInterval(mockInterval);
    };
  }, []);

  const combined = [...mockUpdates, ...serverUpdates];
  const unique = Array.from(new Set(combined));
  const latestTen = unique.slice(0, 10);

  return (
    <main className="cream-bg text-dark">
      <h1>Group Progress Feed</h1>
      <div id="progress-feed">
        <h2>Live Group Activity</h2>
        <p>Updates appear every few seconds</p>
        <ul>
          {latestTen.map((update, i) => (
            <li key={i}>{update}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
