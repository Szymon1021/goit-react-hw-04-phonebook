import MyForm from 'components/MyForm/MyForm';

import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useEffect, useState } from 'react';
import React from 'react';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filterKey, setFilterKey] = useState('');
  const [values, setValues] = useState({
    name: '',
    number: '',
  });
  /*
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filterKey: '',
    };
  */

  const handleChangeName = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeNumber = e => {
    setValues({ ...values, [e.target.number]: e.target.value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const name = contacts.name;
    const number = contacts.number;
    const islnArray = contacts.find(contact => contact.name === name);
    if (islnArray) {
      alert(`${name} is already in contacts`);
      return;
    } else {
      setContacts({
        contacts: [
          ...contacts,
          {
            name: name,
            id: nanoid(),
            number: number,
          },
        ],
      });
    }

    form.reset();
  };

  const handleInput = evt => {
    setFilterKey({
      filterKey: evt.target.value,
    });
  };

  const getFilteredContacts = () => {
    if (filterKey) {
      return contacts.filter(con => con.name.toLowerCase().includes(filterKey));
    }
    return contacts;
  };

  const deleteFunction = id => {
    const newFilteredContacts = contacts.filter(contact => contact.id !== id);
    setContacts({
      contacts: newFilteredContacts,
    });
  };

  useEffect(() => {
    try {
      const json = localStorage.getItem('contacts');
      const contacts = JSON.parse(json);

      if (contacts) {
        setContacts({ contacts });
      }
    } catch (error) {}
  }, []);
  useEffect(prevState => {
    if (prevState.contacts.length !== contacts.length) {
      const json = JSON.stringify(contacts);
      localStorage.setItem('contacts', json);
    }
  });

  return (
    <div>
      <h1> Phonebook</h1>
      <MyForm
        name={values.name}
        number={values.number}
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
      />
      <h2> Contacts</h2>
      <Filter handleInput={handleInput} />
      <ContactList
        contacts={contacts}
        getFilteredContacts={getFilteredContacts}
        deleteFunction={deleteFunction}
      />
    </div>
  );
};
