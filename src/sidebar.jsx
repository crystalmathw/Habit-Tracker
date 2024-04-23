import React from 'react';
import "./sidebar.css"

export default function Sidebar({ loadHome, loadHabits, loadGoals,  loadJournal, login }) {
  return (
    <sidebar className="sidebar">
      <div>
        <div>
          <button className='sidebar_button' onClick={loadHome}>
            <img src='/Home.svg' width={35} className='sidebar_img'></img>
            Home
          </button>
        </div>  
        <div>
          <button className='sidebar_button' onClick={loadHabits}>
            <img src='/Habits.svg' width={35} className='sidebar_img'></img>
            Your Habits
          </button>
        </div> 
        <div>
          <button className='sidebar_button' onClick={loadGoals}>
            <img src='/Goals.svg' width={35} className='sidebar_img'></img>
            Your Goals
          </button>
        </div> 
        <div>
          <button className='sidebar_button' onClick={loadJournal}>
            <img src='/Journal.svg' width={35} className='sidebar_img'></img>
            Journal
          </button>
        </div>
        <div>
          <button onClick={login}>
            Login
          </button>
        </div>
      </div>
    </sidebar>
  );
}