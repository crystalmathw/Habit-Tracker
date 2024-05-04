import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./journal.css"

export default function Journal( {username}) {
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
  

  function renderJournal() {
    if (userData == null) {
      return null
    } else {
      const userJournal = userData.journal.content
      const listItems = userJournal.map(journal =>
      <div key={journal.id} className='journal_list_element'>
        <div className='journal_date'>
          {journal.date}
        </div>
        <div className='journal_entry'>
        {journal.entry}
        </div>
      </div>
      );
      return listItems
    }
  }


  return (
    <div className="journal">
      <div className="journal_bar">
        <p id="journal_bar_text">Journal </p>
      </div>
      <ul className='journal_list'>{renderJournal()}</ul>
    </div>
  );
}