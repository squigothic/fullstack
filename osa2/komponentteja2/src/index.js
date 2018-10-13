import React from 'react'
import ReactDOM from 'react-dom'


const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko teksti={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa osat={kurssi.osat} />
        </div>
    )
}
const Osa = ({ nimi, tehtavia }) => {
    console.log(nimi, tehtavia)
    return (
        <p>{nimi} {tehtavia}</p>
    )
}
const Otsikko = ({ teksti }) => <h1>{teksti}</h1>
const Sisalto = ({ osat }) => {
  return(
    <div>
        {console.log(osat)}
        {osat.map(osa => <Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />)}
    </div>
  )
}
const Yhteensa = ({ osat }) => {
  const tehtaviaYhteensa = osat
    .map(osa => osa.tehtavia)
    .reduce((tulos, nykyinenarvo) => tulos + nykyinenarvo,0)

    return(
    <p>yhteensä {tehtaviaYhteensa} tehtävää</p>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id:3
      },
    ]
  }
  return (
    <div>
        <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)