import React, { useState } from 'react';
import users from "../../data/users"
import './login.css'

export default function Login({ loggedIn, setUser }) {
    const [usernameValue, setUsernameValue] = useState("")
    const searchUsername = (event) => {
        setUsernameValue(event.target.value);
        setLoginText("")
    }

    const [passwordValue, setPasswordValue] = useState("")
    const searchPassword = (event) => {
        setPasswordValue(event.target.value);
        setLoginText("")
    }

    const [loginText, setLoginText] = useState("")

    function checkLoginData(){
        const user = users.find((user) => user.username==usernameValue)
        const password = user ? user.password : ""
        if (usernameValue == "" || passwordValue == ""){
            setLoginText("Enter Username or Password")
        } else {
            setLoginText("")
            if (passwordValue == password) {
                loggedIn()
                setUser(user.username)
            } else {
                setLoginText("Username and password do not match")
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
                <input type='text' placeholder='Username' value={usernameValue} onChange={searchUsername} />
                <input type='password' placeholder="Password" value={passwordValue} onChange={searchPassword}/>
                <div className='login_error'>
                    {loginText}
                </div>
                <button onClick={checkLoginData}>
                    Login
                </button>
            </div>
            <button className='add_account'>
                Create Account
            </button>
        </div>
    </div>
  );
}
