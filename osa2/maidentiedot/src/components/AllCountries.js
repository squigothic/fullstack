import React from 'react';
import DisplayCountry from './DisplayCountry';

const AllCountries = ({ countryList, filter }) => {
  const countriesToDisplay = countryList
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if(countriesToDisplay.length === 1 && filter !== '') {
    console.log(countriesToDisplay)
    return (
      <div>
        <DisplayCountry country={countriesToDisplay[0]} />
      </div>
    )
  } else if(countriesToDisplay.length > 10) {
    console.log('Maita oli yli kymmenen')
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else {
    console.log('maita oli alle kymmenen mutta yli yksi')
    return (
      <div>
          {countriesToDisplay
            .map(country => <p key={country.alpha3Code}>{country.name}</p>)
          }
      </div>
    )
  } 
}

export default AllCountries