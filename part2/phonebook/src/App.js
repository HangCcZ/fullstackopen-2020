import React, { useEffect, useState } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';
import contactService from './services/contact';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    contactService.getAll().then((initialContact) => {
      setPersons(initialContact);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const clearForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const addPerson = (event) => {
    event.preventDefault();

    for (let i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {
        const confirm = window.confirm(
          `${newName} is already exist in the phonebook, replace the old number with a new one?`
        );
        if (confirm) {
          const changedPerson = { ...persons[i], number: newNumber };
          contactService
            .update(persons[i].id, changedPerson)
            .then((updatePerson) =>
              setPersons(
                persons.map((person) =>
                  person.name === newName ? updatePerson : person
                )
              )
            );
          clearForm();
        }
        return;
      }
    }

    // create new contact
    const personObject = {
      name: newName,
      number: newNumber,
    };
    contactService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
    });
    clearForm();
  };

  const onDelete = (id, name) => {
    return () => {
      const confirm = window.confirm(`Delete ${name} ?`);
      if (confirm) {
        contactService.deleteContact(id).then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        });
      }
      return;
    };
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Filter value={newFilter} onChange={handleFilterChange} />
      </div>
      <div>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handlePhoneChange={handlePhoneChange}
          addPerson={addPerson}
        />
        <h2>Numbers</h2>
        <Persons persons={persons} newFilter={newFilter} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default App;
