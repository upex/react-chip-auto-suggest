import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.css';

const Avatar = ({ name }) => (
  <img className="avatar-img" src={`https://ui-avatars.com/api/?name=${name}`} alt={name}/>
)
Avatar.defaultProps = {
  name: PropTypes.string.isRequired
}
export default Avatar;