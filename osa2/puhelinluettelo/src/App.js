import React from 'react';
import AllPersons from './components/AllPersons'
import Filter from './components/Filter'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: 'syötä nimi...',
      newNumber: 'syötä numero...',
      filter:'',
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        this.setState({ persons: response.data })
      })

  }

  handleNewName = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNewNumber = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilter = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value})
  }

  addPerson = (event) => {
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
        <Filter filter={this.state.filter} handleFilter={this.handleFilter} />
        <h3>Lisää uusi: </h3>
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
        <AllPersons personList={this.state.persons} filter={this.state.filter}/>
      </div>
    )
  }
}

export default App