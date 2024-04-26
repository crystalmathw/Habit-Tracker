import { useState } from 'react';
import './App.css'
import Header from "./content/header"
import Sidebar from "./content/sidebar"
import Footer from "./content/footer"
import Home from "./pages/home"
import Habits from './pages/habits';
import Goals from "./pages/goals";
import Journal from "./pages/journal"
import Login from "./pages/login"
import CreateAccount from "./pages/createAccount"
import { Simulate } from 'react-dom/test-utils';

export default function App() {
  const [page, setPage] = useState(1);
  const [isLogin, setLogin] = useState(false); 
  const [createAcc, setCreateAcc] = useState(false);
  const [username, setUsername] = useState("Profile")

// functions to load pages
  function loadHome() {
    setPage(1);
  }

  function loadHabits() {
    setPage(2);
  }

  function loadGoals() {
    setPage(3);
  }

  function loadJournal() {
    setPage(4);
  }

  function loggedIn() {
    setLogin(true);
  }

  function addAccount() {
    setCreateAcc(true);
  }

  function accCreated() {
    setCreateAcc(false);
  }
// function to set logged in Username
  function setUser(user) {
    setUsername(user)
  }

  let content
  //check if user is logged in or is creating an account
  if (isLogin === false && createAcc != true){
    content = <Login loggedIn={loggedIn} setUser={setUser} addAccount={addAccount}/>
  } else if (createAcc === true) {
    content = <CreateAccount loggedIn={loggedIn} setUser={setUser} accCreated={accCreated} />
  } else {
    //checking what page is active
    if (page === 1) {
      content = <Home />
    } else if (page === 2){
      content = <Habits username={username}/>
    } else if (page === 3){
      content = <Goals username={username}/>
    } else if (page === 4){
      content = <Journal />
    }
  }

  return (
    <main>
      <Header username={username}/>
      <div className='container'>
        <Sidebar loadHome={loadHome} loadHabits={loadHabits} loadGoals={loadGoals} loadJournal={loadJournal} />
        <div className="main">
          {content}
        </div>
      </div>
      <Footer />
    </main>
  )
}
