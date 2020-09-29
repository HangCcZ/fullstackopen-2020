import React from 'react';

const Persons = ({ persons, newFilter, onDelete }) => {
  const showPersons = (personList) => {
    return personList.map((person) => (
      <p key={person.name}>
        {person.name} {person.number}
        <button onClick={onDelete(person.id, person.name)}>delete</button>
      </p>
    ));
  };

  const showFiltered = persons.filter((person) => {
    return person.name.toLowerCase().includes(newFilter.toLowerCase());
  });

  // conditional rendering
  const showPersonList =
    newFilter === '' ? showPersons(persons) : showPersons(showFiltered);

  return showPersonList;
};

export default Persons;
