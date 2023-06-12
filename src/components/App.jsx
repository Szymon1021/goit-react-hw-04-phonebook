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
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    try {
      const json = localStorage.getItem('contacts');
      const contacts = JSON.parse(json);

      if (contacts) {
        setContacts(contacts);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    const newContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterKey)
    );
    setFilteredContacts(newContacts);
  }, [contacts, filterKey]);

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const islnArray = contacts.find(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (islnArray) {
      alert(`"${values.name}" in already in contacts.`);
    } else {
      const newContact = {
        id: nanoid(),
        name: values.name,
        number: values.number,
      };
      setContacts([...contacts, newContact]);
      setValues({
        name: '',
        number: '',
      });
    }
    form.reset();
  };

  const handleInput = evt => {
    setFilterKey(evt.target.value);
  };

  const deleteFunction = id => {
    const newFilteredContacts = contacts.filter(contact => contact.id !== id);
    setContacts(newFilteredContacts);
  };

  useEffect(() => {
    const json = JSON.stringify(contacts);
    localStorage.setItem('contacts', json);
  }, [contacts]);

  return (
    <div>
      <h1> Phonebook</h1>
      <MyForm
        name={values.name}
        number={values.number}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <h2> Contacts</h2>
      <Filter handleInput={handleInput} />
      <ContactList
        contacts={filteredContacts}
        deleteFunction={deleteFunction}
      />
    </div>
  );
};
