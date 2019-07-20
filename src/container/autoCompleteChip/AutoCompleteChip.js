import React, { useState, useEffect }  from 'react';
import './AutoCompleteChip.css';
import AutoCompleteInput from '../autoComplete/AutoComplete';
import Chip from '../../components/chip/Chip';

const  AutoCompleteChip = ({ suggestions }) => {
  const [chips, setChips] = useState([]);
  const [autoSuggestions, setAutoSuggestions] = useState([]);
  const [chipSelected, setChipSelected] = useState(false);

  useEffect(() => {
    setAutoSuggestions(suggestions);
  }, [suggestions]);

  function addChip(chip) {
    if(chip && chips) {
      const id = chips.findIndex((s) => s.id === chip.id);
      if(id === -1) {
        setChips([...chips, chip]);
      }
      const suggestions = autoSuggestions.filter((s) => s.id !== chip.id);
      setAutoSuggestions(suggestions);
    }
    setChipSelected(false);
  }
  function handleRemove(e, chip) {
    if(chip && chips) {
      const tmpChips = chips.filter((s) => s.id !== chip.id);
      setChips(tmpChips);
      setAutoSuggestions([...autoSuggestions, chip]);
    }
    setChipSelected(false);
  }
  function handleChipSelected() {
    setChipSelected(true);
  }

  function handleRemoveChip(chip) {
    handleRemove('', chip);
  }

  function focusInput(e) {
    let children = e.target.children;
    if (children.length) {
      const wrapper = children[children.length - 1].children[0];
      if(wrapper) wrapper.focus();
    }
  }

  function renderUI() {
    let tmpChips = null;
    if(chips) {
      const lastChip = chips[chips.length -1];
      tmpChips = chips.map((chip, index) => {
        return (<Chip key={chip.id}
          chip={chip}
          lastChip={lastChip}
          selected={chipSelected}
          name={chip.name}
          handleRemove={handleRemove} />);
      });
    }
    return tmpChips;
  }

  return (
    <div className="chips" onClick={focusInput}>
      {renderUI()}
      <AutoCompleteInput
      suggestions={autoSuggestions}
      chips={chips}
      handleAddChip={addChip}
      handleRemoveChip={handleRemoveChip}
      chipSelected={handleChipSelected}/>
    </div>
  );
}

export default AutoCompleteChip;