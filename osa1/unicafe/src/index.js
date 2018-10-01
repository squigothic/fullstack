import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: 0,
      neutral: 0,
      bad: 0,
    }
  }

  kasvataPalautetta = (tyyppi) => {
    return () => {
      console.log(tyyppi)
      this.setState({ [tyyppi]: this.state[tyyppi] + 1 })
    }
  }

  render() {
    return (
      <div>
        <Otsikko teksti='Anna palautetta'/>
        <div>
          <Nappi teksti='hyvä' onClick={this.kasvataPalautetta('good')} />
          <Nappi teksti='neutraali' onClick={this.kasvataPalautetta('neutral')} />
          <Nappi teksti='huono' onClick={this.kasvataPalautetta('bad')} />
        </div>
        <div>
          <Otsikko teksti='Statistiikkaa: ' />
          <Tulokset kentta={this.state.good} teksti='Hyvä: ' />
          <Tulokset kentta={this.state.neutral} teksti='Neutraali: ' />
          <Tulokset kentta={this.state.bad} teksti='Huono: ' />
        </div>
      </div>
    )
  }
}

const Otsikko = ({ teksti }) => <h1>{teksti}</h1>

const Nappi = (props) => {
  return (
    <div>
      <button type='button' onClick={props.onClick}>{props.teksti}</button>
    </div>
  )
}

const Tulokset = ({ kentta, teksti }) => {
  return (
    <div>{teksti} {kentta}</div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));

