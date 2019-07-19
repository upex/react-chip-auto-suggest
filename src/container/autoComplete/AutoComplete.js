import React, { useState, useEffect } from 'react';
import './AutoComplete.css';
import AutoInput from '../../components/autoInput/AutoInput';
import List from '../../components/list/List';

const  AutoComplete = ({inputRef, suggestions, chips, handleAddChip, handleRemoveChip, chipSelected }) => {
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autoInput, setAutoInput] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    setFilteredSuggestions(suggestions);
  }, [suggestions]);

  function getFilteredSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0 ? [] : suggestions.filter(s =>
      s.name.toLowerCase().indexOf(inputValue) !== -1);
  };

  function handleOnClick(suggestion) {
    handleAddChip(suggestion);
    setShowSuggestions(false);
    setActiveSuggestion(0);
    setAutoInput('');
    setCount(0);
  }
  function handleOnChange(e) {
    const autoInput = e.target.value || '';
    let filteredSuggestions
    if(autoInput) {
      filteredSuggestions = getFilteredSuggestions(autoInput);
    } else {
      filteredSuggestions = suggestions;
    }
    setActiveSuggestion(0);
    setFilteredSuggestions(filteredSuggestions);
    setShowSuggestions(true);
    setAutoInput(autoInput);
    setCount(0);
  }
  function handleOnFocus(e) {
    handleOnChange(e);
  }
  function handleOnBlur() {
    setShowSuggestions(false);
  }
  function handleOnKeyDown(e) {
    if (e.keyCode === 13) {
      const selecetdChip = filteredSuggestions[activeSuggestion];
      handleAddChip(selecetdChip);
      setShowSuggestions(true);
      setActiveSuggestion(0);
      setAutoInput('');
      setCount(0);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        setActiveSuggestion(filteredSuggestions.length - 1);
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    else if (e.keyCode === 40) {
      if (activeSuggestion === filteredSuggestions.length - 1) {
        setActiveSuggestion(0);
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    } else if (e.keyCode === 8) {
      setCount(count + 1);
      if (!e.target.value && chips.length && count > 0) {
        const selecetdChip = chips[chips.length - 1];
        handleRemoveChip(selecetdChip);
        setCount(0);
      } else {
        if (!e.target.value && chips.length) chipSelected();
      }
    }
  }

  function renderUI() {
    let suggestionsListComponent;
    if (showSuggestions) {
      if (filteredSuggestions.length) {
        suggestionsListComponent =(<List
          items={filteredSuggestions}
          activeSuggestion={activeSuggestion}
          handleOnClick={handleOnClick}
          />);
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No data available!</em>
          </div>
        );
      }
    }
    return  suggestionsListComponent;
  }
  return (
    <div className="auto-suggest-wrapper">
      <AutoInput
      placeholder="Start typing to add ..."
      handleOnChange={handleOnChange}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
      handleOnKeyDown={handleOnKeyDown}
      inputRef={inputRef}
      value={autoInput}/>
      <div className="suggestion-options">
      {renderUI()}
      </div>
    </div>
  );
}

export default AutoComplete;