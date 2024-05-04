import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Goals( {username} ) {
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
  
  //rendering userGoals
  function renderGoals() {
    if (userData == null) {
      return null
    } else {
      const userGoals = userData.goals.content //getting Goals from UserData
      const listItems = userGoals.map(goal =>
        <p key={goal.id}>
          {goal.name} <br/> Progress: {goal.progress}/{goal.goal}
        </p>
      );
      return listItems
    }
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