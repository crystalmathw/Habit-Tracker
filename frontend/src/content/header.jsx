import React from 'react';
import "./header.css"

export default function Header({isLoggedIn}) {
  return (
    <header className='header'>
        <h1 id='header_text'>YourHabits</h1>
        <div className='profile'>
        <button className='loginState' onClick={() => {
          if (isLoggedIn) {
            localStorage.removeItem("username");
            window.location.reload();
          }
          }}>{isLoggedIn ? "Logout" : "Login"} </button>
        </div>
    </header>
  );
}