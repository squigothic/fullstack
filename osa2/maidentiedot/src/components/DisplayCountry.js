import React from 'react'

const DisplayCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      capital: {country.capital} <br></br>
      population: {country.population} <br></br>
      <div>
        <img src={country.flag} alt={country.name} height={200} width={350} mode='fit' />
      </div>
    </div>
  )
}

export default DisplayCountry;