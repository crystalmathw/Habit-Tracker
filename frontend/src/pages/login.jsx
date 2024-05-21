import React, { useState } from "react";
import axios from "axios";
import "./login.css";

export default function Login({ loggedIn, setUser, addAccount }) {
  //Variable for enterd Username
  const [usernameValue, setUsernameValue] = useState("Karl");
  const searchUsername = (event) => {
    setUsernameValue(event.target.value);
    setLoginError("");
  };

  //Variable for enterd Password
  const [passwordValue, setPasswordValue] = useState("Groß");
  const searchPassword = (event) => {
    setPasswordValue(event.target.value);
    setLoginError("");
  };

  //Variable for Error Message
  const [loginError, setLoginError] = useState("");

  var user = {};

  function getData() {
    axios.get(`http://127.0.0.1:5000/data/${usernameValue}`)
      .then((response) => {
        user = response.data;
        const password = user ? user.password : ""; //Getting account password
        checkLoginData(password)
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoginError("Please Enter an Username or Password")
      });
  }
  //checking Login Data
  function checkLoginData(password) {
    if (usernameValue == "" || passwordValue == "") {
      // checking if smth is entered
      setLoginError("Please Enter an Username or Password"); //if not give Error
    } else {
      setLoginError("");
      if (passwordValue == password) {
        //checking if passwords match
        loggedIn(); //logging Account in
        setUser(user.username); //sending Username to App.jsx
      } else {
        setLoginError("Username and password do not match"); //if not give Error
      }
    }
  }

  return (
    <div className="login_page">
      <div>
        <p className="login_text">
          It seems like you aren't logged in or you don't have an Account
        </p>
      </div>
      <div>
        <div className="login">
          <input
            type="text"
            placeholder="Username"
            value={usernameValue}
            onChange={searchUsername}
            className="login_input"
          />
          <input
            type="password"
            placeholder="Password"
            value={passwordValue}
            onChange={searchPassword}
            className="login_input"
          />
          <div className="login_error">{loginError}</div>
          <button onClick={getData}>
            Log In
          </button>
        </div>
        <p style={{ margin: "0" }}>Do not have an account?</p>
        <button onClick={addAccount}>Register</button>
      </div>
    </div>
  );
}
