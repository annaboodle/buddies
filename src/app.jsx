import React from 'react';
import '../styles/index.scss';

const charClasses = [
  'Barbarian',
  'Bard',
  'Cleric',
  'Druid',
  'Fighter',
  'Wizard',
  'Monk',
  'Paladin',
  'Ranger',
  'Sorcerer',
  'Rogue',
  'Warlock'
]
const charRaces = [
  'Dragonborn',
  'Dwarf',
  'Elf',
  'Gnome',
  'Half-Elf',
  'Half-Orc',
  'Halfling',
  'Human',
  'Tiefling'
]

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      charName: "",
      charRace: 0, // index of the value in the corresponding array
      charClass: 0, // index of the value in the corresponding array
      characters: []
    }
  }

  // this takes in a string that determines what property it updates
  changeCharacterAttribute(aspect){
    if (aspect === "class") {
      this.setState({ 
        charClass: this.randomIndexGenerator(charClasses.length, this.state.charClass),
      });
    }
    else if (aspect === "race") {
      this.setState({ 
        charRace: this.randomIndexGenerator(charRaces.length, this.state.charRace),
      });
    }
  }

  randomIndexGenerator(lengthOfArray, currentIndex) {
    const newIndex = Math.floor(Math.random() * lengthOfArray);
    return newIndex !== currentIndex ? newIndex : this.randomIndexGenerator(lengthOfArray, currentIndex);
  }


  updateName(newName){
    this.setState({
      charName: newName
    });
  }

  keyPressed(event){
    if (event.key === "Enter"){
      event.preventDefault();
      this.addCharacter();
    }

  }

  addCharacter(){
    const newChar = {
      charName: this.state.charName,
      charRace: this.state.charRace,
      charClass: this.state.charClass,
    };

    this.state.characters.push(newChar);

    this.setState({
      charName: ""
    });

  }

  deleteItem(index){
    const charArray = this.state.characters.filter((el, i) => {
      return index !== i;
    });

    this.setState({
      characters: charArray,
    });
  }

  render() {
    return (
      <div>

        <HeaderBlock 
	      	headline="Assemble your buddies!" 
  	    />

        <CharacterList
          characters={this.state.characters}
          handleClick={(i) => this.deleteItem(i)}
        />

        <ButtonTrait 
          value={charClasses[this.state.charClass]}
          handleClick={() => this.changeCharacterAttribute("class")}
        />

        <ButtonTrait 
          value={charRaces[this.state.charRace]}
          handleClick={() => this.changeCharacterAttribute("race")}
        />

        <CharacterNameInput 
          nameValue={this.state.charName}
          onNameChange={(newName) => this.updateName(newName)}
          handleKeyPress={(event) => this.keyPressed(event)}
        />

        <ButtonSubmit
          handleClick={() => this.addCharacter()}
        />

      </div>

    )
  }
}

function CharacterList(props){
  return (
    <ul>
      {props.characters.map((character, i) => {
        return <li key={i}>
            {charRaces[character.charRace]} {charClasses[character.charClass]} {character.charName}
            <button onClick={() => props.handleClick(i)}>nope {character.charNum}</button>
        </li>
      })}
    </ul>
  );
}

function HeaderBlock(props){
  return (
    <div>
      <h1>{props.headline}</h1>
    </div>
  );
}

class CharacterNameInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let newName = e.target.value;
    this.props.onNameChange(newName);
  }

  render() {
    return (
      <div>
        <p>{this.props.nameValue}</p>
        <input
          type="text"
          value={this.props.nameValue}
          onChange={this.handleChange}
          onKeyPress={this.props.handleKeyPress}
        />
      </div>
    )
  }
}

function ButtonTrait(props){
  return (
    <button className="button--trait" onClick={props.handleClick}>
      {props.value}
    </button>
  )
}

function ButtonSubmit(props){
  return (
    <button className="button--submit" onClick={props.handleClick}>
      Done
    </button>
  )
}



