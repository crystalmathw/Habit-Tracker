import React from 'react';
import users from "../../data/users.json"
import "./journal.css"

export default function Journal( {username}) {
  const userData = users.find((user) => user.username==username)  //getting UserData from username
  const userJournal = userData.journal.content

  function renderJournal() {
    const listItems = userJournal.map(journal =>
      <p key={journal.id} className='journal_list_element'>
        <div className='journal_date'>
          {journal.date}
        </div>
        <div className='journal_entry'>
        {journal.entry}
        </div>
      </p>
    );
    return listItems
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