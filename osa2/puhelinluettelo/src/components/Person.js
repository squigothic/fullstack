import React from 'react';

const Person = ({ personList, filter }) => {
  console.log('suodin on: ', filter)
  if (personList.length === 0) {
    return 'Ei henkilöitä listalla'
  }
  const personsToDisplay = personList
    .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  console.log('esitettävät:', personsToDisplay)
  return (
    <div>
        {personsToDisplay.map(person => <p key={person.name}>{person.name} puh: {person.number}</p>)}
    </div>
  )   
}

export default Person