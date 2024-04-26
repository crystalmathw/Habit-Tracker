import React from 'react';
import users from "../../data/users"

export default function Goals( {username} ) {
  const userData = users.find((user) => user.username==username)  //getting UserData from username
  const userGoals = userData.goals.content                        //getting Goals from UserData
  
  //rendering userGoals
  function renderGoals() {
    const listItems = userGoals.map(goal =>
      <p key={goal.id}>
        {goal.name} <br/> Progress: {goal.progress}/{goal.goal}
      </p>
    );
    return listItems
  }

  return (
    <div>
      <div>
        <p>Your Goals </p>
      </div>
      <ul>{renderGoals()}</ul>
    </div>
  );
}