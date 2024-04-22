import React from 'react';

export default function Header() {
  return (
    <sidebar>
      <div className="sidebar">
        <div>
          <div>
            <a className="sidebar_link" href="home.html">
              <p className="sidebar_text">Home</p>
            </a>
          </div>  
          <div>
            <a className="sidebar_link" href="habits.html">
              <p className="sidebar_text">Your Habits</p>
            </a>
          </div> 
          <div>
            <a className="sidebar_link" href="goals.html">
              <p className="sidebar_text">Your Goals</p>
            </a>
          </div> 
          <div>
            <a className="sidebar_link" href="journal.html">
              <p className="sidebar_text">Journal</p>
            </a>
          </div> 
        </div>
      </div>
    </sidebar>
  );
}