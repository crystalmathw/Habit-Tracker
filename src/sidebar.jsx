import React from 'react';
import "./sidebar.css"

export default function Header() {
  return (
    <sidebar className="sidebar">
      <div>
        <div>
          <button className='sidebar_button'>
            <img src='/Home.svg' width={35} className='sidebar_img'></img>
            Home
            </button>
        </div>  
        <div>
        <button className='sidebar_button'>
            <img src='/Habits.svg' width={35} className='sidebar_img'></img>
            Your Habits
            </button>
        </div> 
        <div>
        <button className='sidebar_button'>
            <img src='/Goals.svg' width={35} className='sidebar_img'></img>
            Your Goals
            </button>
        </div> 
        <div>
        <button className='sidebar_button'>
            <img src='/Journal.svg' width={35} className='sidebar_img'></img>
            Journal
            </button>
        </div> 
      </div>
    </sidebar>
  );
}