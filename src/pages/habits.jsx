import React from 'react';
import "./habits.css"
import users from "../../data/users"

export default function Habits( {username} ) {
  const userData = users.find((user) => user.username==username)  //getting UserData from username
  const userHabits = userData.habits.content                      //getting Habits from UserData
  
  //rendering userHabits
  function renderHabits() {
    const listItems = userHabits.map(habit =>
      <p key={habit.id}>
        {habit.name}
      </p>
    );
    return listItems
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