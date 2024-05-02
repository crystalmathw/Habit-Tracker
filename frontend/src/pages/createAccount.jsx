import React, { useState, useEffect } from 'react';
import "./createAccount.css"
import axios from "axios";

export default function CreateAccount({ loggedIn, setUser, accCreated }) {
    //Variable for enterd Username
    const [usernameValue, setUsernameValue] = useState("")
    const searchUsername = (event) => {
        setUsernameValue(event.target.value);
        setCreateAccountError("")
    }

    //Variable for enterd Password
    const [passwordValue, setPasswordValue] = useState("")
    const searchPassword = (event) => {
        setPasswordValue(event.target.value);
        setCreateAccountError("")
    }

    //Variable for Error Message
    const [CreateAccountError, setCreateAccountError] = useState("")

    const [users, setUserData] = useState(null);

    useEffect(() => {
        // Fetch user data from server when component mounts
        axios.get("../../data/users.json")
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => {
            console.error("Error fetching user data:", error);
          });
      }, []);

    //checking new Account Data
    function checkAccountData(){
        const user = users.find((user) => user.username==usernameValue)                 // get userData from Exsisting Account if Username is already used
        if (usernameValue == "" || passwordValue == ""){                                // checking if smth is entered
            setCreateAccountError("Please Enter an Username or Password")               //if not give Error
        } else if (user != undefined){                                                  //checking if Variable users is undefinded
            if (user.username == usernameValue) {                                       //checking if an Account with this Username already exsists
                setCreateAccountError("An Account with this Username already Exists")   //if not give Error
            } else {
                createAccountData()                                                     //Create Account Function
            }
        } else {
            createAccountData()                                                         //Create Account Function
        }
    }

    function createAccountData() {
        loggedIn()                      //logging Account in
        setUser(usernameValue)          //sending Username to App.jsx
        accCreated()                    //turning Account Creation off
        users[users.length] = {         //entering Userdata in Database
            "id": users.length,
            "username": usernameValue,
            "password" : passwordValue,
            "habits": {
                "count": 0,
                "content" : []    
            },
            "goals": {
                "count": 0,
                "content" : []  
            }
        }
        //write JSON document
        axios.post("../../data/users.json", users)
    }

  return (
    <div className='createAccount_page'>
        <div>
           <p className='createAccount_text'>Create an Account</p>
        </div>
        <div>
            <div className='createAccount'>
                <input type='text' placeholder='Username' value={usernameValue} onChange={searchUsername} className='createAccount_input'/>
                <input type='password' placeholder="Password" value={passwordValue} onChange={searchPassword} className='createAccount_input'/>
                <div className='createAccount_error'>
                    {CreateAccountError}
                </div>
                <button onClick={checkAccountData}>
                    Create Account
                </button>
            </div>
        </div>
    </div>
  );
}