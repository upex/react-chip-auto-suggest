import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ChipInput from './container/autoCompleteChip/AutoCompleteChip';

const App = () => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);
  function getUsers() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(res => {
      setSuggestions(res.data);
    });
  }
  return (
    <>
    <div className="header">
      <h1>React chip input</h1>
    </div>
    <div className="App">
      <ChipInput
      suggestions={suggestions}
      />
    </div>
    </>
  );
}

export default App;
