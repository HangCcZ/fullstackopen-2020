import React, { useEffect, useState } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import Filter from './Filter';
import contactService from './services/contact';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [notificationColor, setNotificationColor] = useState('');

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

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className={notificationColor}>{message}</div>;
  };

  const clearNotification = () => {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
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
            .then((updatePerson) => {
              setPersons(
                persons.map((person) =>
                  person.name === newName ? updatePerson : person
                )
              );
              setNotification(
                `The phone number has been updated for ${persons[i].name}`
              );
              setNotificationColor('successful');
            })
            .catch((error) => {
              setNotification(
                `The record that you attempted to modify no long exists in the server`,
                'error'
              );
              setNotificationColor('error');
              contactService.getAll().then((updatedPerson) => {
                setPersons(updatedPerson);
              });
            });
          clearForm();
          clearNotification();
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
    setNotification(`added ${personObject.name}`);
    setNotificationColor('successful');
    clearForm();
    clearNotification();
  };

  const onDelete = (id, name) => {
    return () => {
      const confirm = window.confirm(`Delete ${name} ?`);
      if (confirm) {
        contactService.deleteContact(id).then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification([
            `Information of ${name} has already been removed from server`,
            'error',
          ]);
          setNotificationColor('error');
          clearNotification();
        });
      }
      return;
    };
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Notification message={notification} />
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
