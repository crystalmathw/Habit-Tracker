import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./journal.css"

export default function Journal({username, loading, loadJournal}) {
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
  
  const [error, setError] = useState(false)

  function deleteJournal(id){
    userData.journal.content.splice(id-1, 1);
    loading()
    setTimeout(function(){
      loadJournal()
    }, 200);
    axios.put(`http://127.0.0.1:5000/data/${username}/delete/journal`, userData)
  }

  function renderJournal() {
    if (userData == null) {
      return null
    } else {
      if (userData.journal.content.length === 0){
        return (
          <div>
            <p className='journal_404_text'>Nothing here yet, but the possibilities are infinite.</p>
            <div className= "journal_404_img">
              <img src='/error404.png' width={100}></img>
            </div>
          </div>
        )
      } else {
        const userJournal = userData.journal.content
        const listItems = userJournal.map(journal =>
        <div key={journal.id} className='journal_list_element'>
          <div className='journal_date'>
            {journal.date}
            <button className='journal_delete' onClick={() => deleteJournal(journal.id)}>
              <img src='/delete.svg' width={20}></img>
            </button>
          </div>
          <div className='journal_entry'>
          {journal.entry}
          </div>
        </div>
        );
        return listItems
      }
    }
  }

  const [addEntry, setAddEntry] = useState(false)
  function opened(){
    setAddEntry(true)
  }

  function closed(){
    setAddEntry(false)
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }

  var entryMenu = (null)
  if (addEntry == true) {
    entryMenu = (
      <div className='journal_add_entry'>
        <div>
          <div className='journal_add_entry_header'>
            <p className='journal_add_entry_text'>Add a new Journal Entry</p>
            <button className='journal_add_entry_close' onClick={closed}>X</button>
          </div>
          
          <div id="journal_input" className='journal_add_entry_input' contentEditable onKeyDown={handleKeyPress}></div>
          <div className='error'>
            {error}
          </div>
          <button className='journal_add_entry_button' onClick={addJournalEntry}>Add Entry</button>
        </div>
      </div>
    )
  } else if (addEntry == false) {
    entryMenu = (null)
  }

  function addJournalEntry() {
    const currentDate = new Date();
    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const dateString = ((currentDayOfMonth < 10) ? "0" + currentDayOfMonth : currentDayOfMonth) + "." + (((currentMonth + 1) < 10) ? "0" + (currentMonth + 1) : (currentMonth + 1)) + "." + currentYear;
    var divEntry = document.getElementById("journal_input")
    var entryStr = divEntry.innerHTML
    console.log(entryStr)
    if (entryStr == "") {
      setError("Please enter a journal entry")
    } else {
      var entry = {
        "id": userData.journal.content.length + 1,
        "date": dateString,
        "entry": entryStr
      }
      closed()
      loading()
      setTimeout(function(){
        loadJournal()
      }, 200);
      axios.put(`http://127.0.0.1:5000/data/${username}/journal`, entry)
    }
  }

  return (
    <div className="journal">
      <div className="journal_bar">
        <p id="journal_bar_text">Journal </p>
        <button className='journal_add' onClick={opened}>            
          <img src='../../public/Add.svg' width={25}/>
        </button>
      </div>
      {entryMenu}
      <ul className='journal_list'>{renderJournal()}</ul>
    </div>
  );
}