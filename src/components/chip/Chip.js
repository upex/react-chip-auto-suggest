import React from 'react';
import PropTypes from 'prop-types';
import './Chip.css';
import Avatar from '../avatar/Avatar';

const Chip = ({ chip, name, handleRemove, lastChip, selected }) => (
  <div className={`chip ${(selected && lastChip.id === chip.id) ? `chipSelected`: ``}`}>
    <div className="avatar"><Avatar name={name} /></div>
    <span className="chip-value">{name}</span>
    <button type="button"
    className={`chip-remove-button ${(selected && lastChip.id === chip.id)? `chipButtonSelected`: ``}`}
    onClick={(e) => handleRemove(e, chip)}>x</button>
  </div>
)
Chip.defaultProps = {
  name: PropTypes.string.isRequired
}
export default Chip;