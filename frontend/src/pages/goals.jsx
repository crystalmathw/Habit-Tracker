import React, { useState, useEffect } from "react";
import axios from "axios";
import "./goals.css";

export default function Goals({ username, loading, loadGoals }) {
  const [userData, setUserData] = useState(null); //getting UserData from username
  useEffect(() => {
    // Fetch user data from server when component mounts
    axios
      .get(`http://127.0.0.1:5000/data/${username}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const [error, setError] = useState(false);

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  function deleteGoals(id) {
    userData.goals.content.splice(id - 1, 1);
    loading();
    setTimeout(function () {
      loadGoals();
    }, 200);
    axios.put(`http://127.0.0.1:5000/data/${username}/delete/goals`, userData);
  }

  function completedGoals(goal) {
    if (
      Math.floor(getDifferenceInDays(new Date(), new Date(goal.startDate))) ===
      goal.goal
    ) {
      return (
        <div className="goals_goal_completed">
          Progress: Completed ✓
          <progress
            value="1"
            max="1"
            className="goals_progress_completed"
          ></progress>
        </div>
      );
    } else {
      return (
        <div className="goals_goal">
          Progress:{" "}
          {Math.floor(
            getDifferenceInDays(new Date(), new Date(goal.startDate))
          )}
          /{goal.goal}
          <progress
            value={Math.floor(
              getDifferenceInDays(new Date(), new Date(goal.startDate))
            )}
            max={goal.goal}
            className="goals_progress"
          ></progress>
        </div>
      );
    }
  }
  //rendering userGoals
  function renderGoals() {
    if (userData == null) {
      return null;
    } else {
      if (userData.goals.content.length === 0) {
        return (
          <div>
            <p className="goals_404_text">
              Despite our efforts, nothing here yet, but perseverance fuels the
              journey forward.
            </p>
            <div className="goals_404_img">
              <img src="/error404.png" width={100}></img>
            </div>
          </div>
        );
      } else {
        const userGoals = userData.goals.content; //getting Goals from UserData

        const listItems = userGoals.map((goal) => (
          <div key={goal.id} className="goals_list_element">
            <div className="goals_name">
              {goal.name}
              <button
                className="goals_delete"
                onClick={() => deleteGoals(goal.id)}
              >
                <img src="/delete.svg" width={20}></img>
              </button>
            </div>
            {completedGoals(goal)}
          </div>
        ));
        return listItems;
      }
    }
  }

  const [addGoal, setAddGoal] = useState(false);
  function opened() {
    setAddGoal(true);
  }

  function closed() {
    setAddGoal(false);
  }

  var goalMenu = null;
  if (addGoal == true) {
    goalMenu = (
      <div className="goals_add_goal">
        <div>
          <div className="goals_add_goal_header">
            <p className="goals_add_goal_text">Add a new Goal</p>
            <button className="goals_add_goal_close" onClick={closed}>
              X
            </button>
          </div>
          <div className="goals_add_menue">
            <label>
              Name:
              <input
                className="goals_add_input"
                id="goals_input_name"
                type="text"
                placeholder="Enter the Name of the Goal" />
            </label>
            <label>
              Goal:
              <input
                className="goals_add_input"
                id="goals_input_goal"
                type="number"
                min={1}
                placeholder="Enter the Goal in Days" />
            </label>
          </div>
          <div className="error">{error}</div>
          <button className="goals_add_goal_button" onClick={addGoalData}>
            Add Goal
          </button>
        </div>
      </div>
    );
  } else if (addGoal == false) {
    goalMenu = null;
  }

  function addGoalData() {
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dateString =
      currentYear +
      "-" +
      (currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1) +
      "-" +
      (currentDayOfMonth < 10 ? "0" + currentDayOfMonth : currentDayOfMonth);

    var goalName = document.getElementById("goals_input_name").value;
    var goalGoal = document.getElementById("goals_input_goal").value;
    if (goalGoal == "" || goalName == "") {
      setError("Please enter a name or goal");
    } else {
      var goal = {
        id: userData.goals.content.length + 1,
        name: goalName,
        goal: parseInt(goalGoal),
        startDate: dateString,
      };
      console.log(goal);
      closed();
      loading();
      setTimeout(function () {
        loadGoals();
      }, 200);
      axios.put(`http://127.0.0.1:5000/data/${username}/goals`, goal);
    }
  }

  return (
    <div className="goals">
      <div className="goals_bar">
        <p id="goals_bar_text">Your Goals </p>
        <button className="goals_add" onClick={opened}>
          <img src="../../public/Add.svg" width={25} />
        </button>
      </div>
      {goalMenu}
      <ul className="goals_list">{renderGoals()}</ul>
    </div>
  );
}
