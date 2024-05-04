import React, { useState, useEffect } from 'react';
import axios from "axios";
import './login.css'

export default function Login({ loggedIn, setUser, addAccount }) { 
    //Variable for enterd Username
    const [usernameValue, setUsernameValue] = useState("Karl")
    const searchUsername = (event) => {
        setUsernameValue(event.target.value);
        setLoginError("")
    }

    //Variable for enterd Password
    const [passwordValue, setPasswordValue] = useState("1234")
    const searchPassword = (event) => {
        setPasswordValue(event.target.value);
        setLoginError("")
    }

    //Variable for Error Message
    const [loginError, setLoginError] = useState("")

    const [user, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from server when component mounts
        axios.get(`http://127.0.0.1:5000/data/${usernameValue}`)
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
          });
    }, []);

    //checking Login Data
    function checkLoginData(){
        const password = user ? user.password : ""                          //Getting account password 
        if (usernameValue == "" || passwordValue == ""){                    // checking if smth is entered
            setLoginError("Please Enter an Username or Password")           //if not give Error
        } else { 
            setLoginError("")
            if (passwordValue == password) {                                //checking if passwords mathch
                loggedIn()                                                  //logging Account in
                setUser(user.username)                                      //sending Username to App.jsx
            } else {
                setLoginError("Username and password do not match")         //if not give Error
            }
        }
    }

  return (
    <div className='login_page'>
        <div>
           <p className='login_text'>It seems like you aren't logged in or you don't have an Account</p>
        </div>
        <div>
            <div className='login'>
                <input type='text' placeholder='Username' value={usernameValue} onChange={searchUsername} className='login_input'/>
                <input type='password' placeholder="Password" value={passwordValue} onChange={searchPassword} className='login_input'/>
                <div className='login_error'>
                    {loginError}
                </div>
                <button onClick={checkLoginData}>
                    Log In
                </button>
            </div>
            <p style={{margin: "0"}}>Do not have an account?</p>
            <button onClick={addAccount}>
                Sign In
            </button>
        </div>
    </div>
  );
}
