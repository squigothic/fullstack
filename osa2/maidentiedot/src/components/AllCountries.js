import React from 'react';
import DisplayCountry from './DisplayCountry';

const AllCountries = ({ countryList, filter, handleClick }) => {
  const countriesToDisplay = countryList
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if(countriesToDisplay.length === 1 && filter !== '') {
    return (
      <div>
        <DisplayCountry country={countriesToDisplay[0]} />
      </div>
    )
  } else if(countriesToDisplay.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else {
    return (
      <div>
          {countriesToDisplay
            .map(country => 
            <div 
              key={country.alpha3Code} 
              onClick={handleClick(country.name)}>
              {country.name}
            </div>)
          }
          
      </div>
    )
  } 
}

export default AllCountries