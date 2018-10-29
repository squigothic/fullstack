import React from 'react';
import AllPersons from './components/AllPersons'
import Filter from './components/Filter'
import personService from './services/persons'

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
    personService
      .getAll()
      .then(response => {
        console.log('haettiin henkilöitä vitusti')
        console.log(response)
        this.setState({ persons: response })
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
      personService
        .create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response),
            newName: '',
            newNumber: '',
          })
        })
    }
  }

  deletePerson = (id) => {
    return () => {
      console.log(`pyritään deletoimaan ${id} henkilö`)
      personService
        .deletePerson(id)
        .then(response => {
          this.setState({ persons: this.state.persons.filter(person => person.id !== id)})
        })
    }
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
        <AllPersons 
          personList={this.state.persons} 
          filter={this.state.filter} 
          deletePerson={this.deletePerson}
        />
      </div>
    )
  }
}

export default App