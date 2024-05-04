import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./habits.css"

export default function Habits( {username} ) {
  const [userData, setUserData] = useState(null)  //getting UserData from username
  useEffect(() => {
    // Fetch user data from server when component mounts
    axios.get(`http://127.0.0.1:5000/data/${username}`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);
                       
  //rendering userHabits
  function renderHabits() {
    if (userData == null) {
      return null
    } else {
      const userHabits = userData.habits.content //getting Habits from UserData
      const listItems = userHabits.map(habit =>
        <p key={habit.id}>
          {habit.name}
        </p>
      );
      return listItems
    }
  }

  return (
    <div className="habits">
      <div className="habits_bar">
        <p id="habits_bar_text">Your Habits </p>
      </div>
      <ul>{renderHabits()}</ul>
    </div>
  );
}