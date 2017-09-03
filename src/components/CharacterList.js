import React from 'react';
import PropTypes from 'prop-types';
import { charClasses, charRaces } from '../utils/constants';

export default function CharacterList({ characters, handleClick }) {
  return (
    <ul>
      {characters.map(({ charRace, charClass, charName, charNum }, i) => {
        return (
          <li key={i}>
            {charRaces[charRace]} {charClasses[charClass]} {charName}
            <button onClick={() => handleClick(i)}>
              nope {charNum}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

CharacterList.propTypes = {
  characters: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
};
