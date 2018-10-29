import React from 'react';
import Person from './Person'

const AllPersons = ({ personList, filter, deletePerson }) => {
  if (personList.length === 0) {
    return 'Ei henkilöitä listalla'
  }
  const personsToDisplay = personList
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
        {personsToDisplay
          .map(person => 
            <Person 
              key={person.name} 
              person={person} 
              deletePerson={deletePerson(person.id)}
            />)
        }
    </div>
  )   
}

export default AllPersons