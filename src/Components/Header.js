import React from 'react';

export default function Header(prop) {
  const title = prop.title;
  const subtitle = prop.subtitle;

  return (
    <header>
      <div className="index-container">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </header>
  );
}