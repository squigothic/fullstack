import React from 'react';

const AllCountries = ({ countryList, filter }) => {
  const countriesToDisplay = countryList
    .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  if(countriesToDisplay.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  return (
    <div>
        {countriesToDisplay
          .map(country => <p key={country.alpha3Code}>{country.name}</p>)
        }
    </div>
  )   
}

export default AllCountries