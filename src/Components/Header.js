import React from 'react';

export default function Header(prop) {
  const subtitle = prop.subtitle;

  return (
    <header>
      <div className="index-container">
        <h1>This Week's Results</h1>
        <h2>{subtitle}</h2>
      </div>
    </header>
  );
}