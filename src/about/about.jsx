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
        <p>This is where I will describe the purpose of the app.</p>
      </section>

      <section id="app-use">
        <h2>How to use GroupGoal</h2>
        <p>This is where I will describe how users actually use the app.</p>
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
