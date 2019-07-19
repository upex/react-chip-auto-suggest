import React from 'react';
import PropTypes from 'prop-types';
import './List.css';
import Avatar from '../avatar/Avatar';

const List = ({ items, activeSuggestion, handleOnClick }) => {
  return (
    <ul className="auto-suggest">
      {items.map((suggest, index) => {
        let activeClass = index === activeSuggestion ? 'active-suggestion' : '';
        return (
          <li
          key={suggest.id}
          className={`suggestion-list ${activeClass}`}
          onMouseDown={()=>handleOnClick(suggest)}>
           <Avatar name={suggest.name} />
           <label className="auto-suggest-name"><strong>{suggest.name}</strong> <em>{suggest.email}</em></label>
          </li>
          )
        }
      )}
    </ul>
  );
}
List.propTypes = {
  items: PropTypes.array.isRequired
};
export default List;