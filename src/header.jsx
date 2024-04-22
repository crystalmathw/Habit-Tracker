import React from 'react';
import "./header.css"

export default function Header() {
  return (
    <header className='header'>
        <h1 id='header_text'>YourHabits</h1>
        <div className='profile'>
          <p>Profile</p>
        </div>
    </header>
  );
}