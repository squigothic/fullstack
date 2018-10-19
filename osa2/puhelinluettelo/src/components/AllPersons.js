import React from 'react';
import Person from './Person'

const AllPersons = ({ personList, filter }) => {
  console.log('suodin on: ', filter)
  if (personList.length === 0) {
    return 'Ei henkilöitä listalla'
  }
  const personsToDisplay = personList
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  console.log('esitettävät:', personsToDisplay)
  return (
    <div>
        {personsToDisplay
          .map(person => <Person key={person.name} person={person} />)
        }
    </div>
  )   
}

export default AllPersons