import { useState } from 'react';
import './App.css'
import Header from "./header"
import Sidebar from "./sidebar"
import Footer from "./footer"
import Home from "./pages/home"
import Habits from './pages/habits';
import Goals from "./pages/goals";
import Journal from "./pages/journal"
import Login from "./pages/login"
import { Simulate } from 'react-dom/test-utils';

export default function App() {
  const [page, setPage] = useState(1);
  const [isLogin, setLogin] = useState(false); 
  const [username, setUsername] = useState("Profile")

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

  function setUser(user) {
    setUsername(user)
  }

  let content
  if (isLogin === false){
    content = <Login loggedIn={loggedIn} setUser={setUser} />
  } else {
    if (page === 1) {
      content = <Home />
    } else if (page === 2){
      content = <Habits />
    } else if (page === 3){
      content = <Goals />
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
