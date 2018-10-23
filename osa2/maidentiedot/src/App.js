import React, { Component } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import AllCountries from './components/AllCountries'

class App extends Component {
  constructor() {
    super()
    this.state = {
      maat: [],
      filter: '',
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        this.setState({ maat: response.data })
      })
  }

  handleFilter = (event) => {
    console.log(event.target.value)
    this.setState({ filter: event.target.value})
  }

  setFilter = (newFilter) => {
    return () => {
      this.setState({ filter: newFilter})
    }
  }

  render() {
    return (
      <div>
        <h1>Maa-ohjelma</h1>
        <Filter filter={this.state.filter} handleFilter={this.handleFilter} />
        <div>
          <AllCountries countryList={this.state.maat} filter={this.state.filter} handleClick={this.setFilter} />
        </div>
      </div>
    )
  }
}

export default App;
