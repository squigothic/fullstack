import React from 'react';
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: 'syötä nimi...',
      newNumber: 'syötä numero...'
    }
  }

  handleNewName = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNewNumber = (event) => {
    console.log(event.target.value)
    this.setState({ newNumber: event.target.value })
  }

  addPerson = (event) => {
    console.log(event.target)
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber,
    }
    const addedNames = this.state.persons.map(person => person.name)

    if (addedNames.includes(personObject.name)) {
      console.log('eipä lisättykään')
    } else {
      console.log('ei muka löytynyt duplikaatteja...')
      const persons = this.state.persons.concat(personObject)
      this.setState({ persons })
    }
    this.setState({ newName: ''})
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi:
            <input 
              value={this.state.newName} 
              onChange={this.handleNewName}
            />
            numero: 
            <input
              value={this.state.newNumber}
              onChange={this.handleNewNumber}
            />               
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Person personList={this.state.persons}/>
      </div>
    )
  }
}

export default App