import React, { useState, useEffect } from "react";
import axios from "axios";
import "./habits.css";

export default function Habits({ username, loading, loadHabits }) {
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

  function deleteHabits(id) {
    userData.habits.content.splice(id - 1, 1);
    loading();
    setTimeout(function () {
      loadHabits();
    }, 200);
    axios.put(`http://127.0.0.1:5000/data/${username}/delete/habits`, userData);
  }

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24);
  }

  function date(date, euStyle) {
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    if (euStyle === true) {
      return (
        (dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth) +
        "." +
        (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
        "." +
        year
      );
    } else {
      return (
        year +
        "-" +
        (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
        "-" +
        (dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth)
      );
    }
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function removeDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  function addMonths(date) {
    var result = new Date(date);
    result.setMonth(result.getMonth() + 1);
    return result;
  }

  function addYears(date) {
    var result = new Date(date);
    result.setFullYear(result.getFullYear() + 1);
    return result;
  }

  var frequency = "";

  function checkFrequency(habit) {
    if (habit.frequency == "monthly") {
      frequency = getDifferenceInDays(
        new Date(addMonths(habit.lastTimeDue)),
        new Date(habit.lastTimeDue)
      );
    } else if (habit.frequency == "yearly") {
      frequency = getDifferenceInDays(
        new Date(addYears(habit.lastTimeDue)),
        new Date(habit.lastTimeDue)
      );
    } else frequency = habit.frequency;
  }

  function habitDone(habit) {
    var habit = {
      id: habit.id,
      name: habit.name,
      frequency: habit.frequency,
      lastTimeDue: date(new Date(), false),
      nextTimeDue: date(addDays(new Date(), parseInt(frequency)), false),
      history: [...habit.history],
    };

    if (habit.history.length === 0) {
      habit.history.push({
        date: date(new Date(), false),
        done: true,
      });
    } else {
      if (
        habit.history[habit.history.length - 1].date == date(new Date(), false)
      ) {
        habit.history[habit.history.length - 1].done = true;
      } else {
        habit.history.push({
          date: date(new Date(), false),
          done: true,
        });
      }
    }

    userData.habits.content[habit.id - 1] = habit;
    loading();
    setTimeout(function () {
      loadHabits();
    }, 400);
    axios.put(
      `http://127.0.0.1:5000/data/${username}/habits/history`,
      userData
    );
  }

  function habitUndo(habit) {
    var habit = {
      id: habit.id,
      name: habit.name,
      frequency: habit.frequency,
      lastTimeDue: date(removeDays(new Date(), parseInt(frequency)), false),
      nextTimeDue: date(new Date(), false),
      history: [...habit.history],
    };

    habit.history[habit.history.length - 1].done = false;

    userData.habits.content[habit.id - 1] = habit;
    loading();
    setTimeout(function () {
      loadHabits();
    }, 200);
    axios.put(
      `http://127.0.0.1:5000/data/${username}/habits/history`,
      userData
    );
  }

  function habitOverdue(habit) {
    var habit = {
      id: habit.id,
      name: habit.name,
      frequency: habit.frequency,
      lastTimeDue: habit.nextTimeDue,
      nextTimeDue: date(
        addDays(new Date(habit.nextTimeDue), parseInt(frequency)),
        false
      ),
      history: [...habit.history],
    };

    habit.history.push({
      date: habit.lastTimeDue,
      done: false,
    });

    userData.habits.content[habit.id - 1] = habit;
    loading();
    setTimeout(function () {
      loadHabits();
    }, 400);
    axios.put(
      `http://127.0.0.1:5000/data/${username}/habits/history`,
      userData
    );
  }

  //last time one bzw next time due maybe change struckture
  function habitCheck(habit) {
    checkFrequency(habit);
    if (habit.nextTimeDue == date(new Date(), false)) {
      return (
        <div className="habits_habit_NOTcheck">
          <div>Due next time: Today</div>
          <div>
            Complete Habit:
            <input
              id={"HabitCheckmark" + habit.id}
              type="checkbox"
              onChange={() => {
                habitDone(habit);
              }} //add function to check habit  and update nextTimeDue
            />
          </div>
        </div>
      );
    } else if (habit.nextTimeDue < date(new Date(), false)) {
      habitOverdue(habit);
    } else {
      //if last time due is in the past
      //show next time due
      if (habit.lastTimeDue < date(new Date(), false)) {
        return (
          <div className="habits_habit">
            <div>Due next time: {habit.nextTimeDue}</div>
          </div>
        );
      } else {
        return (
          <div className="habits_habit_check">
            <div>Due next time: {date(new Date(habit.nextTimeDue), true)} </div>
            <div>
              Complete Habit:
              <input
                id={"HabitCheckmark" + habit.id}
                type="checkbox"
                checked={true}
                onChange={() => {
                  habitUndo(habit);
                }}
              />
            </div>
          </div>
        );
      }
    }
  }

  //rendering userHabits
  function renderHabits() {
    if (userData == null) {
      return null;
    } else {
      if (userData.habits.content.length === 0) {
        return (
          <div>
            <p className="habits_404_text">
              Within the void of creation, nothingness holds the potential for
              infinite wonders yet to be unveiled.
            </p>
            <div className="habits_404_img">
              <img src="/error404.png" width={100}></img>
            </div>
          </div>
        );
      } else {
        const userHabits = userData.habits.content; //getting Habits from UserData
        const listItems = userHabits.map((habit) => (
          <div key={habit.id} className="habits_list_element">
            <div className="habits_name">
              {habit.name}
              <button
                className="habits_delete"
                onClick={() => deleteHabits(habit.id)}
              >
                <img src="/delete.svg" width={20}></img>
              </button>
            </div>
            {habitCheck(habit)}
          </div>
        ));
        return listItems;
      }
    }
  }

  const [addHabit, setAddHabit] = useState(false);
  function opened() {
    setAddHabit(true);
  }

  function closed() {
    setAddHabit(false);
  }

  function customFrequency() {
    if (document.getElementById("habits_select_frequency") == null) {
      return null;
    } else {
      if (
        document.getElementById("habits_select_frequency").value == "custom"
      ) {
        return (
          <label className="habits_add_label_input">
            <input
              className="habits_add_input"
              id="habits_input_custom"
              type="number"
              placeholder="Enter the Frequency in Days"
            />
          </label>
        );
      } else {
        return null;
      }
    }
  }

  var habitMenu = null;
  if (addHabit == true) {
    habitMenu = (
      <div className="habits_add_habit">
        <div>
          <div className="habits_add_habit_header">
            <p className="habits_add_habit_text">Add a new Habit</p>
            <button className="habits_add_habit_close" onClick={closed}>
              X
            </button>
          </div>
          <div className="habits_add_menu">
            <label className="habits_add_label_input">
              Name:
              <input
                className="habits_add_input"
                id="habits_input_name"
                type="text"
                placeholder="Enter the Name of the Habit"
              />
            </label>
            <label className="habits_add_label_select">
              Frequency:
              <select
                className="habits_add_select"
                id="habits_select_frequency"
              >
                <option value="1">Daily</option>
                <option value="7">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                {/*<option value="custom">Custom</option>*/}
              </select>
            </label>
            {/*customFrequency()*/}
          </div>
          <div className="error">{error}</div>
          <button className="habits_add_habit_button" onClick={addHabitData}>
            Add habit
          </button>
        </div>
      </div>
    );
  } else if (addHabit == false) {
    habitMenu = null;
  }

  function addHabitData() {
    const date = new Date();
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const currentYear = date.getFullYear();

    const dateString =
      currentYear +
      "-" +
      (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
      "-" +
      (dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth);

    var habitName = document.getElementById("habits_input_name").value;
    var habitFrequency = () => {
      if (
        document.getElementById("habits_select_frequency").value == "custom"
      ) {
        return document.getElementById("habits_input_custom").value;
      } else {
        return document.getElementById("habits_select_frequency").value;
      }
    };
    var habitStartDate = dateString;

    if (habitName == "") {
      setError("Please enter a Name for your Habit");
    } else {
      var habit = {
        id: userData.habits.content.length + 1,
        name: habitName,
        frequency: habitFrequency(),
        lastTimeDue: habitStartDate,
        nextTimeDue: habitStartDate,
        history: [],
      };
      closed();
      loading();
      setTimeout(function () {
        loadHabits();
      }, 200);
      axios.put(`http://127.0.0.1:5000/data/${username}/habits`, habit);
    }
  }

  return (
    <div className="habits">
      <div className="habits_bar">
        <p id="habits_bar_text">Your Habits </p>
        <button className="habits_add" onClick={opened}>
          <img src="../../public/Add.svg" width={25} />
        </button>
      </div>
      {habitMenu}
      <ul className="habits_list">{renderHabits()}</ul>
    </div>
  );
}
