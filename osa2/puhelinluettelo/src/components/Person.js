import React from 'react';

const Person = ({ personList }) => {
  if (personList.length === 0) {
    return 'Ei henkilöitä listalla'
  }
  return (
    <div>
        {personList.map(person => <p key={person.name}>{person.name} puh: {person.number}</p>)}
    </div>
  )   
}

export default Person