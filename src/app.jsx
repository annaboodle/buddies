import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/index.scss';
import { charClasses, charRaces } from './utils/constants';

import ButtonTrait from './components/ButtonTrait';
import CharacterList from './components/CharacterList';
import HeaderBlock from './components/HeaderBlock';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      characters: [],
      charClass: 0, // index of the value in the corresponding array
      charName: "",
      charRace: 0, // index of the value in the corresponding array
    };

    this.addCharacter = this.addCharacter.bind(this);
    this.changeClass = this.changeClass.bind(this);
    this.changeRace = this.changeRace.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  // this takes in a string that determines what property it updates

  addCharacter() {const { characters, charName, charRace, charClass } = this.state;
    const newItem = { charName, charRace, charClass };


    this.setState({
      characters: [...characters, newItem],
      charName: "",
    });
  }

  changeClass() {
    this.setState({
      charClass: this.randomIndexGenerator(charClasses.length, this.state.charClass),
    });
  }

  changeRace() {
    this.setState({
      charRace: this.randomIndexGenerator(charRaces.length, this.state.charRace),
    });
  }

  deleteItem(index) {
    console.log(this);
    const newCharacters = this.state.characters.filter((el, i) => index !== i);

    this.setState({
      characters: newCharacters,
    });
  }

  keyPressed(event){
    if (event.key === "Enter"){
      event.preventDefault();
      this.addCharacter();
    }
  }

  randomIndexGenerator(lengthOfArray, currentIndex) {
    const newIndex = Math.floor(Math.random() * lengthOfArray);
    return newIndex !== currentIndex
      ? newIndex
      : this.randomIndexGenerator(lengthOfArray, currentIndex);
  }

  updateName(newName){
    this.setState({
      charName: newName
    });
  }

  render() {
    const { characters, charClass, charName, charRace } = this.state;
    return (
      <div>

        <HeaderBlock>
          The headline goes here
        </HeaderBlock>

        <CharacterList
          characters={characters}
          handleClick={this.deleteItem}
        />

        <ButtonTrait
          value={charClasses[charClass]}
          handleClick={this.changeClass}
        />

        <ButtonTrait
          value={charRaces[charRace]}
          handleClick={this.changeRace}
        />

        <CharacterNameInput
          nameValue={charName}
          onNameChange={this.updateName}
          handleKeyPress={this.keyPressed}
        />

        <ButtonSubmit
          handleClick={this.addCharacter}
        />

      </div>

    )
  }
}

class CharacterNameInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { value } }) {
    this.props.onNameChange(value);
  }

  render() {
    const { handleKeyPress, nameValue } = this.props;
    return (
      <div>
        <p>
          {nameValue}
        </p>
        <input
          type="text"
          value={nameValue}
          onChange={this.handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
    )
  }
}

function ButtonSubmit({ handleClick }){
  return (
    <button className="button--submit" onClick={handleClick}>
      Done
    </button>
  )
}



