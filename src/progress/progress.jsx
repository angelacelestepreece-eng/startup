import React from 'react';
import './progress.css';

export function Progress() {
  return (
    <main className="cream-bg text-dark">
      <h1>Group Progress Feed</h1>
      <div id="progress-feed">
        <h2>Live Group Activity</h2>
        <p>Placeholder: updates from WebSocket</p>
        <ul>
          <li>Peter completed task for 'Book Report'</li>
          <li>Lily added 'Save $500 for trip'</li>
          <li>Brooke completed task for 'Funding Project'</li>
        </ul>
      </div>

    </main>
  );
}