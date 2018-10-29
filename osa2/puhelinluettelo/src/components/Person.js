import React from 'react';

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <p>{person.name} {person.number} <button onClick={deletePerson}>Poista henkilö</button></p>   
    </div>
  )
}

export default Person