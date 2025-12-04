import React, { useState, useEffect } from 'react';
import './about.css';

export function About() {
  const [quote, setQuote] = useState('Loading...');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    fetch('https://quote.cs260.click')
      .then(res => res.json())
      .then(data => {
        setQuote(data.quote);
        setAuthor(data.author);
      })
      .catch(err => {
        console.error('Error fetching quote', err);
        setQuote('Could not load inspiration');
        setAuthor('');
      });
  }, []);

  return (
    <main className="container-fluid cream-bg text-center">
      <section id="app-description">
        <h2>Purpose</h2>
        <p>The Group Goal application is for users to 
           stay consistent and motivated towards achieving their goals 
           as a team. Users can set personalized goals for their group 
           and keep each other accountable. As users add progress towards goals, 
           the update is shared live with the group. With everyone 
           working together, goals can finally become reality.</p>
      </section>

      <section id="app-use">
        <h2>How to use GroupGoal</h2>
        <p>Step 1: Think of a goal you would like to work towards!</p>
        <p>Step 2: Add your goal to the Dashboard.</p>
        <p>Step 3: Update Progress as you work toward your goal.</p>
        <p>Step 4: Watch as others in your group contribute to the goals on the Progress page.</p>
        <p>Step 5: Complete your goal and repeat!</p>
      </section>

      <div id="picture" className="picture-box">
        <img width="400px" src="sunset.png" alt="random" />
      </div>

      <div className="quote-box bg-light text-dark mt-3">
        <p className="quote">"{quote}"</p>
        {author && <p className="author">— {author}</p>}
      </div>
    </main>
  );
}
