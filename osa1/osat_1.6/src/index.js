import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const kurssi = {
    nimi: 'Half stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteeet',
        tehtavia: 10,
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ],
  }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <p>Yhteensä {kurssi.osat[0].tehtavia + kurssi.osat[1].tehtavia + kurssi.osat[2].tehtavia} tehtävää</p>
    </div>
  )
}

const Otsikko = ({ kurssi }) => {
  return (
    <h1>{kurssi} </h1>
  )
}

const Sisalto = ({osat}) => {
  return (
    <div>
      <Osa osa={osat[0]} />
      <Osa osa={osat[1]} />
      <Osa osa={osat[2]} />
    </div>
  )
}

const Osa = ({osa: {nimi, tehtavia}}) => {
  return (
    <p>{nimi} {tehtavia}</p>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root'));