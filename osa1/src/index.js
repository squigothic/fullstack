import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 ='Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto osa1={osa1} osa2={osa2} osa3={osa3} tehtavia1={tehtavia1} tehtavia2={tehtavia2} tehtavia3={tehtavia3}/>
      <p>Yhteensä {tehtavia1 + tehtavia2 + tehtavia3} tehtävää</p>
    </div>
  )
}

const Otsikko = ({ kurssi }) => {
  return (
    <h1>{kurssi} </h1>
  )
}

const Sisalto = ({ osa1, osa2, osa3, tehtavia1, tehtavia2, tehtavia3 }) => {
  return (
    <div>
      <Osa osa={osa1} tehtavia={tehtavia1} />
      <Osa osa={osa2} tehtavia={tehtavia2} />
      <Osa osa={osa3} tehtavia={tehtavia3} />
    </div>
  )
}

const Osa = ({osa, tehtavia}) => {
  return (
    <p>{osa} {tehtavia}</p>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root'));