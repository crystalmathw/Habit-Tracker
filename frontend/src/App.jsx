import { useState, } from 'react';
import './App.css'
import Header from "./content/header"
import Sidebar from "./content/sidebar"
import Footer from "./content/footer"
import Habits from './pages/habits';
import Goals from "./pages/goals";
import Journal from "./pages/journal"
import Login from "./pages/login"
import Loading from './pages/loading';
import CreateAccount from "./pages/createAccount"
import { Simulate } from 'react-dom/test-utils';

export default function App() {
  const [page, setPage] = useState(1);
  const [isLogin, setLogin] = useState(false); 
  const [createAcc, setCreateAcc] = useState(false);
  const [username, setUsername] = useState("Profile")

// functions to load pages

  function loadHabits() {
    setPage(1);
  }

  function loadGoals() {
    setPage(2);
  }

  function loadJournal() {
    setPage(3);
  }

  function loading() {
    setPage(4)
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
    if (page === 1){
      content = <Habits username={username} loading={loading} loadHabits={loadHabits}/>
    } else if (page === 2){
      content = <Goals username={username} loading={loading} loadGoals={loadGoals}/>
    } else if (page === 3){
      content = <Journal username={username} loading={loading} loadJournal={loadJournal}/>
    } else if (page === 4){
      content = <Loading/>
    }
  }

  return (
    <main>
      <Header username={username}/>
      <div className='container'>
        <Sidebar loadHabits={loadHabits} loadGoals={loadGoals} loadJournal={loadJournal} />
        <div className="main">
          {content}
        </div>
      </div>
      <Footer />
    </main>
  )
}
