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

  kasvataPalautetta = (tyyppi) => () => this.setState({ [tyyppi]: this.state[tyyppi] + 1 })

  render() {
    return (
      <div>
        <div><Otsikko teksti='Anna palautetta'/></div>
        <div>
          <Button teksti='hyvä' onClick={this.kasvataPalautetta('good')} />
          <Button teksti='neutraali' onClick={this.kasvataPalautetta('neutral')} />
          <Button teksti='huono' onClick={this.kasvataPalautetta('bad')} />
        </div>
        <div>
          <Otsikko teksti='Statistiikkaa: ' />
          <Statistics data={this.state} />
        </div>
      </div>
    )
  }
}

const Otsikko = ({ teksti }) => <h1>{teksti}</h1>

const Button = (props) => (
      <button type='button' onClick={props.onClick}>{props.teksti}</button>
)


const Statistics = ({ data }) => {
  //console.log(neutral)
  if ( data.good || data.neutral || data.bad !== 0 ) {
    return (
      <div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Hyvä:</td>
                <td>{data.good}</td>
              </tr>
              <tr>
                <td>Neutraali: </td>
                <td>{data.neutral}</td>
              </tr>
              <tr>
                <td>Huono: </td>
                <td>{data.bad} </td>
              </tr>
                <Statistic data={data} type='average' />
                <Statistic data={data} type='positivity' />
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  return (
    <div>
      Ei yhtään palautetta annettu :´(
    </div>
  )
}

const Statistic = ({ data: {good, neutral, bad}, type}) => {
  if (type === 'average') {
    return (
      <tr>
        <td>Keskiarvo:</td>
        <td>{(good + neutral + bad) / 3} </td>
      </tr>
    )
  }
  return (
    <tr>
      <td>Positiivisia: </td>
      <td>{((good / (neutral + bad + good)) * 100)} % </td>
    </tr>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

